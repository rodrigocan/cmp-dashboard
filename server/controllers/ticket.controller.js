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

const createTicket = async (req, res) => {
  try {
    const {
      city,
      property,
      sector,
      requester,
      contact_phone,
      contact_email,
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

export { createTicket }