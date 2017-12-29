const resolve = require('path').resolve;

module.exports = {
  SCREENSHOTS_DIR: resolve('./screenshots/tests'),
  TARGETS_DIR: resolve('./screenshots/targets'),
  DIFF_DIR: resolve('./screenshots/diff'),
  SCENARIOS_DIR: resolve('./scenarios'),
  REPORTS_DIR: resolve('./reports'),
  LOGS_DIR: resolve('./logs'),
  modules: {
    REPORTER: 'progressBar',
    RESULTS_FORMATTER: 'console',
    RESULTS_SAVER: 'file',
    IMAGES_SAVER: 'file'
  },
  actions: {
    WAIT_FOR_SELECTOR: 'waitForSelector',
    FILL: 'fill',
    SUBMIT: 'submit',
    CLICK: 'click',
    SELECTOR: 'selector'
  }
}
