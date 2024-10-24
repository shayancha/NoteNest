const Collection = require('../models/Collection');
const { v4: uuidv4 } = require('uuid');

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    // Check if the name field is provided
    if (!name) {
      return res.status(400).json({ message: 'Collection name is required' });
    }
    // Generate a unique join code
    const joinCode = uuidv4().slice(0, 8); // Generate a short UUID code (8 characters)

    // Handle pdfs and videos (assuming multer handles file uploads)
    const pdfFiles = req.files?.pdfs || [];  // Safely handle undefined
    const videoFiles = req.files?.videos || [];  // Safely handle undefined

    // Create the new collection in the database
    const newCollection = new Collection({
      name,
      joinCode,
      pdfs: pdfFiles.map(file => ({ filePath: file.path })),  // Storing file paths
      videos: videoFiles.map(file => ({ filePath: file.path })),  // Storing file paths
      userId: req.user._id,  // Ensure user ID is present from JWT token
    });

    await newCollection.save();
    res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
  } catch (error) {
    console.error('Error creating collection', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get collections for the authenticated user
const getUserCollections = async (req, res) => {
  try {
    const createdCollections = await Collection.find({ userId: req.user._id });  // Use userId instead of user
    
    if (!createdCollections || createdCollections.length === 0) {
      return res.json({});
    }
    else {
      return res.json({createdCollections});
    }


  } catch (error) {
    res.status(500).json({ message: 'Error retrieving collections' });
  }
};


// Get collection by ID
const getCollectionById = async (req, res) => {
    try {
      const collection = await Collection.findById(req.params.id);
  
      if (collection) {
        res.json(collection);
      } else {
        res.status(404).json({ message: 'Collection not found' });
      }
    } catch (error) {
      console.error('Error fetching collection by ID:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Function to join a collection by code

const joinCollectionByCode = async (req, res) => {
    const { joinCode } = req.body; // The join code sent from the frontend
    const userId = req.user._id; // Authenticated user's ID
  
    try {
      // Find the collection by joinCode
      const collection = await Collection.findOne({ joinCode });
  
      // Check if collection exists
      if (!collection) {
        return res.status(404).json({ message: 'Invalid join code or unable to join collection.' });
      }
  
      // Check if the user is trying to join their own collection
      if (String(collection.userId) === String(userId)) {
        return res.status(400).json({ message: "You can't join your own collection." });
      }
  
      // Check if the user is already in the collection
      if (!collection.students.includes(userId)) {
        collection.students.push(userId); // Add user to students array
        await collection.save(); // Save the collection
      }
  
      res.status(200).json({ message: 'Successfully joined collection', collection });
    } catch (error) {
      console.error('Error joining collection by code:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  const getJoinedCollections = async (req, res) => {
    try {
      // Fetch collections where the user is in `joinedUsers`
      console.log('User ID:', req.user._id); // Add this before the database query
      const joinedCollections = await Collection.find({ students: req.user._id });
  
      if (!joinedCollections || joinedCollections.length === 0) {
        return res.json({});
      }
  
      else{
        return res.json({joinedCollections});
      }    

    } catch (error) {
      console.error('Error fetching joined collections:', error);
      res.status(500).json({ message: 'Error fetching joined collections' });
    }
  };
  
  
  

module.exports = {
  createCollection,
  getUserCollections, 
  getCollectionById,
  joinCollectionByCode,
  getJoinedCollections
};
