'use strict';

angular.module('Angular-visualization-module')
    .controller('LoginCtrl', function ($scope, $auth) {

      $scope.formModel = {
        username: '',
        password: ''
      };
      $scope.posting = false;
      $scope.submit = function(){
        $scope.posting = true;
        $scope.error = null;
        $auth.authenticate($scope.formModel)
            .catch(function(response){
              $scope.posting = false;
              $scope.error = response.data.errorMessage;
            });
      };

    });
