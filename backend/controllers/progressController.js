// controllers/progressController.js

const UserProgress = require('../models/UserProgress');

// const updateProgress = async (req, res) => {
//   try {
//     const { collectionId, materialId, materialType, progress, notes, questions } = req.body;
//     const userId = req.user._id; 

//     console.log('User ID:', userId);
    
//     // Refetch the document before updating to get the latest version
//     let userProgress = await UserProgress.findOne({
//       userId,
//       collectionId,
//       materialId,
//       materialType,
//     });

//     if (!userProgress) {
//       // Create a new progress entry if none exists
//       userProgress = new UserProgress({
//         userId,
//         collectionId,
//         materialId,
//         materialType,
//         progress,
//         notes,
//         questions,
//       });
//     } else {
//       // Update the progress
//       if (progress !== undefined && progress !== null) {
//         userProgress.progress = progress;
//       }
//       if (notes !== undefined && notes !== null) {
//         userProgress.notes = notes;
//       }
//       if (questions !== undefined && questions !== null) {
//         userProgress.questions = questions;
//       }
//     }

//     await userProgress.save();  // Save with the latest version
//     return res.status(200).json(userProgress);
//   } catch (error) {
//     console.error('Error updating progress:', error);
//     return res.status(500).json({ message: 'Failed to update progress' });
//   }
// };

const updateProgress = async (req, res) => {
  try {
    const { collectionId, materialId, materialType, progress, notes, questions } = req.body;
    const userId = req.user._id;

    console.log('User ID:', userId);

    // Build the update object dynamically based on what fields are present in the request body
    const updateFields = {};
    if (progress !== undefined && progress !== null) updateFields.progress = progress;
    if (notes !== undefined && notes !== null) updateFields.notes = notes;
    if (questions !== undefined && questions !== null) updateFields.questions = questions;

    // Use findOneAndUpdate with upsert and returnNewDocument options to handle both creation and updates atomically
    const userProgress = await UserProgress.findOneAndUpdate(
      { userId, collectionId, materialId, materialType },  // Query to find the document
      { $set: updateFields },  // Update the document with only the fields that are present
      { new: true, upsert: true, setDefaultsOnInsert: true }  // Options: return new document if created or updated
    );

    // Return the updated or newly created progress
    return res.status(200).json(userProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    return res.status(500).json({ message: 'Failed to update progress' });
  }
};


// Get user progress for a specific material
const getProgress = async (req, res) => {
    try {
      const { collectionId, materialId, materialType } = req.params; // Get data from query params
      const userId = req.user._id;
  
      console.log('User ID:', userId);

      const userProgress = await UserProgress.findOne({
        userId,
        collectionId,
        materialId,
        materialType,
      });
  
      if (!userProgress) {
        return res.status(404).json({ message: 'No progress found for this material.' });
      }
  
      return res.status(200).json(userProgress);
    } catch (error) {
      console.error('Error fetching progress:', error);
      return res.status(500).json({ message: 'Failed to fetch progress' });
    }
  };

  module.exports = {
    getProgress,
    updateProgress,
};
  
