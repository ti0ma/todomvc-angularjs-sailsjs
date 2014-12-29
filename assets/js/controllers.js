(function(){

  var app = angular.module('TodoMvc.controllers', []);

  app.controller('TodosCtrl', ['$scope', '$filter', '$location', '$http',
    function($scope, $filter, $location, $http){
      $scope.todos = [];

      $http.get('/todo')
        .success(function (data) {
          $scope.todos = data;
        })
        .error(function(){
          throw new Error('It seems to be some error with the service');
        });

      $scope.$watch('todos', function () {
        $scope.leftCount = ($filter('filter')($scope.todos, { complete: false }) || '').length;
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
        $http.post('/todo/create', todo).success(function(data){
          angular.extend(todo, data);
        });
      };

      $scope.editTask = function(todo){
        todo.editing = true;
        $scope.editingTask = todo.task;
      };

      $scope.editSaveTodo = function(todo){
        if(todo.editing){
          $http.put('/todo/' + todo.id, todo);
        }
        delete todo.editing;
      }

      $scope.destroyTask = function(todo){
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
        $http.delete('/todo', {data: {'id': todo.id}});
      }

      $scope.toggleDone = function (todo) {
        todo.complete = !todo.complete;
        $http.put('/todo/' + todo.id, {'complete': todo.complete});
      }

      $scope.toggleAll = function(){
        var toggleBool = $scope.leftCount > 0;
        $scope.todos.forEach(function(todo){
          todo.complete = toggleBool;
        });
      }
    }]);
})();
