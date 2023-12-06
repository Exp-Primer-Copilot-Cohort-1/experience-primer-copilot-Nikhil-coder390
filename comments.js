// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();

// Connect to mysql
var client = mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'o2'
});
client.connect();

// Create server
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.locals.pretty = true;
app.set('views', './views_mysql');
app.set('view engine', 'pug');

// Create router
router.route('/').get(function (req, res) {
    res.render('index');
});

router.route('/topic/add').get(function (req, res) {
    var sql = 'SELECT id,title FROM topic';
    client.query(sql, function (err, topics, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics: topics});
    });
});

router.route(['/topic', '/topic/:id']).get(function (req, res) {
    var sql = 'SELECT id,title FROM topic';
    client.query(sql, function (err, topics, fields) {
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            client.query(sql, [id], function (err, topic, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view', {topics: topics, topic: topic[0]});
                }
            });
        } else {
            res.render('view', {topics: topics});
        }
    });
});

router.route('/topic/:id/edit').get(function (req, res) {
    var sql = 'SELECT id,title FROM topic';
    client.query(sql, function (err, topics, fields) {
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            client.query(sql, [id], function (err, topic, fields)