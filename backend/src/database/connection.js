const knex = require('knex');
const configuration = require('../../knexfile')

const connection = knex(configuration.development); // estamos usando a configuration - develoment

module.exports = connection