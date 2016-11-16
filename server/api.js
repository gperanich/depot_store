var express = require('express');
//var welcome = require('./controllers/welcome.ctrl');
var products = require('./controllers/products.ctrl');
var purchases = require('./controllers/purchases.ctrl');
var contact = require('./controllers/contact.ctrl');
var apparel = require('./controllers/apparel.ctrl');
var accessories = require('./controllers/accessories.ctrl');

var router = express.Router();

//router.use('/welcome', welcome);
router.use('/products', products);
router.use('/purchases', purchases);
router.use('/contact_us', contact);
router.use('/apparel', apparel);
router.use('/accessories', accessories)

module.exports = router;