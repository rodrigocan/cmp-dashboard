import express from "express"

import {
  getAllServices,
  createService
} from "../controllers/service.controller.js"

const router = express.Router()

router.route("/").get(getAllServices)
router.route("/").post(createService)

export default router