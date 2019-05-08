const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

//@route Get api/users/
//@desc Test users route
//@access Public
router.get("/", (req, res) => res.json({ msg: "Users Works" }));

//@route Get api/users/register
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
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route Get api/users/login
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

        //Change KEYTEST to privateKey
        jwt.sign(payload, "KEYTEST", { expiresIn: 3600 }, (err, token) => {
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

module.exports = router;
