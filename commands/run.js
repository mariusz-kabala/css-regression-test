const fs = require('fs');
const readScenarios = require('../utils/readScenarios');
const Driver = require('../drivers/puppeteer');
const defaultConfig = require('../default');
const constants = require('../constants');

const makeWorkingDir = (testName, screenshotsDir, logger) => new Promise((resolve, reject) => {
  const subdir = (typeof testName === 'undefined') ? Date.now() : testName
  const dir = `${screenshotsDir}/${subdir}`

  if (fs.existsSync(dir) === true) {
    return reject(`Test dir ${dir} already exists please use different name`);
  }

  fs.mkdir(dir, (err) => {
    if (err) {
      reject(err);
    }
    logger.info(`Working dir ${dir} has been created`);
    resolve(dir);
  });
});

module.exports = function({
  testName,
  url,
  screenshotsDir,
  logger,
  reporter,
  cookies,
  proxy
}) {
  const reportTool = require('../utils/report')(reporter);

  return new Promise(async (resolve, reject) => {
    const scenarios = await readScenarios(constants.SCENARIOS_DIR);
    let workingDir;

    try {
      workingDir = await makeWorkingDir(testName, screenshotsDir, logger);
    } catch (e) {
      logger.error(e);
      return reject();
    }

    reportTool.startReport(scenarios.length);

    for (let scenario of scenarios) {
      logger.info(`Executing scenario ${scenario.name}`);
      const driver = new Driver({
        scenario,
        workingDir,
        logger,
        defaultConfig,
        url,
        proxy
      });
      await driver.init();
      await driver.setCookies(cookies);
      await driver.execute();
      await driver.close();

      reportTool.reportProgress();
    }

    resolve();
  });
}
