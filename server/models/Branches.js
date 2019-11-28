const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BranchSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  careTaker: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  floors: {
    type: Number,
    required: true
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room"
    }
  ]
})

module.exports = mongoose.model("Branch", BranchSchema)
