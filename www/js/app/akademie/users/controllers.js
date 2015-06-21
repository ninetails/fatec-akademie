var app = module.exports = require('angular').module('akademie.users.controllers', [])

.controller('LogoutController', ['$scope', 'LoginService', '$state', function($scope, LoginService, $state) {
  LoginService.logout();
  $state.go('users-login');
}])

.controller('LoginController', ['$scope', 'LoginService', '$ionicPopup', '$state', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function () {
    $('form *').blur();
    LoginService.login($scope.data.username, $scope.data.password)
      .success(function (data) {
        $state.go('index');
      })
      .error(function (data) {
        var popup = $ionicPopup.alert({
          title: 'Erro de login',
          template: 'Por favor, verifique suas credenciais.'
        });
      });
  };
}]);
