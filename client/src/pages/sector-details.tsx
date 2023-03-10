import { Typography, Paper } from "@pankod/refine-mui"
import { useShow } from "@pankod/refine-core"

const SectorDetails = () => {
  const { queryResult } = useShow()

  const { data, isLoading, isError } = queryResult

  const sectorDetails = data?.data ?? {}

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Erro</div>
  }

  return (
    <Paper sx={{ height: "100%", padding: "12px" }}>
      <Typography
        fontSize={24}
        fontWeight={700}
        color="#11142D"
      >
        Setor:
      </Typography>
      <Typography
        fontSize={20}
        fontWeight={700}
        color="#11142D"
      >
        {sectorDetails.name}
      </Typography>
      <Typography>Telefone: {sectorDetails.phone}</Typography>
      <Typography>E-mail: {sectorDetails.contactEmail}</Typography>
      <Typography>Imóvel: {sectorDetails.locationProperty.name}</Typography>
    </Paper >
  )
}

export default SectorDetails