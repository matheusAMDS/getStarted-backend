const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const Company = require("../models/Company")
const Programmer = require("../models/Programmer")

function generateToken(id, role) {
  const accessToken = process.env.ACCESS_TOKEN_KEY

  return jwt.sign({ id, role }, accessToken, { expiresIn: "2h" })
}

module.exports = {
  async register(req, res) {
    const { role } = req.query
    const data = req.body
    const RoleModel = role == "Company" ? Company : Programmer

    try {
      if (await RoleModel.findOne({ email: data.email }))
        return res.status(401).json({ error: "Email already being used" })

      if (data.birthdate) {
        const [ day, month, year ] = data.birthdate.split("/")
        data.birthdate = new Date(year, month - 1, day).toUTCString()
      }

      const user = await RoleModel.create(data)

      user.password = undefined 

      return res.json({
        token: generateToken(user._id, role),
        role,
        user
      })
      
    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: "Impossible to register" })
    }
  },
  
  async login(req, res) {
    const { role } = req.query
    const { email, password } = req.body
    const RoleModel = role == "Company" ? Company : Programmer

    try {
      const user = await RoleModel.findOne({ email }).select("+password")

      if (!user)
        return res.status(401).json({ error: "Email not registered" })

      if (!await bcrypt.compare(password, user.password))
        return res.status(401).json({ error: "Incorrect password" })

      user.password = undefined

      return res.json({
        token: generateToken(user._id, role),
        role,
        user
      })

    } catch (err) {
      console.log(err)
      return res.status(400).json({ error: "Impossible to login"})
    }
  }
}