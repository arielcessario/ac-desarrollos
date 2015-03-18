'use strict';

// Declare app level module which depends on views, and components
angular.module('ac', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngAria',
    'duScroll',
    'ac.mainView',
    'ac.cajaPortDir'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/mainView'});
    }])
    .directive('scroll', scroll)
    .directive('scrollff', scrollff)
    .controller('MainController', MainController);


MainController.$inject = ['$scope', '$location','$document'];
function MainController($scope, $location,$document) {
    var vm = this;

    vm.openMenu = openMenu;
    vm.goToAnchor = goToAnchor;
    vm.open = false;

    function openMenu(){
        vm.open = !vm.open;
        console.log(vm.open);
    }

    function goToAnchor(id){
        var duration = 1000;
        var offset = 30; //pixels; adjust for floating menu, context etc
        //Scroll to #some-id with 30 px "padding"
        //Note: Use this in a directive, not with document.getElementById
        var someElement = angular.element(document.getElementById(id));
        $document.scrollToElement(someElement, offset, duration);

    }

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

                scope.moved = element[0].scrollTop > 0;

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
                scope.moved = element[0].scrollTop > 0;

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
