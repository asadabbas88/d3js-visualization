'use strict';

angular.module('Angular-visualization-module', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'stormpath',
  'stormpath.templates',
  'nvd3' ,
  'angular-jqcloud' ,
  'ngTable',
  'search.service',
  'constants',
  'underscore',
  'ui.bootstrap',             // AngularJS native directives for Bootstrap
  'angular-flot',             // Flot chart
  'angles',                   // Chart.js
  'angular-peity',            // Peity (small) charts
  'cgNotify',                 // Angular notify
  'angles',                   // Angular ChartJS
  'ngAnimate',                // Angular animations
  'ui.map',                   // Ui Map for Google maps
  'ui.calendar',              // UI Calendar
  'summernote',               // Summernote plugin
  'ngGrid',                   // Angular ng Grid
  'ui.tree',                  // Angular ui Tree
  'bm.bsTour',                // Angular bootstrap tour
  'datatables',               // Angular datatables plugin
  'xeditable',                // Angular-xeditable
  'ui.select',                // AngularJS ui-select
  'ui.sortable'               // AngularJS ui-sortable
])
  .config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $urlRouterProvider
      .otherwise('/login');

    $locationProvider.html5Mode(true);
  })

  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'home'
    });
  });
