'use strict';

var app = angular.module('search.service', []);

app.factory('searchService', function($http, CONFIG, _) {

  var searchService = {

    getAllDivisions: function(){
      var collecionId = sessionStorage.getItem('collectionId');
      return $http.get(CONFIG.SEARCH_BASE_URL + '?facet=true&col=' + collecionId + '&query=*&facet.field=division&pagesize=0&f.division.size=1000');
    },

    getResponses: function(question,division,pageNumber,pageSize,filterQuestion,filterSentiment){
      var collecionId = sessionStorage.getItem('collectionId');

      var url = CONFIG.SEARCH_BASE_URL + '?facet=true&col=' + collecionId + '&query=*&pagesize='+pageSize+'&page='+pageNumber+'&downloadAsZipAlone=true';
      if ( !_.isEmpty(question) ){
        url += '&facet.field=' + question + '&f.' + question + '.size=' + CONFIG.WORDCLOUD_FACET_SIZE;
        url += '&facet.field=' + question + '.sentiment';
      }
      if ( !_.isEmpty(division) ){
        url += '&facet.field=division&f.division.filter=' + division ;
      }
      if ( !_.isEmpty(filterQuestion) ){
        url += '&f.'+question+'.filter=' + filterQuestion ;
      }
      if ( !_.isEmpty(filterSentiment) ){
        url += '&f.'+question+'.sentiment.filter=' + filterSentiment ;
      }
      console.log(url);
      return $http.get(url);
    }
  };
  return searchService;
});
