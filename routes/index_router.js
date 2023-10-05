const express = require('express');
const router = express.Router();
//multer
const multerConfig = require('../config/multer');

const indexController = require('../controllers/index_controller');

router.get('/', indexController.home);
router.get('/getcsvfiles', indexController.getcsvfiles);
router.post('/upload-csv', multerConfig.upload, indexController.uploadcsv);
router.get('/destroy?:id', indexController.destroy);

router.use('/csv', require('./csv_router'));

module.exports = router;