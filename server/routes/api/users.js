const express = require("express")
const router = express.Router()
const User = require("../../models/User")
const gravatar = require("gravatar")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../../config/keys")
const passport = require("passport")

router.post("/register", (req, res) => {
  User.findOne({ mail: req.body.mail }).then(user => {
    if (user) {
      return res.status(400).json({ msg:"mail already exists" })
    } else {
      const avatar = gravatar.url(req.body.mail, { s: "200", r: "pg", d: "mm" })
      User.create({ ...req.body, avatar }).then(user => {
        if (user) {
          bcrypt.genSalt(11, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) {
                return res
                  .status(400)
                  .json({ msg: "problem hashing the password" })
              }
              user.password = hash
              user
                .save()
                .then(protectedUser => {
                  if (protectedUser) {
                    console.log("user created")
                    return res.status(200).json(protectedUser)
                  }
                })
                .catch(error => {
                  console.log(error)
                  return res
                    .status(400)
                    .json({ msg: "error in saving hashed password" })
                })
            })
          })
        }
      })
    }
  })
})

router.post("/login", (req, res) => {
  User.findOne({ mail: req.body.mail }).then(user => {
    if (!user) {
      return res.status(400).json({ msg:"Mail doesn't exist!"})
    } else {
      bcrypt.compare(req.body.password, user.password).then(isMatched => {
        if (isMatched) {
          const payload = { id: user._id, name: user.name, avatar: user.avatar }
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            if (err) {
              return res.status(400).json({ msg: "error creating token" })
            }
            res.json({ success: true, token: "Bearer " + token })
          })
          //return res.status(200).json({ msg: "success" })
        } else {
          return res.status(400).json({  msg:"Wrong password!" })
        }
      })
    }
  })
})

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user)
  }
)

module.exports = router
