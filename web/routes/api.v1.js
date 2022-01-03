var express = require('express');
var router = express.Router();
var path = require('path');
var calendar_json = require(path.join(__dirname, '..', 'public', 'data', 'calendar.json'));

router.route('/calendar')
    .get(function(req, res) {
        var year = req.query.year;
        var month = req.query.month;
        var week = req.query.week;
        var lunar = req.query.lunar ? req.query.lunar : "global";
        if (year) {
            if (month) {
                if (week) {
                    res.json(calendar_json["date"][lunar][year][month][parseInt(week) - 1])
                } else {
                    res.json(calendar_json["date"][lunar][year][month])
                }
            } else {
                res.json(calendar_json["date"][lunar][year])
            }
        } else {
            res.json(calendar_json);
        }
    });

module.exports = router;
