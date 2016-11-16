var express = require('express');
var emailSvc = require('../services/email.svc');

var router = express.Router();

router.post('/', function(req, res) {
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

module.exports = router;