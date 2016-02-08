angular.module('starter.controllers', [])


    .controller('QuestionsCntrl', function ($scope, $http, Questions, Alerta, Loading) {

        $scope.currentQuestion = "";
        $scope.currentOption = "";
        $scope.Questions = [];
        $scope.isLast = false;
        $scope.isFirst = false;
        $scope.NextText = "Próxima";
        $scope.PreviousText = "Anterior";

        $scope.ValidateLenght = function () {

            var currentId = $scope.currentQuestion.id;
            var lenght = $scope.Questions.length;

            if (currentId == lenght) {
                $scope.isLast = true;
                $scope.NextText = "Finalizar";
            }
            if (currentId < lenght) {
                $scope.isLast = false;
                $scope.NextText = "Próxima";
            }

            if (currentId == 1) {
                $scope.isFirst = true;
            }
            else {
                $scope.isFirst = false;
            }
        }

        $scope.Get = function () {

            Loading.Show();
            var pGetJson = Questions.All();

            pGetJson.then(
                function (data) {
                    $scope.Questions = data.data;
                    if (data.data.length > 0) {
                        // Pego a questão 
                        $scope.currentQuestion = $scope.Questions[0];
                        $scope.ValidateLenght();
                        $scope.Set($scope.Questions[0].id);
                        Loading.Release();
                    }
                });
        }

        $scope.GoNext = function (id) {
            var question = Questions.Get($scope.Questions, id + 1);
            if (question != null) {
                $scope.currentQuestion = question;
                $scope.ValidateLenght();
                $scope.Set(question.id);
            }
        }

        $scope.GoPrevious = function (id) {
            var question = Questions.Get($scope.Questions, id - 1);
            if (question != null) {
                $scope.currentQuestion = question;
                $scope.ValidateLenght();
                $scope.Set(question.id);
            }
        }

        $scope.Save = function (id, option) {
            Questions.Save(id, option);
        }

        $scope.Set = function (id) {
            var anwser = Questions.GetById(id);
            if (anwser) {

                $scope.currentQuestion.replies.forEach(function (element) {

                    if (anwser === element.option) {
                        $scope.currentOption = element.option;
                        return;
                    }

                }, this);
            }
        }

        $scope.Get();
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });