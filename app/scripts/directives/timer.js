(function() {
  function timer ($interval, MY_TIMES) {

    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attibutes) {
        scope.onBreak = false;
        scope.isActive = false;
        scope.buttonText = "Start";
        scope.currentTime = MY_TIMES.work;
        scope.completedWork = 1;

        var interval;
        var startTimer = function () {
          interval = $interval(incrementTimer, 1000);
          scope.isActive = true;
          scope.buttonText = "Stop";
        };

        var incrementTimer = function() {
          scope.currentTime -- ;

          if (scope.currentTime <= 0) {
            runSessions();
            resetTimer();
          };
        };

        var runSessions = function () {
          if (!scope.onBreak) {
            if (scope.completedWork === 2) {
              scope.currentTime = MY_TIMES.longBreak;
              scope.onBreak = true;
              scope.completedWork= 0;
            } else {
              scope.currentTime = MY_TIMES.break;
              scope.onBreak = true;
              scope.completedWork ++;
            }
          } else {
            scope.currentTime = MY_TIMES.work;
            scope.onBreak = false;
          }

        };

        var mySound = new buzz.sound( "assets/sounds/ding.mp3", {
          preload: true
        });

        scope.$watch("currentTime", function (value) {
          console.log("inside watch", value);
          if (value === 1) {
            mySound.play();
          }
        });

        var resetTimer = function () {
          $interval.cancel(interval);
          scope.isActive = false;
          scope.buttonText = "Start";
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
