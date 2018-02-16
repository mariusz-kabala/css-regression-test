'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var OPEN_GENERATE_NEW_TARGET_POPUP = exports.OPEN_GENERATE_NEW_TARGET_POPUP = 'open-generate-new-target-popup';
var CLOSE_GENERATE_NEW_TARGET_POPUP = exports.CLOSE_GENERATE_NEW_TARGET_POPUP = 'open-generate-new-target-popup';

var openGenerateNewTargetPopup = exports.openGenerateNewTargetPopup = function openGenerateNewTargetPopup() {
  return {
    type: OPEN_GENERATE_NEW_TARGET_POPUP
  };
};

var closeGenerateNewTargetPopup = exports.closeGenerateNewTargetPopup = function closeGenerateNewTargetPopup() {
  return {
    type: CLOSE_GENERATE_NEW_TARGET_POPUP
  };
};