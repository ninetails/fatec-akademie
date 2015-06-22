var checkConnection = () => {
  load: ['$ionicPopup', ($ionicPopup) => {
    if (window.Connection && navigator.connection.type == Connection.NONE) {
      $ionicPopup.confirm({
          title: "Internet Disconnected",
          content: "Voce esta offline."
        })
        .then((result) => {
          if (!result) {
            ionic.Platform.exitApp();
          }
        });
    }
  }]
};

module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  ($stateProvider, $urlRouterProvider) => {
    $stateProvider

      .state('users-logout', {
        url: "/logout",
        resolve: {
          load: ['$q', '$location', 'LoginService', ($q, $location, LoginService) => {
            var deferred = $q.defer();
            deferred.resolve();

            LoginService.logout();
            $location.path('/login');

            return deferred.promise;
          }]
        }
      })

      .state('users-login', {
        url: "/login",
        templateUrl: 'templates/users/login.html',
        controller: 'LoginController',
        resolve: checkConnection()
      })

      .state('users-signup', {
        url: "/signup",
        templateUrl: 'templates/users/signup.html',
        controller: 'SignupController',
        resolve: checkConnection()
      });

  }
];
