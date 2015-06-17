module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('users-login', {
        url: "/login",
        templateUrl: 'templates/users/login.html',
        controller: 'LoginController'
      });

  }
];