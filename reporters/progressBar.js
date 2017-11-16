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
    this.bar.tick();

    if (typeof data === 'object' && data !== null) {
      this.bar.interrupt(prettyjson.render(data));
      this.bar.interrupt('------------------');
    }
  }
}
