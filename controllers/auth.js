const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jst');


const login = async (req, res = response) => {
    const{correo, password } = req.body;

    try {
        //verificar si el correo existe
        const usuario = await Usuario.findOne({ correo })
        if (!usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //verificar si existe la constraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //generar JWT
        const token = await generarJWT( usuario.id);
        res.json({
           usuario,
           token
        })

    } catch (error) {
            console.log(error);
          
    }

   

}

module.exports = {
    login
}