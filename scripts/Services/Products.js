function ModelProducts(Objeto) {
    var result = {
        'profile':{
            "name": Objeto.name,
            "image": Objeto.image
        },
        'detail': {
            'description': Objeto.description,
            'keywords': Objeto.keywords,
            'unitWeight': Objeto.unitWeight,
            'imageList': Objeto.imageList
        },
        'defaultStockItem': {
            'barCode': Objeto.barCode
        }
    }

    return result;
}


function ModelStockItems(Objeto) {
    var result = {
        'profile': {
            'productId': Objeto.producId,
            'discount': 0,
            'price': 0
        },
        'detail': {
            'storeId': Objeto.storeId
        },
        'settings': {
            'priceTransformation': "",
            'basePrice': 0,
            'POSId': "",
            'inventory': 0
        }
    }

    return result;
}

angular.module('cmsApp.ProdutsService', [])
.factory("Products", function ($rootScope, FBURL, FormatResponse) {

    var Result = {};

    Result.SaveProduct = function(CallBack, Objeto){
        var ref = new Firebase(FBURL);
        var Modelo = new ModelProducts(Objeto);

        //Contruyo la ruta del profile de productos
        var ProfileProd = ref.child("products").child("profile");
        var respProd = ProfileProd.push(Modelo.profile);//inserto
        //obtengo el id
        var idProducto = respProd.key();
        //construyo la ruta del detail del producto recien creado
        var DetProd = ref.child("products").child("details").child(idProducto);
        DetProd.set(Modelo.detail)//actualizo
        //contruyo la ruta del defaultStockItem
        var StockItem = ref.child("products").child("defaultStockItem").child(idProducto);
        StockItem.set(Modelo.defaultStockItem)//actualizo

        var datos = {
            producId: idProducto,
            storeId: Objeto.storeId
            };

        Result.SaveStockItem(datos)

        return true;
    }

    Result.SaveStockItem = function (Objeto) {
        var ref = new Firebase(FBURL);
        var Modelo = new ModelStockItems(Objeto);

        //Contruyo la ruta del profile de productos
        var ProfileProd = ref.child("stockItems").child("profile");
        var respProd = ProfileProd.push(Modelo.profile);//inserto
        //obtengo el id
        var idProducto = respProd.key();
        //construyo la ruta del detail del producto recien creado
        var DetProd = ref.child("stockItems").child("details").child(idProducto);
        DetProd.set(Modelo.detail)//actualizo
        //contruyo la ruta del defaultStockItem
        var StockItem = ref.child("stockItems").child("settings").child(idProducto);
        StockItem.set(Modelo.settings)//actualizo

        return true;
    }

    Result.Browser = function (CallBack, Texto) {
        var path = new RegExp(Texto.toLowerCase());

        var fb = new Firebase(FBURL + "products/")

        var norm = new Firebase.util.NormalizedCollection(fb.child('profile'), fb.child('defaultStockItem'));

        // specify the fields for each path
        norm = norm.select('profile.name', 'defaultStockItem.barCode');

        // apply a client-side filter to the data (only return users where key === 'user1'
        norm = norm.filter(
            function (data, key, priority) {
                return path.test(data.name.toLowerCase());
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

    return Result;
})