const express = require("express")
const router = express.Router()
const Tenent = require("../../models/Tenents")
const Room = require("../../models/Rooms")

//get all the tenents
router.get("/", (req, res) => {
  Tenent.find()
    .then(tenents => {
      res.status(200).json(tenents)
    })
    .catch(err => {
      console.log(err)
      res.status(400)
    })
})

//create a new tenent
router.post("/", (req, res) => {
  Room.findOne(
    { branch: req.body.Branch, number: req.body.roomNumber },
    (err, room) => {
      if (err) {
        return res.status(400).json({ msg: "error finding room" })
      } else {
        Tenent.findOne({ mail: req.body.mail })
          .then(user => {
            if (user) {
              return res.status(400).json({ msg: "user already exists" })
            } else {
              Tenent.create({ rent: room.fee, ...req.body }, (err, tenent) => {
                if (err) {
                  console.log(err)
                  return res.status(400)
                } else {
                  room.tenents.push(tenent)
                  room.vacancies--
                  room.save()
                  console.log("added to db")
                  return res.status(200).json(tenent)
                }
              })
            }
          })
          .catch(err => {
            console.log(err)
            return res.status(400)
          })
      }
    }
  )
})

//show
router.get("/:id", (req, res) => {
  Tenent.findOne({ _id: req.params.id }, (err, tenent) => {
    if (err) {
      console.log(err)
      return res.status(400)
    } else {
      return res.status(200).json(tenent)
    }
  })
})

//edit
router.put("/:id", (req, res) => {
  Tenent.findById(req.params.id)
    .then(tenent => {
      if(tenent.Branch!==req.body.Branch || tenent.roomNumber!==req.body.roomNumber){
        Room.findOne({branch:req.body.Branch, number:req.body.roomNumber},(err,room)=>{
          if(err){
            console.log(err)
            return res.status(400).json({msg:"error in finding room"})
          }
          else{
            Tenent.findByIdAndUpdate({...req.body,rent:room.fee},(err,editedTenent)=>{
              if(err){
                console.log(err)
                return res.status(400).json({"msg":"error in updating the tenent"})
              }
              else{
                return res.status(200).json(editedTenent)
              }
            })
          }
        })
      }
    })
    .catch(err => {
      //console.log(err)
      return res.status(400)
    })
})

//delete
router.delete("/:id", (req, res) => {
  Tenent.findById(req.params.id)
    .then(tenent => {
      Room.findOne(
        { branch: tenent.Branch, number: tenent.roomNumber },
        (err, room) => {
          if (err) {
            console.log(err)
            return res.status(400).json({ msg: "couldnt find the room" })
          }
          room.tenents.splice(room.tenents.indexOf(req.params.id), 1)
          room.vacancies++
          room.save()
          Tenent.findByIdAndDelete(req.params.id, (error, deleteUser) => {
            if (err) {
              return res.status(400).json({ msg: "couldnrt delte user" })
            }
            return res.status(200).json("delted")
          })
        }
      )
    })
    .catch(err => {
      console.log(err)
      return res.status(400)
    })
})

module.exports = router
