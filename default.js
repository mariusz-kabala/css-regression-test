module.exports = {
  viewports: [
    {
      name: 'desktop',
      width: 1680,
      height: 900
    },
    {
      name: 'desktop-small',
      width: 800,
      height: 600
    }
  ],
  authenticate: {
    username: 'wkda',
    password: 'mehrAutos'
  },
  getCookie: () => {
    return [
      {
        action: 'url',
        value: '/en/merchant/signin'
      },
      {
        action: 'waitForSelector',
        value: 'form[name=user_signin]'
      },
      {
        action: 'fill',
        value: {
          field: '#login-email',
          value: 'test@auto1.com'
        }
      },
      {
        action: 'fill',
        value: {
          field: '#login-password',
          value: '11auto11'
        }
      },
      {
        action: 'submit',
        value: 'form[name=user_signin]'
      }
    ];
  }
}
