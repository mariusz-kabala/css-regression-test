const scenariosList = require('./scenariosList');
const testRuns = require('./testRuns');
const getTestRun = require('./getTestRun');

function createRoutes(app) {
  app.get('/api/v1/scenarios-list', scenariosList);
  app.get('/api/v1/test-runs/:id', getTestRun);
  app.get('/api/v1/test-runs', testRuns);
}

module.exports = createRoutes;
