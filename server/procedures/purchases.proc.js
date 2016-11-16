var db = require("../config/db");

exports.all = function() {
    return db.rows("GetPurchases");
}

exports.read = function(id) {
    return db.row("GetProduct", [id]);
}

exports.create = function(productid, price, stripetransactionid) {
    return db.row("NewPurchase", [productid, price, stripetransactionid])
}