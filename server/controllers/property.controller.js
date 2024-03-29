import Property from "../mongodb/models/property.js"
import User from "../mongodb/models/user.js"

import mongoose from "mongoose"
import * as dotenv from "dotenv"
import { v2 as cloudinary } from "cloudinary"

dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    city_like = ""
  } = req.query

  const query = {}

  if (city_like) {
    query.city = { $regex: city_like, $options: "i" }
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" }
  }

  try {
    const count = await Property.countDocuments({ query })

    const properties = await Property.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header("x-total-count", count)
    res.header("Access-Control-Expose-Headers", "x-total-count")

    res.status(200).json(properties)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getPropertyDetail = async (req, res) => {
  const { id } = req.params
  const propertyExists = await Property.findOne({ _id: id }).populate(
    "created_by"
  )

  if (propertyExists) {
    res.status(200).json(propertyExists)
  } else {
    res.status(404).json({ message: "Property not found" })
  }
}

const createProperty = async (req, res) => {
  try {
    const { name, city, address, zip_code, email, photo } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    const user = await User.findOne({ email }).session(session)

    if (!user) throw new Error("User not found")

    const photoUrl = await cloudinary.uploader.upload(photo)

    const newProperty = await Property.create({
      name,
      city,
      address,
      zip_code,
      photo: photoUrl.url,
      created_by: user._id
    })

    await user.save({ session })

    await session.commitTransaction()

    res.status(200).json({ message: "Property created successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateProperty = async (req, res) => {
  try {
    const { id } = req.params
    const { name, city, address, zip_code, photo } = req.body

    const photoUrl = await cloudinary.uploader.upload(photo)

    await Property.findByIdAndUpdate(
      { _id: id },
      {
        name,
        city,
        address,
        zip_code,
        photo: photoUrl.url || photo
      }
    )

    res.status(200).json({ message: "Property updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params

    const session = await mongoose.startSession()
    session.startTransaction()

    await Property.findByIdAndDelete(id)

    await session.commitTransaction()

    res.status(200).json({ message: "Property deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty,
  deleteProperty
}
