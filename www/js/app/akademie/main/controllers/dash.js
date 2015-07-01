module.exports = [
  '$window', '$ionicPopup', '$state', '$scope', '$localStorage', 'Training',
  ($window,   $ionicPopup,   $state,   $scope,   $localStorage,   Training) => {
    $scope.init = () => {
      $scope.storage = $localStorage;
      $scope.trainings = Training.getActives();
      console.log($scope.trainings);
    };

    $scope.newTraining = () => {
      $state.go('main.training-new');
    };

    $scope.trainingCheckin = (training) => {
      console.log(training);
    };

    $scope.trainingDelete = (training) => {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Voce tem certeza?',
        template: "Deseja mesmo desistir deste treino?"
      });

      confirmPopup.then((res) => {
        if (res) {
          Training.remove(training) && $window.location.reload(true);
        }
      });
    };
  }
];
