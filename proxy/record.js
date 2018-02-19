const Proxy = require('http-mitm-proxy');
const StringDecoder = require('string_decoder').StringDecoder;
const forceGzip = require('./middleware/forceGzip');
const isXHR = require('./common').isXHR;
const fs = require('fs');

let interceptedRequests = [], globalReqId = 0;

function setupInterceptionRecord(ctx, outputFilename, reqId) {
  const url = ctx.clientToProxyRequest.headers.host + ctx.clientToProxyRequest.url;
  
  const responseDecoder = new StringDecoder('utf8');
  const requestDataDecoder = new StringDecoder('utf8');
  const result = {
    host: ctx.clientToProxyRequest.headers.host,
    url: ctx.clientToProxyRequest.url,
    method: ctx.clientToProxyRequest.method,
    request: {
      body: '',
      headers: ctx.clientToProxyRequest.headers,
      time: 0
    },
    response: {
      data: '',
      statusCode: 0,
      headers: []
    }
  }

  const requestStartTime = Date.now().valueOf();

  ctx.onRequestData(function(ctx, chunk, callback) {
    result.request.body += requestDataDecoder.write(chunk);
    return callback(null, chunk);
  });

  ctx.onRequestEnd(function(ctx, callback) {
    result.request.body += requestDataDecoder.end();
    return callback();
  });

  ctx.onResponseData(function(ctx, chunk, callback) {
    result.response.data += responseDecoder.write(chunk);
    return callback(null, chunk);
  });

  ctx.onResponseEnd(function(ctx, callback) {
    result.response.data += responseDecoder.end();
    result.response.statusCode = ctx.serverToProxyResponse.statusCode;
    result.response.headers = ctx.serverToProxyResponse.headers;
    result.time = Date.now().valueOf() - requestStartTime;
    interceptedRequests[reqId] = result;
    fs.writeFileSync(outputFilename, JSON.stringify(interceptedRequests, null, 2));
    return callback();
  });
}

function record(outputFilename, logger, port = 8081, hosts = [], excludes = []) {
  const proxy = Proxy();
  proxy.use(forceGzip); // always use Gzip, prevent Brotli or other unsupported compression

  proxy.onError(function(ctx, err) {
    // todo
  });
  
  proxy.onRequest(function(ctx, callback) {
    const url = ctx.clientToProxyRequest.headers.host + ctx.clientToProxyRequest.url;
    
    for(let i = 0; i < hosts.length; i++) {
      if(url.indexOf(hosts[i]) !== -1 && isXHR(ctx)) {
        logger.info('intercepted request', url);
        
        setupInterceptionRecord(ctx, outputFilename, globalReqId);
        globalReqId++;
        logger.info('total requests', globalReqId);
        break;
      }
    }
    
    return callback();
  });

  proxy.listen({ port, silent: true });
  logger.info(`Recording proxy started on port ${port}`);
  return proxy;
}

module.exports = record;
