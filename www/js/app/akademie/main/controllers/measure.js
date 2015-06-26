module.exports = [
  '$scope', '$localStorage', 'MeasureTypes', 'Measure',
  ($scope,   $localStorage,   MeasureTypes,   Measure) => {
    $scope.storage = $localStorage;

    $scope.getMeasure = (id) => {
      id = parseInt(id, 10);
      return !!$scope.storage.user.measure[id] ? $scope.storage.user.measure[id] : null;
    };

    $scope.measure_types = MeasureTypes.all();
  }
];
