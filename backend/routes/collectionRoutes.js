const express = require('express');
const multer = require('multer');
const { createCollection, getUserCollections } = require('../controllers/collectionController');
const { protect } = require('../middleware/authMiddleware');
const { getCollectionById } = require('../controllers/collectionController'); // Ensure the import is correct
// const { getUserProfile } = require('../controllers/userController');
const { joinCollectionByCode } = require('../controllers/collectionController');
const { getJoinedCollections } = require('../controllers/collectionController');


const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Custom file name
  },
});

const upload = multer({ storage });

// Route for creating a collection (with file uploads)
router.post('/create', protect, upload.fields([{ name: 'pdfs', maxCount: 5 }, { name: 'videos', maxCount: 5 }]), createCollection);

router.get('/created', protect, getUserCollections);

// router.get('/', protect, getUserProfile);
router.get('/api/collections/:id', getCollectionById);

router.get('/joined', protect, getJoinedCollections);
router.post('/join', protect, joinCollectionByCode);

module.exports = router;
