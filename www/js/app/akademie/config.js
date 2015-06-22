var resolveIfLogged = () => {
  return {
    load: ['$q', '$location', 'LoginService', ($q, $location, LoginService) => {
      var deferred = $q.defer();
      if (LoginService.isLogged()) {
        deferred.resolve();
        $location.path('/main/dash');
      } else {
        $location.path('/login');
      }

      return deferred.promise;
    }]
  };
};

module.exports = [
  '$urlRouterProvider',
  ($urlRouterProvider) => {

    $urlRouterProvider.otherwise('/main/dash');

  }
];