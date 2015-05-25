'use strict';

angular.module('Angular-visualization-module')
    .controller('LoginCtrl', function ($scope, $auth, $http,$user) {

      $scope.formModel = {
        username: '',
        password: ''
      };
      $scope.posting = false;
      $scope.submit = function(){
        $scope.posting = true;
        $scope.error = null;
        $auth.authenticate($scope.formModel)
            .then(function(){
                sessionStorage.setItem(
                    'isViewer',
                    false
                );
                for(var i = 0; i < $user.currentUser.groups.length; i++) {
                    if($user.currentUser.groups[i].name == 'Viewer') {
                        $http.get('/api/user/directory?href=' + $user.currentUser.directory.href).success(function (directory) {
                            sessionStorage.setItem(
                                'collectionId',
                                directory.customData.collectionId
                            );
                            sessionStorage.setItem(
                                'logoUrl',
                                directory.customData.logoUrl
                            );
                            sessionStorage.setItem(
                                'isViewer',
                                true
                            );
                        });
                        $scope.isViewer = true;
                        break;
                    }
                }
             })
            .catch(function(response){
              $scope.posting = false;
              $scope.error = response.data.errorMessage;
            });
      };

    });
