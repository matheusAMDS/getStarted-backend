const Company = require("../models/Company")
const Jobs = require("../models/Job")

module.exports = {
  async show(req, res) {
    const { id } = req.params
    const company = await Company.findById(id)

    if (!company)
      return res.status(400).json({ error: "Company not registered" })

    return res.json(company)
  },

  async index(req, res) {
    const { id } = req.params
    const jobs = await Jobs.find({ by_company: id }).populate("by_company")

    return res.json(jobs)
  }
}