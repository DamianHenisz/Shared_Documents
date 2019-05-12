const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const key = require("../../config/key");

//@route Get api/users/
//@desc Test users route
//@access Public
router.get("/", (req, res) => res.json({ msg: "Users Works" }));

//@route Post api/users/register
//@desc Register user
//@access Public
router.post("/reqister", (req, res) => {
  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      return res.status(400).json({ userName: "This userName already exists" });
    } else {
      const newUser = new User({
        userName: req.body.userName,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err.response.data));
        });
      });
    }
  });
});

//@route Post api/users/login
//@desc Login User / Returning JWT Token
//@access Public
router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  //Find User in MongoDB
  User.findOne({ userName }).then(user => {
    if (!user) {
      return res.status(404).json({ userName: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //Create Jwt payload
        const payload = { id: user.id, userName: user.userName };

        jwt.sign(payload, key.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            succcess: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Password is incorect" });
      }
    });
  });
});

//@route Get api/users/current
//@desc Return current user
//@access Private
router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ id: req.user.id, userName: req.user.userName });
});

module.exports = router;
