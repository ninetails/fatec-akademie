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

      .state('main.training', {
        url: '/training',
        views: {
          'main-training': {
            templateUrl: 'templates/main/tabs-training.html'
          }
        }
      })

      .state('main.measure', {
        cache: false,
        url: '/measure',
        views: {
          'main-measure': {
            templateUrl: 'templates/main/tabs-measure.html',
            controller: 'MeasureController'
          }
        }
      })

      .state('main.measure-edit', {
        cache: false,
        url: '/measure/:measureId',
        views: {
          'main-measure': {
            templateUrl: 'templates/main/tabs-measure-edit.html',
            controller: 'EditMeasureController'
          }
        }
      })

      .state('main.settings', {
        url: '/settings',
        views: {
          'main-settings': {
            templateUrl: 'templates/main/tabs-settings.html'
          }
        }
      });

      // .state('main-dash', {
      //   url: "/dash",
      //   templateUrl: 'templates/main/dash.html',
      //   // controller: 'LoginController'
      // })

      // .state('main-measures', {
      //   url: "/measures",
      //   templateUrl: 'templates/main/measures.html',
      //   // controller: 'SignupController'
      // });

  $urlRouterProvider.otherwise('/main/dash');

  }
];
