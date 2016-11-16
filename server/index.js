var path = require('path');
var express = require('express');
var app = express ();
var bodyParser = require('body-parser');
var prerender = require('prerender-node');
var cookieParser = require("cookie-parser");
var api = require('./api');

//var app = express ();
var clientPath = path.join(__dirname, '../client');

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);

app.get('*', function(req, res, next) {
    if (isAsset(req.url)) {
        return next();
    } else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
});

app.listen(3000); 

function isAsset(path) {
    var pieces = path.split('/');
    if (pieces.length === 0 ) { return false };
    var last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1) {
        return true;
    } else if (last.indexOf('.') !== -1) {
        return true;
    } else {
        return false;
    }
}
