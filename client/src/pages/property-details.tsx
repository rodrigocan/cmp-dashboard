import { Typography, Box, Stack } from "@pankod/refine-mui"
import { useShow } from "@pankod/refine-core"
import { Place } from "@mui/icons-material"

const PropertyDetails = () => {
  const { queryResult } = useShow()

  const { data, isLoading, isError } = queryResult

  const propertyDetails = data?.data ?? {}

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Erro</div>
  }

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Typography
        fontSize={24}
        fontWeight={700}
        color="#11142D"
      >
        Imóvel
      </Typography>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo}
            alt={`Foto do imóvel ${propertyDetails.name}`}
            height={546}
            style={{ objectFit: "cover", borderRadius: "10px" }}
            className="property_details-img"
          />

          <Box mt="15px">
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Box>
                <Typography
                  fontSize={22}
                  fontWeight={700}
                  mt="10px"
                  color="#11142D"
                >
                  {propertyDetails.name}
                </Typography>
                <Typography
                  fontSize={18}
                  fontWeight={600}
                >
                  {propertyDetails.city}
                </Typography>
                <Stack
                  mt={0.5}
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                >
                  <Place sx={{ color: "#808191" }} />
                  <Typography fontSize={14} color="#808191">
                    {`${propertyDetails.address}, CEP: ${propertyDetails.zip_code}`}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default PropertyDetails