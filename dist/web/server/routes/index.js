'use strict';

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var scenariosList = require('./scenariosList');
var testRuns = require('./testRuns');
var getTestRun = require('./getTestRun');
var images = require('./images');
var createTestRun = require('./createTestRun');
var running = require('./running');
var runningNow = require('./runningNow');

function createRoutes(app) {
  app.get('/api/v1/scenarios-list', scenariosList);
  app.get('/api/v1/images/targets/:imageID', images.getTargetImage);
  app.get('/api/v1/test-runs/:id/images/:imageID/diff', images.getDiffImage);
  app.get('/api/v1/test-runs/:id/images/:imageID/test', images.getTestImage);
  app.get('/api/v1/test-runs/:id', getTestRun);
  app.post('/api/v1/test-runs/create', jsonParser, createTestRun);
  app.get('/api/v1/test-runs', testRuns);
  app.get('/api/v1/running/now', runningNow);
  app.get('/api/v1/running/:id', running);
}

module.exports = createRoutes;