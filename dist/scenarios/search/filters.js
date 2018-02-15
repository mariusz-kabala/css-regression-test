'use strict';

module.exports = function () {
  return {
    name: 'Filters',
    url: {
      path: '/{lang}/app/merchant/cars',
      vars: {
        lang: ['en']
      }
    },
    tests: [{
      name: 'Location filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=FilterLocation]'
      }
    }, {
      name: 'Manufacturers filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__ManufacturersFilter]'
      }
    }, {
      name: 'Promotios filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterPromotios]'
      }
    }, {
      name: 'First Registration filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FirstRegistration]'
      }
    }, {
      name: 'Mileage filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__Mileage]'
      }
    }, {
      name: 'Body Types filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterBodyTypes]'
      }
    }, {
      name: 'Equipment filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterEquipment]'
      }
    }, {
      name: 'Fuel Types filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterFuelTypes]'
      }
    }, {
      name: 'Color filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterColor]'
      }
    }, {
      name: 'Power filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__Power]'
      }
    }, {
      name: 'Doors filter',
      todo: {
        waitForSelector: '.carFilters',
        selector: 'div[data-qa_tag=carFilters__box__FilterDoors]'
      }
    }]
  };
};