var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../data/:smart_trains:');

/* POST receive ip reported by raspberry pi. */
router.post('/rpi_ip', function(req, res, next) {
	var json = req.body;

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO raspberry_ip VALUES (?, ?)');
		stmt.run(json.ssid, json.ip);
        stmt.finalize();
    });

    db.close();
	res.send();
});

router.post('/temp', function(req, res, next) {
    var json = req.body;

    db.serialize(function () {
        var stmt = db.prepare('INSERT INTO temperature VALUES (?)');
        stmt.run(json.temperature);
        stmt.finalize();
    });

    db.close();
    res.send();
});

router.get('/rpi_ip', function(req, res, next) {
	var json = [];

    db.serialize(function () {
        var stmt = db.prepare('SELECT ssid, ip, datetime(time,"unixepoch") as time from raspberry_ip order by time desc limit 10');
        stmt.each(function(err, row) {
			json.push(row);
        })
    }, function() {
        res.json(json);
    });

    db.close();
});

router.get('/temp', function(req, res, next) {
    var json = [];

    db.serialize(function () {
        var stmt = db.prepare('SELECT temperature, datetime(time,"unixepoch") as time from temperature order by time desc limit 10');
        stmt.each(function(err, row) {
            json.push(row);
        })
    }, function() {
        res.json(json);
    });

    db.close();
});

module.exports = router;
