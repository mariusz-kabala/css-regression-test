const colors = require('colors');

module.exports = function(data) {
  const status = data.status === true ?
    colors.green('SUCCESS') : colors.red('FAIL');

  return {
    scenario: data.scenario,
    testName: data.testName,
    url: data.url,
    viewport: data.viewport,
    status
  }
}
