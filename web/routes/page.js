var express = require('express');
var router = express.Router();
var db = require('../database');
var md5 = require('md5');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Calendar' });
});

router.post('/login', (req, res, next) => {
    var errors = [];
    if (!req.body.password) {
        errors.push('No password specified');
    }
    if (!req.body.email) {
        errors.push('No email specified');
    }
    if (errors.length) {
        res.status(400).json({ 'error': errors.join(',') });
        return;
    }
    var data = {
        email: req.body.email,
        password: md5(req.body.password)
    }
    var sql = 'SELECT * FROM user WHERE email=? AND password=?'
    var params = [data.email, data.password]
    db.get(sql, params, function (err, row) {
        if (err) {
            res.status(400).json({ 'error': err.message })
            return;
        }
        if (!row) {
            res.status(404).json({ 'error': 'user not found.' })
            return;
        }
        res.cookie('logged-in-email', row['email'], {maxAge: 360000, signed: true}).cookie('logged-in-id', row['id'], {maxAge: 360000, signed: true}).json(row);
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('logged-in-email').clearCookie('logged-in-id').send('logged-in cookie cleared');
});

module.exports = router;
