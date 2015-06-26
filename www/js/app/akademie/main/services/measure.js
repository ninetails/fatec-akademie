module.exports = [
  '$q', '$localStorage',
  ($q,   $localStorage) => {
    $localStorage.measures = !!$localStorage.measures ? $localStorage.measures : [];
    $localStorage.user.measure = !!$localStorage.user.measure ? $localStorage.user.measure : {};

    var filter = (field, value) => {
        return $localStorage.measures.filter((el) => {
          return el[field] == value;
        });
      };

    return {
      all: () => {
        return $localStorage.measures;
      },
      byType: (typeId) => {
        return filter('type_id', typeId);
      },
      add: (typeId, value, when) => {
        var now = new Date();
        $localStorage.measures.push({
          type_id: parseInt(typeId, 10),
          value: value,
          when: when || now,
          created_at: now
        });

        $localStorage.user.measure[typeId] = value;
      }
    };
  }
];
