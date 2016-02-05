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
    get: function(questions, chatId) {
        
      Questions = questions;
      for (var i = 0; i < Questions.length; i++) {
        if (Questions[i].id === parseInt(chatId)) {
          return Questions[i];
        }
      }
      return null;
    }
  };
}])

.service('Alerta', function($ionicPopup){
 
    // Alerta padrao
    var _alert = function(message){
            $ionicPopup.alert({
              title: 'DITIL',
              content: message
            });
    };
    
    // Mensagem de Erro
    var _erro = function(message){
            $ionicPopup.alert({
              title: 'DITIL',
              content: message,
              buttons: [{
                  text: '<b>OK</b>',
                  type: 'button-assertive',
              }]
            });
    };

    return {
        Alerta:_alert,
        Erro: _erro
    };
    
 })
 
 .service('Loading', function($ionicLoading){
    
    // Alerta padrao
    var _show = function(){
             $ionicLoading.show({
                template: 'Carregando...'
            });
    };
    
    var _release = function(){
         $ionicLoading.hide();
    };


    return {
        Show:_show,
        Release: _release
    };
    
});
