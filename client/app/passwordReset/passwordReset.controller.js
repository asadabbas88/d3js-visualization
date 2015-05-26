'use strict';

angular.module('Angular-visualization-module')
  .controller('PasswordResetCtrl', function ($scope, $stateParams,$user) {
      var sptoken = $stateParams.sptoken;
      $scope.showVerificationError = false;
      $scope.verifying = false;
      $scope.verified = false;
      $scope.posting = false;
      $scope.reset = false;
      $scope.error = null;

      $scope.resendFailed = false;
      $scope.formModel = {
        password: '',
        confirmPassword: ''
      };

      if(sptoken){
        $scope.verifying = true;
        $user.verifyPasswordResetToken(sptoken)
            .then(function(){
              $scope.verified = true;
            })
            .catch(function(){
              $scope.showVerificationError = true;
            })
            .finally(function(){
              $scope.verifying = false;
            });
      }else{
        $scope.showVerificationError = true;
      }
      $scope.submit = function(){
        if($scope.formModel.password!==$scope.formModel.confirmPassword){
          $scope.error = 'Passwords do not match';
          return;
        }
        $scope.posting = true;
        $scope.error = null;
        $scope.showVerificationError = false;
        $user.resetPassword(sptoken, {password: $scope.formModel.password})
            .then(function(){
              $scope.reset = true;
            })
            .catch(function(response){
              $scope.error = response.data.errorMessage;
            }).finally(function(){
              $scope.posting = false;
            });
      };
  });
