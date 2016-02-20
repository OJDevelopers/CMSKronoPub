angular.module('cmsAppFirebase.ref', ['firebase', 'cmsApp.config'])
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    'use strict';
    return new $window.Firebase(FBURL);
  }]);
