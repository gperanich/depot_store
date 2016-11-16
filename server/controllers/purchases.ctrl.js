var express = require('express');
var procedures = require('../procedures/purchases.proc');
var stripeSvc = require('../services/stripe.svc');
var emailSvc = require('../services/email.svc');

var router = express.Router();

// collect the product that is being purchased & post the purchase
router.route('/')
    .get(function(req, res) {
        procedures.all().then(function(purchases) {
            res.send(purchases);
        }, function(err) {
            res.status(500).send(err);
        });
    })
    .post(function(req, res) {
        var amount = Number(req.body.amount);
        amount *= 100;

        stripeSvc.chargeCard(req.body.token, amount, 'Purchase')
            .then(function(success) {
                console.log(success);
                res.status(201).send(success);
            }, function(err) {
                res.sendStatus(500);
            })
        });
router.route('/post')
    .post(function(req, res) {
        procedures.create(req.body.productid, req.body.price, req.body.stripetransactionid)
            .then(function(id){
                res.status(201).send(id);
            }, function(err) {
                res.status(500).send(err)
        });
    });

router.route('/purchase_email')
    .post(function(req, res) {
        console.log(req.body);
        emailSvc.sendEmail(req.body.toAddress, req.body.fromAddress, req.body.subject, req.body.emailBody)
        .then(function(email) {
            console.log(email);
            res.send('Email Sent!');
        }, function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

router.route('/:id')
    .get(function(req, res) {
        procedures.read(req.params.id).then(function(purchase) {
            res.send(purchase);
        }, function(err) {
            res.status(500).send(err);
        });
    });

    
module.exports = router;

  

