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

    await Ticket.create({
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

export {
  getAllTickets,
  createTicket,
  deleteTicket
}