const loader = require('../../../utils/loader');

module.exports = async function(req, res) {
  const resultsReader = loader.getResultsReader();
  const results = await resultsReader(); // add try/catch here
  res.json(results);
}
