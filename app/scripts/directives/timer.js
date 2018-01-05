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
        scope.completedWorkSesh = 1;

        var startTimer = function () {
          interval = $interval(incrementTimer, 1000);
          scope.isActive = true;
          scope.buttonText = "Stop";
        };

        incrementTimer = function() {
          scope.currentTime -- ;

          if (scope.currentTime <= 0) {
            resetTimer();
          };
        };

        var resetTimer = function () {
          $interval.cancel(interval);
          scope.isActive = false;
          scope.buttonText = "Start";

          console.log("scope.onBreak", scope.onBreak);
          if (!scope.onBreak) {
            console.log("scope.completedWorkSesh", scope.completedWorkSesh);
            if (scope.completedWorkSesh === 2) {
              console.log("completedWorkSesh is 2");
              scope.currentTime = MY_TIMES.longBreak;
              scope.onBreak = true;
              scope.completedWorkSesh= 0;
            } else {
              console.log("hit the else");
              scope.currentTime = MY_TIMES.break;
              scope.onBreak = true;
              scope.completedWorkSesh ++;
              console.log("scope.completedWorkSesh", scope.completedWorkSesh);
            }
          } else {
            scope.currentTime = MY_TIMES.work;
            scope.onBreak = false;
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
      "break": 3,
      "longBreak": 6
    });
})();
