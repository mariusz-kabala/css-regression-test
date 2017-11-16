const prettyjson = require('prettyjson');
const colors = require('colors');

module.exports = function(results) {
  console.log("\n");
  return prettyjson.render({
    Total: colors.white(results.length),
    Success: colors.green(results.filter(result => result.status === true).length),
    Fail: colors.red(results.filter(result => result.status === false).length)
  });
}
