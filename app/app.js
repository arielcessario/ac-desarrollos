'use strict';

// Declare app level module which depends on views, and components
angular.module('ac', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngAria',
    'ac.mainView',
    'ac.cajaPortDir',
    'ac.cajaEmpDir',
    'myApp.view2',
    'myApp.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/mainView'});
    }])
    .directive('scroll', scroll)
    .directive('scrollff', scrollff)
    .controller('MainController', MainController);


MainController.$inject = ['$scope', '$location'];
function MainController($scope, $location) {
    var vm = this;
    //vm.isScrolled = false;
    vm.entrar = entrar;
    vm.moved = false;
    vm.goToAnchor = goToAnchor;

    function entrar() {
        $scope.moved = !$scope.moved;
    }

    function goToAnchor(id) {
        $location.hash(id);
    }

    //console.log($scope.isScrolled);
}

function scroll($window) {
    return function (scope, element, attrs) {
        if ($window.navigator.userAgent.indexOf('Chrome') > -1) {
            angular.element($window).bind("scroll", function () {
                //console.log(element[0].scrollTop);
                //console.log(attrs.isScrolled);

                //console.log(scope.anterior);

                //if(scope.anterior === undefined){
                //    scope.anterior = element[0].scrollTop;
                //}
                //
                //if(element[0].scrollTop < scope.anterior && element[0].scrollTop < 92){
                //    scope.moved = false;
                //    scope.anterior = element[0].scrollTop;
                //}else{
                //    scope.anterior = element[0].scrollTop;
                //    scope.moved = true;
                //}

                //if (element[0].scrollTop > 0) {
                //    scope.moved = true;
                //
                //}
                //
                //if (element[0].scrollTop < 92) {
                //    scope.moved = false;
                //    //scope.mini = false;
                //}

                //if(!scope.moved){
                //    element[0].scrollTop =0;
                //}


                scope.$apply();
            });

        }
    }
}

function scrollff($window) {
    return function (scope, element, attrs) {
        if ($window.navigator.userAgent.indexOf('Chrome') == -1) {
            angular.element($window).bind("scroll", function () {
                //console.log(element[0].scrollTop);
                //console.log(attrs.isScrolled);


                //if (element[0].scrollTop > 0) {
                //    scope.moved = true;
                //
                //}
                //
                //if (element[0].scrollTop < 92) {
                //    scope.moved = false;
                //    //scope.mini = false;
                //}
                //
                //
                //scope.$apply();
            });

        }
    }

}
