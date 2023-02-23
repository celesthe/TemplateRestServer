const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPUT, usuariosDelete,usuariosById } = require('../controllers/user');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);
router.get('/:id',[
  check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId ),
    validarCampos
],
 usuariosById);
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

  router.put('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId ),
    check('rol').custom(esRolValido ),
    validarCampos
  ], usuariosPUT);

  router.delete('/:id',[
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId ),
    validarCampos
  ] ,usuariosDelete)




module.exports = router;