//Configuración de Sequelize
const Sequelize = require('sequelize');
const {applyRelations} = require('./relations');
//Conexión con la base de datos
const sequelize = new Sequelize('DUM', 'sa', 'Paloma17', {
    dialect: 'mssql',
    dialectOptions: {
        options: {
            useUTC: false,
            dataFirst: 1,
        }
    },
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

// Sobreescribe el formato de la fecha
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    date = this._applyTimezone(date, options);
    return date.format('YYYY-MM-DD HH:mm:ss.SSS');
};

//Cargar los modelos
const modelDefiners = [
    require('../models/Usuario'),
    require('../models/Donativo')

]
//Vincular el objeto de conexion a los modelos
for(const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
}

//construir relaciones
applyRelations(sequelize);
//Exportando el objeto sequelize
module.exports = sequelize;