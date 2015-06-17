module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('index', {
        url: "/",
        templateUrl: 'templates/index.html',
        controller: 'IndexController'
      });

    $urlRouterProvider.otherwise('/login');

  }
];