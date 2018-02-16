"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (html, css) {
  return "<!doctype html>\n<html>\n  <head>\n    <title>CSS regression test results</title>\n    <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Lato\">\n  </head>\n  <body>\n    <div id=\"root\">\n      " + html + "\n    </div>\n    <style id=\"jss-server-side\">" + css + "</style>\n  </body>\n</html>";
};

module.exports = exports["default"];