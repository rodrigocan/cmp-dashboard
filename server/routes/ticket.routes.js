import express from "express"

import {
  createTicket
} from "../controllers/ticket.controller.js"

const router = express.Router()

router.route("/").post(createTicket)

export default router