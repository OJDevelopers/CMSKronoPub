'use strict';

/**
 * @ngdoc function
 * @name cmsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cmsApp
 */
angular.module('cmsApp.Main', ['cmsApp.StoresService'])
  .controller('MainCtrl', function ($scope, $rootScope, Stores) {
      $scope.stores = [];

      var OnSuccess = function (Data) {
          $scope.stores = Data;
          $scope.$apply();
      }

      Stores.getAll(OnSuccess);
  })


