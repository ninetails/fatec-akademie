module.exports = [
  '$q', '$http', '$localStorage', 'server_url',
  ($q,   $http,   $localStorage,   server_url) => {
    return {
      isLogged: () => {
        return !!$localStorage.user;
      },
      logout: () => {
        $localStorage.$reset();
      },
      signup: (data) => {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
          method: "POST",
          url: server_url + "/signup",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-request-source": "app"
          },
          data: $.param(data)
        };

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
            deferred.reject('Houve um erro ao tentar cadastrar.');
            console.log(arguments);
          });

        promise.success = (fn) => {
          promise.then(fn);
          return promise;
        };

        promise.error = (fn) => {
          promise.then(null, fn);
          return promise;
        };

        return promise;
      },
      login: (name, pass) => {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
          method: "POST",
          url: server_url + "/login",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-request-source": "app"
          },
          data: $.param({
            user: name,
            pass: pass
          })
        };

        $http(req)
          .success((data) => {
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
  }
];
