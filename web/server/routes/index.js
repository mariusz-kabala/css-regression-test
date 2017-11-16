const testsList = require('./testsList');

function createRoutes(app) {
  app.get('/api/v1/scenarios-list', testsList);
}

module.exports = createRoutes;
