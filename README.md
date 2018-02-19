Node.js >= 9.5.0 is required.

How to run web interface
===========================

```
nodemon web/server/index.js
```

How to save HTML report (instead of json)
=========================
```
node index.js --results --save html --formatter html <...other parameters>
```

Report tool uses the same layout as frontend app. If you change view in `web/client/`, run `yarn build-report` to rebuild components for report tool to pick up changes.

How to work with proxy in default mode
========================

By default `css-regression-tool` is able to run MITM proxy and intercept/rewrite requests from fake-api JSON file.

Idea is simple: you run `css-regression-tool` in approve mode and it starts MITM proxy to record requests to specified domains. It runs through all scenarios and runs all requests in correct order while proxy saves them to json file.

Then when you have updated your code and want to do regression tests, you run `css-regression-tool` in test mode providing the same JSON file. Requests should (theoretically) run in the same order. They would be intercepted and served by proxy from JSON and responses should be consistent across several runs.

One issue: FOMO-messages might appear/disappear at different time depending on test machine/browser speed (i.e. randomly), thus screenshots might be different and tests fail.

Example usage:

1. Generate fake-api data and initial screenshots (approve mode).
`--hosts` -- list of hostnames to intercept
`--port` -- port of the MITM proxy, default is 8081
`--api` -- file to write fake-api data to. In this case it is `output4.json`

```
node index.js -u https://auto1-training-1.auto1-test.com --run -c -t 0.9 --save json --approve --port=8081 --api=output4.json --hosts="auto1-training-1.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/"
```

2. When you made changes to your code and deployed it somewhere (or locally), run `css-regression-tool` in test mode. Provide the same `output4.json` as before to have consistent results. Note that now `hosts` include `css-regression-demo-auto1-qa-4.auto1-test.com` instead of `auto1-training-1.auto1-test.com`

```
node index.js -u https://css-regression-demo-auto1-qa-4.auto1-test.com --run -c -t 0.01 --save html --formatter html --results --port=8081 --api=output4.json --hosts="css-regression-demo-auto1-qa-4.auto1-test.com/en/app/,ux-qa-1.mp.auto1-test.com/v1/"
```

Report will be saved to html file in `reports` folder.

How to work with proxy in stand-alone mode
=========================

Proxy is able to work as a standalone app. 

Recording session with proxy in stand-alone mode
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

Replaying session with proxy in stand-alone mode
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

Example in stand-alone mode
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


