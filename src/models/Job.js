const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true 
  },
  requirements: [{
    type: String,
    required: true,
  }],
  salary: {
    type: Number,
    required: true
  },
  is_remote: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  by_company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "companies"
  },
  interested: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "programmers"
  }]
})

JobSchema.plugin(mongoosePaginate)

module.exports = mongoose.model("jobs", JobSchema)