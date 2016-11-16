angular.module('GitFaced.factories', [])
.factory('Product', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/products/:id', { id: '@id' }, {
        'update': { method: 'PUT' }
    });
}])
.factory('Purchase', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/purchases/:id', { id: '@id' }, {
        'update': { method: 'PUT' } 
    });
}])
.factory('Apparel', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/apparel/:id', { id: '@id' }, {
        'update': { method: 'PUT' } 
    });
}])
.factory('Accessories', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/Accessories/:id', { id: '@id' }, {
        'update': { method: 'PUT' } 
    });
}])
.factory('Email', ['$resource', function($resource) {
    return $resource('http://localhost:3000/api/contact_us/:id', { id: '@id' }, {
        "update": { method: 'PUT'}
    });
}]);
