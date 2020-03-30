const connection = require('../database/connection')

module.exports = {
    async index(request, response) {

        const { page = 1 } = request.query; // fazer paginação para limitar numero de resgistros que irá puxar

        const [count] = await connection('incidents').count(); // quantidade de itens da nossa lista - sera mandado para o header da requisição

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf',]); // esquema de paginação


        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents)
    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization; // dados do usuario, idioma, contexto...
        const [id] = await connection('incidents').insert({ // isso pode demorar - definir como async
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization; // dados do usuario - preciso para verificar se foi a mesma ong que criou

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted' }) // erro de não autorizado
        }

        await connection('incidents').where('id', id).delete()
        return response.status(204).send() // mandar retorno de sucesso sem retorno de conteudo
    }
}