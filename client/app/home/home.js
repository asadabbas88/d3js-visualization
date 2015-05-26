'use strict';

angular.module('Angular-visualization-module')
    .config(function ($stateProvider) {
      $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            sp: {
              waitForUser: true,
              authenticate: true
            }
          });
    });
