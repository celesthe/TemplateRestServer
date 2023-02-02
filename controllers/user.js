const { response } = require('express');

const usuariosGet = (req, res = response) => {
        res.json({
            msg: 'GET API -- CONTROLADOR'
        });
}


const usuariosPost = (req = request, res = response)=>{
    const { nombre, edad = 0, apellido } = req.query;
    const body = req.body;
    res.json({msg:'Hello World'
            ,body
            ,nombre
            ,edad
            ,apellido}
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