'use strict';

/**
 * @ngdoc overview
 * @name cmsApp
 * @description
 * # cmsApp
 *
 * Main module of the application.
 */
angular
  .module('cmsApp', [
    'ui.router',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',

    //Material Designe
    'lumx',

    //firebase
    'firebase',
    'cmsAppFirebase.ref',
    'cmsApp.auth',

    //Controllers
    'cmsApp.Main',
    'cmsApp.Productos',
    'cmsApp.Login'
  ])
  .constant("FormatResponse", function (Objeto) {
      var Keys = Object.keys(Objeto);
      var Respuesta = [];

      for (var i = 0; i < Keys.length; i++){
          var modelo = Objeto[Keys[i]];
          modelo.id = Keys[i];
          Respuesta.push(modelo)
      }

      return Respuesta;
  })
  .config(function ($routeProvider, $stateProvider, $urlRouterProvider) {
      $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })

           .when('/productos/:idStore', {
               templateUrl: 'views/productos.html',
               controller: 'productosCtrl'
           })

          .when('/about', {
              templateUrl: 'views/about.html',
              controller: 'AboutCtrl',
              controllerAs: 'about'
          })

        .otherwise({
            redirectTo: '/'
        });
  }).
  run(function ($rootScope, $location) {
      $rootScope.$on("$routeChangeStart", function (event, next, current) {
          if ($rootScope.loggedInUser == null || $rootScope.loggedInUser == false || $rootScope.loggedInUser == undefined) {
              // no logged user, redirect to /login
              var token = localStorage["authToken"];

              if (token == "" || token == undefined || token == null || token == "undefined" || token == "null"){
                window.location.href = 'login.html';
              }
              else {
                  $rootScope.loggedInUser = true;
                  var usuario = JSON.parse(localStorage["userInfo"]);

                  var keys = Object.keys(usuario);

                  $rootScope.UserAuth = usuario[keys[0]];
                  $rootScope.UserAuth.id = keys[0];
              }
          }
      });
  });
