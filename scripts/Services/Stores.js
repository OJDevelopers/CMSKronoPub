angular.module('cmsApp.StoresService', [])
.factory('Stores', function ($rootScope, FBURL, FormatResponse) {
    var resultado = {}

    resultado.getAll = function (CallBack) {
        var fb = new Firebase(FBURL + "stores/")

        var norm = new Firebase.util.NormalizedCollection(fb.child('profile'));

        // specify the fields for each path
        norm = norm.select('profile.name', 'profile.logo', 'profile.chainId', 'profile.isActive');

        // apply a client-side filter to the data (only return users where key === 'user1'
        norm = norm.filter(
            function (data, key, priority) {
                return data.chainId.toLowerCase() === $rootScope.UserAuth.chainId.toLowerCase();
            }
        );

        // get a reference we can use like a normal Firebase instance
        var ref2 = norm.ref();

        // run it and see what we get
        ref2.on('value', function (snap) {
            var h = FormatResponse(snap.val());
            CallBack(h);
        });

    }

    resultado.getOne = function (CallBack, id) {

        var fb = new Firebase(FBURL + "stockItems/")
        var fbProd = new Firebase(FBURL + "products/")

        var norm = new Firebase.util.NormalizedCollection(fb.child('details'), fb.child('profile'), [fbProd.child('profile'), 'Products', 'profile.productId'], [fbProd.child('defaultStockItem'), 'defaultStockItem', 'profile.productId']);

        // specify the fields for each path
        norm = norm.select('profile.productId', 'profile.discount', 'profile.price', 'details.storeId', { key: 'Products.name', alias: 'ProductName' }, { key: 'Products.image', alias: 'ProductImage' }, { key: 'defaultStockItem.barCode', alias: 'ProductBarcode' });

        // apply a client-side filter to the data (only return users where key === 'user1'
        norm = norm.filter(
            function (data, key, priority) {
                return data.storeId.toLowerCase() === id.toLowerCase();
            }
        );

        // get a reference we can use like a normal Firebase instance
        var ref2 = norm.ref();

        //var refPag = new Firebase.util.Paginate(
        //    ref2,
        //    'number',
        //    { pageSize: 3 }
        //);

        //refPag.on('child_added', function (snap) {
        //    console.log('added', snap.key());
        //});

        //refPag.on('child_removed', function (snap) {
        //    console.log('removed', snap.key());
        //});

        //refPag.page.next();
        //// added rec1
        //// added rec2
        //// added rec3

        //refPag.page.prev()
        // run it and see what we get
        ref2.on('value', function (snap) {
            var h = FormatResponse(snap.val());
            CallBack(h);
        });

    }

    resultado.getKroneros = function (CallBack) {
        var fb = new Firebase(FBURL + "kroneros/")

        var norm = new Firebase.util.NormalizedCollection(fb.child('profile'), fb.child('settings'));

        // specify the fields for each path
        norm = norm.select('profile.name', 'profile.username', 'profile.storeId', 'profile.isActive', 'profile.id','settings.password');

        // apply a client-side filter to the data (only return users where key === 'user1'
        norm = norm.filter(
            function (data, key, priority) {
                return data.storeId.toLowerCase() === $rootScope.IDtienda.toLowerCase();
            }
        );

        // get a reference we can use like a normal Firebase instance
        var ref2 = norm.ref();

        // run it and see what we get
        ref2.on('value', function (snap) {
            var h = FormatResponse(snap.val());
            CallBack(h);
        });

    }

    resultado.getKronerosid = function (CallBack,id) {
        var fb = new Firebase(FBURL + "kroneros/")

        var norm = new Firebase.util.NormalizedCollection(fb.child('profile'));

        // specify the fields for each path
        norm = norm.select('profile.name', 'profile.username', 'profile.storeId', 'profile.isActive', 'profile.id');

        // apply a client-side filter to the data (only return users where key === 'user1'
        norm = norm.filter(
            function (data, key, priority) {
                return key.toLowerCase() === id.toLowerCase();//esto es un filtro
            }
        );

        // get a reference we can use like a normal Firebase instance
        var ref2 = norm.ref();

        // run it and see what we get
        ref2.on('value', function (snap) {
            var h = FormatResponse(snap.val());
            CallBack(h);//aqui es la respuesta de la ejecucion
        });

    }

    resultado.PosttKroneros = function (CallBack, datos) {
        
        
        var ref = new Firebase("https://krono-dev.firebaseio.com/v1/");
        auth = $firebaseAuth(ref);

        $scope.message = null;
        $scope.error = null;

        auth.$createUser({
            email: 'kroneros' + datos.username + '@kronomartet.co',
            password: datos.password
        }).then(function (userData) {
        var ref = new Firebase(FBURL)
        var fb = ref.child("kroneros").child("profile");

        var r = fb.push({
                'name': datos.name,
                'username': datos.username,
            'storeId': $rootScope.IDtienda,
            'isActive': true
        })

        var fb2 = ref.child("kroneros").child("settings").child(r.key());
        var r2 = fb2.set({
                'userid': userData.uid,
                'password': datos.password
        })
            console.log("User created with uid: " + userData.uid);
        }).catch(function (error) {
            console.log(error);
        });

    }

    resultado.DeleteKroneros = function (datos) {
        var ref = new Firebase(FBURL + "kroneros/profile/" + datos)

        ref.remove(function (error) {
            if (error == false) {
                console.log(error);
            } else {
                console.log("Eliminado correctamente")
            }
        });
    }

    resultado.pustKroneros = function (datos) {
        var ref = new Firebase(FBURL + "kroneros/profile/" + datos.id)

        var onComplete = function (error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
            }
        };

        ref.update({ name: datos.name, username: datos.username }, onComplete);
    }

    return resultado;
})
