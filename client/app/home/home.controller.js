/**
 * Created by asad on 4/18/15.
 */
(function () {
  'use strict';

  angular.module('Angular-visualization-module').controller('HomeCtrl', function ($rootScope, $scope, $http, ngTableParams, $timeout, searchService, _, CONFIG, $user, $filter) {

    $scope.showExportButtons = false;
    
    for(var i = 0; i < $user.currentUser.groups.length; i++) {
	    if($user.currentUser.groups[i].name == 'Viewer') {
	        $scope.isViewer = true;
	    	sessionStorage.setItem(
	                'isViewer',
	                true
	            );
	        break;
	     }
	}
	$http.get('/api/user/directory?href=' + $user.currentUser.directory.href).success(function (directory) {
	            sessionStorage.setItem(
	                'collectionId',
	                directory.customData.collectionId
	            );
	            sessionStorage.setItem(
	                'logoUrl',
	                directory.customData.logoUrl
	            );
	            $rootScope.logourl = sessionStorage.getItem('logoUrl');
	            init();
    });

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
      filterDelay: 0,
      getData: function ($defer, params) {
        if (angular.isDefined($scope.result) && $scope.result.length > 0) {

          var comments = [];
          angular.forEach(_.pluck($scope.result, $scope.questionSelected), function(val) {
            comments.push({
              'comment': val
            })
          });
          //  console.log(comments);
          var filteredData = params.filter() ?
              $filter('filter')(comments, params.filter()) :
              comments;

          params.total(filteredData.length);
          //  console.log(params.total, filteredData);
          var pageData = filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count());
          //console.log(pageData);
            $defer.resolve(pageData);

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

    function appendElement(form, name, value){
        var element = document.createElement('input'); //input element, text
        element.setAttribute('type', 'hidden');
        element.setAttribute('name', name);
        element.value = value;
        form.appendChild(element);
	}

	function appendSubmitElement(form){
        var element = document.createElement('input'); //input element, text
        element.setAttribute('type', 'submit');
        element.setAttribute('value', 'Submit');
        form.appendChild(element);
	}

    $scope.exportPieChartAsImage = function (type) {
        var form = document.createElement('form');
        form.setAttribute('method','post');
        form.setAttribute('action','/api/export');
        appendElement(form,'html', '<style>body {background-color: white; }</style>' + $('#chart').html());
        var style = window.getComputedStyle(document.getElementById('chart'));
        appendElement(form, 'width', style.getPropertyValue('width').replace('px',''));
        appendElement(form, 'format', type);
        appendElement(form, 'filename', 'chart');
        appendSubmitElement(form);
        document.getElementsByTagName('body')[0].appendChild(form);
        form.submit();
        form.remove();
    };

    $scope.exportWordCloudAsImage = function (type) {
    	var form = document.createElement("form");
		form.setAttribute('method',"post");
		form.setAttribute('action',"/api/export");

		/** Adds jqcloud css **/
		var css = '<style>body {background-color: white; } div.jqcloud {   overflow: hidden;   position: relative; } div.jqcloud span {   padding: 0; } /* fonts */ div.jqcloud {   font-family: "Helvetica", "Arial", sans-serif;   font-size: 10px;   line-height: normal; } div.jqcloud a {   font-size: inherit;   text-decoration: none; } div.jqcloud span.w10 { font-size: 550%; } div.jqcloud span.w9 { font-size: 500%; } div.jqcloud span.w8 { font-size: 450%; } div.jqcloud span.w7 { font-size: 400%; } div.jqcloud span.w6 { font-size: 350%; } div.jqcloud span.w5 { font-size: 300%; } div.jqcloud span.w4 { font-size: 250%; } div.jqcloud span.w3 { font-size: 200%; } div.jqcloud span.w2 { font-size: 150%; } div.jqcloud span.w1 { font-size: 100%; } /* colors */ div.jqcloud { color: #09f; } div.jqcloud a { color: inherit; } div.jqcloud a:hover { color: #0df; } div.jqcloud a:hover { color: #0cf; } div.jqcloud span.w10 { color: #0cf; } div.jqcloud span.w9 { color: #0cf; } div.jqcloud span.w8 { color: #0cf; } div.jqcloud span.w7 { color: #39d; } div.jqcloud span.w6 { color: #90c5f0; } div.jqcloud span.w5 { color: #90a0dd; } div.jqcloud span.w4 { color: #90c5f0; } div.jqcloud span.w3 { color: #a0ddff; } div.jqcloud span.w2 { color: #99ccee; } div.jqcloud span.w1 { color: #aab5f0; }</style>';
		appendElement(form,'html', css + $('#wordCloud').html());
		var style = window.getComputedStyle(document.getElementById('chart'));
		appendElement(form, 'width', style.getPropertyValue('width').replace('px',''));
		appendElement(form, 'format', type);
		appendElement(form, 'filename', 'wordcloud');
		appendSubmitElement(form);

		document.getElementsByTagName('body')[0].appendChild(form);
		form.submit();
		form.remove();
    };

  });
}());
