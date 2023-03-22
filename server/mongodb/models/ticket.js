import mongoose from "mongoose"

const TicketSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    property: { type: String, required: true },
    sector: { type: String, required: true },
    requester: { type: String, required: true },
    contact_phone: { type: String, required: true },
    contact_email: { type: String, required: true },
    subject: { type: String, required: true },
    theme: { type: String, required: true },
    service: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false },
    status: {
      type: String,
      enum: ["Em aberto", "Em andamento", "Resolvido"],
      default: "Em aberto",
      required: true
    },
    progress_info: [
      {
        date_time: { type: Date, required: true },
        user_email: { type: String, required: true },
        info: { type: String, required: true }
      }
    ]
  },
  {
    timestamps: true
  }
)

const ticketModel = mongoose.model("Ticket", TicketSchema)

export default ticketModel
