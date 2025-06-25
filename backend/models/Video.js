import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // (tags, likes, etc)
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
