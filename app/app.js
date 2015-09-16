'use strict';

// Declare app level module which depends on views, and components
angular.module('ac', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngAria',
    'duScroll',
    'acUtils',
    'ac.noticias',
    'ac.mainView',
    'ac.cajaPortDir',
    'acDesarrollos.noticias'
]).
    config(['$routeProvider', function ($routeProvider) {
        //$routeProvider.otherwise({redirectTo: '/mainView'});

    }])
    .directive('scroll', scroll)
    .directive('scrollff', scrollff)
    .controller('MainController', MainController);


MainController.$inject = ['$scope', '$location', '$document', 'AcUtilsService', '$http'];
function MainController($scope, $location, $document, AcUtilsService, $http) {
    var vm = this;

    vm.openMenu = openMenu;
    vm.goToAnchor = goToAnchor;
    vm.open = false;

    vm.chatOpen = false;
    vm.chatIsLogged = false;
    vm.ingresarChat = ingresarChat;
    vm.enviarChat = enviarChat;
    vm.goToNoticias = goToNoticias;
    vm.goToHome = goToHome;
    vm.userChat = '';
    vm.mailChat = '';
    vm.messageChat = '';
    vm.idChat = 0;
    var myDataRef = new Firebase('https://chat-acdesarrollos.firebaseio.com/');


    $location.path('/mainView');
    function goToNoticias(){
        $location.path('/noticias');
    }

    function goToHome(){
        $location.path('/mainView');
    }

    function enviarChat(event) {

        if (event.keyCode == 13) {
            if (vm.userChat.trim() == '') {
                return;
            }
            if (vm.mailChat.trim() == '') {
                return;
            }
            if (vm.messageChat.trim() == '') {
                return;
            }

            myDataRef.push({id: vm.idChat, name: vm.userChat, mail: vm.mailChat, message: vm.messageChat});

            vm.messageChat = '';
        }

    }



    myDataRef.on('child_added', function (snapshot) {

        if(snapshot.val().id != vm.idChat){
            return;
        }

        var messages = angular.element(document.querySelector('#mensajes'));
        messages.append('<p>' + snapshot.val().name + ' dice: ' + snapshot.val().message + '</p>');
        if (!$scope.$$phase) {
            //$digest or $apply
            $scope.$apply();
        }
    });

    function ingresarChat() {

        if(!AcUtilsService.validateEmail(vm.mailChat.trim())){
            return;
        }


        if (vm.userChat.trim() == '') {
            return;
        }
        if (vm.mailChat.trim() == '') {
            return;
        }

        vm.idChat = Math.floor((Math.random() * 1000) + 1);
        sendMail( vm.mailChat, vm.userChat);
        myDataRef.push({id: vm.idChat, name: vm.userChat, mail: vm.mailChat, message: vm.userChat + ' se ha conectado'});
        vm.chatIsLogged = true;

    }

    function openMenu() {
        vm.open = !vm.open;
        console.log(vm.open);
    }

    function goToAnchor(id) {
        var duration = 1000;
        var offset = 30; //pixels; adjust for floating menu, context etc
        //Scroll to #some-id with 30 px "padding"
        //Note: Use this in a directive, not with document.getElementById
        var someElement = angular.element(document.getElementById(id));
        $document.scrollToElement(someElement, offset, duration);

    }

    function sendMail(email, nombre) {

        //console.log(vm.mail);
        return $http.post('contact.php',
            {'email': email, 'nombre': nombre, 'mensaje': 'http://192.185.67.199/~arielces/ac-desarrollos-chat/', 'asunto': 'Nuevo chat de cliente'})
            .success(
            function (data) {
                console.log(data);
                //vm.enviado = true;
                //$timeout(hideMessage, 3000);
                //function hideMessage(){
                //    vm.enviado = false;
                //}

                vm.email = '';
                vm.nombre = '';
                vm.mensaje = '';
                vm.asunto = '';

                //goog_report_conversion('http://www.ac-desarrollos.com/#');
            })
            .error(function (data) {
                console.log(data);
            });
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
