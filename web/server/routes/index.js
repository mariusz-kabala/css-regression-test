const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const scenariosList = require('./scenariosList');
const testRuns = require('./testRuns');
const getTestRun = require('./getTestRun');
const images = require('./images');
const createTestRun = require('./createTestRun')

function createRoutes(app) {
  app.get('/api/v1/scenarios-list', scenariosList);
  app.get('/api/v1/images/targets/:imageID', images.getTargetImage);
  app.get('/api/v1/test-runs/:id/images/:imageID/diff', images.getDiffImage);
  app.get('/api/v1/test-runs/:id/images/:imageID/test', images.getTestImage);
  app.get('/api/v1/test-runs/:id', getTestRun);
  app.post('/api/v1/test-runs/create', jsonParser, createTestRun);
  app.get('/api/v1/test-runs', testRuns);
}

module.exports = createRoutes;
