const sqlite3 = require("sqlite3").verbose();

module.exports.db = new sqlite3.Database("./models/debre-bisrat-book-library.db");
