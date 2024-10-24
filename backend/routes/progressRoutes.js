const express = require('express');
const { updateProgress, getProgress } = require('../controllers/progressController');
const protect = require('../middleware/auth'); // Import your authentication middleware
const router = express.Router();

router.post('/', protect, updateProgress);
router.get('/get/:collectionId/:materialType/:materialId', protect, getProgress);
// router.get('/progress', protect, getProgress);

module.exports = router;
