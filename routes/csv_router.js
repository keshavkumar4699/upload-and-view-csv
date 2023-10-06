const express = require('express');
const router = express.Router();

const csvController = require('../controllers/csv_controller');

router.get('/fetch_csv_data?:id', csvController.fetch_csv_data);
router.get('/view', csvController.view);
router.post('/display_csv_data', csvController.display_csv_data);

module.exports = router;