const express = require('express');
const router = express.Router();
//multer
const multerConfig = require('../config/multer');

const indexController = require('../controllers/index_controller');

router.get('/', indexController.home);
router.get('/getcsvfiles', indexController.getcsvfiles);
router.post('/upload-csv', multerConfig.upload, indexController.uploadcsv);
router.get('/destroy?:id', indexController.destroy);
router.get('/viewcsv?:id', indexController.viewcsv);

module.exports = router;