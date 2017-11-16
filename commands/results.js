const fs = require('fs');
const fileSys = require('../utils/fileSystem');
const glob = require('glob');
const path = require('path');
const compareImages = require('resemblejs/compareImages');

function saveDiffImage({
  diffDir,
  testRun,
  data,
  fileName
}) {
  const pathToSave = `${diffDir}/${testRun}`;

  return new Promise(async (resolve, reject) => {
    await fileSys.mkdir(pathToSave);

    fs.writeFile(`${pathToSave}/${fileName}`, data.getBuffer(), () => {
      resolve();
    });
  });
}

module.exports = function({
  screenshotsDir,
  targetDir,
  diffDir,
  testRun,
  logger,
  reportTool,
  threshold,
  formatter,
  showOnlyFail
}) {
  const passResult = (result) => (
    (showOnlyFail === true && result.status === false) ||
    showOnlyFail === false
  )

  if (testRun === 'last') {
    testRun = fileSys.getTheNewestFile(screenshotsDir);
  }

  screenshotsDir = `${screenshotsDir}/${testRun}`;

  return new Promise(async (resolve, reject) => {
    if (fs.existsSync(screenshotsDir) === false) {
      return reject(`Screenshots dir ${screenshotsDir} doesn't exist`);
    }

    if (fs.existsSync(targetDir) === false) {
      return reject(`Target dir ${targetDir} doesn't exist`);
    }

    glob(`${targetDir}/*.png`, async (err, files) => {
      if (err) {
        return reject(err);
      }

      const results = [];

      reportTool.startReport(files.length);

      for (let file of files) {
        const fileName = path.basename(file);
        const testFile = `${screenshotsDir}/${fileName}`;
        const testName = (new Buffer(fileName.slice(0, -4), 'base64')).toString();
        const testNameArr = testName.split('-');

        if (fs.existsSync(testFile) === false) {
          logger.error(`Test file ${testFile} doesn't exists skipping`);
          continue;
        }

        const data = await compareImages(
        	fs.readFileSync(file),
        	fs.readFileSync(testFile)
        );

        const result = Object.assign({}, data, {
          scenario: testNameArr[0],
          testName: testNameArr[2],
          url: testNameArr[1],
          viewport: `${testNameArr[3]}x${testNameArr[4]}`,
          fileName
        });

        result.status = data.rawMisMatchPercentage > threshold ? false : true;

        if (typeof formatter === 'function') {
          reportTool.reportProgress(passResult(result) ? formatter(result) : undefined);
        } else {
          reportTool.reportProgress(passResult(result) ? result : undefined);
        }

        results.push(result);

        if (result.status === false) {
          await saveDiffImage({
            diffDir,
            testRun,
            data,
            fileName
          });
        }
      }

      resolve({results, testRun});
    });
  });
}
