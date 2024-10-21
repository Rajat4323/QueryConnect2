const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const questionRoutes = require("./routes/questionsRoutes");
const answerRoutes = require("./routes/answersRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

require('dotenv').config();

// db connections
const dbURI = process.env.DATABASE_LINK;
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) =>
    app.listen(port, function () {
      console.log(`\x1b[34mServer is running on: http://localhost:${port}\x1b[0m`);
    })
  )
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.use("/profile", profileRoutes);
app.use(authRoutes);
app.use(questionRoutes);
app.use("/answer", answerRoutes);
app.use("/questions/:id/answer", answerRoutes);
app.use("/answer/:id/comment", commentRoutes);
app.use("/comment", commentRoutes);
