const jwt = require("jsonwebtoken")

module.exports = roleArg => (req, res, next) => {
  const { authorization } = req.headers
  const [ type, token ] = authorization.split(" ")

  if (type !== "Bearer")
    return res.status(401).json({ error: "Wrong authorization token" })

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, { id, role }) => {
    if (err)
      return res.status(401).json({ error: "Wrong token" })

    if (role != roleArg)
      return res.status(401).json({ error: `Route not authorized for ${role}` })

    req.user = { id, role }
    next()
  })
}