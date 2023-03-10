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

    res.header("x-total-count", count)
    res.header("Access-Control-Expose-Headers", "x-total-count")

    res.status(200).json(sectors)
  } catch (error) {
    res.status(500).json({ message: error.message })
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

export { getAllSectors, createSector }
