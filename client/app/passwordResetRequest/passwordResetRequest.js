'use strict';

angular.module('Angular-visualization-module')
  .config(function ($stateProvider) {
    $stateProvider
      .state('passwordResetRequest', {
        url: '/password/requestReset',
        templateUrl: 'app/passwordResetRequest/passwordResetRequest.html',
        controller: 'PasswordResetRequestCtrl'
      });
  });