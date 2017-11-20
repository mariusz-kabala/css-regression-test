const loader = require('../../../utils/loader');
const imagesManager = loader.getImagesManager()

async function getTargetImage(req, res) {
  const imageID = req.params.imageID;

  try {
   const image = await imagesManager.getTargetImage(imageID);
   res.contentType('image/png');
   res.send(image);
  } catch (err) {
    console.log(err); // todo better error handling
    res.sendStatus(404);
  }
}

async function getDiffImage(req, res) {
  const testID = req.params.id;
  const imageID = req.params.imageID;

  try {
    const image = await imagesManager.getDiffImage(testID, imageID);
    res.contentType('image/png');
    res.send(image);
  } catch (err) {
    console.log(err); // todo better error handling
    res.sendStatus(404);
  }
}

async function getTestImage(req, res) {
  const testID = req.params.id;
  const imageID = req.params.imageID;

  try {
    const image = await imagesManager.getTestImage(testID, imageID);
    res.contentType('image/png');
    res.send(image);
  } catch (err) {
    console.log(err); // todo better error handling
    res.sendStatus(404);
  }
}

module.exports = {
  getTargetImage,
  getDiffImage,
  getTestImage
}
