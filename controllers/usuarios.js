
const Usuario = require('../models/usurios');
const {response} = require('express');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [usuarios, total] = await Promise.all([
        Usuario.find( {}, 'email nombre role google img' )
            .skip( desde )
            .limit( 5 ),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });

}

const crearUsuarios = async( req, res = response ) => {
    
    const {name, email, password} = req.body 
    
    

    try {

        const existeEmail = await Usuario.findOne({ email });

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: `El correo ${email} ya esta registrado`
            });
        }
        const usuario = new Usuario( req.body );

        //encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Revisar logs'
        });
    }
}

const editarUsuario = async ( req, res = response ) => {
    
    const uid = req.params.id; 

    try {

        const userDb = await Usuario.findById( uid );
        
        if(!userDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el user con ese Id'
            });
        }
        
        const { password, google, email, ... campos} = req.body;

        if( userDb.email != req.body.email ){
            const existeEmail = await Usuario.findOne({email})
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese Email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Ocurrio Un Error Inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;
    try {

        const userDb = await Usuario.findById( uid );
        
        if(!userDb){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el user con ese Id'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Usuario Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte al administrador'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    editarUsuario,
    borrarUsuario
}