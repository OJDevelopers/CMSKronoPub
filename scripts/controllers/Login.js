angular.module('cmsApp.Login', ['firebase'])

.controller('loginCtrl', function ($scope, $rootScope, $firebaseAuth) {

    $scope.login = {
        email: "",
        password:""
    
    }

    $scope.Autentificacion = {
        datos: true
    }
    
    $scope.login = function () {
        var ref = new Firebase("https://krono-dev.firebaseio.com/v1/");
        ref.authWithPassword({
            "email": $scope.login.email,
            "password": $scope.login.password
        }, function (error, authData) {
            if (error) {
                console.log("Login Failed!", error);
                $scope.Autentificacion.datos = false;
            } else {
                localStorage['uid'] = authData.uid;
                localStorage['authToken'] = authData.token;
                console.log("Authenticated successfully with payload:", authData);


               // window.location.href = 'index.html';

               // var fb = new Firebase("http://krono-dev.firebaseio.com/v1/users/")

                //var fb = ref.child("users").startAt($scope.login.email).endAt($scope.login.email);

                //fb.on("value", function (snapshot) {
                //    console.log(snapshot.val());
                //}, function (errorObject) {
                //    console.log("The read failed: " + errorObject.code);
                //});

                var fb = new Firebase("http://krono-dev.firebaseio.com/v1/users")

                var norm = new Firebase.util.NormalizedCollection(fb.child('profile'), fb.child('chainOwner'));

                // specify the fields for each path
                norm = norm.select({key:'profile.email.$value'}, 'profile.name', 'chainOwner.chainId');

                // apply a client-side filter to the data (only return users where key === 'user1'
                norm = norm.filter(
                    function (data, key, priority) {
                        return data.email.toLowerCase() === $scope.login.email.toLowerCase();
                    }
                );

                // get a reference we can use like a normal Firebase instance
                ref2 = norm.ref();

                // run it and see what we get
                ref2.on('value', function (snap) {
                    var h = snap.val();
                    localStorage["userInfo"] = JSON.stringify(h);
                    console.log(snap.val());
                    window.location.href = 'index.html';
                });
            }
        });
    };

    $scope.createUser = function () {

        var ref = new Firebase("https://krono-dev.firebaseio.com/v1/");
        auth = $firebaseAuth(ref);

        $scope.message = null;
        $scope.error = null;

        auth.$createUser({
            email: "Prueba4@gmail.com",
            password: "micasita123!"
        }).then(function (userData) {
            
            var fb = ref.child("users").child("profile");
            var r = fb.push({
                'name': 'Usuario de prueba 4',
                'email': 'Prueba4@gmail.com',
                'picture': '',
            })

            var fb2 = ref.child("users").child("chainOwner").child(r.key());
            var r2 = fb2.set({
                'chainId': 'Casa del Granjero'
            })

            console.log("User created with uid: " + userData.uid);
        }).catch(function (error) {
            console.log(error);
        });
    };

    var OnSuccess = function (Data) {
    }

    var OnError = function (Data) {
        alert(JSON.stringify(Data));
    }


});

