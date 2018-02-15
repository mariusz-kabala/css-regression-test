'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storage = require('../../../logsPersistentStorage/file');

var ProcessesManager = function () {
  function ProcessesManager() {
    _classCallCheck(this, ProcessesManager);

    this.processes = {};
    this.ioInstance = null;
    this.logsReader = null;
  }

  _createClass(ProcessesManager, [{
    key: 'generateProcessId',
    value: function generateProcessId() {
      var id = Date.now();

      while (typeof this.processes[id] !== 'undefined') {
        id = '' + id + Math.random().toString(36);
      }

      this.processes[id] = {};

      return id;
    }
  }, {
    key: 'add',
    value: function add(info) {
      var id = this.generateProcessId();

      this.processes[id] = info;

      this.ioInstance.emit('processes', {
        running: Object.keys(this.processes).length
      });

      return id;
    }
  }, {
    key: 'remove',
    value: function remove(id) {
      storage.saveInfo(id, this.processes[id]);
      delete this.processes[id];

      this.ioInstance.emit('processes', {
        running: Object.keys(this.processes).length
      });
    }
  }, {
    key: 'list',
    value: function list() {
      var _this = this;

      return Object.keys(this.processes).reduce(function (all, id) {
        all.push(_extends({}, _this.processes[id], { id: id }));
        return all;
      }, []);
    }
  }, {
    key: 'has',
    value: function has(id) {
      return typeof this.processes[id] !== 'undefined';
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this.processes[id];
    }
  }, {
    key: 'io',
    set: function set(io) {
      this.ioInstance = io;

      this.ioInstance.on('connection', function (socket) {
        console.log('a user connected');
      });
    }
  }]);

  return ProcessesManager;
}();

module.exports = new ProcessesManager();