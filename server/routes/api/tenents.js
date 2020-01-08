const express = require("express")
const router = express.Router()
const Tenent = require("../../models/Tenents")
const Room = require("../../models/Rooms")
const passport = require("passport")
const tenantMiddleware = require("../../middlewares/tenents")

//get all the tenents
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Tenent.find({ author: req.user._id })
      .then(tenents => {
        if (tenents) {
          res.status(200).json(tenents)
        } else {
          res.status(400).json({ msg: "No tenents available" })
        }
      })
      .catch(err => {
        res.status(400).json({ server: "Error finding tenents" })
      })
  }
)

//create a new tenent
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Room.findById(req.body.roomNumber, (err, room) => {
      if (err) {
        return res.status(400).json({ server: "error finding room" })
      } else {
        if (room) {
          Tenent.create(
            {
              rent: room.fee,
              room: room.number,
              ...req.body,
              author: req.user._id
            },
            (error, tenent) => {
              if (error) {
                return res
                  .status(400)
                  .json({ server: "Error creating tenents" })
              } else {
                room.tenents.push(tenent)
                room.vacancies--
                room.save()
                console.log("Created tenant")
                return res.status(200).json(tenent)
              }
            }
          )
        } else {
          return res.status(400).json({ server: "room doesn't exist" })
        }
      }
    })
  }
)

//show
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tenantMiddleware.isAuthor,
  (req, res) => {
    Tenent.findOne({ _id: req.params.id }, (err, tenent) => {
      if (err) {
        return res.status(400).json({ server: "Error in finding tenent" })
      } else {
        console.log("showed a tenant")
        if (tenent) {
          return res.status(200).json(tenent)
        } else {
          return res.status(400).json({ msg: "Tenent doesnt exist" })
        }
      }
    })
  }
)

//edit
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tenantMiddleware.isAuthor,
  (req, res) => {
    Tenent.findById(req.params.id)
      .then(tenent => {
        //if changing rooms
        if (
          tenent.roomNumber !== req.body.roomNumber ||
          tenent.Branch !== req.body.Branch
        ) {
          Room.findById(tenent.roomNumber, (err, room) => {
            if (err || !room) {
              console.log(err)
              return res.status(400).json({ server: "error in finding room" })
            } else {
              Room.findById(req.body.roomNumber, (error, newRoom) => {
                if (error || !newRoom) {
                  return res
                    .status(400)
                    .json({ server: "error in finding room" })
                } else {
                  Tenent.findByIdAndUpdate(
                    req.params.id,
                    { ...req.body, rent: newRoom.fee },
                    (errt, editedTenent) => {
                      if (errt || !editedTenent) {
                        return res
                          .status(400)
                          .json({ server: "error in updating the tenent" })
                      } else {
                        newRoom.vacancies--
                        newRoom.tenents.push(editedTenent)
                        newRoom.save()
                        room.vacancies++
                        room.save()
                        console.log("edited tenant")
                        return res.status(200).json(editedTenent)
                      }
                    }
                  )
                }
              })
            }
          })
        }
        //changing personal data
        else {
          Tenent.findByIdAndUpdate(
            req.params.id,
            { ...req.body, author: req.user._id },
            (err, editedTenent) => {
              if (err || editedTenent) {
                return res
                  .status(400)
                  .json({ server: "error in updating the tenent" })
              } else {
                return res.status(200).json(editedTenent)
              }
            }
          )
        }
      })
      .catch(err => {
        return res.status(400)
      })
  }
)

//delete
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  tenantMiddleware.isAuthor,
  (req, res) => {
    Tenent.findById(req.params.id)
      .then(tenent => {
        Room.findById(tenent.roomNumber, (err, room) => {
          if (err) {
            return res.status(400).json({ server: "Error finding the room" })
          }
          Tenent.findByIdAndDelete(req.params.id, (error, deleteUser) => {
            if (error) {
              return res.status(400).json({ server: "Error deleting tenet" })
            }
            room.tenents.splice(room.tenents.indexOf(req.params.id), 1)
            room.vacancies++
            room.save()
            console.log("deleted tenent")
            return res.status(200).json(deleteUser)
          })
        })
      })
      .catch(err => {
        return res.status(400).json({ server: "error finding tenent" })
      })
  }
)

module.exports = router
