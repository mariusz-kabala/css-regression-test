const constants = require('../constants');
const fs = require('fs');

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

module.exports = {
  saveDiffImage,
  getDiffImage,
  saveTestImage,
  getTestImage,
  saveTargetImage,
  getTargetImage
};
