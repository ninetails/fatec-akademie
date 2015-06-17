var app = module.exports = require('angular').module('akademie.users.controllers', [])

.controller('LoginController', ['$scope', 'LoginService', '$ionicPopup', '$state', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function () {
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
