const Programmer = require("../models/Programmer")

module.exports = {
  async show(req, res) {
    const { id } = req.params
    const programmer = await Programmer.findById(id)

    if (!programmer)
      return res.status(400).json({ error: "Programmer not registered" })

    return res.json(programmer)
  }
}