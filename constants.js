const resolve = require('path').resolve;

module.exports = {
  SCREENSHOTS_DIR: resolve('./screenshots/tests'),
  TARGETS_DIR: resolve('./screenshots/targets'),
  DIFF_DIR: resolve('./screenshots/diff'),
  SCENARIOS_DIR: resolve('./scenarios'),
  REPORTS_DIR: resolve('./reports'),
  modules: {
    REPORTER: 'progressBar',
    RESULTS_FORMATTER: 'console',
    RESULTS_SAVER: 'file'
  }
}
