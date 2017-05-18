/**
 * Created by ra on 18/05/2017.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/:smart_trains:');

db.serialize(function () {
    db.run("CREATE table IF NOT EXISTS raspberry_ip (" +
        "ssid text, " +
        "ip text, " +
        "time int default (strftime('%s','now'))" +
        ");"
    );

    db.run("CREATE table IF NOT EXISTS temperature (" +
        "temperature real, " +
        "time int default (strftime('%s','now'))" +
        ");"
    );

    db.close();
});