var $ = require('jquery');
var app = module.exports = require('angular').module('akademie.main.services', [])

.service('MeasureTypes', ['$q', ($q) => {
  var types = [
      {
        id: 1,
        name: 'height',
        text: 'Altura',
        unit: 'm'
      },
      {
        id: 2,
        name: 'weight',
        text: 'Peso',
        unit: 'kg'
      }
    ],
    filter = (field, value) => {
      return types.filter((el) => {
        return el[field] == value;
      });
    };

  return {
    all: () => {
      return types;
    },
    getById: (id) => {
      var type = filter('id', parseInt(id, 10));

      return !!type.length?type.pop():null;
    },
    getByName: (name) => {
      var type = filter('name', name);

      return !!type.length?type.pop():null;
    }
  };
}]);
