const express = require('express');
const router = express.Router();

const prophetsController = require('../controllers/prophets');

router.get('/', prophetsController.getAll);

router.get('/:id', prophetsController.getSingle);

router.post('/', prophetsController.createInfo);

router.put('/:id', prophetsController.updateInfo);

router.delete('/:id', prophetsController.deleteInfo);
module.exports = router;
