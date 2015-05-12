/**
 * Created by asad on 4/18/15.
 */
(function () {
  'use strict';

  angular.module('Angular-visuliztion-module').controller('HomeCtrl', function ($scope, $http, ngTableParams, $timeout, searchService, _, CONFIG, $user) {

    $scope.showExportButtons = false;
    $scope.isViewer = false;

    for(var i = 0; i < $user.currentUser.groups.length; i++) {
      if($user.currentUser.groups[i].name == 'Viewer') {
        $http.get('/api/user/directory?href=' + $user.currentUser.directory.href).success(function (directory) {
          sessionStorage.setItem(
              'collectionId',
              directory.customData.collectionId
          );

          init();
        });
        $scope.isViewer = true;
        break;
      }
    }

    function init() {
      initializeQuestions();
      initializeDivisions();
    }

    function initializeQuestions() {
      $scope.listOfQuestions = CONFIG.QUESTIONS;
    }

    function initializeDivisions() {
      searchService.getAllDivisions()
          .success(function (res) {
            angular.forEach(res.facets, function (val) {
              if (val['@name'] === 'division') {
                $scope.divisions = _.pluck(val.int, '@name');
              }
            });
          })
          .error(function (err) {
            console.log(err);
          });
    }

    $scope.selectQuestion = function () {
      getResponses(1);
    };

    $scope.selectDivision = function () {
      if (!_.isEmpty($scope.questionSelected)) {
        getResponses(1);
      }
    };

    $scope.clearQuestionFilter = function () {
      $scope.filterQuestion = '';
      getResponses(1);
    };

    $scope.clearSentimentFilter = function () {
      $scope.filterSentiment = '';
      getResponses(1);
    };

    function getResponses(pageNumber) {

      $scope.showExportButtons = false;
      searchService.getResponses($scope.questionSelected, $scope.divisionSelected, pageNumber, CONFIG.PAGE_SIZE, $scope.filterQuestion, $scope.filterSentiment)
          .success(function (response) {
            $scope.result = response.results.result;
            setWordCloudAndPieChart(response);
            $scope.responseTableParams.page(1);
            $scope.responseTableParams.reload();
            $scope.showExportButtons = true;
          })
          .error(function (err) {
            console.log('Error:' + err);
          });
    }

    $scope.responseTableParams = new ngTableParams({
      page: 1,            // show first page
      count: 10           // count per page
    }, {
      $scope: $scope,
      total: 0, // length of data
      getData: function ($defer, params) {
        if (angular.isDefined($scope.result) && $scope.result.length > 0) {
          params.total($scope.result.length);
          var pageData = $scope.result.slice((params.page() - 1) * params.count(), params.page() * params.count());
          $defer.resolve(_.pluck(pageData, $scope.questionSelected));
        }
      }
    });

    function setWordCloudAndPieChart(response) {
      angular.forEach(response.facets, function (val) {
        if (val['@name'] === $scope.questionSelected + '.sentiment') {
          pieChartFunc(val.int, val['@count']);
        }
        if (val['@name'] === $scope.questionSelected) {
          wordCloudObj(val.int);
        }
      });
    }

    var pieChartFunc = function (obj, amount) {
      $scope.options = {};
      $scope.data = [];
      /* Chart data */
      if (angular.isArray(obj)) {
        angular.forEach(obj, function (val, k) {
          $scope.data.push({key: val['@name'], y: val['#text'] / amount * 100});
        });
      } else if (angular.isDefined(obj)) {
        $scope.data.push({key: obj['@name'], y: obj['#text'] / amount * 100});
      }
      var getColors = function (data) {
        var colors = [];
        angular.forEach(data, function (obj) {
          if (obj['key'] === 'positive') {
            colors.push('green');
          }
          if (obj['key'] === 'negative') {
            colors.push('#f44');
          }
          if (obj['key'] === 'neutral') {
            colors.push('#c7c7c7');
          }
        });
        return colors;
      };
      /* Chart options */
      $scope.options = {
        chart: {

          type: 'pieChart',
          height: 387,
          x: function (d) {
            return d.key;
          },
          y: function (d) {
            return d.y;
          },
          color: getColors($scope.data),
          showLabels: true,
          transitionDuration: 500,
          labelThreshold: 0.01,
          legend: {
            margin: {
              top: 0,
              right: -150,
              bottom: 0,
              left: 0
            }
          },
          pie: {
            dispatch: {
              elementClick: function (e) {
                $scope.filterSentiment = e.label;
                $scope.$apply();
                getResponses(1);
              }
            }
          }
        }
      };

    };

    var wordCloudObj = function (obj) {
      $scope.word = [];
      $scope.colors = ["#bb4e11", "#52041b", "#ba7b18", "#a13a17", "#4e0310", "#bb2b11", "#a1191a"];
      angular.forEach(obj, function (v, k) {
        if (v) {
          $scope.word.push({
            'text': v['@name'], weight: v['#text'],
            handlers: {
              click: function () {
                $scope.filterQuestion = v['@name'];
                getResponses(1);
              }
            }
          });
        }
      });
    };

    $scope.exportPieChartAsImage = function (type) {

      $('#chart').find('svg').height('100%').width('100%');

      var myDiv = $('#chart');
      var blob = new Blob([(new XMLSerializer).serializeToString(myDiv[0])],
          {type: "image/png;charset=" + document.characterSet});

      saveAs(blob, "chart." + type);
    };

    $scope.exportWordCloudAsImage = function (type) {
      html2canvas($('#wordCloud')).then(function (canvas) {
        Canvas2Image.saveAsImage(canvas, 500, 400, type);
      }, function (error) {
        console.log(error);
      });
    };

  });
}());
