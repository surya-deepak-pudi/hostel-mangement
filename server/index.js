const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000,
  tenents = require("./routes/api/tenents"),
  branches = require("./routes/api/branches")
rooms = require("./routes/api/rooms")

app.get("/", (req, res) => res.send("hii"))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const mongoUri =
  "mongodb+srv://user:passcode@hostel-gbapi.mongodb.net/test?retryWrites=true&w=majority"

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected db..."))
  .catch(err => console.log(err))

app.use("/tenents", tenents)
app.use("/branches", branches)
app.listen(port, () => console.log("connected..."))
