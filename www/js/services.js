angular.module('starter.services', [])

    .factory('Questions', ['$http', function ($http) {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var Questions = [];
        var AnsweredQuestions = [];

        var all = function () {
            return $http.get('js/questions.json');
        }

        var remove = function (chat) {
            Questions.splice(Questions.indexOf(chat), 1);
        }

        var get = function (questions, chatId) {

            Questions = questions;
            for (var i = 0; i < Questions.length; i++) {
                if (Questions[i].id === parseInt(chatId)) {
                    return Questions[i];
                }
            }
            return null;
        }

        var getById = function (id) {
            return angular.fromJson(localStorage.getItem(id));
        }

        var save = function (id, option, isRight) {

            var awnser = function () {
                return {
                    option: option,
                    isRight: isRight
                }
            }
            localStorage.setItem(id, angular.toJson(awnser()));
        }
        
        var calculate = function(){
            
            var count = 0;
             for (var i = 0; i < localStorage.length; i++) {
                var opt = angular.fromJson(localStorage.getItem(localStorage.key(i)));
                if(opt.isRight == 1){
                    count++;
                }
            }
            
            return count;
        }

        return {

            All: all,
            Remove: remove,
            Get: get,
            Save: save,
            GetById: getById,
            Calculate: calculate
        }

    }])

    .service('Alerta', function ($ionicPopup) {
 
        // Alerta padrao
        var _alert = function (message) {
            $ionicPopup.alert({
                title: 'DITIL',
                content: message
            });
        };
    
        // Mensagem de Erro
        var _erro = function (message) {
            $ionicPopup.alert({
                title: 'DITIL',
                content: message,
                buttons: [{
                    text: '<b>OK</b>',
                    type: 'bar-balanced',
                }]
            });
        };
        
        // Mensagem de Erro
        var _confirm = function (message, yes, no) {
            $ionicPopup.confirm({
                title: 'DITIL',
                template: message
            }).then(function (res) {
                if (res) {
                    if (yes) { yes() };
                } else {
                    if (no) { no() };
                }
            });
        };

        return {
            Alerta: _alert,
            Erro: _erro,
            Confirm: _confirm
        };

    })

    .service('Loading', function ($ionicLoading) {
    
        // Alerta padrao
        var _show = function () {
            $ionicLoading.show({
                template: 'Carregando...'
            });
        };

        var _release = function () {
            $ionicLoading.hide();
        };


        return {
            Show: _show,
            Release: _release
        };

    });
