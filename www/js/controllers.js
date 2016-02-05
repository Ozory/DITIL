angular.module('starter.controllers', [])


.controller('QuestionsCntrl', function($scope,$http, Questions) {
  $scope.Get = function(){
    var promise = $http.get('js/questions.json');
    promise.then(
        function(data) 
        {
             $scope.Questions = data.data;
        });
  
  }
  $scope.Get();

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Questions) {
  $scope.chat = Questions.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
