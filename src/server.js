require("dotenv").config()

const PORT = process.env.PORT || 8000
const DB = process.env.DB

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const routes = require("./routes")
const errorHandler = require("./middlewares/errorHandler")

const app = express()

mongoose.connect(DB, {
  useUnifiedTopology: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useCreateIndex: true
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => console.log("Server running on port " + PORT))