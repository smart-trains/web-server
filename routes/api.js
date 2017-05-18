var path = require('path');
var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(path.resolve(__dirname, '../data/:smart_trains:'));

/* POST receive ip reported by raspberry pi. */
router.post('/rpi_ip', function(req, res, next) {
	var json = req.body;

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO raspberry_ip VALUES (?, ?, ?)');
		stmt.run(json.ssid, json.ip, Date.now());
        stmt.finalize();
    });

	res.send();
});

router.post('/temperature', function(req, res, next) {
    var json = req.body;

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO temperature VALUES (?, ?)');
        stmt.run(json.temperature, Date.now());
        stmt.finalize();
    });

    res.send();
});

router.get('/rpi_ip', function(req, res, next) {
	var json = [];

    db.serialize(function () {
        var stmt = db.prepare('SELECT ssid, ip, time from raspberry_ip order by time desc limit 10');
        stmt.each(function(err, row) {
			json.push(row);
        }, function() {
            res.json(json);
        });

        stmt.finalize();
    });
});

router.get('/temperature', function(req, res, next) {
    var json = [];

    db.serialize(function () {
        var stmt = db.prepare('SELECT temperature, time from temperature order by time desc limit 10');
        stmt.each(function(err, row) {
            json.push(row);
        }, function() {
            res.json(json);
        });

        stmt.finalize();
    });

});

module.exports = router;
