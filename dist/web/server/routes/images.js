'use strict';

var getTargetImage = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var imageID, image;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            imageID = req.params.imageID;
            _context.prev = 1;
            _context.next = 4;
            return imagesManager.getTargetImage(imageID);

          case 4:
            image = _context.sent;

            res.contentType('image/png');
            res.send(image);
            _context.next = 13;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context['catch'](1);

            console.log(_context.t0); // todo better error handling
            res.sendStatus(404);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 9]]);
  }));

  return function getTargetImage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getDiffImage = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var testID, imageID, image;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            testID = req.params.id;
            imageID = req.params.imageID;
            _context2.prev = 2;
            _context2.next = 5;
            return imagesManager.getDiffImage(testID, imageID);

          case 5:
            image = _context2.sent;

            res.contentType('image/png');
            res.send(image);
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](2);

            console.log(_context2.t0); // todo better error handling
            res.sendStatus(404);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[2, 10]]);
  }));

  return function getDiffImage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getTestImage = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var testID, imageID, image;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            testID = req.params.id;
            imageID = req.params.imageID;
            _context3.prev = 2;
            _context3.next = 5;
            return imagesManager.getTestImage(testID, imageID);

          case 5:
            image = _context3.sent;

            res.contentType('image/png');
            res.send(image);
            _context3.next = 14;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3['catch'](2);

            console.log(_context3.t0); // todo better error handling
            res.sendStatus(404);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[2, 10]]);
  }));

  return function getTestImage(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var loader = require('../../../utils/loader');
var imagesManager = loader.getImagesManager();

module.exports = {
  getTargetImage: getTargetImage,
  getDiffImage: getDiffImage,
  getTestImage: getTestImage
};