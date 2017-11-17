const loader = require('../../../utils/loader');

module.exports = async function(req, res) {
  const testID = req.params.id;
  const testRunReader = loader.getSingleResultReader();
  let testRun;

  try {
    testRun = await testRunReader(testID);
  } catch (e) {
    // todo throw 500 here
  }

  if (testRun === null) {
    // todo throw 404 here
  }

  res.json(testRun);
}
