import express from "express"

import { createSector } from "../controllers/sector.controller.js"

const router = express.Router()

router.route("/").post(createSector)

export default router