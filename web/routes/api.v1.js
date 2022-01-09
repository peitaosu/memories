var express = require('express');
var router = express.Router();
var path = require('path');
var calendar_json = require(path.join(__dirname, '..', 'public', 'data', 'calendar.json'));
var db = require('../database');
var md5 = require('md5');

router.route('/calendar')
    .get((req, res) => {
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

router.route('/users')
    .get((req, res) => {
        var sql = "select id, name, email, active from user"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": rows
            })
        });
    });

router.route('/user/:id')
    .get((req, res, next) => {
        var sql = "select id, name, email, active from user where id = ?"
        var params = [req.params.id]
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.json({
                "message": "success",
                "data": row
            })
        });
    });

router.route('/user')
    .post((req, res, next) => {
        var errors = []
        if (!req.body.password) {
            errors.push("No password specified");
        }
        if (!req.body.email) {
            errors.push("No email specified");
        }
        if (errors.length) {
            res.status(400).json({ "error": errors.join(",") });
            return;
        }
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password),
            active: true
        }
        var sql = 'INSERT INTO user (name, email, password, active) VALUES (?,?,?)'
        var params = [data.name, data.email, data.password]
        db.run(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id": this.lastID
            })
        });
    });

module.exports = router;
