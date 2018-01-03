(function() {
  function timer ($interval, MY_TIMES) {

    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attibutes) {

        var interval, incrementTimer;

        scope.onBreak = false;
        scope.isActive = false;
        scope.buttonText = "Start";
        scope.currentTime = MY_TIMES.work;

        var startTimer = function () {
          interval = $interval(incrementTimer, 1000);
          scope.isActive = true;
          scope.buttonText = "Stop";
        };

        incrementTimer = function() {
          scope.currentTime -- ;

          if (scope.currentTime <= 0) {
            if (!scope.onBreak) {
              scope.onBreak = true;
            } else {
              scope.onBreak = false;
            }
            resetTimer();
          };
        };

        var resetTimer = function () {
          $interval.cancel(interval);
          scope.isActive = false;
          scope.buttonText = "Start";

          if (scope.onBreak) {
            scope.currentTime = MY_TIMES.break;
          } else {
            scope.currentTime = MY_TIMES.work;
          }
        };

        scope.toggle = function () {
          if (!scope.isActive) {
            startTimer();
          } else {
            resetTimer();
          }
        };
      }
    };
  }

  angular
    .module('pomodoroTime')
    .directive('timer', timer)
    .constant('MY_TIMES', {
      "work": 10,
      "break": 3
    });
})();
