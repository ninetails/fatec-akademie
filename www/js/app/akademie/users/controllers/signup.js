module.exports = [
  '$scope', 'LoginService', '$ionicPopup', '$state',
  ($scope,   LoginService,   $ionicPopup,   $state) => {
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
          $state.go('main.dash');
        })
        .error((data) => {
          var popup = $ionicPopup.alert({
            title: 'Erro de login',
            template: 'Por favor, verifique suas credenciais.'
          });
        });
    };
  }
];
