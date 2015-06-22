var app = module.exports = require('angular')
  .module('akademie', [
    'ionic',
    'ngCordova',
    'ngStorage',
    require('./users').name,
    require('./main').name
  ])

  .run(['$ionicPlatform', ($ionicPlatform) => {
    $ionicPlatform.ready(() => {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  }])

  .config(require('./config'));
