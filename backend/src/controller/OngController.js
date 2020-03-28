const connection = require('../database/connection')
const crypto = require('crypto') //criptografia, mas para gerar texto aleatorios

module.exports = {
    async index (req, res) { // listagem das tabelas
        //await para aguardar um codigo finalizar antes
        const ongs = await connection('ongs').select('*')
    
        return res.json(ongs)
    },

    async create(req, res){
        const {name, email, whatsapp,city, uf} = req.body; //desestruturação é pra pegar os dados separadamente

        const id = crypto.randomBytes(4).toString('HEX') //caracteres hexadecimais 
    
        //fazendo a conexão com o banco
        //o await vai fazer com que passe primeiro pela conexão pra depois retornar a resposta
       await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })    
            return res.json({ id })
    
    }
}