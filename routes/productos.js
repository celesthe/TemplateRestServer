const {Router} = require('express');
const { check } = require('express-validator');
const {  crearProducto,  ObtenerProductos,  productoById,  productoPUT,  productoDelete } = require('../controllers/productos');
const { existeProductoId } = require('../helpers/db-validators');

const {validarJWT, validarCampos, tieneRole} = require('../middlewares');

const router = Router();

//obtener datos
router.get('/', ObtenerProductos);


router.get('/:id',[check('id','No es un ID Valido').isMongoId(),
                   check('id').custom(existeProductoId ),
                   validarCampos
], productoById);

router.post('/',[ validarJWT,
             check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
            validarCampos ], crearProducto
);

router.put('/:id', [
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeProductoId ),
    validarCampos], 
    productoPUT );

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeProductoId ),
    validarCampos

],
productoDelete);
module.exports = router;