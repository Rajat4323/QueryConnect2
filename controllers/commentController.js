const User = require("../models/User");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Comment = require("../models/Comment");
require("dotenv").config();

module.exports.newCommentPost = async (req, res) => {
  try {
    console.log("Comment creation request received");
    console.log("req.user:", req.user);
    console.log("res.locals.user:", res.locals.user);
    console.log("Answer ID:", req.params.id);
    console.log("Request body:", req.body);
    console.log("Cookies:", req.cookies);
    
    // Check if user is authenticated - try req.user first, then res.locals.user
    const user = req.user || res.locals.user;
    if (!user) {
      console.log("User not authenticated - both req.user and res.locals.user are null");
      return res.status(401).json({ error: "Please login to comment" });
    }

    console.log("User ID:", user._id);
    console.log("User username:", user.username);

    const answer = await Answer.findById(req.params.id);
    if (!answer) {
      console.log("Answer not found:", req.params.id);
      return res.status(404).json({ error: "Answer not found" });
    }

    const { topic } = req.body;
    
    if (!topic || !topic.trim()) {
      console.log("Invalid topic:", topic);
      return res.status(400).json({ error: "Comment content is required" });
    }

    const newComment = new Comment({
      topic: topic.trim(),
      author: {
        id: user._id,
        name: user.username,
      },
    });

    console.log("Saving comment:", newComment);
    const savedComment = await newComment.save();
    console.log("Comment saved:", savedComment);
    
    answer.comments.push(savedComment._id);
    await answer.save();
    console.log("Answer updated with comment");

    res.status(200).json({ commentID: savedComment._id });
  } catch (err) {
    console.error("Comment creation error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.delete_comment = async (req, res) => {
  try {
    // Check if user is authenticated - try req.user first, then res.locals.user
    const user = req.user || res.locals.user;
    if (!user) {
      return res.status(401).json({ error: "Please login to delete comments" });
    }

    const comment = await Comment.findById(req.body.commentID);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if user owns the comment
    if (!comment.author.id.equals(user._id)) {
      return res.status(403).json({ error: "You can only delete your own comments" });
    }

    await Comment.findByIdAndRemove(req.body.commentID);
    res.status(200).json({ msg: "success" });
  } catch (err) {
    console.error("Comment deletion error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
