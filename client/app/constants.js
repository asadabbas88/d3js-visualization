'use strict';

angular.module('constants', []).constant('CONFIG', {
  // define the constants
  SEARCH_BASE_URL: 'http://45.55.207.128:8080/searchblox/servlet/SearchServlet',
  WORDCLOUD_FACET_SIZE: 100,
  QUESTIONS: ['Q1','Q2','Q3','Q4', 'Q5','Q6','Q7','Q8','Q9','Q10', 'Q11','Q12','Q13','Q14','Q15','Q16', 'Q17','Q18'],
  PAGE_SIZE: 250
});
