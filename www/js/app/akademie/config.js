var resolveIfLogged = function () {
  return {
    load: ['$q', '$location', 'LoginService', function ($q, $location, LoginService) {
      var deferred = $q.defer();
      if (LoginService.isLogged()) {
        deferred.resolve();
        $location.path('/tabs/dash');
      } else {
        $location.path('/login');
      }

      return deferred.promise;
    }]
  };
};

module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        url: "/",
        templateUrl: 'templates/index.html',
        resolve: resolveIfLogged()
      });

    $urlRouterProvider.otherwise('/');

  }
];