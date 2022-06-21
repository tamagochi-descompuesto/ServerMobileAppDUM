const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Usuario = require('../util/database').models.Usuario;
const sec = require('../util/crypto')
//Crea el registro del usuario 
exports.postRegistroUsuario = (req,res)=>{
    //El body del JSON lo asigna a la variable object.
    var object = req.body
    console.log(object)
    console.log(object.rfc)
    if(object.rfc == "null"){
        var hashedRfc = null
    }
    else{
        var hashedRfc = sec.encrypt(object.rfc.toUpperCase())
    }
    //var hashedEmail = sec.encrypt(object.correoElec.toLowerCase())
    //Se crea el registro del usuario
    Usuario.create({
        correo: object.correoElec.toLowerCase(),
        password: sec.hash(object.password),
        nombre: object.nombre,
        apellidoPaterno: object.apellidoP,
        apellidoMaterno: object.apellidoM,
        rfc: hashedRfc,
    }).then(resultado=>{
            //console.log(resultado)
            res.send("0")
        })
      .catch(error=>{
          /*Si hay un error, nos redirige a la misma página de registro
          pero con un código de error (1) para desplegar la alerta
          de que el usuario o correo electrónico ya están en uso*/
          //console.log(error)
          res.send("1")
          
        });
};

//Permite que el usuario inicie sesión a través del cliente
exports.postIniciarSesion = (req,res) => {
    //asignamos los datos del usuario a la variable object
    var object = req.body
    //Buscamos en los registros que efectivamente el usuario exista.
    //var hashedEmail = sec.encrypt(object.correoElec.toLowerCase())
    Usuario.findByPk(object.correoElec.toLowerCase())//hashedEmail)
        .then(usuario => {
            //Si el jugador existe
            if(usuario){
                if(usuario.enabled == "0"){
                    if(usuario.password == sec.hash(object.password)){
                        console.log("b")
                        if(usuario.rfc != null){
                            var rfc = sec.decrypt(usuario.rfc)
                        }else{
                            var rfc = "NULL"
                        }
                        var correo = usuario.correo.toLowerCase()//sec.decrypt(usuario.correo)
                        var jsonUsuario = {
                            nombre: usuario.nombre,
                            apellidoP: usuario.apellidoPaterno,
                            apellidoM: usuario.apellidoMaterno,
                            correoElec: correo,
                            rfc: rfc,
                            isAdmin: usuario.isAdmin
                        }
                        //console.log("Usuario existente")
                        res.send(jsonUsuario)
                    }
                    else{
                        console.log(sec.hash(object.password))
                        console.log(usuario.password)
                        res.send("1")
                    }
                }
                else{
                    res.send("2")
                }
                //var jsonDecrypt = {
                    //iv: jugador.password.split('|')[0],
                    //content: jugador.password.split('|')[1]
                //};
                
            }else{
                res.send("1")
            }
        })
        .catch(err=>{
            console.log("Usuario inexistente")
            console.log(err)
            res.send("1")
            
        })
}

//Modifica los datos del Usuario especificado;
exports.postEditarPerfil = (req,res) => {
    //Se igualan los datos nuevos del usuario a la variable object
    var object = req.body;
    console.log(object)
    if(object.rfc == ""){
        var hashedRfc = null
    }
    else{
        var hashedRfc = sec.encrypt(object.rfc.toUpperCase())
    }
    
    //var hashedEmail = sec.encrypt(object.correoElecNuevo)
    //var hashedOldEmail = sec.encrypt(object.correoElecViejo)
    //se hace el update al registro del usuario.
    if(object.password!=""){
        Usuario.update({
            correo: object.correoElecNuevo,//hashedEmail,
            nombre: object.nombre,
            apellidoPaterno: object.apellidoP,
            apellidoMaterno: object.apellidoM,
            rfc: hashedRfc,
            password: sec.hash(object.password)
            },{
            where: {
                correo: object.correoElecViejo//hashedOldEmail
            }
        }).then(resultado=>{
            //se envía el estatus "success" cuando todo se hace correctamente
            res.send("0");
        }).catch(error=>{
            console.log(error)
            //se envía el estatus "error" si sucede algún error.
            res.send("1");
        })
    }
    else{
        Usuario.update({
            correo: object.correoElecNuevo,
            nombre: object.nombre,
            apellidoPaterno: object.apellidoP,
            apellidoMaterno: object.apellidoM,
            rfc: hashedRfc,
            },{
            where: {
                correo: object.correoElecViejo
            }
        }).then(resultado=>{
            //se envía el estatus "success" cuando todo se hace correctamente
            res.send("0");
        }).catch(error=>{
            console.log(error)
            //se envía el estatus "error" si sucede algún error.
            res.send("1");
        })
    }
    
};

exports.postUsuarioEnabled = (req,res) => {
    //asignamos los datos del usuario a la variable object
    var object = req.body
    //var hashedEmail = sec.encrypt(object.correoElec)
    //Buscamos en los registros que efectivamente el usuario exista.
    Usuario.findByPk(object.correoElec)
        .then(usuario => {
            //Si el jugador existe
            if(usuario){
                if(usuario.enabled == "0"){
                    res.send("0")
                }
                else{
                    res.send("2")
                }
                
            }
        })
        .catch(err=>{
            console.log("Usuario inexistente")
            console.log(err)
            res.send("1")
            
        })
}

exports.getUsuarios = (req,res) =>{
    sequelize.query("SELECT correo, nombre, apellidoPaterno, apellidoMaterno, fechaRegistro, enabled, isAdmin FROM Usuario")
    .then(resultado => {
        res.send(resultado[0])
    })
}

exports.getUsuario = (req,res) =>{
    sequelize.query("SELECT correo, nombre, apellidoPaterno, apellidoMaterno, rfc, fechaRegistro, enabled, isAdmin FROM Usuario WHERE correo='" + req.query.correo +"'")
    .then(resultado => {
        var object = resultado[0][0]
        if(object.rfc == null){
            var rfc = "NULL"
        }else{
            var rfc = sec.decrypt(object.rfc)
        }
        var json = {
            correo: object.correo,//hashedEmail,
            nombre: object.nombre,
            apellidoPaterno: object.apellidoPaterno,
            apellidoMaterno: object.apellidoMaterno,
            rfc: rfc,
            fechaRegistro: object.fechaRegistro,
            enabled: object.enabled,
            isAdmin: object.isAdmin
        }
        res.send(json)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postBan = (req,res) => {
    sequelize.query("UPDATE Usuario SET enabled = '1' WHERE correo = '"+ req.body.correo +"';")
    .then(resultado =>{
        res.send("0")
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.postUnban = (req,res) => {
    sequelize.query("UPDATE Usuario SET enabled = '0' WHERE correo = '"+ req.body.correo +"';")
    .then(resultado =>{
        res.send("0")
    })
    .catch(err =>{
        res.send(err)
    })
}

exports.postAdmin = (req,res) => {
    sequelize.query("UPDATE Usuario SET isAdmin = '0' WHERE correo = '"+ req.body.correo +"';")
    .then(resultado =>{
        res.send("0")
    })
    .catch(err =>{
        res.send(err)
    })
}
exports.postUnAdmin = (req,res) => {
    sequelize.query("UPDATE Usuario SET isAdmin = '1' WHERE correo = '"+ req.body.correo +"';")
    .then(resultado =>{
        res.send("0")
    })
    .catch(err =>{
        res.send(err)
    })
}