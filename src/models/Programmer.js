const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const ProgrammerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  birthdate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: false
  },
  uf: {
    type: String,
    required: false
  },
  skills: [{
    type: String,
    required: true
  }],
  github: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contact: {
    website: String,
    whatsapp: String,
    facebook: String,
    linkedin: String,
  }
})

ProgrammerSchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("programmers", ProgrammerSchema)