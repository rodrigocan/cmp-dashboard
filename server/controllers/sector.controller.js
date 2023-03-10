import Sector from "../mongodb/models/sector.js"
import User from "../mongodb/models/user.js"
import Property from "../mongodb/models/property.js"

import mongoose from "mongoose"

// export const createSector = async (req, res) => {
//   try {
//     const {
//       name,
//       phone,
//       email,
//       contactEmail,
//       locationProperty
//     } = req.body

//     const session = await mongoose.startSession()
//     session.startTransaction()

//     const user = await User.findOne({ email }).session(session)

//     if (!user) throw new Error("User not found")

//     const property = await Property.findOne({ _id: locationProperty })

//     const newSector = await Sector.create({
//       name,
//       phone,
//       contactEmail,
//       locationProperty,
//       created_by: user._id
//     })

//     property.allSectors.push(newSector._id)
//     await user.save({ session })

//     await session.commitTransaction()

//     res.status(200).json({ message: "Sector created successfully" })
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

export const createSector = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      contactEmail,
      locationProperty
    } = req.body

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