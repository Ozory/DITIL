angular.module('starter.services', [])

.factory('Questions',['$http', function($http) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
var Questions = [];

  return {
    all: function() {
      
      
    },
    remove: function(chat) {
      Questions.splice(Questions.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < Questions.length; i++) {
        if (Questions[i].id === parseInt(chatId)) {
          return Questions[i];
        }
      }
      return null;
    }
  };
}]);
