(function(){

  var app = angular.module('TodoMvc.controllers', []);

  app.controller('TodosCtrl', ['$scope', '$filter', '$location',
    function($scope, $filter, $location){
      $scope.todos = [{
        complete: false,
        task: 'Be an Angular GOD!!!'
      }, {
        complete: false,
        task: 'Prepare Angular basic'
      }, {
        complete: true,
        task: 'Setup environment'
      }];

      $scope.$watch('todos', function () {
        $scope.leftCount = $filter('filter')($scope.todos, { complete: false }).length;
        $scope.completedCount = $scope.todos.length - $scope.leftCount;
      }, true);

      $scope.location = $location;

      $scope.$watch('location.path()', function (path) {
        $scope.filterSelected = (path === '/active') ? { complete: false } :
                                (path === '/completed') ? { complete: true } : null;
      });

      $scope.closeCompleted = function(){
        $scope.todos = $filter('filter')($scope.todos, { complete: false });
      };

      $scope.addTodo = function(){
        var task = ($scope.newTask || '').trim();
        if(!task){
          return;
        }
        var todo = {
          task: task,
          complete: false
        };
        $scope.newTask = '';
        $scope.todos.push(todo);
      };

      $scope.editTask = function(todo){
        todo.editing = true;
        $scope.editingTask = todo.task;
      };

      $scope.editSaveTodo = function(todo){
        todo.editing = false;
      }

      $scope.destroyTask = function(todo){
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
      }
    }]);
})();
