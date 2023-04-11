const {response} = require('express');
const { subirArchivo } = require('../helpers');
const { model } = require('mongoose');
const Usuario = require('../models/usuario');
const producto = require('../models/producto');
const path = require('path');
const fs = require('fs');


const cargarArchivo = async(req, res = response) => {
  
try {
    const nombre = await subirArchivo(req.files, ['txt', 'md'], 'NuevosArchivos');
    res.json({ nombre  });
} catch (msg) {
    res.status(400).json({ msg})
}
   
}

const actualizarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios': 

        modelo = await Usuario.findById(id);
        if(!modelo){
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}`})
        }
            break;
            case 'productos': 

            modelo = await producto.findById(id);
            if(!modelo){
                return res.status(400).json({ msg: `No existe un producto con el id ${id}`})
            }
                break;
        default: 
            return res.status(500).json({ msg: 'Se me olvido validar esto'});

    }
    console.log('antes');
    // Limpiar imagenes previas
    if( modelo.img){
        console.log('entro');
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }


   /// console.log(req.files);
    const nombre = await subirArchivo(req.files, undefined, coleccion);
    console.log('nombre', nombre);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async(req, res = response) => {
    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios': 

        modelo = await Usuario.findById(id);
        if(!modelo){
            return res.status(400).json({ msg: `No existe un usuario con el id ${id}`})
        }
            break;
            case 'productos': 

            modelo = await producto.findById(id);
            if(!modelo){
                return res.status(400).json({ msg: `No existe un producto con el id ${id}`})
            }
                break;
        default: 
            return res.status(500).json({ msg: 'Se me olvido validar esto'});

    }
  
    // Limpiar imagenes previas
    if( modelo.img){
        
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
         return res.sendFile(pathImagen);
        }
    }else{
        console.log('no existe');
        const pathImagen = path.join(__dirname, '../assets', 'noimage.jpg');
    console.log(pathImagen);
        if(fs.existsSync(pathImagen)){
         return res.sendFile(pathImagen);
        }
    }



    //res.json({msg: 'falta un placeholder'});


}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen

}   