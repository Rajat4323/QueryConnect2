const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Comment = require("../models/Comment");

module.exports.newCommentPost = async (req, res) => {
  //to access the (user - id) while using JWT token , first decode it

  Answer.findById(req.params.id)
  .then(function(answers) {
    const { topic } = req.body;
    var author = {
      id: user.id,
      name: userData.username,
    };
    const newComment = new Comment({
      topic: topic,
      author: author,
    });
    Comment.create(newComment)
    .then(function(comment) {
      //save comment
      comment.save();
      answers.comments.push(comment);
      answers.save();
      res.status(200).json({ commentID: comment._id });
    })
    .catch(function(err)
    {
      console.log(err);
    })
  })
  .catch(function(err)
  {
    console.log(err);
    res.redirect("/");
  })
};

module.exports.delete_comment =async (req, res) => {
  Comment.findByIdAndRemove(req.body.commentID)
  .then(()=>{
    res.status(200).json({ msg: "success" });
  })
  .catch(function (err) {
      console.log(err);
  });
};
