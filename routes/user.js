const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPUT } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

  router.post('/', usuariosPost);

  router.put('/:id',usuariosPUT);





module.exports = router;