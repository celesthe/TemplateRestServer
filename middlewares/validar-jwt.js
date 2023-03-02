const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const Usuario =  require('../models/usuario');

const validarJWT = async (req = request, res=response	, next) =>{
    const token =req.header('x-token');
    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    console.log(token);

    try {
       const {uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
            //leer el usuario que corresponde
           const usuario =  await Usuario.findById(uid);

           if (!usuario) {
            return res.status(401).json({
                msg: 'Token No valido - usuario NO EXISTE EN BD'
            });
            
        }

            // req.usuarioAutenticado 
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token No valido - usuario con estado = false'
            });
            
        }
       req.usuario =  usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'token no valido'
        })
    }

   

}


module.exports = {
    validarJWT
}