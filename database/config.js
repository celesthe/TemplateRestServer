const mongoose = require('mongoose');

const dbconnection = async() => {

    try {
        mongoose.set("strictQuery", true);
          await  mongoose.connect(process.env.MONGODB_CNN, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
            // strictQuery: false
          //  useCreateIndex: true,
           // useFindAndModify: false

          });
          console.log('conexion exitosa');
    } catch (error) {
        console.log('el error', error);
        throw new Error('Error al iniciar la base de datos');
    }
}


module.exports = {
    dbconnection
}