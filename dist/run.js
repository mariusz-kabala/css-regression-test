'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var program = require('commander');
var constants = require('./constants');
var logger = require('./utils/logger');
var loader = require('./utils/loader');

program.version('0.0.1').option('-u, --url [value]', 'Website url, where tests should run').option('-n, --testName [value]', 'Name for tests run').option('--run', 'Run test cases').option('-c, --generateCookie', 'Runs a scenario in order to generate auth cookie').option('-t, --threshold <n>', 'Change the amount of difference that will be tolerated before marking a test screenshot as "failed"', 0).option('--reporter [value]', 'The way how results will be showed', 'progressBar').option('--testDir [value]', 'Path to the directory where sceenshot from test cases should be saved', constants.SCREENSHOTS_DIR).option('--targetDir [value]', 'Path to the directory from where app should take screenshots againts which test will run', constants.TARGETS_DIR).option('--approve [value]', 'Approve test run with provided name (if name is not provided last test run will be used)', 'last').option('--results [value]', 'Show results of the test (if test\'s name is not provided last test run will be used)', 'last').option('--formatter [value]', 'The way how the results will be format', 'console').option('--showOnlyFail', 'Display only tests that failed').option('--saveFailedDiff [value]', 'Save images diff in indicated dir. If dir is not provided default one will be used', constants.DIFF_DIR).option('--save [value]', 'Save the result of the test run so it can be checked later', 'file').parse(process.argv);

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var reporter, cookies, generateCookie, run, approve, resultsProvider, reportTool, _ref2, results, testRun, testResultsFormatter, formattedResults, reportSaver;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          reporter = loader.getReporter(program.reporter);
          cookies = [];

          if (!(program.generateCookie === true)) {
            _context.next = 15;
            break;
          }

          generateCookie = require('./commands/generateCookie');

          logger.info('Generating a cookie...');

          _context.prev = 5;
          _context.next = 8;
          return generateCookie({
            url: program.url,
            logger: logger
          });

        case 8:
          cookies = _context.sent;
          _context.next = 15;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context['catch'](5);

          logger.error('Command GENERATE COOKIE failed', _context.t0);
          return _context.abrupt('return');

        case 15:
          if (!(program.run === true)) {
            _context.next = 27;
            break;
          }

          run = require('./commands/run');

          logger.info('Running test cases...');

          _context.prev = 18;
          _context.next = 21;
          return run({
            testName: program.testName,
            url: program.url,
            screenshotsDir: program.testDir,
            logger: logger,
            reporter: reporter,
            cookies: cookies
          });

        case 21:
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t1 = _context['catch'](18);

          logger.error('Command RUN failed', _context.t1);
          return _context.abrupt('return');

        case 27:
          if (!(program.rawArgs.indexOf('--approve') > -1)) {
            _context.next = 39;
            break;
          }

          approve = require('./commands/approve');

          logger.info('Approving ' + program.approve + ' test cases...');
          _context.prev = 30;
          _context.next = 33;
          return approve({
            name: program.approve,
            screenshotsDir: program.testDir,
            targetDir: program.targetDir
          });

        case 33:
          _context.next = 39;
          break;

        case 35:
          _context.prev = 35;
          _context.t2 = _context['catch'](30);

          logger.error('Command APPROVE failed', _context.t2);
          return _context.abrupt('return');

        case 39:
          if (!(program.rawArgs.indexOf('--results') > -1)) {
            _context.next = 67;
            break;
          }

          resultsProvider = require('./commands/results');
          reportTool = require('./utils/report')(reporter);


          logger.info('Running results...');

          _context.prev = 43;
          _context.next = 46;
          return resultsProvider({
            screenshotsDir: program.testDir,
            targetDir: program.targetDir,
            testRun: program.results,
            threshold: program.threshold,
            showOnlyFail: program.showOnlyFail,
            diffDir: program.saveFailedDiff,
            formatter: loader.getResultFormatter(program.formatter),
            logger: logger,
            reportTool: reportTool
          });

        case 46:
          _ref2 = _context.sent;
          results = _ref2.results;
          testRun = _ref2.testRun;
          testResultsFormatter = loader.getResultsFormatter(program.formatter);
          formattedResults = testResultsFormatter(results);


          reportTool.reportProgress(formattedResults);

          if (!(program.rawArgs.indexOf('--save') > -1)) {
            _context.next = 62;
            break;
          }

          // save the results
          reportSaver = loader.getResultsSaver(program.save);
          _context.prev = 54;
          _context.next = 57;
          return reportSaver(formattedResults, testRun);

        case 57:
          _context.next = 62;
          break;

        case 59:
          _context.prev = 59;
          _context.t3 = _context['catch'](54);

          logger.error('Saving the report failed', _context.t3);

        case 62:
          _context.next = 67;
          break;

        case 64:
          _context.prev = 64;
          _context.t4 = _context['catch'](43);

          logger.error('Command RESULTS failed', _context.t4);

        case 67:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[5, 11], [18, 23], [30, 35], [43, 64], [54, 59]]);
}))();