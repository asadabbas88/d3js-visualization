'use strict';

angular.module('Angular-visuliztion-module')
  .controller('MainCtrl', function ($scope, $http, $user) {
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $user.get()
      .then(function (user) {
        console.log('The current user is', user);

        $http.get('/api/user/directory?href=' +  user.directory.href).success(function(directory) {
          console.log(directory);
          sessionStorage.setItem(
              'collectionId',
              directory.customData.collectionId
          );
        });

      })
      .catch(function (error) {
        console.log('Error getting user', error);
      });

  });
