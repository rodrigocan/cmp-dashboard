import express from "express"

import { createSector, getAllSectors } from "../controllers/sector.controller.js"

const router = express.Router()

router.route("/").get(getAllSectors)
router.route("/").post(createSector)

export default router