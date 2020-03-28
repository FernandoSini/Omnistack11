const knex = require('knex')
const configuration = require('../../knexfile')

const connection = knex(configuration.development)

//fazendo o export das configs do banco para uma variavel
module.exports = connection