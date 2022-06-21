/*
*Servidor web para el proyecto
*Autores: Erick Hernández Silva, Israel Sánchez, 
*David Rodriguez, Renata de Luna Flores, Melisa Garduño Ruiz
*/

//Biblioteca para definir lo que es un JSON
const bodyParser = require("body-parser");

//Biblioteca para generar las rutas de acuerdo al sistema operativo
const path = require("path");

//Biblioteca para htpps
const https = require("https")

//Importar la biblioteca express para la creación de servidores
const express = require('express');

//Importar biblioteca para el sistema de archivos
const fs = require('fs')

//Traer la conexión de la base de datos
const sequelize = require('./util/database');

//Traer las rutas de usuario
const usuarioRoutes = require('./routes/Usuario');

//Traer las rutas de donativo
const donativoRoutes = require('./routes/Donativo');
const { fstat } = require("fs");
//Crear el servidor
const app = express();

//Establecer un middleware para configura la ubicación de nuestros elementos públicos
app.use(express.static(path.join(__dirname, 'public')));

//Middleware para configura la definicion de un JSON
app.use(bodyParser.json());

//Middleware para configurar la recepción de formularios
app.use(bodyParser.urlencoded({ extended: true }));

//Trae las rutas de Usuario
app.use('/usuario', usuarioRoutes);


//Trae las rutas de Donativo
app.use('/donativo', donativoRoutes);

//puerto
let puerto = 8080;

//Corre el servidor
sequelize.sync({force: false})
    .then(resultado => {
        console.log('Conexión exitosa');
        //Lanza el servidor para escuchar peticiones
        app.listen(8081, () => console.log("Servidor en línea en el puerto 8080"));
    })
    .catch(error => console.log(error));
sequelize.sync({force: false})
    .then(resultado => {
        console.log("Conexión exitosa")
        https.createServer({
            cert: fs.readFileSync(path.join(__dirname,'./util/cert.pem')),
            key: fs.readFileSync(path.join(__dirname,'./util/key.pem'))
        },app).listen(puerto, () => console.log("Servidor en linea en el puerto 8080"))
    })
    .catch(error => console.log(error))
    