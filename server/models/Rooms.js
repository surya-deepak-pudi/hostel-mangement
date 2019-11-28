const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  beds: {
    type: Number,
    required: true
  },
  AC: {
    type: Boolean,
    required: true
  },
  vacancies: {
    type: Number
  },
  fee: {
    type: Number
  },
  tenents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenents"
    }
  ]
})

module.exports = mongoose.model("Room", RoomSchema)
