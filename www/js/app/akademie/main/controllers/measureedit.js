module.exports = [
  '$ionicHistory', '$state', '$ionicPopup', '$scope', '$stateParams', '$localStorage', 'MeasureTypes', 'Measure',
  ($ionicHistory,   $state,   $ionicPopup,   $scope,   $stateParams,   $localStorage,   MeasureTypes,   Measure) => {
    $scope.storage = $localStorage;

    $scope.init = () => {
      $scope.data = {
        value: !!$scope.storage.user.measure[$stateParams.measureId] ? $scope.storage.user.measure[$stateParams.measureId] : null,
        when: new Date()
      };

      $scope.measure = MeasureTypes.getById($stateParams.measureId);
      if (!!$scope.storage.user.measure && !!$scope.storage.user.measure[parseInt($stateParams.measureId, 10)]) {
        $scope.data.value = $scope.storage.user.measure[parseInt($stateParams.measureId, 10)];
      }

      $scope.measures = Measure.byType($stateParams.measureId);
    };

    $scope.save = () => {
      var value = $scope.data.value.toString() || null;
      if (!value || !value.length || !$.isNumeric(value.replace(/\,/, '.'))) {
        var popup = $ionicPopup.alert({
          title: 'Input error',
          template: 'Por favor, insira um numero valido.'
        });
        return;
      }

      value = parseFloat(value.replace(/\,/, '.'));
      Measure.add($stateParams.measureId, value, $scope.data.when);
      // $ionicHistory.goBack();
      $state.go('main.measure');
    };

    $scope.formatDate = (date) => {
      return moment(date).format('DD/MM/YYYY');
    };
  }
];
