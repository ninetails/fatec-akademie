angular.module('akademie.controllers', [])

.controller('UserController', function($scope, $location, userLogged) {
  if (!userLogged.is_logged()) {
    $location.path('/login');
  }
});