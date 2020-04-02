const crypto = require('crypto') // para ID
module.exports =  function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); // gerar Letras para nosso ID
}