const express = require('express');
const router = express.Router();
const bairroController = require('../controllers/bairroController');
const upload = require('../config/upload'); 
const apiKeyMiddleware = require('../config/apiKey'); 


router.use(apiKeyMiddleware);

router.get('/', bairroController.getAllBairros);
router.get('/:id', bairroController.getBairros);
router.put('/:id', bairroController.updateBairro);
router.delete('/:id', bairroController.deleteBairro);
router.post('/', upload.single('imagem'), bairroController.createBairro);
module.exports = router;