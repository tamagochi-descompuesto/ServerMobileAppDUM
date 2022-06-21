const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/Usuario')

router.post('/registro', usuarioController.postRegistroUsuario);
router.post('/iniciarSesion', usuarioController.postIniciarSesion);
router.post('/editar', usuarioController.postEditarPerfil);
router.post('/enabled', usuarioController.postUsuarioEnabled);
router.get('/getUsuarios', usuarioController.getUsuarios);
router.get('/getUsuario', usuarioController.getUsuario);
router.post('/banUsuario', usuarioController.postBan);
router.post('/unbanUsuario', usuarioController.postUnban);
router.post('/adminUsuario', usuarioController.postAdmin);
router.post('/unadminUsuario', usuarioController.postUnAdmin);
module.exports = router;