var app = module.exports = require('angular').module('akademie', ['ionic', 'ngCordova', 'ngStorage', 'akademie.users'])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('index', {
      url: "/",
      templateUrl: 'templates/index.html',
      controller: 'IndexController'
    })

    .state('users.login', {
      url: "/login",
      templateUrl: 'templates/users/login.html',
      controller: 'LoginController'
    });

  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/tab/dash');
  $urlRouterProvider.otherwise('/');

}])

.controller('IndexController', ['$scope', '$state', '$location', 'user.log', function($scope, $state, $location, userLog) {
  if (userLog.is_logged()) {
    console.log('logged!');
  } else {
    $location.path('/login');
  }
}]);
