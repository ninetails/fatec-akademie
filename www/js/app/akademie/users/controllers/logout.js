module.exports = [
  '$scope', 'LoginService', '$state',
  ($scope,   LoginService,   $state) => {
    LoginService.logout();
    $state.go('users-login');
  }
];
