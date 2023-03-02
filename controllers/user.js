const { response, request } = require('express');
const Usuario =  require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosById = async(req, res = response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
  
        res.json(
            usuario
        );
  
}

const usuariosGet = async (req, res = response) => {
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true};
 
const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))

])

        res.json({
            total, usuarios
        });
}


const usuariosPost = async (req = request, res = response)=>{
  


    const {nombre, correo, password, rol } = req.body;
    const usuario =  new Usuario({nombre, correo, password, rol});
    //verificar si existe el correo
   


    //hacer hash de contraseña
    const salt  = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    
//grabar usuario
    await usuario.save();
    res.json({msg:'Hello World'
            ,usuario}
    );
}

const usuariosPUT = async(req, res = response) => {
    const {id }= req.params;
    const {_id,password, google, ...resto} = req.body;

    //TODO validar contra base de datos
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    //console.log(req)
    res.json(usuario);
}

const usuariosDelete = async (req, res = response)=>{
    const {id} = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuario;
    res.json({"usuarioBorrado": usuario, "UsuarioAutenticado":usuarioAutenticado});
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPUT,
    usuariosDelete,
    usuariosById
}