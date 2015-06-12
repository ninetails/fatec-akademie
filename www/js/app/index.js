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

function loadBrowser() {
  global.app = app = require('./akademie')(['ngStorage']);
  angular.bootstrap(document, 'akademie');
}

function loadIonic() {
  global.app = app = require('./akademie')(['ionic', 'ngCordova', 'ngStorage']);
  angular.bootstrap(document, 'akademie');
}
