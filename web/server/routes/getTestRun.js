module.exports = function(req, res) {
  const testID = req.params.id;
  res.json(req.params);
}
