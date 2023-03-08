import Property from "../mongodb/models/property.js"
import User from "../mongodb/models/user.js"

import mongoose from "mongoose"

const getAllProperties = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    city = ""
  } = req.query

  const query = {}

  if (city !== "") {
    query.city = city
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
    const {
      name,
      city,
      address,
      zip_code,
      email
    } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    const user = await User.findOne({ email }).session(session)

    if (!user) throw new Error("User not found")

    const newProperty = await Property.create({
      name,
      city,
      address,
      zip_code,
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
    const { name, city, address, zip_code } = req.body

    await Property.findByIdAndUpdate(
      { _id: id },
      {
        name,
        city,
        address,
        zip_code
      }
    )

    res.status(200).json({ message: "Property updated successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllProperties,
  getPropertyDetail,
  createProperty,
  updateProperty
}