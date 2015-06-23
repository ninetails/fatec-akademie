var $ = require('jquery');
var app = module.exports = require('angular').module('akademie.main.controllers', [])

.controller('DashController', ['$scope', '$localStorage', ($scope, $localStorage) => {
  $scope.storage = $localStorage;
  $scope.init = () => {
    console.log($scope.storage.user);
  };
}])

.controller('MeasureController', ['$scope', '$localStorage', 'MeasureTypes', ($scope, $localStorage, MeasureTypes) => {
  $scope.storage = $localStorage;
  $scope.measure_types = MeasureTypes.all();
}])

.controller('MeasureEditController', ['$ionicHistory', '$state', '$ionicPopup', '$scope', '$stateParams', '$localStorage', 'MeasureTypes', ($ionicHistory, $state, $ionicPopup, $scope, $stateParams, $localStorage, MeasureTypes) => {
  $scope.storage = $localStorage;

  $scope.init = () => {
    $scope.data = {
      when: new Date()
    };
    $scope.measure = MeasureTypes.getById($stateParams.measureId);
    if (!!$scope.storage.user.measure && !!$scope.storage.user.measure[parseInt($stateParams.measureId, 10)]) {
      $scope.data.value = $scope.storage.user.measure[parseInt($stateParams.measureId, 10)];
    }
  };

  $scope.save = () => {
    if (!$scope.data.value || !$scope.data.value.length || !$.isNumeric($scope.data.value.replace(/\,/, '.'))) {
      var popup = $ionicPopup.alert({
        title: 'Input error',
        template: 'Por favor, insira um numero valido.'
      });
      return;
    }

    $scope.data.value = parseInt($scope.data.value, 10);
    console.log($stateParams.measureId, $scope.data.value);
    // $ionicHistory.goBack();
    $state.go('main.measure', {}, {reload:true});
  };
}]);
