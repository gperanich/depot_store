var express = require('express');
var procedures = require('../procedures/apparel.proc');

var router = express.Router();

// Collection for all products
router.route('/')
    .get(function(req, res) {
        procedures.all().then(function(apparel) {
            res.send(apparel);
        }, function(err) {
            res.status(500).send(err);
        });
    });

// Collect product by given id
router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id).then(function(apparel) {
            res.send(apparel);
        }, function(err) {
            res.status(500).send(err);
        });
    });

module.exports = router;