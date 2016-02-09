angular.module('starter.controllers', [])


    .controller('QuestionsCntrl', function ($scope, $http, Questions, Alerta, Loading) {

        $scope.currentQuestion = "";
        $scope.currentOption = "";
        $scope.Questions = [];
        $scope.isLast = false;
        $scope.isFirst = false;
        $scope.NextText = "Próxima";
        $scope.PreviousText = "Anterior";
        $scope.totalQuestions = 0;

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
                    $scope.totalQuestions = data.data.length;
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

            if ($scope.isLast == true) {
                $scope.Finalize();
                return;
            }

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

        $scope.Save = function (id, option, isRight) {
            Questions.Save(id, option, isRight);
        }

        $scope.Set = function (id) {
            var anwser = Questions.GetById(id);
            if (anwser) {

                $scope.currentQuestion.replies.forEach(function (element) {

                    if (anwser.option === element.option) {
                        $scope.currentOption = element.option;
                        return;
                    }

                }, this);
            }
        }

        $scope.Finalize = function () {

            Alerta.Confirm("Deseja Finalizar?",
                function () {
                    $scope.CalculateResult();
                }, null);

        }

        $scope.CalculateResult = function () {

            var count = Questions.Calculate();
            var result = (count/$scope.totalQuestions)*100;
            Alerta.Alerta("Você acertou : " + result + "% <br>Equivalente a " + count + " questões." );
        }

        $scope.Get();
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });