const { response } = require('express');
const bcryptjs = require('bcryptjs')



const usuariosGet = (req, res = response) => {
        res.json({
            msg: 'GET API -- CONTROLADOR'
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

const usuariosPUT = (req, res = response) => {
    const id = req.params.id;
    res.json({
        msg: 'put API -- CONTROLADOR',
        id
        });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPUT
}