const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 5000,
  tenents = require("./routes/api/tenents"),
  branches = require("./routes/api/branches"),
  users = require("./routes/api/users"),
  cors = require("cors"),
  passport = require("passport"),
  passportMiddleware = require("./config/passport")

app.get("/", (req, res) => res.send("hii"))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
const mongoUri =
  "mongodb+srv://user:passcode@hostel-gbapi.mongodb.net/test?retryWrites=true&w=majority"

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected db..."))
  .catch(err => console.log(err))

//passport config
require("./config/passport")(passport)

app.use("/", users)
app.use("/tenents", tenents)
app.use("/branches", branches)
app.listen(port, () => console.log("connected..."))
