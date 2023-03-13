import express from "express"

import {
  createSector,
  getAllSectors,
  getSectorDetails,
  updateSector
} from "../controllers/sector.controller.js"

const router = express.Router()

router.route("/").get(getAllSectors)
router.route("/:id").get(getSectorDetails)
router.route("/").post(createSector)
router.route("/:id").patch(updateSector)

export default router