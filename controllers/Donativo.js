const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Donativo = require('../util/database').models.Donativo;

//Crea el registro de un donativo
exports.postGenerarDonativo = (req,res)=>{
    //El body del JSON lo asigna a la variable object.
    var object = req.body
    console.log(object)
    //Se crea el registro del donativo
    Donativo.create({
        idDonativo: object.idDonativo,
        donante: object.donante,
        monto: object.monto,
        UsuarioCorreo: object.UsuarioCorreo
    }).then(resultado=>{
        res.send("0")
        })
      .catch(error=>{
          /*Si hay un error, nos redirige a la misma página de registro
          pero con un código de error (1) para desplegar la alerta
          de que el usuario o correo electrónico ya están en uso*/
          res.send("1")
          console.log(error)
        });
};

exports.getDonativos = (req,res) => {
    var correo = req.query.correo
    sequelize.query("SELECT TOP 10 * FROM Donativo WHERE UsuarioCorreo = '" + correo + "' order by facturado DESC;")
    .then(resultado=> {
        res.send(resultado[0])
    })
}

exports.getDonativo = (req,res) =>{
    var idDonativo = req.query.idDonativo
    sequelize.query("SELECT * FROM Donativo WHERE idDonativo = '" + idDonativo + "';")
    .then(resultado=> {
        res.send(resultado[0][0])
    })
}

exports.postFactura = (req,res) => {
    sequelize.query("UPDATE Donativo SET facturado = '0' WHERE idDonativo = '"+ req.body.idDonativo +"';")
    .then(resultado =>{
        res.send("0")
    })
    .catch(err =>{
        res.send(err)
    })
}
exports.postUnFactura = (req,res) => {
    sequelize.query("UPDATE Donativo SET facturado = '1' WHERE idDonativo = '"+ req.body.idDonativo +"';")
    .then(resultado =>{
        console.log("RES "+ resultado)
        res.send("0")
    })
    .catch(err =>{
        console.log("ERROR "+ err)
        res.send(err)
    })
}