module.exports = [
  '$ionicPopup', '$state', '$scope', '$localStorage',
  ($ionicPopup,   $state,   $scope,   $localStorage) => {
    $scope.init = () => {
      $scope.storage = $localStorage;
      $scope.trainings = $scope.storage.trainings.filter((el) => { return moment(el.until).isAfter(moment()); }) || [];
    };

    $scope.newTraining = () => {
      $state.go('main.training-new');
    };

    $scope.trainingCheckin = (training) => {
      console.log(training);
    };
  }
];
