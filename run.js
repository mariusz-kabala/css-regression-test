const program = require('commander');
const constants = require('./constants');
const logger = require('./utils/logger');

program
  .version('0.0.1')
  .option('-u, --url [value]', 'Website url, where tests should run')
  .option('-n, --testName [value]', 'Name for tests run')
  .option('--run', 'Run test cases')
  .option(
    '-t, --threshold <n>',
    'Change the amount of difference that will be tolerated before marking a test screenshot as "failed"',
    0
  )
  .option(
    '--reporter [value]',
    'The way how results will be showed',
    'progressBar'
  )
  .option(
    '--testDir [value]',
    'Path to the directory where sceenshot from test cases should be saved',
    constants.SCREENSHOTS_DIR
  )
  .option(
    '--targetDir [value]',
    'Path to the directory from where app should take screenshots againts which test will run',
    constants.TARGETS_DIR
  )
  .option(
    '--approve [value]',
    'Approve test run with provided name (if name is not provided last test run will be used)',
    'last'
  )
  .option(
    '--results [value]',
    'Show results of the test (if test\'s name is not provided last test run will be used)',
    'last'
  )
  .option(
    '--formatter [value]',
    'The way how the results will be format',
    'console'
  )
  .option(
    '--showOnlyFail',
    'Display only tests that failed'
  )
  .option(
    '--saveFailedDiff [value]',
    'Save images diff in indicated dir. If dir is not provided default one will be used',
    constants.DIFF_DIR
  )
  .parse(process.argv);

function getReporter() {
  switch (program.reporter) {
    default:
      return require('./reporters/progressBar');
  }
}

function getResultFormatter() {
  switch (program.formatter) {
    default:
      return require('./formatters/result/console');
  }
}

function getResultsFormatter() {
  switch (program.formatter) {
    default:
      return require('./formatters/results/console');
  }
}

(async () => {
  const reporter = getReporter();

  if (program.run === true) {
    const run = require('./commands/run');
    logger.info('Running test cases...');

    try {
      await run({
        testName: program.testName,
        url: program.url,
        screenshotsDir: program.testDir,
        logger,
        reporter
      });
    } catch(e) {
      logger.error('Command RUN failed', e);
      return;
    }
  }

  if (program.rawArgs.indexOf('--approve') > -1) {
    const approve = require('./commands/approve');
    logger.info(`Approving ${program.approve} test cases...`);
    try {
      await approve({
        name: program.approve,
        screenshotsDir: program.testDir,
        targetDir: program.targetDir
      })
    } catch (e) {
      logger.error('Command APPROVE failed', e);
      return;
    }
  }

  if (program.rawArgs.indexOf('--results') > -1) {
    const results = require('./commands/results');

    logger.info('Running results...');

    let testResults;

    try {
      testResults = await results({
        screenshotsDir: program.testDir,
        targetDir: program.targetDir,
        testRun: program.results,
        threshold: program.threshold,
        showOnlyFail: program.showOnlyFail,
        diffDir: program.saveFailedDiff,
        formatter: getResultFormatter(),
        logger,
        reporter
      });
    } catch (e) {
      logger.error('Command RESULTS failed', e);
      return;
    }

    const testResultsFormatter = getResultsFormatter();

    console.log(
      testResultsFormatter(testResults)
    );
  }
})();
