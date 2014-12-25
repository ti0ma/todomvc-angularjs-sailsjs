(function (window) {
  'use strict';

  // Your starting point. Enjoy the ride!
  var app = angular.module('TodoMvc', ['TodoMvc.controllers', 'ngRoute']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {controller: 'TodosCtrl'}).
      when('/active', {controller: 'TodosCtrl'}).
      when('/completed', {controller: 'TodosCtrl'}).
      otherwise({redirectTo: '/'});
  }]);

  app.directive('focusTodo', ['$timeout', function ($timeout) {
    return function (scope, elem, attrs) {
      scope.$watch(attrs.focusTodo, function (newval) {
        if (newval) {
          $timeout(function(){
            elem[0].focus();
          }, 0, false);
        }
      });
    };
  }]);

})(window);
