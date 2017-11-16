module.exports = function(reporter) {
  return {
    reportProgress(data) {
      if (
        typeof reporter === 'object' &&
        reporter !== null &&
        typeof reporter.tick === 'function'
      ) {
        reporter.tick(data);
      }
    },
    startReport(counter) {
      if (
        typeof reporter === 'object' &&
        reporter !== null &&
        typeof reporter.start === 'function'
      ) {
        reporter.start(counter+1);
      }
    }
  };
}
