import express from 'express';
import Video from '../models/Video.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new video
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, url } = req.body;
    if (!title || !url) {
      return res.status(400).json({ message: 'Title and URL are required' });
    }

    const newVideo = new Video({
      title,
      description,
      url,
      author: req.user.userId
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// list all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('author', 'username email');
    res.json(videos);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// get video detail
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('author', 'username email');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    console.error('Get video detail error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Edit video
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden: Not the author' });
    }

    const { title, description, url } = req.body;
    if (title) video.title = title;
    if (description) video.description = description;
    if (url) video.url = url;

    await video.save();
    res.json(video);
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// delete video
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    if (video.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden: Not the author' });
    }

    await video.deleteOne();
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
