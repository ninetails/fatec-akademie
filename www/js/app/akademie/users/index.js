var app = module.exports = require('angular').module('akademie.users', ['ionic', 'ngCordova', 'ngStorage'])

.factory('user.log', [() => {
  var state = null;

  return {
    login: () => {
      console.log('logging...');
      state = !state;
    },
    is_logged: () => {
      return !!state;
    }
  };
}])

.controller('LoginController', ['$scope', function($scope) {
  console.log('LoginController yay!');
}]);
