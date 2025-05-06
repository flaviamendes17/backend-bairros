const express = require('express');
const router = express.Router();
const ocorrenciaController = require('../controllers/ocorrenciaController');

router.get('/', ocorrenciaController.getAllOcorrencias);
router.get('/:id', ocorrenciaController.getOcorrencia);
router.post('/', ocorrenciaController.createOcorrencia);
router.put('/:id', ocorrenciaController.updateOcorrencia);
router.delete('/:id', ocorrenciaController.deleteOcorrencia);

module.exports = router;