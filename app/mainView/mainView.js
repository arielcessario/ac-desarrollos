
(function () {

    'use strict';

    angular.module('ac.mainView', [
        'ngRoute', 'ac'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.when('/mainView', {
                templateUrl: './mainView/mainView.html',
                controller: 'MainViewCtrl'
            });
        }])
        .controller('MainViewCtrl', MainViewCtrl)
        ;

    MainViewCtrl.$inject = ['$http', '$location', '$interval', '$timeout', '$window', '$scope', '$routeParams'];

    function MainViewCtrl($http, $location, $interval, $timeout, $window, $scope, $routeParams) {

        var vm = this;

        vm.id = $routeParams.id;
        vm.slide01 = true;
        $interval(callAtTimeout, 5000);
        vm.sendMail = sendMail;
        vm.enviado = false;
        vm.homeWidth = $window.innerWidth + 'px';
        //vm.homeHeight = ($window.innerWidth / 1.95) + 'px';
        vm.homeHeight = ($window.innerWidth / 1.95) + 'px';


        calcTextosSlide();

        function calcTextosSlide(){
            var textosSlide = document.getElementsByClassName('texto-slide');
            for(var i = 0; i<textosSlide.length; i++){

                var textoSlideHeight = textosSlide[i].style.height;
                //console.log((textoSlideHeight / 2));
                textosSlide[i].style.top = ((parseFloat(vm.homeHeight) / 2) - (parseFloat(vm.homeHeight)/10))  + 'px';
            }
        }


        $window.onresize = function() {

            vm.homeWidth = $window.innerWidth + 'px';

                vm.homeHeight = ($window.innerWidth / 1.95) + 'px';

            calcTextosSlide();

            $scope.$apply();
        };










        function callAtTimeout(){
            //vm.slide01 = true;
            //vm.slide02 = true;
            if(vm.slide01){
                vm.slide01 = false;
                vm.slide02 = true;
                vm.slide03 = false;
                vm.slide04 = false;
            }else if(vm.slide02){

                vm.slide01 = false;
                vm.slide02 = false;
                vm.slide03 = true;
                vm.slide04 = false;
            }else if(vm.slide03){

                vm.slide01 = false;
                vm.slide02 = false;
                vm.slide03 = false;
                vm.slide04 = true;
            }else if(vm.slide04){

                vm.slide01 = true;
                vm.slide02 = false;
                vm.slide03 = false;
                vm.slide04 = false;
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

            //console.log(vm.mail);
            return $http.post('./contact.php',
                {'email': vm.email, 'nombre': vm.nombre, 'mensaje': vm.mensaje, 'asunto': vm.asunto})
                .success(
                function (data) {
                    console.log(data);
                    vm.enviado = true;
                    $timeout(hideMessage, 3000);
                    function hideMessage(){
                        vm.enviado = false;
                    }

                    vm.email = '';
                    vm.nombre = '';
                    vm.mensaje = '';
                    vm.asunto = '';

                    goog_report_conversion('http://www.ac-desarrollos.com/#');
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
