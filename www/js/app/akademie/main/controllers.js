var $ = require('jquery');
var moment = require('moment');
var app = module.exports = require('angular').module('akademie.main.controllers', [])

.controller('DashController', ['$ionicPopup', '$state', '$scope', '$localStorage', 'SyncService', ($ionicPopup, $state, $scope, $localStorage, SyncService) => {
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
}])

.controller('MeasureController', ['$scope', '$localStorage', 'MeasureTypes', 'Measure', ($scope, $localStorage, MeasureTypes, Measure) => {
  $scope.storage = $localStorage;

  $scope.getMeasure = (id) => {
    id = parseInt(id, 10);
    return !!$scope.storage.user.measure[id] ? $scope.storage.user.measure[id] : null;
  };

  $scope.measure_types = MeasureTypes.all();
}])

.controller('EditMeasureController', ['$ionicHistory', '$state', '$ionicPopup', '$scope', '$stateParams', '$localStorage', 'MeasureTypes', 'Measure', ($ionicHistory, $state, $ionicPopup, $scope, $stateParams, $localStorage, MeasureTypes, Measure) => {
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
    console.log($scope.measures);
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
}])

.controller('CreateTrainingController', ['$scope', '$localStorage', 'MeasureTypes', 'Measure', ($scope, $localStorage, MeasureTypes, Measure) => {
  $scope.storage = $localStorage;
  $scope.measures = $scope.storage.user.measure || null;
}]);
