const  path  = require('path');
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
const { response } = require('express');

const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') =>{
return new Promise((resolve, reject) => {

    const {archivo} = files;
    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extensión
    if (!extensionesValidas.includes(extensionArchivo)) {
        return reject (`La extension ${extensionArchivo} No es una extension permitida  ${extensionesValidas}`);
    }

const nombreTemp = uuidv4() + '.' + extensionArchivo;
   const  uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

   archivo.mv(uploadPath, (err) => {
        if (err) {
        reject(err);
        }
        resolve(nombreTemp);
    });


});

  
}

module.exports = {
    subirArchivo
}