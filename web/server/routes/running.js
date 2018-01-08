const pm = require('../lib/processesManager');
const LogsReader = require('../../../logsStoreReader/file');

module.exports = async function(req, res) {
  const id = req.params.id;
  let info;

  if (pm.has(id) === true) {
    info = pm.get('id');
  }

  const logsReader = new LogsReader();
  const logs = await logsReader.get(id);

  if (typeof info !== 'undefined') {
    logs['info'] = info;
  }

  res.json(logs);
}
