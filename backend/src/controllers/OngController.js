const crypto = require('crypto') // para ID
const connection = require('../database/connection')

module.exports = {
    async index (request, response){
        const ongs = await connection('ongs').select('*')
        return response.json(ongs)
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX') // gerar Letras para nosso ID

        await connection('ongs').insert({ // isso pode demorar - definir como async
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id })
    }
}