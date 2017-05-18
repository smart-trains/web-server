/**
 * Created by ra on 18/05/2017.
 */
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.resolve(__dirname, '../data/:smart_trains:'));

db.serialize(function () {
    db.run("CREATE table IF NOT EXISTS raspberry_ip (" +
        "ssid text, " +
        "ip text, " +
        "time integer" +
        ");"
    );

    db.run("CREATE table IF NOT EXISTS temperature (" +
        "temperature real, " +
        "time integer" +
        ");"
    );

    db.close();
});