const getJson = require('./json');
const render = require('../../dist/templates/render');
module.exports = function(id, results) {
  return render(id, results);
}
