angular.module('GitFaced.controllers', [])
    .controller('WelcomeController', ['$scope', 'SEOService', '$location', function ($scope, SEOService, $location) {
        SEOService.setSEO({
            title: 'D/U Store | Home',
            description: 'Depot/U Products',
            image: 'http://' + $location.host() + '/views/assets/puppy.png',
            url: $location.url()
        });
    }])
    .controller('PurchaseController', ['$scope', 'Purchase', '$http', '$routeParams', 'Product', 'Email', '$location', function ($scope, Purchase, $http, $routeParams, Product, Email, $location) {
        $scope.product = Product.get({ id: $routeParams.id }, function() {
            console.log($scope.product);
            $scope.productPrice = $scope.product.price;
        });
        $scope.selectedQuantity = '1';
        $scope.numbers = [2,3,4,5,6,7,8,9];
        console.log($scope.product);
        $scope.changePrice = function() {
            $scope.productPrice = $scope.selectedQuantity * $scope.product.price;
        }

        $scope.confirmPurchase = function () {
            Stripe.card.createToken({
                number: $scope.cardNumber,
                cvc: $scope.cvc,
                exp_month: $scope.expMonth,
                exp_year: $scope.expYear
            }, function (status, response) {
                if (response.error) {
                    console.log(response.error);
                } else {
                    var token = response.id;
                    var transactionData = {
                        amount: $scope.product.price,
                        token: token
                    }
                    var purchase = new Purchase(transactionData);
                    purchase.$save(function(success) {
                        console.log(success.id);
                        var purchaseData = {
                            productid: $scope.product.id,
                            price: $scope.productPrice,
                            stripetransactionid: success.id
                        }
                        $http({
                            url: 'http://localhost:3000/api/purchases/post',
                            method: 'POST',
                            data: purchaseData
                        }).then(function(success) {
                            console.log(success);

                            var clientEmailData = {
                                toAddress: [{email: $scope.clientEmail}],
                                fromAddress: 'noreply@gitfaced.pizza',
                                subject: 'Order Confirmation',
                                emailBody: 'Hey ' + $scope.clientName + '. Thank you for purchasing a new ' + $scope.product.title + '. Your total was $' + $scope.productPrice + '. Come back to see us, and Git Faced!'
                            }
                            console.log(clientEmailData);
                            var purchaseEmail = new Email(clientEmailData);
                            console.log(purchaseEmail);
                            $http({
                                url: 'http://localhost:3000/api/purchases/purchase_email',
                                method: 'POST',
                                data: purchaseEmail
                            }).then(function(success) {
                                console.log(success);
                                $location.url('/');
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    });
                }
            })
        }
    }])
    .controller('ProductController', ['$scope', 'Product', '$location', 'SEOService', function ($scope, Product, $location, SEOService) {
        $scope.products = Product.query();
    }])
    .controller('ApparelController', ['$scope', 'Apparel', '$location', 'SEOService', function ($scope, Apparel, $location, SEOService) {
        function getApparel() {
            $scope.apparel = Apparel.query();
        }
        getApparel();
        SEOService.setSEO({
            title: 'D/U Store | Apparel',
            description: 'Depot/U Apparel',
            //image:'views/assets/puppy.png',
            url: $location.url()
        });

        // $scope.apparel.panelShow = false;
        // $scope.apparel.infoHide = true;
        $scope.toggleDivs = function(apparel) {
            apparel.displayInfo = !apparel.displayInfo;
            // apparel.panelShow = !apparel.panelShow;
            // apparel.infoHide = !apparel.infoHide;
        }
    }])   

    .controller("SingleProductController", ["$scope", "$routeParams", "Product", "$location", "SEOService", function($scope, $routeParams, Product, $location, SEOService) {  
        SEOService.setSEO({
            title: "D/U Store | home",
            image: "assets/logo.svg",
            description: "Depot/U Products",
            url: $location.absUrl()
        })  
        $scope.products = Product.get({ id:$routeParams.id });
    }])


    .controller('AccessoriesController', ['$scope', 'Accessories', '$location', 'SEOService', '$routeParams', function ($scope, Accessories, $location, SEOService, $routeParams) {
        function getAccessories() {
            $scope.accessories = Accessories.query();
        }
        getAccessories();

          SEOService.setSEO({
            title: 'D/U Store | Accessories',
            description: 'Depot/U Accessories',
            //imageurl:'views/assets/puppy.png',
            url: $location.url()
        });

        $scope.toggleDivs = function(accessories) {
            accessories.displayInfo = !accessories.displayInfo;
        }

        // var singleId = $routeParams.id;
        // $scope.accessories = Accessories.get({ id: singleId });
       
    }])



    .controller('ContactController', ['$scope', '$location', 'Email', function ($scope, $location, Email) {
        $scope.sendContactEmail = function () {

            var emailData = {
                toAddress: [{ email: 'gperanich@gmail.com' }, { email: 'thecountryofmalaysia@gmail.com' }, { email: 'redbullgrl@yahoo.com' }],
                fromAddress: $scope.contactEmail,
                subject: $scope.contactSubject,
                emailBody: $scope.newContactEmail
            }
            console.log(emailData);
            var email = new Email(emailData);
            email.$save(function(success) {
                console.log(success);
            });

            $location.url('/');
        }
    }])



