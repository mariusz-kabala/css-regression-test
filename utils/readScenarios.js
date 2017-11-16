const path = require('path');
const fs = require('fs');
const glob = require('glob');
const parseScenario = require('./parseScenario');

const readFilesList = path => new Promise((resolve, reject) => {
  glob(`${path}/**/*.js`, (err, files) => {
    if (err) {
      return reject(err);
    }

    resolve(files);
  })
})

module.exports = function (sceneriosDir = './scenerios') {
  const dirPath = path.join(process.cwd(), sceneriosDir)
  let result = []

  return new Promise(async (resolve, reject) => {
    let files

    try {
      files = await readFilesList(dirPath)
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
