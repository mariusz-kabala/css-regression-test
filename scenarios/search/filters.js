module.exports = function() {
  return {
    id: 2,
    name: 'Filters',
    url: {
      path: '/{lang}/app/merchant/cars',
      vars: {
        lang: [
          'en',
        ]
      }
    },
    tests: [
      {
        id: 4,
        name: 'Location filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=FilterLocation]'
        }
      },
      {
        id: 5,
        name: 'Manufacturers filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__ManufacturersFilter]'
        }
      },
      {
        id: 6,
        name: 'Promotios filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterPromotios]'
        }
      },
      {
        id: 7,
        name: 'First Registration filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FirstRegistration]'
        }
      },
      {
        id: 8,
        name: 'Mileage filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__Mileage]'
        }
      },
      {
        id: 9,
        name: 'Body Types filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterBodyTypes]'
        }
      },
      {
        id: 10,
        name: 'Equipment filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterEquipment]'
        }
      },
      {
        id: 11,
        name: 'Fuel Types filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterFuelTypes]'
        }
      },
      {
        id: 12,
        name: 'Color filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterColor]'
        }
      },
      {
        id: 13,
        name: 'Power filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__Power]'
        }
      },
      {
        id: 14,
        name: 'Doors filter',
        todo: {
          waitForSelector: '.carFilters',
          selector: 'div[data-qa_tag=carFilters__box__FilterDoors]'
        }
      },
    ]
  }
}
