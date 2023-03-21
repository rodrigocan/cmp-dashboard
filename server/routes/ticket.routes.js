import express from "express"

import {
  getAllTickets,
  getTicketDetails,
  createTicket,
  deleteTicket,
  updateTicketProgressInfo
} from "../controllers/ticket.controller.js"

const router = express.Router()

router.route("/").get(getAllTickets)
router.route("/:id").get(getTicketDetails)
router.route("/").post(createTicket)
router.route("/:id").delete(deleteTicket)
router.route("/:id").patch(updateTicketProgressInfo)

export default router