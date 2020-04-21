const Job = require("../models/Job")

module.exports = {
  async show(req, res) {
    const { id } = req.params
    const job = await Job.findById(id)
      .populate("by_company")
      .populate("interested")

    return res.json(job)
  },

  async index(req, res) {
    const { page = 1, tech } = req.query

    let jobs, options = {
      populate: "by_company",
      limit: 15,
      page
    }

    if (tech)
      jobs = await Job.paginate({ requirements: tech }, options)
    else 
      jobs = await Job.paginate({ },options)

    return res.json(jobs)
  },

  async store(req, res) {
    const company = req.user.id
    const data = req.body
    const job = await Job.create({ ...data, by_company: company })

    return res.json(job)
  },

  async delete(req, res) {
    const { id } = req.params
    await Job.findByIdAndDelete(id)

    return res.status(204).send()
  }
}