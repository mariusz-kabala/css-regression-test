module.exports = function(results) {
  return JSON.stringify({
    summary: {
      Total: results.length,
      Success: results.filter(result => result.status === true).length,
      Fail: results.filter(result => result.status === false).length
    },
    details: results
  });
}
