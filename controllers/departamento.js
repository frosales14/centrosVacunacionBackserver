
const { response } = require('express');

const Departamento = require('../models/departamento');

const getDepartamentos = async (req, res = response) => {
    
    const departamento = await Departamento.find()
    
    res.json({
        ok: true,
        departamento
    });
}

const crearDepartamento = async (req, res = response) => {
    
    const uid = req.uid;
    
    try {
        
        const departamento = new Departamento( {
            usuario: uid,
            ... req.body
        } );
        const departamentolDB = await departamento.save();

        res.json({
            ok:true,
            departamento: departamentolDB
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'contacte al administrador'
        });
    }
}

const actualizarDepartamento = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });
}

const eliminarDepartamento = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'eliminarHospital'
    });
}

module.exports = {
    getDepartamentos,
    crearDepartamento,
    actualizarDepartamento,
    eliminarDepartamento,
}