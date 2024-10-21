const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const Comment = require("../models/Comment");

//to show a form to user to enter the answer
module.exports.newQ =async (req, res) => {
  Question.findById(req.params.id)
  .then(function(questions){
    res.render("answers/new", { question: questions });
  })
  .catch(function(err)
  {
    console.log(err);
  }
  );
}

//to post a new Answer of A particular Question in Database.
module.exports.newAnswerPost = async (req, res) => {
  const token = req.cookies.jwt;
  const user = jwt.verify(token, "this is question asking website!!");
  let userData = await User.findById(user.id);
  //look For the Question using ID
  
  Question.findById(req.params.id)
  .then(function (questions){
    const { title, content } = req.body;
    //to access the (user - id) while using JWT token , first decode it : spent 2hrs on figuring out this.
    var author = {
      id: user.id,
      name: userData.username,
    };
    const newAnswer = new Answer({
      topic: title,
      content: content,
      author: author,
    });
         Answer.create(newAnswer)
         .then(function (answer) {
           //save answer
           answer.save();
           questions.answers.push(answer);
           questions.save();
           userData.answers.push(answer);
           userData.save();
           res.status(200).json({ answerID: answer._id });
         })
         .catch(function(err){
           console.log(err);
         })
  })
  .catch(function(err)
  {
    console.log(err);
    res.redirect("/");

  })
};

//find the Answer with provided ID and show its detail , with comments related to this Answer
module.exports.detailAnswer_get =async (req, res) => {
  Answer.findById(req.params.id)
    .populate("comments")
    .then((foundanswer) => {
      //render show template with that Question
      res.render("answers/show", { answer: foundanswer });
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete the answer
module.exports.delete_answer =async (req, res) => {
  Answer.findByIdAndRemove(req.body.answerID)
  .then(()=>{
    res.status(200).json({ msg: "success" });
  })
  .catch(function (err) {
      console.log(err);
  });
};

//upvote a answer
module.exports.upvote_answer = async (req, res) => {
  Answer.findOne({ _id: req.body.answerID })
  .then(function(found) {
      const vote = found.votes + 1;
      found.updateOne({ votes: vote })
      .then(()=>{
        found.save();
      })
      .catch(function (err) {
          console.log(err);
      });
      res.status(200).json({ msg: "success" });
  })
    .catch(function(err)
    {
      console.log(err);
    })
};
