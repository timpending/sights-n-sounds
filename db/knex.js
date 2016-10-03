var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile')[development];
var knex = require('knex')(config);
module.exports= knex;
