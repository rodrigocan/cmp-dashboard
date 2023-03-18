import express from "express"

import {
  getAllTickets,
  createTicket
} from "../controllers/ticket.controller.js"

const router = express.Router()

router.route("/").get(getAllTickets)
router.route("/").post(createTicket)

export default router