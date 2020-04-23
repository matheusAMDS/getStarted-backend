const Job = require("../models/Job")

module.exports = {
  async update(req, res) {
    const programmer = req.user.id 
    const { id } = req.params

    let job = await Job.findById(id)

    if (job.interested.includes(programmer))
      return res.status(400).json({ error: "Already applied to this job."})

    job.interested.push(programmer)
    await job.save()

    return res.status(204).send()
  },
}