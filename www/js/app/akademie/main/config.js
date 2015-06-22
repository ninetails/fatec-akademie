
module.exports = [
  '$stateProvider',
  ($stateProvider) => {
    $stateProvider

      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'templates/main/tabs.html'
      })

      .state('main.dash', {
        url: '/dash',
        views: {
          'main-dash': {
            templateUrl: 'templates/main/tabs-dash.html'
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
        url: '/measure',
        views: {
          'main-measure': {
            templateUrl: 'templates/main/tabs-measure.html'
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

  }
];
