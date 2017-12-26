const puppeteer = require('puppeteer');
const _ = require('lodash');
const constants = require('../constants');

class PuppeteerDriver {
  constructor({scenario, workingDir, defaultConfig, url, logger}) {
    this.scenario = scenario;
    this.viewport = undefined;
    this.workDir = workingDir;
    this.defaultConfig = defaultConfig;
    this.url = url;
    this.logger = logger;
    this.cookies = []

    this.actionsMapper = {
      [constants.actions.WAIT_FOR_SELECTOR]: this.actionWaitForSelector.bind(this),
      [constants.actions.FILL]: this.actionFill.bind(this),
      [constants.actions.SUBMIT]: this.actionSubmit.bind(this),
      [constants.actions.CLICK]: this.actionClick.bind(this),
      [constants.actions.SELECTOR]: this.actionSelector.bind(this)
    }
  }

  setCookies(cookies) {
    if (Array.isArray(cookies) === false) {
      throw new Exception('You can only provide an array of cookies')
    }

    this.cookies = cookies;
  }

  init() {
    return new Promise((resolve, reject) => {
      puppeteer.launch({headless: true}).then(browser => {
        this.browser = browser;
        this.logger.debug('Initialize new browser instance');
        resolve();
      });
    });
  }

  findActionExecutor(actionName) {
    if (typeof this.actionsMapper[actionName] === 'undefined') {
      this.logger.error(`Invalid action name provided - ${actionName}`);
      return undefined;
    }

    return this.actionsMapper[actionName];
  }

  actionWaitForSelector(page, name, value) {
    this.logger.debug('Waiting for selector', value);

    return page.waitForSelector(value);
  }

  actionFill(page, name, value) {
    this.logger.debug(`Filling the from with selector ${value.field}`);

    return new Promise(async (resolve, reject) => {
      await page.click(value.field);
      await page.keyboard.type(value.value);

      resolve();
    });
  }

  actionSubmit(page, name, value) {
    this.logger.debug(`Submiting a from using the selector ${value}`);

    return new Promise(async (resolve, reject) => {
      await page.click(value);
      await page.waitForNavigation();

      resolve();
    });
  }

  actionClick(page, name, value) {
    this.logger.debug('Clicking on element', value);
    return new Promise(async (resolve, reject) => {
      try {
        await page.click(value);
      } catch (e) {
        this.logger.error('Can not click on element', e);
      }

      resolve();
    });
  }

  actionSelector(page, name, value) {
    this.logger.debug('Taking screenshot of', value);
    return this.takeScreenshot(page, name, {selector: value});
  }

  screenshotDOMElement(page, opts = {}) {
    const padding = 'padding' in opts ? opts.padding : 0;
    const path = 'path' in opts ? opts.path : null;
    const selector = opts.selector;

    if (!selector) {
      throw Error('Please provide a selector.');
    }

    return new Promise(async (resolve, reject) => {
      const rect = await page.evaluate(selector => {
        const element = document.querySelector(selector);

        if (!element) {
          return null;
        }

        const {x, y, width, height} = element.getBoundingClientRect();

        return {left: x, top: y, width, height, id: element.id};
      }, selector);

      if (!rect) {
        return reject(`Could not find element that matches selector: ${selector}.`);
      }

      resolve(await page.screenshot({
        path,
        clip: {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        }
      }));
    });
  }

  getValue(field) {
    return _.get(
      this.scenario,
      field,
      _.get(this.defaultConfig, field, undefined)
    );
  }

  getUrl() {
    const url = this.getValue('url');

    return `${this.url}${url}`;
  }

  takeScreenshot(page, name, opts={}) {
    const testCaseName = this.getValue('name');
    const url = this.getValue('url');
    const filename = new Buffer(
      `${testCaseName}-${url}-${name}-${this.viewport}`.toString('base64')
    ).toString('base64');

    opts.path = `${this.workDir}/${filename}.png`;

    return new Promise(async (resolve, reject) => {
      try {
        await this.screenshotDOMElement(page, opts);
      } catch(e) {
        this.logger.error('Taking a screenshot failed', e);
      }
      resolve();
    });
  }

  runObjectScenario(page, name, todo) {
    return new Promise(async (resolve, reject) => {
      for (let key of Object.keys(todo)) {
        const action = this.findActionExecutor(key);
        const keyValue = todo[key];

        await action(page, name, keyValue);
      }

      resolve(page);
    });
  }

  runArrayScenario(page, name, todo) {
    return new Promise(async (resolve, reject) => {
      for (let x = 0; x < todo.length; x += 1) {
        const step = todo[x];
        const action = this.findActionExecutor(step.action);
        await action(page, name, step.value);
      }

      resolve(page);
    });
  }

  runTest(page, testCase) {
    const todo = _.get(testCase, 'todo');
    const name = _.get(testCase, 'name');

    if (Array.isArray(todo) === true) {
      return this.runArrayScenario(page, name, todo);
    } else if (_.isObject(todo) === true) {
      return this.runObjectScenario(page, name, todo);
    } else {
      this.logger.error(`Invalid scenario format, please check ${name} scenario`);
      return new Promise((resolve, reject) => {
        reject(`Invalid scenario format, please check ${name} scenario`);
      });
    }
  }

  setViewport(page, viewport) {
    this.viewport = `${viewport.width}-${viewport.height}`;

    this.logger.debug(`Setting view port to ${viewport.width}x${viewport.height}`);

    page.setViewport(viewport);
  }

  applyCookies(page) {
    this.cookies.forEach(cookie => {
      page.setCookie(cookie)
    });
  }

  execute() {
    return new Promise(async (resolve, reject) => {
      const page = await this.browser.newPage();
      const authenticate = this.getValue('authenticate');
      const url = this.getUrl();
      const waitForSelector = this.getValue('waitForSelector');
      const viewPorts = this.getValue('viewports');
      const tests = this.getValue('tests');
      const runTestCases = () => new Promise(async (resolve, reject) => {
        for (let testCase of tests) {
          this.logger.debug('Running test case', testCase.name);
          await this.runTest(page, testCase);
        }

        resolve();
      });

      if (typeof authenticate !== 'undefined') {
        await page.authenticate(authenticate);
      }

      this.applyCookies(page);

      this.logger.info(`Opening URL: ${url}`);
      await page.goto(url);

      if (Array.isArray(tests) === true) {
        if (Array.isArray(viewPorts) === true) {
          for (let viewport of viewPorts) {
            this.setViewport(page, viewport);
            await runTestCases();
          }
        } else {
          runTestCases();
        }

        resolve();
      } else {
        this.logger.debug('Running single test case');
        resolve(await this.runTest(page, this.scenario));
      }
    });
  }

  cookies() {
    return this.browser.cookies()
  }

  async close() {
    await this.browser.close();
  }
}

module.exports = PuppeteerDriver
