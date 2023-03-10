import express from "express"

import { createSector, getAllSectors, getSectorDetails } from "../controllers/sector.controller.js"

const router = express.Router()

router.route("/").get(getAllSectors)
router.route("/:id").get(getSectorDetails)
router.route("/").post(createSector)

export default router