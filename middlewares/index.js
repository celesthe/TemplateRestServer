const validarCampos = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar-jwt');
const  ValidaRoles= require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...ValidaRoles
}