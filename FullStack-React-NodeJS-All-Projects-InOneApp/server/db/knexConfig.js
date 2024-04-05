require('dotenv').config();
const knexLib = require('knex');
const config = require('../knexfile');
const Knex = knexLib(config[process.env.MODE]);

module.exports = Knex ;
