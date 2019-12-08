const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TenentSchema = new Schema({
  name: String,
  mail: String,
  mobile: Number,
  advance: Number,
  adhar: String,
  date: Date,
  nonVeg: Boolean,
  occupation: String,
  Branch: String,
  roomNumber: String,
  advancePaid: Number,
  dues: Number,
  rent: Number,
  gaurdianName: String,
  gaurdianAddress: String,
  gaurdianNumber: Number
})

module.exports = mongoose.model("Tenent", TenentSchema)
