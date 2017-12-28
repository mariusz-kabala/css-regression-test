const _ = require('lodash');
const generateCookieCommand = require('../../../commands/generateCookie');
const runCommand = require('../../../commands/run');
const Logger = require('../lib/logger');
const pm = require('../lib/processesManager');

module.exports = async function(req, res) {
  const url = _.get(req, 'body.url');
  const testName = _.get(req, 'body.testName', Date.now());
  const threshold = _.get(req, 'body.threshold');
  const cookie = _.get(req, 'body.generateCookie', true);
  const id = pm.add({
    url,
    testName,
    threshold,
    cookie
  });
  const logger = new Logger(req.io, id);
  let cookies = [];

  res.json({started: true});

  if (cookie === true) {
    try {
      cookies = await generateCookieCommand({
        url,
        logger
      });
    } catch (e) {
      console.log(e);
      logger.error('Command GENERATE COOKIE failed', e);
      return;
    }
  }

  pm.remove(id);
}
