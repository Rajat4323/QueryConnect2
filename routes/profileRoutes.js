const { Router } = require("express");
const User = require("../models/User");
const answersController = require("../controllers/answersController");
const questionsController = require("../controllers/questionsController");
const { requireAuth } = require("../middleware/authMiddleware");
const router = Router();

//show a user.
router.get("/:id", requireAuth, (req, res) => {
  User.findById(req.params.id)
    .populate(["answers", "questions"])
    .then((userfound)=>{
      // console.log(userfound)
      res.render("profile", { userOP: userfound });
    })
    .catch((err)=>{
      console.log(err);
    })
});

router.get("/answers/show/:id", requireAuth, answersController.detailAnswer_get);

router.get(
  "/questions/QuestionDisplay/:id",
  requireAuth,
  questionsController.detailQuestion_get
);
module.exports = router;

(req, res) => res.render("profile");
