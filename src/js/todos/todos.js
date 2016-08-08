// js/todoList.js
'use strict';


var demoApp = angular.module('demoApp', [
    // Dépendances du "module"
    'todoList'
]);


var todoList = angular.module('todoList',[]);



todoList.controller('todoCtrl', ['$scope',
    function ($scope) {

        // Pour manipuler plus simplement les todos au sein du contrôleur
        // On initialise les todos avec un tableau vide : []
        $scope.todos = [];
        var todos = $scope.todos;


        $scope.nb = $scope.todos.length;


        // Ajouter un todo
        $scope.addTodo = function () {
            // .trim() permet de supprimer les espaces inutiles
            // en début et fin d'une chaîne de caractères
            var newTodo = $scope.newTodo.trim();
            if (!newTodo.length) {
                // éviter les todos vides
                return;
            }
            todos.push({
                // on ajoute le todo au tableau des todos
                title: newTodo,
                completed: false
            });
            // Réinitialisation de la variable newTodo
            $scope.newTodo = '';
            $scope.nb = $scope.todos.length;

        };

        // Enlever un todo
        $scope.removeTodo = function (todo) {
            todos.splice(todos.indexOf(todo), 1);
            $scope.nb = $scope.todos.length;

        };

        // Cocher / Décocher tous les todos
        $scope.markAll = function (completed) {
            todos.forEach(function (todo) {
                todo.completed = !completed;
            });
        };

        // Enlever tous les todos cochés
        $scope.clearCompletedTodos = function () {
            $scope.todos = todos = todos.filter(function (todo) {
                return !todo.completed;
            });
        };

        /*
        $scope.ol = function()
        {
        	todos.forEach(function(todo){
        		todo.title = "OL";
        	});
        };
        */
    }
]);