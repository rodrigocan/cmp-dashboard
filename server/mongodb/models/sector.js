import mongoose from "mongoose"

const SectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  locationProperty: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true
})

const sectorModel = mongoose.model("Sector", SectorSchema)

export default sectorModel