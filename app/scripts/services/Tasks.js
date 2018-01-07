(function () {
  function Tasks ($firebaseArray) {
    var ref = firebase.database().ref();
    var tasks = $firebaseArray(ref);

    return {
      all: tasks,
      addTask: function (task) {
        tasks.$add(task);
      }
    };
  }

  angular
    .module("pomodoroTime")
    .factory("Tasks", ["$firebaseArray", Tasks]);
})();
