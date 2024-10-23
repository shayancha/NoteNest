// models/Collection.js
const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  filePath: { type: String, required: true }
});

const videoSchema = new mongoose.Schema({
  filePath: { type: String, required: true }
});

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  joinCode: {type: String, unique:true, required: true},
  pdfs: [pdfSchema],
  videos: [videoSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;

