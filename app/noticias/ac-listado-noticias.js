(function () {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;
    //console.log(currentScriptPath);

    angular.module('ac.listadoNoticias', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider.when('/noticias', {

                templateUrl: currentScriptPath.replace('.js', '.html'),

                controller: 'ListadoNoticiasController',

                data: {requiresLogin: false}


            });

        }])
        .controller('ListadoNoticiasController', ListadoNoticiasController);


    ListadoNoticiasController.$inject = ['NoticiasService', '$location'];
    function ListadoNoticiasController(NoticiasService, $location) {

       
        var vm = this;

        vm.noticias = [];
        vm.detalle = detalle;

        function detalle(id){
            $location.path('/noticia/'+id);
        }

        NoticiasService.getNoticias(
            function (data){
                //console.log(data);
                //for(var i = 0; i<data.length; i++){
                //
                //    var fecha = data[i].fecha.getDate();
                //    console.log(fecha);
                //}
                vm.noticias = data;
            }
        );

    }

})();