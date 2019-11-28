const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TenentSchema = new Schema({
  name: {
    type: String
  },
  mail: {
    type: String
  },
  mobile: {
    type: Number
  },
  advance: {
    type: Number
  },
  adhar: {
    type: String
  },
  date: {
    type: Date
    //
  },
  nonVeg: {
    type: Boolean
  },
  occupation: {
    type: String
  },
  Branch: {
    type: String
  },
  roomNumber: {
    type: String
  },
  advancePaid: {
    type: Number
  },
  dues: {
    type: Number
  },
  rent: {
    type: Number
  },
  gaurdianName: {
    type: String
  },
  gaurdianAddress: {
    type: String
  },
  gaurdianNumber: {
    type: Number
  }
})

module.exports = mongoose.model("Tenent", TenentSchema)
