const defaultConfig = require('../default');
const getDriver = require('../utils/getDriver');
const Driver = getDriver();

module.exports = function({
  url,
  logger
}) {
  return new Promise(async (resolve, reject) => {

    const cookie = defaultConfig.getCookie();

    try {
      driver = new Driver({
        scenario: cookie,
        logger,
        defaultConfig,
        url
      });
    } catch (e) {
      return reject(e);
    }

    await driver.init();
    const page = await driver.execute();

    resolve(await page.cookies());

    await driver.close();
  });
}
