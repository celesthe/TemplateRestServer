const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categorias');
const Producto = require('../models/producto');

const esRolValido = async(rol = '') =>{
    const existeRol = await Role.findOne({ rol});
    if(!existeRol){
      throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}


const emailExiste =  async(correo = '') =>{
    const existeEmail = await Usuario.findOne({correo});

if(existeEmail){
    throw new Error(`El correo  ${ correo} ya esta registrado en la BD`)
}
}

const existeUsuarioPorId = async( id ) =>{
    //verificar si existe el usuario
    const existeUsuario = await Usuario.findById(id);
        if( !existeUsuario ){
            throw new Error(`El id no Existe ${id}`);
        }
    
}

const existeCategoriaId = async( id ) =>{
    //verificar si existe el usuario
    const existeCategoria = await Categoria.findById(id);
        if( !existeCategoria ){
            throw new Error(`El id de la categoria no Existe ${id}`);
        }
    
}

const existeProductoId = async( id ) =>{
    //verificar si existe el usuario
    const existeProducto = await Producto.findById(id);
        if( !existeProducto ){
            throw new Error(`El id del producto no Existe ${id}`);
        }
    
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaId,
    existeProductoId
}