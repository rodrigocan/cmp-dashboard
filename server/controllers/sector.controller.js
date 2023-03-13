import Sector from "../mongodb/models/sector.js"
import User from "../mongodb/models/user.js"
import Property from "../mongodb/models/property.js"

import mongoose from "mongoose"

const getAllSectors = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    locationProperty = ""
  } = req.query

  const query = {}

  if (locationProperty !== "") {
    query.locationProperty = locationProperty
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" }
  }

  try {
    const count = await Sector.countDocuments({ query })

    const sectors = await Sector.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })
      .populate("locationProperty")

    res.header("x-total-count", count)
    res.header("Access-Control-Expose-Headers", "x-total-count")

    res.status(200).json(sectors)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getSectorDetails = async (req, res) => {
  const { id } = req.params
  const sectorExists = await Sector.findOne({ _id: id }).populate([
    "created_by",
    "locationProperty"
  ])

  if (sectorExists) {
    res.status(200).json(sectorExists)
  } else {
    res.status(404).json({ message: "Sector not found" })
  }
}

const createSector = async (req, res) => {
  try {
    const { name, phone, email, contactEmail, locationProperty } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    const user = await User.findOne({ email })

    if (!user) throw new Error("User not found")

    const property = await Property.findOne({ _id: locationProperty })

    const newSector = await Sector.create({
      name,
      phone,
      contactEmail,
      locationProperty,
      created_by: user._id
    })

    property.allSectors.push(newSector._id)
    await property.save({ session })

    await session.commitTransaction()

    res.status(200).json({ message: "Sector created successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const updateSector = async (req, res) => {
  try {
    const { id } = req.params
    const { name, phone, contactEmail } = req.body

    await Sector.findByIdAndUpdate(
      { _id: id },
      {
        name,
        phone,
        contactEmail
      }
    )

    res.status(200).json({ message: "Sector updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const deleteSector = async (req, res) => {
  try {
    const { id } = req.params

    const session = await mongoose.startSession()
    session.startTransaction()

    await Sector.findByIdAndDelete(id)

    await session.commitTransaction()

    res.status(200).json({ message: "Sector deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllSectors,
  getSectorDetails,
  createSector,
  updateSector,
  deleteSector
}