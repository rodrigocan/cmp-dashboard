import Ticket from "../mongodb/models/ticket.js"

export const getSummary = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments()

    const openTickets = await Ticket.countDocuments({ status: "Em aberto" })

    const inProgressTickets = await Ticket.countDocuments({ status: "Em andamento" })

    const closedTickets = await Ticket.countDocuments({ status: "Resolvido" })

    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}