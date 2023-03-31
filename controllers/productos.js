const { response } = require('express');
const {  Producto } = require('../models');

const ObtenerProductos = async (req, res = response) => {
    const {limite = 5, desde= 0} = req.query;
    const query = {estado: true};
 
const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
    .populate('usuario', 'nombre correo estado')

])

        res.json({
            total, productos
        });
}

const productoById = async(req, res = response) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id);
  
        res.json(
            producto
        );
  
}


const crearProducto = async (req, res) =>{  
    console.log(req.body); 
    const nombre = req.body.nombre.toUpperCase();
    console.log(nombre);
    const NuevoProducto = req.body;

    const ProductoDb = await Producto.findOne({nombre});
    if(ProductoDb){
        return res.status(400).json({
            msg: `El producto ${ ProductoDb.nombre }, ya existe`
        });
    }
 const data ={
    nombre: NuevoProducto.nombre.toUpperCase(),
    categoria: NuevoProducto.categoria.toUpperCase(),
    descripcion: NuevoProducto.descripcion.toUpperCase(),
    precio: NuevoProducto.precio,
    disponible: NuevoProducto.disponible,
    usuario: req.usuario._id
 }
 const producto = new Producto(data);

 await producto.save();
 res.status(200).json(producto);
}


const productoPUT = async(req, res = response) => {
    const {id }= req.params;
    const productoUpd = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const ProductoDb = await Producto.findOne({nombre});
    if(ProductoDb){
        return res.status(400).json({
            msg: `El producto ${ ProductoDb.nombre }, ya existe`
        });
    }
    const producto = await Producto.findByIdAndUpdate(id, productoUpd, { new: true});
    //console.log(req)
    res.json(producto);
}

const productoDelete = async (req, res = response)=>{
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, {estado:false}, { new: true});
    const usuarioAutenticado = req.usuario;
    res.json({"ProductoBorrado": producto, "UsuarioAutenticado":usuarioAutenticado});
}

module.exports = {
    crearProducto,
    ObtenerProductos,
    productoById,
    productoPUT,
    productoDelete
}