const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

//@route Get api/users/
//@desc Test users route
//@access Public
router.get("/", (req, res) => res.json({ msg: "Users Works" }));

//@route Get api/users/register
//@desc Register user
//@access Public
router.post("/reqister", (req, res) => {
  User.findOne({ login: req.body.login }).then(user => {
    if (user) {
      return res.status(400).json({ login: "This login already exists" });
    } else {
      const newUser = new User({
        login: req.body.login,
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

module.exports = router;
