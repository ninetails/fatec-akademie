module.exports = () => {
  var types = [
      {
        id: 1,
        name: 'height',
        text: 'Altura',
        unit: 'm',
        measurable: false
      },
      {
        id: 2,
        name: 'weight',
        text: 'Peso',
        unit: 'kg',
        measurable: true
      }
    ];
  var filter = (field, value) => {
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
};
