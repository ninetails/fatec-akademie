module.exports = [
  '$ionicPopup', '$scope', '$localStorage', 'SyncService',
  ($ionicPopup,   $scope,   $localStorage,   SyncService) => {
    $scope.init = () => {
      console.log($localStorage);
    };

    $scope.sync = () => {
      SyncService.sync()
        .success((data) => {
          if (!!data.error) {
            var popup = $ionicPopup.alert({
              title: 'Sync',
              template: 'Houve um erro ao tentar sincronizar os dados com o servidor.'
            });
            return;
          }

          var popup = $ionicPopup.alert({
            title: 'Sync',
            template: 'Seus dados foram sincronizados com sucesso.'
          });
        });
    };

  }
];
