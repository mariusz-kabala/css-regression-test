const puppeteer = require('puppeteer');
const _ = require('lodash');

class PuppeteerDriver {
  constructor({scenario, workingDir, defaultConfig, url, logger}) {
    this.scenario = scenario;
    this.viewport = undefined;
    this.workDir = workingDir;
    this.defaultConfig = defaultConfig;
    this.url = url;
    this.logger = logger;
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

  runTest(page, testCase) {
    const todo = _.get(testCase, 'todo');
    const name = _.get(testCase, 'name');

    return new Promise(async (resolve, reject) => {
      for (let key of Object.keys(todo)) {
        const keyValue = todo[key];

        switch (key) {
          case 'waitForSelector':
            this.logger.debug('Waiting for selector', keyValue);
            await page.waitForSelector(keyValue);
            break;

          case 'click':
            this.logger.debug('Clicking on element', keyValue);
            try {
              await page.click(keyValue);
            } catch (e) {
              this.logger.error('Can not click on element', e);
            }
            break;

          case 'selector':
            this.logger.debug('Taking screenshot of', keyValue);
            await this.takeScreenshot(page, name, {selector: keyValue});
            break;
        }
      }

      resolve();
    });
  }

  setViewport(page, viewport) {
    this.viewport = `${viewport.width}-${viewport.height}`;

    this.logger.debug(`Setting view port to ${viewport.width}x${viewport.height}`);

    page.setViewport(viewport);
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

      this.logger.info(`Opening URL: ${url}`);
      await page.goto(url);

      if (Array.isArray(viewPorts) === true) {
        for (let viewport of viewPorts) {
          this.setViewport(page, viewport);
          await runTestCases();
        }
      } else {
        runTestCases();
      }

      resolve();
    });
  }

  async close() {
    await this.browser.close();
  }
}

module.exports = PuppeteerDriver
