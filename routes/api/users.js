const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const key = require("../../config/key");

const validateRegisterInput = require("../../validation/register");
const validaeLoginInput = require("../../validation/login");
//@route Get api/users/
//@desc Test users route
//@access Public
router.get("/", (req, res) => res.json({ msg: "Users Works" }));

//@route Post api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ userName: req.body.userName }).then(user => {
    if (user) {
      errors.userName = "This userName already exists";
      return res.status(400).json(errors);
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
  const { errors, isValid } = validaeLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  //Find User in MongoDB
  User.findOne({ userName }).then(user => {
    if (!user) {
      errors.userName = "User not found";
      return res.status(404).json(errors);
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
        errors.password = "Password is incorect";
        return res.status(400).json(errors);
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
