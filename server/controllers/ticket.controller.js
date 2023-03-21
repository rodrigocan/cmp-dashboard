import Ticket from "../mongodb/models/ticket.js"

import mongoose from "mongoose"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const getAllTickets = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    property_like = "",
    sector_like = ""
  } = req.query

  const query = {}

  if (property_like) {
    query.property = { $regex: property_like, $options: "i" }
  }

  if (sector_like) {
    query.sector = { $regex: sector_like, $options: "i" }
  }

  try {
    const count = await Ticket.countDocuments({ query })

    const tickets = await Ticket.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header("x-total-count", count)
    res.header("Access-Control-Expose-Headers", "x-total-count")

    res.status(200).json(tickets)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getTicketDetails = async (req, res) => {
  const { id } = req.params
  const ticketExists = await Ticket.findOne({ _id: id })

  if (ticketExists) {
    res.status(200).json(ticketExists)
  } else {
    res.status(404).json({ message: "Ticket not found" })
  }
}

const createTicket = async (req, res) => {
  try {
    const {
      city,
      property,
      sector,
      requester,
      contact_phone,
      contact_email,
      subject,
      theme,
      service,
      description,
      photo
    } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    const photoUrl = await cloudinary.uploader.upload(photo)

    const newTicket = await Ticket.create({
      city,
      property,
      sector,
      requester,
      contact_phone,
      contact_email,
      subject,
      theme,
      service,
      description,
      photo: photoUrl.url
    })

    newTicket.progress_info.push({
      date_time: new Date(),
      user_email: "admin",
      info: "Abertura do chamado."
    })

    await newTicket.save()

    await session.commitTransaction()

    res.status(200).json({ message: "Ticket created successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params

    const session = await mongoose.startSession()
    session.startTransaction()

    await Ticket.findByIdAndDelete(id)

    await session.commitTransaction()

    res.status(200).json({ message: "Ticket deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateTicketProgressInfo = async (req, res) => {
  const { id } = req.params
  const { info, user_email } = req.body

  try {
    const ticket = await Ticket.findById(id)
    if (!ticket) {
      res.status(404).json({ message: "Ticket not found" })
    }

    ticket.progress_info.push({
      date_time: new Date(),
      user_email,
      info
    })

    if (ticket.status === "Em aberto") {
      ticket.status = "Em andamento"
    }

    await ticket.save()

    res.status(200).json({ message: "Ticket updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllTickets,
  getTicketDetails,
  createTicket,
  deleteTicket,
  updateTicketProgressInfo
}