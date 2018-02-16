export default (html, css) => `<!doctype html>
<html>
  <head>
    <title>CSS regression test results</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
  </head>
  <body>
    <div id="root">
      ${html}
    </div>
    <style id="jss-server-side">${css}</style>
  </body>
</html>`;
