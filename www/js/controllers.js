angular.module('starter.controllers', [])


<<<<<<< HEAD
.controller('QuestionsCntrl', function($scope,$http, Questions, Alerta, Loading) {

  $scope.currentQuestion = "";
  $scope.Questions = [];
  $scope.isLast = false;
  $scope.isFirst = false;
  $scope.NextText = "Próxima";
  $scope.PreviousText = "Anterior";
  
 $scope.ValidateLenght =function(){
     
     var currentId = $scope.currentQuestion.id;
     var lenght = $scope.Questions.length;
     
     if(currentId == lenght ){
          $scope.isLast = true;
          $scope.NextText = "Finalizar";
     }
     if(currentId < lenght){
          $scope.isLast = false;
          $scope.NextText = "Próxima";
     }

     if (currentId == 1){
         $scope.isFirst = true;
     }
     else{
        $scope.isFirst = false; 
     }
 }
  
  $scope.Get = function(){
      
    Loading.Show();
    var pGetJson = $http.get('js/questions.json');

    pGetJson.then(
        function(data) 
        {
             $scope.Questions = data.data;
             if(data.data.length>0){
                 // Pego a questão 
                 $scope.currentQuestion = $scope.Questions[0];
                 $scope.ValidateLenght();
                 Loading.Release();
             }
        });
  }
  
  $scope.GoNext = function(id){
     var question = Questions.get($scope.Questions, id+1);
     if(question != null){
         $scope.currentQuestion = question;
         $scope.ValidateLenght();
     }
  }
  
  $scope.GoPrevious = function(id){
     var question = Questions.get($scope.Questions, id-1);
     if(question != null){
          $scope.currentQuestion = question;
         $scope.ValidateLenght();
    }
  }
  $scope.Get();
})
=======
    .controller('QuestionsCntrl', function ($scope, $http, Questions) {
        $scope.Get = function () {
            var promise = $http.get('js/questions.json');
            promise.then(
                function (data) {
                    $scope.Questions = data.data;
                });

        }
        $scope.Get();

    })
>>>>>>> a1e42f6cc9becfcfe0e200aaf83707da4aa6f196

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Questions) {
        $scope.chat = Questions.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
