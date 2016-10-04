var express = require('express');
var router = express.Router();
// var knex=require(‘../db/knex’);
// var pg = require(‘pg’);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('record', { title: 'Record' });
});

module.exports = router;
