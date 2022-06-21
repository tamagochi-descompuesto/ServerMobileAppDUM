// Función que recibe el objeto de conexión
function applyRelations(sequelize){
    console.log(sequelize.models)
    const Usuario = sequelize.models.Usuario;
    const Donativo = sequelize.models.Donativo;
    
    //Un usuario puede tener muchos donativos
    Usuario.hasMany(Donativo);
    //Un donativo pertenece a un solo usuario
    Donativo.belongsTo(Usuario);
}

module.exports = {applyRelations};