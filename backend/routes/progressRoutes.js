const express = require('express');
const { updateProgress, getProgressOnMaterial , getAllStudentsProgress} = require('../controllers/progressController');
const protect = require('../middleware/auth'); // Import your authentication middleware
const router = express.Router();

router.post('/', protect, updateProgress);
router.get('/:collectionId/:materialId/students', protect, getAllStudentsProgress);
router.get('/:collectionId/:materialType/:materialId', protect, getProgressOnMaterial);

// router.get('/:collectionId/:materialId/students', (req, res, next) => {
//     console.log('Request reached this route');
//     next();
//   }, getAllStudentsProgress);
  

module.exports = router;
