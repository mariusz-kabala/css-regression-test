const getJson = require('./json');
const render = require('../../dist/templates/render');
module.exports = function(results, id, imagePath) {
  return render(id, JSON.parse(getJson(results)), imagePath);
}
