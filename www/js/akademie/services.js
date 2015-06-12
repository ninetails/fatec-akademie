angular.module('akademie.services', [])

.factory('userLogged', function () {
  var logged = false;

  return {
    is_logged: function () {
      return logged;
    } ,
    login: function () {
      logged = true;
    } ,
    logout: function () {
      logged = true;
    }
  };
});