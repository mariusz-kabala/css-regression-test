'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fetchScenariosList = exports.fetchScenariosList = function fetchScenariosList() {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/scenarios-list', { method: 'get' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var fetchTestRunsList = exports.fetchTestRunsList = function fetchTestRunsList() {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/test-runs', { method: 'get' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var fetchTestDetails = exports.fetchTestDetails = function fetchTestDetails(testID) {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/test-runs/' + testID, { method: 'get' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var createNewTestRun = exports.createNewTestRun = function createNewTestRun(data) {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/test-runs/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var fetchCurrentlyRunningProcesses = exports.fetchCurrentlyRunningProcesses = function fetchCurrentlyRunningProcesses() {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/running/now', { method: 'get' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};

var fetchProcessDetails = exports.fetchProcessDetails = function fetchProcessDetails(id) {
  return new Promise(function (resolve, reject) {
    fetch('/api/v1/running/' + id, { method: 'get' }).then(function (response) {
      return response.json();
    }).then(function (json) {
      return resolve(json);
    }).catch(function (error) {
      return reject(error);
    });
  });
};