// Importando el módulo para realizar la conexión con la base de datos
const Sequelize = require('sequelize');

const Donativo = (sequelize)=>{
    sequelize.define('Donativo',{
        idDonativo:{
            type: Sequelize.STRING(100),
            allowNull: false,
            primaryKey: true
        },
        monto:{
            type: Sequelize.FLOAT,
            allowNull: false, 
        },
        fecha:{
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: Sequelize.fn('GETDATE')
        },
        facturado:{
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: "1"
        }
    })
}

// Exportamos el modelo
module.exports = Donativo;