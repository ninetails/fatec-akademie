var resolveIfLogged = () => {
  return {
    load: ['$q', '$location', 'LoginService', ($q, $location, LoginService) => {
      var deferred = $q.defer();
      if (LoginService.isLogged()) {
        deferred.resolve();
        $location.path('/main/dash');
      } else {
        $location.path('/login');
      }

      return deferred.promise;
    }]
  };
};

module.exports = [
  '$stateProvider', '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider

      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'templates/main/tabs.html',
        resolve: resolveIfLogged()
      })

      .state('main.dash', {
        url: '/dash',
        views: {
          'main-dash': {
            templateUrl: 'templates/main/tabs-dash.html',
            controller: 'DashController'
          }
        }
      })

      .state('main.training-new', {
        url: '/training/new',
        views: {
          'main-dash': {
            templateUrl: 'templates/main/training/form.html',
            controller: 'TrainingCreateController'
          }
        }
      })

      // .state('main.training-new', {
      //   url: '/training/:trainId',
      //   views: {
      //     'main-dash': {
      //       templateUrl: 'templates/main/training/form.html',
      //       controller: 'TrainingCreateController'
      //     }
      //   }
      // })

      .state('main.measure', {
        url: '/measure',
        views: {
          'main-measure': {
            templateUrl: 'templates/main/tabs-measure.html',
            controller: 'MeasureController'
          }
        }
      })

      .state('main.measure-edit', {
        url: '/measure/:measureId',
        views: {
          'main-measure': {
            templateUrl: 'templates/main/tabs-measure-edit.html',
            controller: 'MeasureEditController'
          }
        }
      })

      .state('main.settings', {
        url: '/settings',
        views: {
          'main-settings': {
            templateUrl: 'templates/main/tabs-settings.html',
            controller: 'SettingsController'
          }
        }
      });

  $urlRouterProvider.otherwise('/main/dash');

  }
];
