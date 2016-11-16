var express = require('express');
var procedures = require('../procedures/accessories.proc');

var router = express.Router();

// Collection for all products
router.route('/')
    .get(function(req, res) {
        procedures.all().then(function(accessories) {
            res.send(accessories);
        }, function(err) {
            res.status(500).send(err);
        });
    });

// Collect product by given id
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id).then(function(accessory) {
            res.send(accessory);
        }, function(err) {
            res.status(500).send(err);
        });
    });

module.exports = router;