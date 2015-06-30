module.exports = [
  '$ionicPopup', '$state', '$scope', '$localStorage', 'MeasureTypes', 'Measure',
  ($ionicPopup,   $state,   $scope,   $localStorage,   MeasureTypes,   Measure) => {
    $scope.init = () => {
      $scope.data = {};
      $scope.storage = $localStorage;
      $scope.measures = [];

      for (var measureId in $scope.storage.user.measure) {
        var measure = MeasureTypes.getById(measureId);
        if (!measure.measurable) {
          continue;
        }

        $scope.measures.push({
          id: measureId,
          name: measure.text,
          value: $scope.storage.user.measure[measureId]
        });
      }
    };

    $scope.create = () => {
      // validation
      if (!$scope.data.name) {
        var popup = $ionicPopup.alert({
          title: 'Input error',
          template: 'Por favor, insira o nome do treino.'
        });
        return;
      }
      if (!$scope.data.until || $scope.data.until < new Date()) {
        var popup = $ionicPopup.alert({
          title: 'Input error',
          template: 'Por favor, insira a data de termino do treino.'
        });
        return;
      }
      if (!$scope.data.objective) {
        var popup = $ionicPopup.alert({
          title: 'Input error',
          template: 'Por favor, insira pelo menos um objetivo.'
        });
        return;
      }

      // some other data
      $scope.data.created_at = new Date();

      // saving
      if (!$localStorage.trainings) {
        $localStorage.trainings = [];
      }
      $localStorage.trainings.push($scope.data);

      $state.go('main.dash');
    };
  }
];
