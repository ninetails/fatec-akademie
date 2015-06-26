module.exports = [
  '$scope', '$localStorage', 'MeasureTypes', 'Measure',
  ($scope,   $localStorage,   MeasureTypes,   Measure) => {
    $scope.storage = $localStorage;
    $scope.measures = $scope.storage.user.measure || null;
  }
]