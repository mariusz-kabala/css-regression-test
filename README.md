Node.js >= 9.5.0 is required.

How to run web interface
===========================

```
nodemon web/server/index.js
```

How to work with proxy
=========================

Idea is simple: you start a proxy in "record" mode and run `css-regression-tool` in approve mode. It runs through all scenarios and runs all requests in order while proxy saves them to json file.

Then when you have updated your code and want to do regression tests, you start proxy in "replay" mode, providing the same json file. Run `css-regression-tool` through the same proxy, requests should (theoretically) run in the same order. The requests then would be intercepted and served by proxy from JSON and responses should be consistent across several runs.

One issue: FOMO-messages might appear/disappear at differents time depending on test machine/browser speed (i.e. randomly), thus screenshots might be different and tests fail.

Recording session with proxy
=======================

```
node proxy --hosts="localhost:8080/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --record="output.json"
```

or

```
node proxy --hosts="auto1-training-1.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --record="output.json"
```

Then start `css-regression-tool` in approval mode on localhost (or other environment).

```
node index.js -u http://localhost:8080 --run -c -t 0.9 --save json --approve --proxy="localhost:8081"
```

or 

```
node index.js -u https://auto1-training-1.auto1-test.com --run -c -t 0.9 --save json --approve --proxy="localhost:8081"
```

Proxy will intercept and save all requests coming to http(s)://localhost:8080/en/app/* and to http(s)://ux-qa-1.mp.auto1-test.com/v1/* to `output.json` in the order of their execution.

Replaying session with proxy
=======================

```
node proxy --hosts="localhost:8080/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --replay="output.json"
```

or 

```
node proxy --hosts="auto1-training-1.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --replay="output.json"
```

Then start `css-regression-tool` in testing mode. It's requests will be intercepted and results should be consistent accross different runs.

```
node index.js -u http://localhost:8080 --run -c -t 0.9 --save json --formatter json --results --proxy="localhost:8081"
```

or

```
node index.js -u https://auto1-training-1.auto1-test.com --run -c -t 0.9 --save json --formatter json --results --proxy="localhost:8081"
```

How to save HTML report (instead of json)
=========================
```
node index.js --results --save html --formatter html <...other parameters>
```

Report tool uses the same layout as frontend app. If you change view in `web/client/`, run `yarn build-report` to rebuild components for report tool to pick up changes.

Example
======================

```
node proxy --hosts="auto1-training-1.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --record="output1.json"

node index.js -u https://auto1-training-1.auto1-test.com --run -c -t 0.9 --save json --approve --proxy="localhost:8081"

node proxy --hosts="auto1-training-1.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --replay="output1.json"

node index.js -u https://auto1-training-1.auto1-test.com --run -c -t 0.9 --save html --formatter html --results --proxy="localhost:8081"

```

You most likely wouldn't need it: how to setup global OS proxy on Mac (in case you want to debug)
============================================

This package uses https://github.com/joeferner/node-http-mitm-proxy. You will have to install self-signed certificate and make it trusted in order for MITM to work on your system.

At first, start proxy:

```
node proxy --hosts="localhost:8080/en/app/,ux-qa-1.mp.auto1-test.com/v1/" --record="output.json"
```

Then you'll get certificate `./.http-mitm-proxy/certs/ca.pem`. Install it and make it trusted in your OS.

For example on Mac:

Launchpad -> Keychain access -> System / certificates. Drag and drop `ca.pem` to keychain to add. Then double click on it in Keychain. Expand `trust` and set `always trust` for all entries. 

Don't forget to remove it when you are done with proxy!!!

Now you have to use proxy. Again, on Mac:

System preferences -> Network -> Select your adapter -> Advanced -> Proxies

Set Web proxy (http) and Secure web proxy (https) to `localhost` : `8081` (or port that you started proxy on).

Now proxy should be able to intercept traffic.

TODO
========================

1. Integrate proxy into css regression tool
