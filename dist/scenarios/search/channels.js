'use strict';

module.exports = function () {
  return {
    name: 'Channels',
    url: {
      path: '/{lang}/app/merchant/cars',
      vars: {
        lang: ['en', 'de', 'pl']
      }
    },
    tests: [{
      name: '24H Auctions Channel',
      todo: {
        waitForSelector: 'ul.carSearch__list.list-unstyled',
        click: 'li[data-qa_tag=Channel_channels-panel-auctions-first]',
        selector: '.channelsOptions'
      }
    }, {
      name: 'Customer Auction Channel',
      todo: {
        waitForSelector: 'ul.carSearch__list.list-unstyled',
        click: 'li[data-qa_tag=Channel_channels-panel-direct-customer-bid-first]',
        selector: '.channelsOptions'
      }
    }, {
      name: 'Instant Purchase Channel',
      todo: {
        waitForSelector: 'ul.carSearch__list.list-unstyled',
        click: 'li[data-qa_tag=Channel_channels-panel-instant-purchase-first]',
        selector: '.channelsOptions'
      }
    }]
  };
};