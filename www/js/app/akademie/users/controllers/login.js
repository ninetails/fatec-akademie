module.exports = [
  '$scope', 'LoginService', '$ionicPopup', '$state',
  ($scope,   LoginService,   $ionicPopup,   $state) => {
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
            $state.go('main.dash');
          })
          .error(function (data) {
            var popup = $ionicPopup.alert({
              title: 'Erro de login',
              template: 'Por favor, verifique suas credenciais.'
            });
          });

      }
    };
  }
];
