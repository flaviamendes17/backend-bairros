const express = require('express');
const router = express.Router();
const bairroController = require('../controllers/bairroController');
const apiKeyMiddleware = require('../config/apiKey'); 
const upload = require('../config/upload'); 

router.use(apiKeyMiddleware);

router.get('/', bairroController.getAllBairros);
router.get('/:id', bairroController.getBairros);
router.put('/:id', bairroController.updateBairro);
router.delete('/:id', bairroController.deleteBairro);
router.post('/bairros', upload.single('photo'), bairroController.createBairro); 

module.exports = router;