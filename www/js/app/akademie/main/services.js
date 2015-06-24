var $ = require('jquery');
var app = module.exports = require('angular').module('akademie.main.services', [])

.service('SyncService', ['$q', '$http', '$localStorage', ($q, $http, $localStorage) => {
  return {
    sync: () => {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var req = {
        method: "POST",
        url: "http://ionic.dev/akademie/sync",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-request-source": "app"
        }
      };
      var data = {};

      data.measures = $localStorage.measures;

      req.data = JSON.stringify(data);

      $http(req)
        .success((data) => {
          if (!!data.error) {
            deferred.reject(data.error.message);
          } else {
            $localStorage.user = data.user;
            deferred.resolve(data);
          }
        })
        .error(() => {
          deferred.reject('Houve um erro ao sincronizar dados.');
          console.log(arguments);
        });

      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };

      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      };

      return promise;
    }
  }
}])

.service('MeasureTypes', () => {
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
})

.service('Measure', ['$q', '$localStorage', ($q, $localStorage) => {
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
}]);
