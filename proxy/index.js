const proxy = require('./proxy');
const program = require('commander');
const logger = require('../utils/logger');

program
  .version('0.0.1')
  .option('-p, --port [value]', 'Port to run proxy on', 8081)
  .option('-h, --hosts [value]', 'List of hosts to intercept data from')
  .option('-e, --excludes [value]', 'List of strings to exclude')
  .option('--record [value]', 'Record session to file')
  .option('--replay [value]', 'Replay session from file')
  .parse(process.argv);

(async () => {
  const port = program.port;
  let hosts = [], excludes = [];
  
  if (!!program.hosts) {
    hosts = program.hosts.split(',');
  }

  if(hosts.length <= 0) {
    logger.error('Please provide valid --hosts');
    process.exit();
  }

  if (!!program.excludes) {
    excludes = program.excludes.split(',');
  }
  
  if(typeof program.record !== 'undefined') {
    proxy.record(program.record, logger, port, hosts, excludes);
  } else if(typeof program.replay !== 'undefined') {
    proxy.replay(program.replay, logger, port, hosts, excludes);
  } else {
    logger.error('Please provide either "--record filename" or "--replay filename"');
  }

})();
