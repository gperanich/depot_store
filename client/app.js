angular.module('GitFaced', ['ngRoute', 'ngResource', 'GitFaced.controllers', 'GitFaced.services', 'GitFaced.factories'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'views/welcome.html',
                controller: 'WelcomeController'
            })

            .when('/products', {
                templateUrl: 'views/products.html',
                controller: 'ProductController'
            })
            .when('/apparel/:id', {
                templateUrl: 'views/apparel.html',
                controller: 'ApparelController'
            })
            .when('/apparel', {
                templateUrl: 'views/apparel.html',
                controller: 'ApparelController'
            })
             .when('/accessories/:id', {
                templateUrl: 'views/accessory.html',
                controller: 'AccessoriesController'
            })
             .when('/accessories', {
                templateUrl: 'views/accessories.html',
                controller: 'AccessoriesController'
            })
            .when('/products/:id', {
                templateUrl: 'views/single_product.html',
                controller: 'SingleProductController'
            })
            .when('/contact_us', {
                templateUrl: 'views/contact_us.html',
                controller: 'ContactController'
            })
            .when('/purchase/:id', {
                templateUrl: 'views/purchase.html',
                controller: 'PurchaseController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
