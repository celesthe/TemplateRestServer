const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, ObtenerCategorias, categoriaById, categoriaPUT, categoriaDelete } = require('../controllers/categorias');
const { existeCategoriaId, esRolValido } = require('../helpers/db-validators');

const {validarJWT, validarCampos, tieneRole} = require('../middlewares');

const router = Router();

//obtener datos
router.get('/', ObtenerCategorias);


router.get('/:id',[check('id','No es un ID Valido').isMongoId(),
                   check('id').custom(existeCategoriaId ),
                   validarCampos
], categoriaById);

router.post('/',[ validarJWT,
             check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
            validarCampos ], crearCategoria
);

router.put('/:id', [
    validarJWT,
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaId ),
    validarCampos], 
    categoriaPUT );

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id','No es un ID Valido').isMongoId(),
    check('id').custom(existeCategoriaId ),
    validarCampos

],
categoriaDelete);
module.exports = router;