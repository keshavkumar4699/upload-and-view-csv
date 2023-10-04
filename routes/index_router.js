const express = require('express');
const router = express.Router();
//multer
const multerConfig = require('../config/multer');

const indexController = require('../controllers/index_controller');

router.get('/', indexController.home);
router.post('/upload-csv', multerConfig.upload, indexController.uploadcsv);

module.exports = router;