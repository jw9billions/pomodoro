(function() {
  function timer ($interval) {

    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attibutes) {

        var interval, incrementTimer;

        scope.buttonText = "Start";
        scope.isActive = false;
        scope.workTimer = 10;

        incrementTimer = function() {
          scope.workTimer -- ;
        };

        scope.toggle = function () {
          if (scope.isActive == false) {
            scope.buttonText = "Stop";
            interval = $interval(incrementTimer, 1000, 10);
            scope.isActive = true;
          } else if (scope.isActive == true) {
            scope.buttonText = "Start";
            $interval.cancel(interval);
            scope.workTimer = 10;
            scope.isActive = false;
          }
        };
      }
    };
  }

  angular
    .module('pomodoroTime')
    .directive('timer', timer);
})();
