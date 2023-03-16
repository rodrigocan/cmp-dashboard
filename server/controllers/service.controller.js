import Service from "../mongodb/models/service.js"

import mongoose from "mongoose"

const getAllServices = async (req, res) => {
  const {
    _end,
    _order,
    _start,
    _sort,
    name_like = "",
    theme = "",
    subject = ""
  } = req.query

  const query = {}

  if (theme !== "") {
    query.theme = theme
  }

  if (subject !== "") {
    query.subject = subject
  }

  if (name_like) {
    query.name = { $regex: name_like, $options: "i" }
  }

  try {
    const count = await Service.countDocuments({ query })

    const services = await Service.find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header("x-total-count", count)
    res.header("Access-Control-Expose-Headers", "x-total-count")

    res.status(200).json(services)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createService = async (req, res) => {
  try {
    const { subject, theme, name } = req.body

    const session = await mongoose.startSession()
    session.startTransaction()

    const serviceAlreadyExists = await Service.findOne({
      subject,
      theme,
      name
    })

    if (serviceAlreadyExists) throw new Error("Service already exists")

    await Service.create({
      subject,
      theme,
      name
    })

    await session.commitTransaction()

    res.status(200).json({ message: "Service created successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export {
  getAllServices,
  createService
}