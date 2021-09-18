/*
    '/api/departamentos'
*/ 

const { Router } = require('express');

const { check } = require('express-validator');

const { validarJwt } = require('../middlewares/validar-jwt');

const { validarCampos } = require('../middlewares/validar-campos');
const { getDepartamentos, crearDepartamento, eliminarDepartamento, actualizarDepartamento } = require('../controllers/departamento');


const router = Router();

router.get( '/', getDepartamentos );

router.post( '/',
    [
        validarJwt,
        check('nombre').not().isEmpty(),
        validarCampos
    ],
    crearDepartamento 
);

router.put( '/:id', 
    [
    ],
    actualizarDepartamento
);

router.delete('/:id', eliminarDepartamento);

module.exports = router;