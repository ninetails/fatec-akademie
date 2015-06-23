var $ = require('jquery');
var app = module.exports = require('angular').module('akademie.main.controllers', [])

.controller('DashController', ['$scope', '$localStorage', ($scope, $localStorage) => {
  $scope.storage = $localStorage;
  $scope.init = () => {
    console.log($scope.storage.user);
  };
}])

.controller('MeasureController', ['$scope', '$localStorage', 'measure_types', ($scope, $localStorage, measure_types) => {
  $scope.storage = $localStorage;
  $scope.measure_types = measure_types;
}])

.controller('MeasureEditController', ['$ionicHistory', '$state', '$ionicPopup', '$scope', '$stateParams', '$localStorage', 'measure_types', ($ionicHistory, $state, $ionicPopup, $scope, $stateParams, $localStorage, measure_types) => {
  $scope.storage = $localStorage;

  $scope.data = {};

  if (!!$scope.storage.user.measure && !!$scope.storage.user.measure[parseInt($stateParams.measureId, 10)]) {
    $scope.data.value = $scope.storage.user.measure[parseInt($stateParams.measureId, 10)];
  }

  $scope.measure = measure_types.filter((el) => {
    return el.name = $stateParams.measureId;
  }).pop();

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
