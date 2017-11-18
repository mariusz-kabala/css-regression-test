export const fetchScenariosList = () => new Promise((resolve, reject) => {
  fetch('/api/v1/scenarios-list', {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});

export const fetchTestRunsList = () => new Promise((resolve, reject) => {
  fetch('/api/v1/test-runs', {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});

export const fetchTestDetails = testID => new Promise((resolve, reject) => {
  fetch(`/api/v1/test-runs/${testID}`, {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});
