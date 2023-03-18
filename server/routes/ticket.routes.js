import express from "express"

import {
  getAllTickets,
  getTicketDetails,
  createTicket,
  deleteTicket
} from "../controllers/ticket.controller.js"

const router = express.Router()

router.route("/").get(getAllTickets)
router.route("/:id").get(getTicketDetails)
router.route("/").post(createTicket)
router.route("/:id").delete(deleteTicket)

export default router