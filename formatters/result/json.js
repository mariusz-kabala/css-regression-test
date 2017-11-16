module.exports = function(data) {
  return {
    scenario: data.scenario,
    testName: data.testName,
    url: data.url,
    fileName: data.fileName,
    viewport: data.viewport,
    status: data.status,
    misMatchPercentage: data.misMatchPercentage
  }
}
