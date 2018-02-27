function isXHR(ctx) {
  return (ctx.proxyToServerRequestOptions.headers['x-requested-with']
    && ctx.proxyToServerRequestOptions.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest')
}

module.exports = {
  isXHR
}
