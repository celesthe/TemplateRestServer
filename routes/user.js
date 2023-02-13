const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPUT } = require('../controllers/user');
const { esRolValido, emailExiste } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

  router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña debe ser mas de 6 letras').isLength({ min: 6}),
  //check('correo','El correo no es valido').isEmail(),
  //check('rol','No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('correo').custom(emailExiste ),
  check('rol').custom(esRolValido ),
  validarCampos
  ]
  , usuariosPost);

  router.put('/:id',usuariosPUT);





module.exports = router;