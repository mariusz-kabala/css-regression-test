const readScenarios = require('../../../utils/readScenarios');
const constants = require('../../../constants');
const imagesReader = require('../../../images/file');

function parseScenarios(scenarios) {
  const result = [];
  const findScenario = scenario => {
    for (let x = 0; x < result.length; x += 1) {
      if (result[x].name === scenario.name) {
        return x;
      }
    }

    return -1;
  };

  const hasTest = (test, testsList) => {
    for (let x = 0; x < testsList.length; x += 1) {
      if (testsList[x].name === test.name) {
        return true;
      }
    }

    return false;
  };

  scenarios.forEach(scenario => {
    let index = findScenario(scenario);

    if (index === -1) {
      index = result.push({
        name: scenario.name,
        urls: [scenario.url],
        tests: []
      }) - 1;
    } else if (result[index].urls.indexOf(scenario.url) === -1) {
      result[index].urls.push(scenario.url);
    }

    if (Array.isArray(scenario.tests) === true) {
      scenario.tests.forEach(testCase => {
        if (hasTest(testCase, result[index].tests) === false) {
          result[index].tests.push(testCase)
        }
      });
    }
  });

  return result;
}

function mergeScenariosAndImages(scenarios, images) {
  scenarios.forEach(scenario => {
    scenario.tests.forEach(test => {
      test.images = [];

      if (
        typeof images[scenario.name] !== 'undefined' &&
        images[scenario.name][test.name] !== 'undefined'
      ) {
        test.images = images[scenario.name][test.name];
      }
    });
  });

  return scenarios;
}

async function getListOfTestScenarios(req, res) {
  const scenarios = await readScenarios(constants.SCENARIOS_DIR);
  const images = await imagesReader.getAllTargetImages();
  res.json(
    mergeScenariosAndImages(
      parseScenarios(scenarios),
      images
    )
  );
}

module.exports = getListOfTestScenarios;
