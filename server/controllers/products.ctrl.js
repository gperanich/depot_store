var express = require('express');
var procedures = require('../procedures/products.proc');

var router = express.Router();

// Collection for all products
router.route('/')
    .get(function(req, res) {
        procedures.all().then(function(products) {
            res.send(products);
        }, function(err) {
            res.status(500).send(err);
        });
    });

// Collect product by given id
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id).then(function(product) {
            res.send(product);
        }, function(err) {
            res.status(500).send(err);
        });
    });

module.exports = router;