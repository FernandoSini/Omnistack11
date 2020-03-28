const express = require('express')
const OngContrller = require('./controller/OngController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')


const routes = express.Router()
// rota/ recursos

//Métodos http 
//Get: buscar info do backend
//Post: Crian uma info no backend
//Put: alterar info no backend
//Delete: deletar uma info do backend

/**
 * Tipos de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados  na rota após ? (usado para Filtros e paginação)
 * 
 * Route Params: Parâmetros utilizados para identificar recursos /:id
 * Request Body: Corpo da requisição utilizado prara criar ou alterar user
 */
/**
 * SQL: MySQL, SQLite, PostegreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, Redis
 */

 /**
  * Driver: Select * from users
  * Query Builder: table ('users').select('*').where() --> KNEX.JS
  */

routes.post('/sessions',SessionController.create)
routes.post('/ongs',  OngContrller.create)
   //rota para listar as ongs
routes.get('/ongs',  OngContrller.index)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

routes.get('/profile', ProfileController.index)

    module.exports =  routes;
    