(function () {
    angular.module('ac.cajaPortDir', ['ngRoute'])
        .directive('portfolioCaja', portfolio);

    function portfolio() {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                img: '@',
                title: '@',
                subtitle: '@',
                text1: '@',
                text2: '@',
                text3: '@',
                text4: '@',
                click: '='
            },
            templateUrl: './mainView/caja-portfolio.html?i='+ Math.random(),
            controller: function ($scope, $compile, $http) {
                var vm = this;
                //console.log($scope);
                vm.name = $scope.name;
                vm.title = $scope.title;
                vm.subtitle = $scope.subtitle;
                vm.click = $scope.click;
                vm.img = $scope.img;
                vm.text1 = $scope.text1;
                vm.text2 = $scope.text2;
                vm.text3 = $scope.text3;
                vm.text4 = $scope.text4;
                vm.cajaPortfolioGrande = 'mainView/caja-portfolio-grande.html?i='+ Math.random();

                vm.portOver = portfolioOver;

                function portfolioOver(id){


                    vm.portfolio01 = false;
                    vm.portfolio02 = false;
                    vm.portfolio03 = false;
                    vm.portfolio04 = false;
                    vm.portfolio05 = false;
                    vm.portfolio06 = false;
                    vm.portfolio07 = false;

                    switch(id){
                        case 1:
                            //console.log(id);
                            vm.portfolio01 = true;
                            break;
                        case 2:
                            vm.portfolio02 = true;
                            break;
                        case 3:
                            vm.portfolio03 = true;
                            break;
                        case 4:
                            vm.portfolio04 = true;
                            break;
                        case 5:
                            vm.portfolio05 = true;
                            break;
                        case 6:
                            vm.portfolio06 = true;
                            break;

                    }

                }

            },
            controllerAs: 'portfolioCajaCtrl'
        };

    }

})();
