module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('users-logout', {
        url: "/logout",
        resolve: {
          load: ['$q', '$location', 'LoginService', function ($q, $location, LoginService) {
            var deferred = $q.defer();
            deferred.resolve();

            LoginService.logout();
            $location.path('/login');

            return deferred.promise;
          }]
        }
      })

      .state('users-login', {
        url: "/login",
        templateUrl: 'templates/users/login.html',
        controller: 'LoginController'
      });

  }
];