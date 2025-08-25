const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "this is question asking website!!");
      // Set req.user for API routes
      const user = await User.findById(decodedToken.id);
      req.user = user;
      next();
    } catch (err) {
      console.log(err.message);
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        // API request
        return res.status(401).json({ error: "Authentication required" });
      } else {
        // Regular request
        res.redirect("/login");
      }
    }
  } else {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      // API request
      return res.status(401).json({ error: "Authentication required" });
    } else {
      // Regular request
      res.redirect("/login");
    }
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "this is question asking website!!", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
