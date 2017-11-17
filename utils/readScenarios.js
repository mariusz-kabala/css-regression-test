const glob = require('glob');
const parseScenario = require('./parseScenario');
const constants = require('../constants');

const readFilesList = path => new Promise((resolve, reject) => {
  glob(`${path}/**/*.js`, (err, files) => {
    if (err) {
      return reject(err);
    }

    resolve(files);
  })
})

module.exports = function (sceneriosDir=constants.SCENARIOS_DIR) {
  let result = []

  return new Promise(async (resolve, reject) => {
    let files

    try {
      files = await readFilesList(sceneriosDir)
    } catch (e) {
      return reject(e)
    }

    files.forEach(file => {
      let scenario
      try {
        scenario = require(file)
      } catch (e) {
        console.error('Invalid scenario file', file, e)
        return
      }

      if (typeof scenario === 'function') {
        result = result.concat(parseScenario(scenario()))
      } else if (typeof scenario === 'object' && scenario !== null) {
        result = result.concat(parseScenario(scenario))
      }
    })

    resolve(result)
  })
}
