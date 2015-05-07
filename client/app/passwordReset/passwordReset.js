'use strict';

angular.module('Angular-visuliztion-module')
  .config(function ($stateProvider) {
    $stateProvider
      .state('passwordReset', {
        url: '/password/reset?sptoken',
        templateUrl: 'app/passwordReset/passwordReset.html',
        controller: 'PasswordResetCtrl'
      });
  });
