var $ = require('jquery');

var app = module.exports = require('angular').module('akademie.users.services', [])

.service('LoginService', ['$q', '$http', '$localStorage', function ($q, $http, $localStorage) {
  return {
    isLogged: function () {
      return !!$localStorage.user;
    },
    logout: function () {
      $localStorage.$reset();
    },
    login: function (name, pass) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      var req = {
        method: "POST",
        url: "http://ionic.dev/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-request-source": "app"
        },
        data: $.param({
          user: name,
          pass: pass
        })
      };

      $http(req).success((data) => {
        if (!!data.error) {
          deferred.reject(data.error.msg);
        } else {
          $localStorage.user = data.user;
          deferred.resolve(data);
        }
      })
      .error(() => {
        deferred.reject('Wrong credentials.');
        console.error(arguments);
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
  };
}]);