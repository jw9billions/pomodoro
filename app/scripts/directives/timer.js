(function() {
  function timer ($interval) {

    return {
      templateUrl: '/templates/directives/timer.html',
      replace: true,
      restrict: 'E',
      scope: { },
      link: function(scope, elemnt, attibutes) {

        var interval, incrementTimer, actions;
        actions = { start: "Start", stop: "Stop" };

        scope.workTimer = 1500;
        scope.action = actions.start;

        incrementTimer = function() {
          scope.workTimer -- ;
        };

        scope.toggle = function () {
          if (scope.action == actions.start) {
            scope.action = actions.stop;
            interval = $interval(incrementTimer, 1000, 1500);
            console.log(interval)
          } else if (scope.action == actions.stop) {
            scope.action = actions.start;
            $interval.cancel(interval);
            scope.workTimer = 1500;
          }
        };
      }
    };

  }

  angular
    .module('pomodoroTime')
    .directive('timer', timer);
})();
