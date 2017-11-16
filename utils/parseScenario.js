function getPossibleUrls(scenario) {
  const url = scenario.url;

  if (typeof url === 'string') {
    return [url];
  }

  let variants = [];
  const path = url.path;
  const replaceVar = (path, variable, options) => options.reduce((all, opt) => {
    all.push(path.replace(`{${variable}}`, opt));
    return all;
  }, [])
  const replaceInArr = (variants, data) => {
    let result = [];
    variants.forEach(variant => {
      result = result.concat(replaceVar(variant, ...data));
    });

    return result;
  }

  Object.keys(url.vars).forEach(variable => {
    const options = url.vars[variable];

    if (variants.length === 0) {
      variants = replaceVar(path, variable, options);
    } else {
      variants = replaceInArr(variants, [variable, options]);
    }
  })

  return variants;
}

function parseSingleScenario(scenario) {
  const urls = getPossibleUrls(scenario);

  if (urls.length === 1) {
    scenario.url = urls[0];
    return scenario;
  }

  return urls.reduce((all, url) => {
    all.push(Object.assign({}, scenario, {url}));
    return all;
  }, [])
}

module.exports = function(scenarios) {
  if (Array.isArray(scenarios) === true) {

  } else {
    return parseSingleScenario(scenarios)
  }
}
