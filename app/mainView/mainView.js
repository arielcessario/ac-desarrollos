
(function () {

    'use strict';

    angular.module('ac.mainView', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: './mainView/mainView.html',
                controller: 'MainViewCtrl'
            });
        }])
        .controller('MainViewCtrl', MainViewCtrl);

    MainViewCtrl.$inject = ['$http', '$location'];

    function MainViewCtrl($http, $location) {

        var vm = this;

        vm.swipeLeft = swipeLeft;
        vm.sendMail = sendMail;


        //vm.move = move;
        //
        //function move(event){
        //    console.log(event);
        //}

        //var myEl = angular.element(  'vm.portfolio-details' );
        //console.log(myEl);
        //myEl.fleXenv.fleXcrollMain();


            //alert();
        //var myScroll = new iScroll("portfolio-details");
        //console.log(myScroll);
            //



        function sendMail() {
            return $http.post('../contact.php',
                {'email': vm.email, 'nombre': vm.nombre, 'mensaje': vm.mensaje, 'asunto': vm.asunto})
                .success(
                function (data) {
                    console.log(data);
                })
                .error(function (data) {
                    console.log(data);
                });
        }


        function swipeLeft() {
            alert('hola');
        }



    }
})();
