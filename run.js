const program = require('commander');
const constants = require('./constants');
const logger = require('./utils/logger');
const loader = require('./utils/loader');

program
  .version('0.0.1')
  .option('-u, --url [value]', 'Website url, where tests should run')
  .option('-n, --testName [value]', 'Name for tests run')
  .option('--run', 'Run test cases')
  .option('-c, --generateCookie', 'Runs a scenario in order to generate auth cookie')
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
  .option(
    '--save [value]',
    'Save the result of the test run so it can be checked later',
    'file'
  )
  .parse(process.argv);

(async () => {
  const reporter = loader.getReporter(program.reporter);
  let cookies = [];

  if (program.generateCookie === true) {
    const generateCookie = require('./commands/generateCookie');
    logger.info('Generating a cookie...');

    try {
      cookies = await generateCookie({
        url: program.url,
        logger
      });
    } catch (e) {
      logger.error('Command GENERATE COOKIE failed', e);
      return;
    }
  }

  if (program.run === true) {
    const run = require('./commands/run');
    logger.info('Running test cases...');

    try {
      await run({
        testName: program.testName,
        url: program.url,
        screenshotsDir: program.testDir,
        logger,
        reporter,
        cookies
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
    const resultsProvider = require('./commands/results');
    const reportTool = require('./utils/report')(reporter);

    logger.info('Running results...');

    try {
      const { results, testRun } = await resultsProvider({
        screenshotsDir: program.testDir,
        targetDir: program.targetDir,
        testRun: program.results,
        threshold: program.threshold,
        showOnlyFail: program.showOnlyFail,
        diffDir: program.saveFailedDiff,
        formatter: loader.getResultFormatter(program.formatter),
        logger,
        reportTool
      });

      const testResultsFormatter = loader.getResultsFormatter(program.formatter);
      const formattedResults = testResultsFormatter(results, testRun);

      reportTool.reportProgress(formattedResults);

      if (program.rawArgs.indexOf('--save') > -1) { // save the results
        const reportSaver = loader.getResultsSaver(program.save);

        try {
          await reportSaver(formattedResults, testRun);
        } catch (e) {
          logger.error('Saving the report failed', e);
        }
      }
    } catch (e) {
      logger.error('Command RESULTS failed', e);
    }
  }
})();
