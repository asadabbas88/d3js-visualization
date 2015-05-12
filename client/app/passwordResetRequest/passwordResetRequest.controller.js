'use strict';

angular.module('Angular-visualization-module')
    .controller('PasswordResetRequestCtrl', function ($scope, $user) {
      $scope.sent = false;
      $scope.posting = false;
      $scope.formModel = {
        username: ''
      };
      $scope.requestFailed = false;
      $scope.submit = function () {
        $scope.posting = true;
        $scope.requestFailed = false;
        $user.passwordResetRequest({username: $scope.formModel.username})
            .then(function () {
              $scope.sent = true;
            })
            .catch(function () {
              $scope.requestFailed = true;
              $scope.posting = false;
            });
      };
    });
