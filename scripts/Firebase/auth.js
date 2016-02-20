(function () {
    'use strict';
    angular.module('cmsApp.auth', ['firebase', 'cmsAppFirebase.ref'])

      .factory('Auth', function ($firebaseAuth, Ref) {
          return $firebaseAuth(Ref);
      });
})();
