const express = require('express')
const routes = require('./routes')
const cors = require('cors') // determina quem vai poder acessar nossa aplicação
const server = express()

//server.use(cors({
//  origin: 'link do site' isso é só pra quando tiver em produção
//}))
server.use(cors())
server.use(express.json())
server.use(routes)

server.listen(3333)
