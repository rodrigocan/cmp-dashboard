import mongoose from "mongoose"

const PropertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  zip_code: { type: String, required: true },
  photo: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
})

const propertyModel = mongoose.model("Property", PropertySchema)

export default propertyModel