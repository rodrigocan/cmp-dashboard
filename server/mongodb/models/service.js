import mongoose from "mongoose"

const ServiceSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  theme: { type: String, required: true },
  name: { type: String, required: true }
}, {
  timestamps: true
})

const serviceModel = mongoose.model("Service", ServiceSchema)

export default serviceModel