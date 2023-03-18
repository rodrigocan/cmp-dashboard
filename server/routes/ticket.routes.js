import express from "express"

import {
  getAllTickets,
  createTicket,
  deleteTicket
} from "../controllers/ticket.controller.js"

const router = express.Router()

router.route("/").get(getAllTickets)
router.route("/").post(createTicket)
router.route("/:id").delete(deleteTicket)

export default router