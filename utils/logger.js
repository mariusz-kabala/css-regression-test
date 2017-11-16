const colors = require('colors');

module.exports = {
  info() {
    console.log(colors.green('[INFO]'), ...arguments)
  },
  debug() {
    console.log(colors.blue('[DEBUG]'), ...arguments)
  },
  error() {
    console.error(colors.blue('[ERROR]'), ...arguments)
  }
}
