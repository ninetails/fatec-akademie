var app = module.exports = require('angular').module('akademie.users.controllers', [])

.controller('LogoutController', ['$scope', 'LoginService', '$state', ($scope, LoginService, $state) => {
  LoginService.logout();
  $state.go('users-login');
}])

.controller('LoginController', ['$scope', 'LoginService', '$ionicPopup', '$state', ($scope, LoginService, $ionicPopup, $state) => {
  $scope.data = {};

  $scope.login = function () {
    $('form *').blur();

    if (!$scope.data.username || !$scope.data.password) {
      var popup = $ionicPopup.alert({
        title: 'Erro de login',
        template: 'Por favor, preencha ambos os campos.'
      });
    } else {

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

    }
  };
}])

.controller('SignupController', ['$scope', 'LoginService', '$ionicPopup', '$state', ($scope, LoginService, $ionicPopup, $state) => {
  var fields = ['username', 'password', 'email', 'first_name'];
  $scope.data = {};

  $scope.signup = () => {
    $('form *').blur();

    for (var field of fields) {
      if (!$scope.data[field]) {
        var popup = $ionicPopup.alert({
          title: 'Erro de login',
          template: 'Por favor, preencha todos os campos obrigatorios.'
        });
        return;
      }
    }

    LoginService.signup($scope.data)
      .success((data) => {
        $state.go('index');
      })
      .error((data) => {
        var popup = $ionicPopup.alert({
          title: 'Erro de login',
          template: 'Por favor, verifique suas credenciais.'
        });
      });
  };
}]);
