'use strict';

angular.module('Angular-visualization-module')
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
      sessionStorage.setItem('logoUrl', '');
      $auth.endSession();
      $location.path('/login');
    }
  });