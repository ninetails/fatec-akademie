module.exports = [
  '$ionicPopup', '$state', '$scope', '$localStorage', 'SyncService',
  ($ionicPopup,   $state,   $scope,   $localStorage,   SyncService) => {
    $scope.storage = $localStorage;
    $scope.init = () => {
      console.log($scope.storage);
    };

    $scope.newTraining = () => {
      $state.go('main.training-new');
    };

    $scope.sync = () => {
      SyncService.sync()
        .success((data) => {
          console.log(data);
          var popup = $ionicPopup.alert({
            title: 'Sync',
            template: 'Seus dados foram sincronizados com sucesso.'
          });
        });
    };
  }
];
