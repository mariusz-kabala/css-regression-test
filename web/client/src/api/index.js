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

export const createNewTestRun = data => new Promise((resolve, reject) => {
  fetch(`/api/v1/test-runs/create`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});

export const fetchCurrentlyRunningProcesses = () => new Promise((resolve, reject) => {
  fetch('/api/v1/running/now', {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});

export const fetchProcessDetails = id => new Promise((resolve, reject) => {
  fetch(`/api/v1/running/${id}`, {method: 'get'})
    .then(response => response.json())
    .then(json => resolve(json))
    .catch(error => reject(error));
});
