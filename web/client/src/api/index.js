export const fetchScenariosList = () => new Promise((resolve, reject) => {
  fetch('/api/v1/scenarios-list', {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
})
