const readScenarios = require('../../../utils/readScenarios');
const constants = require('../../../constants');

async function getListOfTestScenarios(req, res) {
  const scenarios = await readScenarios(constants.SCENARIOS_DIR);

  res.json(scenarios);
}

module.exports = getListOfTestScenarios;
