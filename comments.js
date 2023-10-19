// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//             Comments
//=================================

// Add comments
router.post('/saveComment', (req, res) => {
  // Save comments to database
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    // Save comment to database
    Comment.find({ _id: comment._id })
      .populate('writer')
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

// Get comments
router.post('/getComments', (req, res) => {
  // Find comments by videoId
  Comment.find({ videoId: req.body.videoId })
    .populate('writer')
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

module.exports = router;