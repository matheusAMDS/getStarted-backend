const express = require("express")

const router = express.Router()

const roleAuth = require("./middlewares/roleAuth")

const SessionController = require("./controllers/SessionController")
const JobController = require("./controllers/JobController")
const JobInterestController = require("./controllers/JobInstestController")
const CompanyController = require("./controllers/CompanyController")
const ProgrammerController = require("./controllers/ProgrammerController")

const validator = require("./validator")

router.post("/register", validator("/register"), SessionController.register)
router.post("/login", validator("/login"), SessionController.login)

router.get("/jobs", JobController.index)
router.get("/jobs/:id", JobController.show)
router.post("/jobs/store", validator("/jobs/store"), roleAuth("Company"), JobController.store)
router.put("/jobs/apply/:id", roleAuth("Programmer"), JobInterestController.update)
router.delete("/jobs/close/:id", roleAuth("Company"), JobController.delete)

router.get("/company/:id", CompanyController.show)
router.get("/programmer/:id", ProgrammerController.show)

router.get("/company/jobs/:id", CompanyController.index)

module.exports = router