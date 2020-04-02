const knex = require('knex');
const configuration = require('../../knexfile')

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development

const connection = knex(config); // estamos usando a configuration - develoment

module.exports = connection