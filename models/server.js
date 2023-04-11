const express = require('express')
var cors = require('cors')
const fileUpload = require('express-fileupload');

const {dbconnection} = require('../database/config')
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:'/api/usuarios',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        }
       // this.usuariosPath = '/api/usuarios';
        
        //this.authPath = '/api/auth';
        //connect to DB
        this.conectarBD();
        //MIDDLEWARE
        this.middlewares();

        //RUTAS DE MI APP
        this.routes();
    }

    async conectarBD(){
        await dbconnection()
    }

    middlewares(){
        
        this.app.use(express.static('public'));
        //lectura y parseo del body
        this.app.use(express.json());
        //cors
        this.app.use(cors());

        //carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }


routes(){
   this.app.use(this.paths.auth, require('../routes/auth'));
   this.app.use(this.paths.buscar, require('../routes/buscar'));
   this.app.use(this.paths.categorias, require('../routes/categorias'));
   this.app.use(this.paths.usuarios, require('../routes/user'));
   this.app.use(this.paths.productos, require('../routes/productos'));
   this.app.use(this.paths.uploads, require('../routes/uploads'));

}

listen(){
    this.app.listen(this.port,() =>{
        console.log('servicor corriendo en el puerto ', this.port );
    });
}
}


module.exports = Server;