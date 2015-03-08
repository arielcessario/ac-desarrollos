
(function () {

    'use strict';

    angular.module('ac.mainView', [
        'ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: './mainView/mainView.html',
                controller: 'MainViewCtrl'
            });
        }])
        .controller('MainViewCtrl', MainViewCtrl);

    MainViewCtrl.$inject = ['$http', '$location', '$interval'];

    function MainViewCtrl($http, $location, $interval) {

        var vm = this;

        vm.slide01 = true;
        $interval(callAtTimeout, 5000);
        //setInterval(function () {alert("Hello")}, 3000);
        //vm.swipeLeft = swipeLeft;
        //vm.sendMail = sendMail;
        ////vm.cajaPortfolio = 'mainView/caja-portfolio.html?i='+ Math.random()+'&color=FF0000';
        //vm.contactoFooter = 'mainView/contact-footer.html?i='+ Math.random()+'&color=FF0000';



        function callAtTimeout(){

            if(vm.slide01){
                vm.slide01 = false;
                vm.slide02 = true;
            }else if(vm.slide02){

                vm.slide01 = true;
                vm.slide02 = false;
            }

            //vm.slide02 = !vm.slide02;
        }
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

            //console.log(vm.nombre);
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
