module.exports = [
  '$q', '$http', '$localStorage', 'server_url',
  ($q,   $http,   $localStorage,   server_url) => {
    return {
      sync: () => {
        var deferred = $q.defer();
        var promise = deferred.promise;
        var req = {
          method: "POST",
          url: server_url + "/akademie/sync",
          headers: {
            "x-request-source": "app"
          }
        };
        var data = {};

        data.user = $localStorage.user;
        data.measures = !!$localStorage.measures ? $localStorage.measures.filter((el) => { return !el._id; }) : [];
        data.trainings = !!$localStorage.trainings ? $localStorage.trainings.filter((el) => { return !el._id; }) : [];
        data.checkins = !!$localStorage.checkins ? $localStorage.checkins.filter((el) => { return !el._id; }) : [];

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
