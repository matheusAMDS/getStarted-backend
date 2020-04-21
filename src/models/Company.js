const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const CompanySchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  uf: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  contact: {
    website: String,
    whatsapp: String,
    facebook: String,
    linkedin: String,
  }
})

CompanySchema.pre("save", async function() {
  this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model("companies", CompanySchema)