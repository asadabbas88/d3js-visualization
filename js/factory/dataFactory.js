/**
 * Created by rw on 3/25/15.
 */
app.factory('dataFactory',function(){
   var jsonData = {
       "questionArray" :[{"Q4":"Q4"},{"Q5":"Q5"}],
       "q4":"&facet.field=Q4.sentiment&facet.field=Q4",
       "q5":"&facet.field=Q5.sentiment&facet.field=Q5",
       "api_domain":"http://119.81.106.34/searchblox/servlet/SearchServlet?facet=true&col=1&query=*",
       "questionFilterUrl":"http://119.81.106.34/searchblox/servlet/SearchServlet?facet=true&col=1&query=*&facet.field=Q4.sentiment&facet.field=Q4",
       "devisions" :"http://119.81.106.34/searchblox/servlet/SearchServlet?facet=true&col=1&query=*&facet.field=division"

   };
    return{
        Json :jsonData
    }
});