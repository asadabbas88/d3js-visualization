'use strict';

angular.module('Angular-visuliztion-module')
  .controller('NavbarCtrl', function ($scope, $location, $auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.logout = function() {
      sessionStorage.setItem('collectionId', '');
      $auth.endSession();
    }
  });