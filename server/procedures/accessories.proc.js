var db = require("../config/db");

exports.all = function() {
    return db.rows("GetAccessories");
}

exports.read = function(id) {
    return db.row("GetAccessory", [id]);
}