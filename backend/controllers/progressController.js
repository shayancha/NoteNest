// controllers/progressController.js

const UserProgress = require('../models/UserProgress');

const updateProgress = async (req, res) => {
  try {
    const { collectionId, materialId, materialType, progress, notes, questions } = req.body;
    const userId = req.user._id; 
    
    // Refetch the document before updating to get the latest version
    let userProgress = await UserProgress.findOne({
      userId,
      collectionId,
      materialId,
      materialType,
    });

    if (!userProgress) {
      // Create a new progress entry if none exists
      userProgress = new UserProgress({
        userId,
        collectionId,
        materialId,
        materialType,
        progress,
        notes,
        questions,
      });
    } else {
      // Update the progress
      if (progress !== undefined && progress !== null) {
        userProgress.progress = progress;
      }
      if (notes !== undefined && notes !== null) {
        userProgress.notes = notes;
      }
      if (questions !== undefined && questions !== null) {
        userProgress.questions = questions;
      }
    }
    await userProgress.save();  // Save with the latest version
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
  
