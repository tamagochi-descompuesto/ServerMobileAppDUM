// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');

const Usuario = (sequelize)=>{
    sequelize.define('Usuario',{
        correo:{
            type: Sequelize.STRING(500),
            allowNull: false,
            primaryKey: true
        },
        password:{
            type: Sequelize.STRING(200),
            allowNull: false
        },
        nombre:{
            type: Sequelize.STRING(50),
            allowNull: false, 
        },
        apellidoPaterno:{
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        apellidoMaterno:{
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        rfc:{
            type: Sequelize.STRING(500),
            allowNull: true,
        },
        fechaRegistro:{
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn('GETDATE')
        },
        enabled:{
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: "0"
        },
        isAdmin:{
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: "1"
        }
    })
}

// Exportamos el modelo
module.exports = Usuario;