var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':smart_trains:')

/* POST receive ip reported by raspberry pi. */
router.post('/rpi_ip', function(req, res, next) {
  	console.log(req.body);
	res.send();
});

module.exports = router;
