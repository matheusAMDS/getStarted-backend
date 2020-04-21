const { validate, Joi } = require("express-validation")

const registerValidation = {
  query: Joi.object({
    role: Joi.string().trim().required()
  }),
  body: Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().alphanum().required().trim(),
    description: Joi.string().trim().required(),
    birthdate: Joi.string(),
    skills: Joi.array(),
    city: Joi.string().trim(),
    uf: Joi.string().length(2).trim(),
    address: Joi.string().trim(),
    github: Joi.string().uri().trim(),
    contact: Joi.object({
      whatsapp: Joi.string().trim().allow("").optional(),
      website: Joi.string().uri().trim().allow("").optional(),
      facebook: Joi.string().uri().trim().allow("").optional(),
      linkedin: Joi.string().uri().trim().allow("").optional(),
    })
  })
}

const loginValidation = {
  query: Joi.object({
    role: Joi.string().required().trim()
  }),
  body: Joi.object({
    email: Joi.string().required().email().trim(),
    password: Joi.string().alphanum().trim().required()
  })
}

const jobsIndexValidation = {
  query: Joi.object({
    page: Joi.number(),
    skills: Joi.array(),
    recent: Joi.bool()
  })
}

const jobStoreValidation = {
  headers: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
  body: Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    requirements: Joi.array().required(),
    salary: Joi.number().required(),
    is_remote: Joi.boolean()
  })
}

module.exports = route => {
  const validationMap = {
    "/register": registerValidation,
    "/login": loginValidation,
    "/jobs": jobsIndexValidation,
    "/jobs/store": jobStoreValidation
  }

  return validate(validationMap[route], {}, {})
}