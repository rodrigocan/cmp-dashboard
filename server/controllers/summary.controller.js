import Ticket from "../mongodb/models/ticket.js"

export const getSummary = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments()

    const openTickets = await Ticket.countDocuments({ status: "Em aberto" })

    const inProgressTickets = await Ticket.countDocuments({ status: "Em andamento" })

    const resolvedTickets = await Ticket.countDocuments({ status: "Resolvido" })

    const pipeline = [
      {
        $group: {
          _id: "$subject",
          totalTickets: { $sum: 1 },
          openTickets: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Em aberto"] },
                1,
                0
              ]
            }
          },
          inProgressTickets: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Em andamento"] },
                1,
                0
              ]
            }
          },
          resolvedTickets: {
            $sum: {
              $cond: [
                { $eq: ["$status", "Resolvido"] },
                1,
                0
              ]
            }
          }
        }
      }
    ]

    const ticketsBySubject = await Ticket.aggregate(pipeline)

    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      ticketsBySubject
    })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}