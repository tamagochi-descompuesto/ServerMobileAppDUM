/*
*Métodos que permiten encriptar cualquier texto usando el algoritmo aes-256-ctr
*se usa la misma llave privada para todas llamadas al metodo
*este metodo se usa principalmente para las contraseñas.
*Autor: Erick Hernández Silva
*/

//modulo crypto para encriptar
const crypto = require('crypto');
//definimos el algoritmo de encriptacion a usar
const algorithm = 'aes-256-ctr';
//definimos la llave privada para encriptar y desencriptar
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
//definimos iv
const iv = '1010101010110101'
//crypto.randomBytes(16);
//const iv = crypto.randomBytes(16);
//Funcion que encripta un texto dado
const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    //const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    var encrypted = cipher.update(text, 'utf8','hex')
    encrypted += cipher.final('hex')
    console.log(encrypted)
    //return {
        //iv: iv.toString('hex'),
        //content: encrypted.toString('hex')
    //};
    return encrypted
};
//funcion que devuelve el texto que estaba encriptado
const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

    var decrypted = decipher.update(hash, 'hex', 'utf8')
    decrypted +=  decipher.final('utf8')

    return decrypted
};

const hash = (text) => {
    const hash = crypto.createHash('sha256');
    hash.update(text);

    return hash.digest('hex');
}

module.exports = {
    encrypt,
    decrypt,
    hash
};