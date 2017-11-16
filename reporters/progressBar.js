const ProgressBar = require('progress');
const prettyjson = require('prettyjson');

module.exports = {
  start(counter) {
    this.bar = new ProgressBar(
      '[:bar] :percent :elapsed s',
      { total: counter, width: 100 }
    )
  },
  tick(data) {
    if (data !== null && typeof data !== 'undefined') {
      this.bar.interrupt(
        typeof data === 'string' ? data : prettyjson.render(data)
      );

      if (typeof data !== 'string') {
        this.bar.interrupt('------------------');
      }
    }

    this.bar.tick();
  }
}
