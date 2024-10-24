const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true }, // Reference to the collection
  materialId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID of the material (PDF or video)
  materialType: { type: String, enum: ['pdf', 'video'], required: true }, // To distinguish between PDF and video
  progress: { type: Number, default: 0 }, // For PDFs: highest page number; For videos: timestamp in seconds
  notes: { type: String, default: '' }, // Store user's notes
  questions: [
    {
      text: { type: String }, // Question text
      page: { type: Number, default:0 },
      timestamp: { type: Number, default: 0 }, // Video timestamp or PDF page number
    }
  ]
}, { timestamps: true , versionKey : false});

const UserProgress = mongoose.model('UserProgress', progressSchema);

module.exports = UserProgress;
