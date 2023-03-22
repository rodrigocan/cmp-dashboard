import ReactApexChart from "react-apexcharts"
import { Box, Typography, Stack } from "@pankod/refine-mui"

interface DonutChartProps {
  title: string
  value: number
  series: Array<number>
  colors: Array<string>
}

export const DonutChart = ({ title, value, series, colors }: DonutChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="#fcfcfc"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
    >
      <Stack direction="column">
        <Typography fontSize={14} color="#808191">
          {title}
        </Typography>
        <Typography
          fontSize={24}
          color="#11142d"
          fontWeight={700}
          mt={1}
        >
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: "donut" },
          colors,
          legend: { show: false },
          dataLabels: { enabled: false }
        }}
        series={series}
        type="donut"
        width="120px"
      />
    </Box>
  )
}