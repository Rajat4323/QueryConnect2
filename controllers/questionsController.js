const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Question = require("../models/Question");

// controller actions

//show all Questions
module.exports.allquestion_get =async (req, res) => {
  const allQuestion = await Question.find();
  res.render("smoothies", {question: allQuestion});
};

//shows the form to create a new Question
module.exports.newquestion_get = (req, res) => {
  res.render("questions/UpdateQuestionList");
};

//adding a new Question to database.
module.exports.newquestion_post = async (req, res) => {
  const { problem, topic } = req.body;
  //to access the (user - id) while using JWT token , first decode it : spent 2hrs on figuring out this.
  const token = req.cookies.jwt;
  const user = jwt.verify(token, "this is question asking website!!");
  let userData = await User.findById(user.id);
  var author = {
    id: user.id,
  };

  //new question
  const newQuestion = new Question({
    title: topic,
    author: author,
    query: problem,
  });
  Question.create(newQuestion)
  .then(function (question) {
    //save answer
    question.save();
    userData.questions.push(question);
    userData.save();
    res.status(200).json({ questionID: question._id });
  })
  .catch(function(err){
    console.log(err);
  })
};

// find the question with provided ID and show its detail , with answers related to this question
module.exports.detailQuestion_get = async(req, res) => {
  const token = req.cookies.jwt;
  const user = jwt.verify(token, "this is question asking website!!");
  Question.findById(req.params.id)
    .populate("answers")
    .then((foundquestion)=>{
      res.render("questions/QuestionDisplay", { question: foundquestion });
    })
    .catch((err)=>{
      console.log(err);
    })
    
};

//to delete the question
module.exports.Question_delete = async (req, res) => {
  //now delete that from Answer model
  Question.findByIdAndRemove(req.body.questionID)
  .then(()=>
  {
    res.status(200).json({ msg: "success" });
  })
  .catch(function(err){
    console.log(err);
    }
  );
};
