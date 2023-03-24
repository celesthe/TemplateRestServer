const { response, request } = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jst');
const { googleVerify } = require('../helpers/google-verify');


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

const googleSignIn = async(req, res = response)=>{
    const {id_token} = req.body;
    try { 
        const {nombre, img, correo} = await googleVerify(id_token);
        console.log(nombre, img, correo);
        let usuario = await Usuario.findOne({correo});
        console.log(usuario);
        if(!usuario){
            const  data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }
        //estado del usuario en BD
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuarios bloqueado'
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'el token no se pudo verificar' + error
        })
    }
    
   }
module.exports = {
    login,
    googleSignIn
}