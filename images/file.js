const constants = require('../constants');
const fs = require('fs');
const fileSys = require('../utils/fileSystem');

const getImage = path => new Promise((resolve, reject) => {
  if (fs.existsSync(path) === false) {
    reject('file not found');
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      reject(err);
    }

    resolve(data);
  });
});


function saveDiffImage() {

}

function getDiffImage(testID, imageID) {
  return getImage(
    `${constants.DIFF_DIR}/${testID}/${imageID}`
  );
}

function saveTestImage() {

}

function getTestImage(testID, imageID) {
  return getImage(
    `${constants.SCREENSHOTS_DIR}/${testID}/${imageID}`
  );
}

function saveTargetImage() {

}

function getTargetImage(imageID) {
  return getImage(
    `${constants.TARGETS_DIR}/${imageID}`
  );
}

function getAllTargetImages() {
    return new Promise(async (resolve, reject) => {
      const files = await fileSys.readDir(constants.TARGETS_DIR);
      const result = {};

      files.map(file => {
        const fileName = file.split('.');

        if (fileName.length === 2 && fileName[1] === 'png') {
          const dsc = String(Buffer.from(fileName[0], 'base64')).split('-');
          const scenario = dsc[0];
          const testName = dsc[2];
          const url = dsc[1];
          const res = `${dsc[3]}x${dsc[4]}`;

          if (typeof result[scenario] === 'undefined') {
            result[scenario] = {}; // scenario name
          }

          if (typeof result[scenario][testName] === 'undefined') {
            result[scenario][testName] = []; // test name
          }

          result[scenario][testName].push({
            url,
            res,
            file
          });
        }
      });

      resolve(result);
    });
}

module.exports = {
  saveDiffImage,
  getDiffImage,
  saveTestImage,
  getTestImage,
  saveTargetImage,
  getTargetImage,
  getAllTargetImages
};
