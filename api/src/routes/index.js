
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs');
const dog = require('./dog');
const idRaza = require('./idRaza');
const temperament = require('./temperament');
const temperamentIntermediate = require('./temperamentIntermediate');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/dog', dog);
router.use('/idRaza', idRaza);
router.use('/temperament', temperament);
router.use('/intermediate', temperamentIntermediate);

module.exports = router;