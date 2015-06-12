var $ = require('jquery');
var angular = require('angular');
var app;

$(() => {
  let script = document.createElement('script');
  script.onerror = loadBrowser;
  script.onload = loadIonic;
  document.getElementsByTagName('body')[0].appendChild(script);
  script.src = "cordova.js";
});

module.exports = global.app = app = require('./akademie')(['ionic', 'ngCordova', 'ngStorage']);

function loadBrowser() {
  app.constant('env', 'browser');
}

function loadIonic() {
  app.constant('env', 'ionic');
}
