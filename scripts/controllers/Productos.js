
angular.module('cmsApp.Productos', ['cmsApp.StoresService', 'cmsApp.ProdutsService'])

.controller('productosCtrl', function ($scope, $rootScope, LxDialogService, LxNotificationService, Stores, $routeParams, Products) {
    var idTienda = $routeParams.idStore;
    $rootScope.IDtienda = idTienda;

    $scope.tab = {
        activa: 0
    };

    $scope.OpenPopUpDelay = function (Popup) {
        $timeout(function () {
            $scope.opendDialog(Popup);
        }, 1000);
    }

    $scope.DatosProductos = {
        name: '',
        image: '',
        description: '',
        keywords: '',
        unitWeight: '',
        imageList: '',
        barCode: '',
        storeId: idTienda
    };


    $scope.Buscador = {
        texto: ''
    };

    $scope.DatosBuscador = [];

    var OnsuccessCrearProductos = function (Data) {
        
    }

    $scope.guardarProductos = function () {
        Products.SaveProduct(OnsuccessCrearProductos, $scope.DatosProductos);
    }

    $scope.people = [
    { name: 'Adam', email: 'adam@email.com', age: 10 },
    { name: 'Amalie', email: 'amalie@email.com', age: 12 },
    { name: 'Wladimir', email: 'wladimir@email.com', age: 30 },
    { name: 'Samantha', email: 'samantha@email.com', age: 31 },
    { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
    { name: 'Natasha', email: 'natasha@email.com', age: 54 },
    { name: 'Nicole', email: 'nicole@email.com', age: 43 },
    { name: 'Adrian', email: 'adrian@email.com', age: 21 }
    ];

    $scope.mostrarFormulario = function () {
        $("#formulario-crear").show()
    };


 

    $scope.datoskronero = {
        name: '',
        username: '',
        password: '',
        passwordd: ''

    }

    $scope.datoskroneroupdate = {    }

    $scope.opendDialog = function (dialogId) {
        LxDialogService.open(dialogId);
    };

    $scope.ConsultarKroneroid = function (Data) {
        $scope.datoskroneroupdate = Data;
        LxDialogService.open('editarKronero');
    }

    $scope.closingDialog = function () {
        //LxNotificationService.info('Dialog closed!');
    };

    var OnSuccess = function (Data) {
        //$rootScope.NombreTienda = Data.name;
        $scope.Productos = Data;
        $scope.$apply();
    }

    Stores.getOne(OnSuccess, idTienda);

    var OnsuccessKroneros = function (Data) {
        $scope.kroneros = Data;
        $scope.$apply();
    }

    Stores.getKroneros(OnsuccessKroneros)

    var OnsuccesKronerosNuevo = function (Data) {
        var r = Data;
    }
    
    $scope.guardar = function () {
        var c = 0;
        if ($scope.datoskronero.name == "") {
            c++;
        }

        if ($scope.datoskronero.username == "") {
            c++;
        }

        if ($scope.datoskronero.password == "") {
            c++;
        }

        if ($scope.datoskronero.passwordd == "") {
            c++;
        }

        if ($scope.datoskronero.password === $scope.datoskronero.passwordd) {
        } else {
            c++;
        }

        if (c == 0) {
        Stores.PosttKroneros(OnsuccesKronerosNuevo, $scope.datoskronero );
    }
    }

    $scope.eliminar = function (dato) {
        Stores.DeleteKroneros(dato);
    }

    $scope.modificar = function (dato) {
        Stores.DeleteKroneros(dato);
    }

    var OnSuccessBuscador = function(data){
        $scope.DatosBuscador = data;
        $scope.$apply();

    }
    $scope.Buscar = function () {
        Products.Browser(OnSuccessBuscador, $scope.Buscador.texto)
    }

    $scope.addStockItem = function (IdProd) {
        var Objeto = {};
        Objeto.producId = IdProd;
        Objeto.storeId = idTienda;

        if(Products.SaveStockItem(Objeto))
        {
            alert("Se agrego correctamente este producto");
        }
    }

});

