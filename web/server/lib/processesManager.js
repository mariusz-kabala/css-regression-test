const storage = require('../../../logsPersistentStorage/file');

class ProcessesManager {
  constructor() {
    this.processes = {};
    this.ioInstance = null;
    this.logsReader = null;
  }

  set io(io) {
    this.ioInstance = io;

    this.ioInstance.on('connection', socket => {
      console.log('a user connected');
    });
  }

  generateProcessId() {
    let id = Date.now();

    while (typeof this.processes[id] !== 'undefined') {
      id = `${id}${Math.random().toString(36)}`;
    }

    this.processes[id] = {};

    return id;
  }

  add(info) {
    const id = this.generateProcessId();

    this.processes[id] = info;

    this.ioInstance.emit('processes', {
      running: Object.keys(this.processes).length
    });

    return id;
  }

  remove(id) {
    storage.saveInfo(id, this.processes[id]);
    delete this.processes[id];

    this.ioInstance.emit('processes', {
      running: Object.keys(this.processes).length
    });
  }

  list() {
    return Object.keys(this.processes).reduce((all, id) => {
      all.push(Object.assign({},
        this.processes[id],
        {id}
      ));
      return all;
    }, []);
  }

  has(id) {
    return typeof this.processes[id] !== 'undefined';
  }

  get(id) {
    return this.processes[id];
  }
}

module.exports = new ProcessesManager();
