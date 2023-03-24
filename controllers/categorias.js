const { response } = require('express');
const { Categoria } = require('../models');

const ObtenerCategorias = async (req, res = response) => {
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true};
 
const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    .populate('usuario', 'nombre correo estado')

])

        res.json({
            total, categorias
        });
}

const categoriaById = async(req, res = response) =>{
    const {id} = req.params;
    const categoria = await Categoria.findById(id);
  
        res.json(
            categoria
        );
  
}


const crearCategoria = async (req, res) =>{   
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({nombre});
    if(categoriaDb){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDb.nombre }, ya existe`
        });
    }
 const data ={
    nombre,
    usuario: req.usuario._id
 }
 const categoria = new Categoria(data);

 await categoria.save();
 res.status(200).json(categoria);
}


const categoriaPUT = async(req, res = response) => {
    const {id }= req.params;
    const categoriaUpd = req.body;


    const categoria = await Categoria.findByIdAndUpdate(id, categoriaUpd, { new: true});
    //console.log(req)
    res.json(categoria);
}

const categoriaDelete = async (req, res = response)=>{
    const {id} = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, { new: true});
    const usuarioAutenticado = req.usuario;
    res.json({"categoriaBorrada": categoria, "UsuarioAutenticado":usuarioAutenticado});
}

module.exports = {
    crearCategoria,
    ObtenerCategorias,
    categoriaById,
    categoriaPUT,
    categoriaDelete
}