const express = require("express")
const router = express.Router()
const Branch = require("../../models/Branches")

//getting all branches
router.get("/", (req, res) => {
  Branch.find()
    .then(branches => {
      return res.status(200).json(branches)
    })
    .catch(err => {
      return res.status(400)
    })
})

//create a new branch
router.post("/", (req, res) => {
  Branch.findOne({ name: req.body.name }, (err, branches) => {
    if (err) {
      return res.status(400).json({ msg: "error finding branch" })
    }
    if (branches) {
      return res.status(400).json("branch already exists")
    } else {
      Branch.create(req.body, (err, branchCreated) => {
        if (err) {
          return res.status(400).json("branch not created")
        } else {
          return res.status(200).json(branchCreated)
        }
      })
    }
  })
})

//show a branch
router.get("/:id", (req, res) => {
  Branch.findOne({ _id: req.params.id })
    .populate("rooms")
    .exec((err, branch) => {
      if (err) {
        return res.status(400)
      } else {
        return res.status(200).json(branch)
      }
    })
})

//editing a branch
router.put("/:id", (req, res) => {
  Branch.findByIdAndUpdate(req.params.id, req.body)
    .then(branch => {
      return res.status(200).json(branch)
    })
    .catch(err => {
      return res.status(400)
    })
})

//deleting a branch
router.delete("/:id", (req, res) => {
  Branch.findByIdAndDelete(req.params.id)
    .then(branch => {
      return res.status(200).json(branch)
    })
    .catch(err => {
      return res.status(400)
    })
})

const Room = require("../../models/Rooms")

//creating a room
router.post("/:id/rooms/", (req, res) => {
  Branch.findById(req.params.id, (err, branch) => {
    if (err) {
      return res.status(400).json("branch not found")
    } else {
      Room.create({ branch: branch.name, ...req.body }, (error, room) => {
        if (error) {
          return res.status(400).json("room is not created")
        } else {
          branch.rooms.push(room)
          branch.save()
          return res.status(200).json(room)
        }
      })
    }
  })
})

//fetching a room
router.get("/:id/rooms/:roomId", (req, res) => {
  Room.findById(req.params.roomId)
    .then(room => {
      return res.status(200).json(room)
    })
    .catch(err => {
      return res.status(400).json(err)
    })
})

//editing a room
router.put("/:id/rooms/:roomId", (req, res) => {
  Room.findByIdAndUpdate(req.params.roomId, req.body)
    .then(room => {
      return res.status(200).json(room.data)
    })
    .catch(err => {
      return res.status(400)
    })
})

//deleting a room
router.delete("/:id/rooms/:roomId", (req, res) => {
  Room.findByIdAndDelete(req.params.roomId, (err, room) => {
    if (err) {
      return res.status(400)
    } else {
      Branch.findById(req.params.id, (error, branch) => {
        if (!error) {
          branch.rooms.splice(branch.rooms.indexOf(req.params.roomId), 1)
          branch.save()
        } else {
          return res.status(400).json({ msg: "couldnt find the branch" })
        }
      })
      return res.status(200).json(room)
    }
  })
})

module.exports = router
