const express = require('express');
const router = express.Router();
const path = require('path');
//multer
const multer = require('multer');
const upload = multer({dest:path.join(__dirname,'../uploads')});

const indexController = require('../controllers/index_controller');

router.get('/', indexController.home);
router.post('/upload-csv', upload.single('csvFile'),indexController.uploadcsv);

module.exports = router;