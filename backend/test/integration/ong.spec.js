const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback(); // desfazer as tabelas
        await connection.migrate.latest(); // para teste - fazer todas as tableas
    })

    afterAll( async () => {
        await connection.destroy()
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "APAD22",
            email: "contato@apad.com.br",
            whatsapp: "9356464008",
            city: "Rio do Sul",
            uf: "ES"
        })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)

    })
})