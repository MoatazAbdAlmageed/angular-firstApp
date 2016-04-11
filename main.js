/**
 * Created by mezo on 06/04/16.
 */



var app = angular.module('minMax',
    [
        'ngResource',
        'jcs-autoValidate',
        'angular-ladda'
    ]
);


//ngResource


// app.factory("codeigniterFactory", function ($resource) {
//     return $resource("http://codeigniter.dev/index.php/welcome/getItem/:id");
// });


//app.run(function () {
//    console.log('run function');
//});

//app.factory("Contact", function ($resource) {
//    return $resource("http://codeigniter.dev/");
//})
//
//


/**
 * this is Moataz first service
 * return
 * 1.object of "Leanne Graham"
 */


/**
 * Get all users
 */
// app.service('getUsers', function ($resource) {
//     return $resource("http://codeigniter.dev/index.php/welcome/getAll/");
// });


/**
 * users
 */
app.service('users', function ($resource) {
    return $resource("http://codeigniter.dev/index.php/welcome/getUsers/");
});

app.service('user', function ($resource) {
    return $resource("http://codeigniter.dev/index.php/welcome/getUser/:id");
});

/**
 * Get specific user by id
 */
// app.service('user', function ($resource) {
//     var user = $resource("http://codeigniter.dev/index.php/welcome/getUser/:id");
//
//     var self = {
//         'page': 1,
//         'hasMore': true,
//         'isLoading': false,
//         'person': [],
//         'loadContact': user.get({id: 0}),
//     };
//     return self;
//
// });

// app.service('jsonplaceholderusers', function ($resource) {
//     // return $resource("http://localhost:3000/users");
//     return $resource("http://jsonplaceholder.typicode.com/users");
//     // return $resource("http://codeigniter.dev/index.php/welcome/getUsers/");
//     // var rs = $resource("http://localhost:3000/users");
//     //s
//     // var self = {
//     //     'page': 1,
//     //     'hasMore': true,
//     //     'isLoading': false,
//     //     'person': [],
//     //     'loadContact': rs.get()
//     // };
//     // return $resource("http://localhost:3000/users");
//
// });

app.service("jsonplaceholderusers", function ($resource) {
    return $resource(
        'http://localhost:3000/users', {}, {
            get: {
                method: 'GET',
                isArray: true,
                transformResponse: function (data, headers) {
                    //
                    // transform to array of objects
                    // console.log(data);
                    return data;
                }
            }
        }
    );
});
/**
 * Add user
 */


app.controller('minMaxDetailCTRL', function ($scope, jsonplaceholderusers, users, user) {


    // console.log(jsonplaceholderusers.get());
    // $scope.jsonplaceholderusers = jsonplaceholderusers.get();
    //jsonplaceholder
    // console.log(jsonplaceholderusers);
    // var
    // placeholderusers;

    // use service for first time

    // users.get(function (data) {
    //     console.log(data);
    // });

    // console.log(user);
    // user.get({id: 0}, function (data) {
    //     console.log(data);
    // })

    // var entries = Entry.query(function () {
    //     console.log(entries);
    // }); //query() returns all the entries

    // console.log(getUsers.get());

    // Injected in your controller
    $scope.users = users.get();
    $scope.user = user.get({id: 0});
});

app.controller('minMaxListCTRL', function (jsonplaceholderusers, $scope, $http, $rootScope) {

    /**
     * How to Improve Your REST Calls in Angular With ngResource
     * https://devdactic.com/improving-rest-with-ngresource/
     */

    //using  $http
    var codeigniterUsers = $http.get('http://codeigniter.dev/')
    codeigniterUsers.then(function (result) {
        $scope.codeigniterUsers = result.data;
    });


    $scope.persons = jsonplaceholderusers.query();

    //handle this with ngResource


    //$scope.usersFromcodeigniterUsingngResource = UserService.query();
    //console.log(usersFromcodeigniterUsingngResource);

    ////GET using $http
    //$http({
    //    method: "GET",
    //    url: "http://codeigniter.dev/index.php/welcome"
    //}).then(function mySucces(response) {
    //    $scope.myWelcome = response.data;
    //    //console.log($scope.myWelcome);
    //}, function myError(response) {
    //    $scope.myWelcome = response.statusText;
    //    //console.log($scope.myWelcome);
    //});
    //
    ///**
    // * AngularJS Promise : $resource GET example - JSFiddle
    // * http://jsfiddle.net/jsengel/aogu66fj/
    // */
    //
    //
    //var resource = $resource('http://codeigniter.dev');
    //$scope.example1 = resource.get();
    //
    //resource.get().$promise.then(function (value) {
    //    $scope.example2 = value;
    //});

    /**
     * Creating a CRUD App in Minutes with Angular's $resource
     * http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
     */



    //app.factory("Entry", function ($resource) {
    //    return $resource("http://codeigniter.dev/");
    //})


    //var entry = Entry.get(function () {
    //    console.log(entry);
    //}); // get() returns a single entry


    $scope.submitting = false;
    $scope.order = 'age';

    $scope.search = {};

    $rootScope.SelectedPerson = null;
    $scope.SelectPerson = function (person) {
        $rootScope.SelectedPerson = person;

    };

    $scope.setOrder = function (order) {
        $scope.order = order;

    };


    //alert('ok');

    var formModel = $scope.formModel = {};
    $scope.onSubmit = function (valid) {

        if (valid) {

            // if formModel obj not empty
            formModelKeysLength = Object.keys(formModel).length;
            //console.log(formModelKeysLength);
            //formModel = {
            //    id: 1,
            //        name: "Ali",
            //    status: "Best Friend"
            //}
            if (formModelKeysLength != 0) {
                $scope.submitting = true;
                console.clear(); //Console was cleared
                console.log('onSubmit function called');
                console.log(formModel);
                console.log('sending data ...  ');

                $scope.persons.push(formModel);
                // send HTTP request
                $http.post('https://minmax-server.herokuapp.com/register/', formModel).success(function (data) {
                    console.log('success');
                    $scope.submitting = false;
                }).error(function (data) {
                    console.log('error:XMLHttpRequest cannot load');
                    $scope.submitting = false;
                })

            }
            else {
                console.clear(); //Console was cleared
                console.log('please fill your data');
            }
        }
        else {
            console.log('Form validation ' + valid);
        }

    };

    //console.log($scope);

});