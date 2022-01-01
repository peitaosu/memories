var express = require('express');
var router = express.Router();
var path = require('path');
var calendar_json = require(path.join(__dirname, '..', 'public', 'data', 'calendar.json'));

router.get('/', function(req, res, next) {
    res.json(calendar_json);
});

module.exports = router;
