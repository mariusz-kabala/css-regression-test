'use strict';

module.exports = {
  viewports: [{
    name: 'desktop',
    width: 1680,
    height: 900
  }, {
    name: 'desktop-small',
    width: 800,
    height: 600
  }],
  authenticate: {
    username: 'wkda',
    password: 'mehrAutos'
  },
  getCookie: function getCookie() {
    return {
      url: '/en/merchant/signin',
      todo: [{
        action: 'waitForSelector',
        value: 'form[name=user_signin]'
      }, {
        action: 'fill',
        value: {
          field: '#login-email',
          value: 'test@auto1.com'
        }
      }, {
        action: 'fill',
        value: {
          field: '#login-password',
          value: '11auto11'
        }
      }, {
        action: 'submit',
        value: 'button[type=submit].btn-primary'
      }]
    };
  }
};