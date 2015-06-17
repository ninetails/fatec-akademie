var app = module.exports = require('angular').module('akademie.users.services', [])

.service('LoginService', ['$q', '$http', function ($q, $http) {
  return {
    login: function (name, pass) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (name === 'user' && pass === 'secret') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }

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
  };
}]);