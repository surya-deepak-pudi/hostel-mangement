const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TenentSchema = new Schema({
  name: String,
  mail: String,
  number: Number,
  advance: Number,
  adhar: String,
  date: Date,
  nonVeg: Boolean,
  occupation: String,
  Branch: String,
  BranchName: String,
  roomNumber: String,
  room: String,
  dues: Number,
  rent: Number,
  gaurdianName: String,
  gaurdianAddress: String,
  gaurdianNumber: Number,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Tenent", TenentSchema)
