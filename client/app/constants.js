'use strict';

angular.module('constants', []).constant('CONFIG', {
  // define the constants
  SEARCH_BASE_URL: 'http://119.81.106.34/searchblox/servlet/SearchServlet',
  WORDCLOUD_FACET_SIZE: 100,
  QUESTIONS: ['Q4', 'Q5'],
  COLLECTION_ID: 2,
  PAGE_SIZE: 250
});
