'use strict';

angular.module('Angular-visuliztion-module', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'stormpath',
  'stormpath.templates',
  'nvd3' ,
  'angular-jqcloud' ,
  'ngTable',
  'search.service',
  'constants',
  'underscore'
])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
  })

  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'home'
    });
  });
