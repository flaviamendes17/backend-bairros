const express = require('express');
const router = express.Router();
const bairroController = require('../controllers/bairroController');

router.get('/', bairroController.getAllBairros);
router.get('/:id', bairroController.getBairros);
router.post('/', bairroController.createBairro);
router.put('/:id', bairroController.updateBairro);
router.delete('/:id', bairroController.deleteBairro);

module.exports = router;