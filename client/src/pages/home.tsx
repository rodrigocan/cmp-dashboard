import { useCustom } from '@pankod/refine-core'

import { Box, Typography } from '@pankod/refine-mui'

import { DonutChart } from 'components/charts/DonutChart'

interface Subject {
  _id: string
  totalTickets: number
  openTickets: number
  inProgressTickets: number
  resolvedTickets: number
}

const Home = () => {
  const { data, isLoading, isError } = useCustom({
    url: 'http://localhost:8080/api/v1/summary',
    method: 'get',
  })

  const summary = data?.data ?? []

  if (isLoading) return <Typography>Carregando...</Typography>
  if (isError) return <Typography>Erro ao carregar os dados</Typography>

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <DonutChart
          title="Total de chamados"
          value={summary.totalTickets}
          series={[
            summary.openTickets,
            summary.inProgressTickets,
            summary.resolvedTickets,
          ]}
          colors={['#FF5722', '#FFC107', '#22FF00']}
        />

        {summary.ticketsBySubject?.map((subject: Subject) => (
          <DonutChart
            key={subject._id}
            title={subject._id}
            value={subject.totalTickets}
            series={[
              subject.openTickets,
              subject.inProgressTickets,
              subject.resolvedTickets,
            ]}
            colors={['#FF5722', '#FFC107', '#22FF00']}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Home
