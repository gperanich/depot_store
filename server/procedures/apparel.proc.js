var db = require("../config/db");

exports.all = function() {
    return db.rows("GetApparel");
}

exports.read = function(id) {
    return db.row("GetOneApparel", [id]);
}