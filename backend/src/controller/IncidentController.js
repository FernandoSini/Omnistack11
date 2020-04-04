const connection = require('../database/connection')

module.exports = {
    async index(req,res){
       const { page = 1 } = req.query; //buscando dentro da request.query o parametro page
        
        const [count] = await connection('incidents').count() //query que vai retornar a quantidade de casos

        console.log(count)
       const incidents = await connection('incidents')
       .join('ongs', 'ongs.id', '=', 'incidents.ong_id')//relacionando dados de duas tabelas
       .limit(5) // definido um limite de 5 incidentes
       .offset((page- 1) * 5) // esquema de paginação pulando 5 limites por paginas
       .select(['incidents.*',
       'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'])
       
       res.header('X-Total-Count', count['count(*)'])  // vendo total de paginas
       return res.json(incidents)
    },

    async create(req, res){
       const { title, description, value } = req.body;
       const ong_id = req.headers.authorization; //info de quem esta logado vem do cabeçalho da aplicação, infos do contexto da requisição ex: dados de login, autenticação, idioma
        
       const [id] =  await connection('incidents').insert({ // o primeiro valor será armazenado no id
           title,
           description,
           value,
           ong_id
       })

       return res.json({ id })
    },

    async delete(req,res){
        const { id } = req.params;
        const ong_id  = req.headers.authorization; //pegando o id da ong logada --> porque eu preciso verificar se o incidente a ser deletado, realmente foi criado pela ong
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

            if(incident.ong_id !== ong_id){
                return res.status(401).json({ error: 'Operação não Autorizada'})
            }

            await connection('incidents').where('id', id).delete()
            return res.status(204).send() // 204 é quando a resposta tem sucesso  não tem conteudo/body
    }
}