const { Router } = require("express");
const commentController = require("../controllers/commentController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = Router({ mergeParams: true });

//to post a new comment for a particular question.
router.post("/new", requireAuth, commentController.newCommentPost);

//delete a comment by a user
router.post("/delete", requireAuth, commentController.delete_comment);

module.exports = router;
