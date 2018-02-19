const Proxy = require('http-mitm-proxy');
const StringDecoder = require('string_decoder').StringDecoder;
const forceGzip = require('./middleware/forceGzip');
const isXHR = require('./common').isXHR;
const fs = require('fs');

let interceptedRequests = [];

function setupInterceptionReplay(logger, ctx) {
  
  const host = ctx.clientToProxyRequest.headers.host; 
  const url = ctx.clientToProxyRequest.url;
  
  const requestDataDecoder = new StringDecoder('utf8');

  const result = {
    host: ctx.clientToProxyRequest.headers.host,
    url: ctx.clientToProxyRequest.url,
    method: ctx.clientToProxyRequest.method,
    request: {
      body: '',
      headers: ctx.clientToProxyRequest.headers
    }
  }

  ctx.onRequestData(function(ctx, chunk, callback) {
    result.request.body += requestDataDecoder.write(chunk);
    return callback(null, chunk);
  });

  ctx.onRequestEnd(function(ctx, callback) {
    result.request.body += requestDataDecoder.end();
    let tmpRequests = [], successfullyIntercepted = false;
    while(interceptedRequests.length > 0) {
      // now we will find corresponding entry in saved data
      // we don't check for host, but check whether request url and request body and method are equal to intercepted ones
      // so it's not 100% fail-safe
      // if requests are coming in different order (other than expected), this might provide unpredictable results :)      
      // todo: improve

      const request = interceptedRequests.shift();
      // console.log(url); // uncomment if something goes wrong with requests
      // console.log(request.url);
      // console.log(url === request.url);

      // console.log(result.request.body);
      // console.log(request.request.body);
      // console.log(result.request.body === request.request.body);

      // console.log(result.method);
      // console.log(request.method);
      // console.log(result.method === request.method);
      if(url === request.url && result.request.body === request.request.body && result.method === request.method) {
        logger.info('intercepted and will be rewritten!!!', url);
        logger.info(`number of requests left in stack ${interceptedRequests.length}`);
        
        ctx.proxyToClientResponse.socket && ctx.proxyToClientResponse.socket.pause && ctx.proxyToClientResponse.socket.pause();
        ctx.proxyToServerRequest.socket && ctx.proxyToServerRequest.socket.pause && ctx.proxyToServerRequest.socket.pause();

        ((request) => setTimeout(function() {
          ctx.proxyToClientResponse.socket && ctx.proxyToClientResponse.socket.unpause && ctx.proxyToClientResponse.socket.unpause();
          ctx.proxyToServerRequest.socket && ctx.proxyToServerRequest.socket.unpause && ctx.proxyToServerRequest.socket.unpause();
          ctx.proxyToServerRequest.end && ctx.proxyToServerRequest.end();

          ctx.proxyToClientResponse.writeHead(request.response.statusCode, request.response.headers);
          ctx.proxyToClientResponse.end(request.response.data);
        }, request.time))(request); // emulate network latency

        tmpRequests = tmpRequests.concat(interceptedRequests);
        successfullyIntercepted = true;
        break;
      } else {
        tmpRequests.push(request); // in case for some reason request came in wrong order, save it to tmp array, don't discard it
      }

    }

    interceptedRequests = tmpRequests; // push all not processed requests back to the original queue

    return successfullyIntercepted
      ? undefined // no callback() so proxy request is not sent to the server
      : callback();
  });

}

function replay(inputFilename, logger, port = 8081, hosts = [], excludes = []) {
  interceptedRequests = JSON.parse(fs.readFileSync(inputFilename, { encoding:'utf8' }), null, 2);
  logger.info(`Loaded ${interceptedRequests.length} requests`);
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
        setupInterceptionReplay(logger, ctx);
        break;
      }
    }
    
    return callback();
  });

  
  proxy.listen({ port, silent: true });
  logger.info(`Replaying proxy started on port ${port}`);
}

module.exports = replay;
