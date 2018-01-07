(function() {
    function HomeCtrl($scope, Tasks) {

      var init = function () {
        $scope.tasks = Tasks.all;
        $scope.newTask = {
          text: ""
        }
      };

      $scope.addTask = function () {
        Tasks.addTask($scope.newTask);
        $scope.newTask.text = "";
      };

      init();
    }

    angular
        .module('pomodoroTime')
        .controller('HomeCtrl', ['$scope', 'Tasks', HomeCtrl]);
})();
