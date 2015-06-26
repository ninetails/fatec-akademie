module.exports = [
  '$q', '$http', '$localStorage',
  ($q,   $http,   $localStorage) => {
    return {
      sync: () => {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
          method: "POST",
          url: "http://ionic.dev/akademie/sync",
          headers: {
            "x-request-source": "app"
          }
        };
        var data = {};

        data.measures = $localStorage.measures;

        req.data = JSON.stringify(data);

        $http(req)
          .success((data) => {
            if (!!data.error) {
              deferred.reject(data.error);
            } else {
              console.log(data);
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
  }
];
