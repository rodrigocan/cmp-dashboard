import mongoose from "mongoose"

const TicketSchema = new mongoose.Schema({
  city: { type: String, required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
  sector: { type: mongoose.Schema.Types.ObjectId, ref: "Sector" },
  requester: { type: String, required: true },
  contact_phone: { type: String, required: true },
  contact_email: { type: String, required: true },
  service: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: false },
  status: {
    type: String,
    enum: ["Em aberto", "Em andamento", "Concluído"],
    default: "Em aberto",
    required: true
  }
})

const ticketModel = mongoose.model("Ticket", TicketSchema)

export default ticketModel