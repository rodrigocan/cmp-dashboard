/* eslint-disable no-restricted-globals */
import { Typography, Box, Stack } from '@pankod/refine-mui'
import { useShow, useDelete } from '@pankod/refine-core'
import { useNavigate, useParams } from '@pankod/refine-react-router-v6'
import { Place, Edit, Delete } from '@mui/icons-material'

import { CustomButton } from 'components'

const PropertyDetails = () => {
  const navigate = useNavigate()
  const { queryResult } = useShow()
  const { mutate } = useDelete()
  const { id } = useParams()

  const { data, isLoading, isError } = queryResult

  const propertyDetails = data?.data ?? {}

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Erro</div>
  }

  const handleDeleteProperty = () => {
    const response = confirm('Tem certeza que deseja excluir este imóvel?')

    if (response) {
      mutate(
        {
          resource: 'properties',
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate('/properties')
          },
        },
      )
    }
  }

  return (
    <Box
      borderRadius="15px"
      padding="20px"
      bgcolor="#FCFCFC"
      width="fit-content"
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={24} fontWeight={700} color="#11142D">
          Imóvel
        </Typography>

        <Stack direction="row" gap={2}>
          <CustomButton
            title="Editar"
            backgroundColor="#475BE8"
            color="#FCFCFC"
            icon={<Edit />}
            handleClick={() =>
              navigate(`/properties/edit/${propertyDetails._id}`)
            }
          />

          <CustomButton
            title="Excluir"
            backgroundColor="#d42e2e"
            color="#FCFCFC"
            icon={<Delete />}
            handleClick={() => {
              handleDeleteProperty()
            }}
          />
        </Stack>
      </Stack>

      <Box
        mt="20px"
        display="flex"
        flexDirection={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <Box flex={1} maxWidth={764}>
          <img
            src={propertyDetails.photo}
            alt={`Foto do imóvel ${propertyDetails.name}`}
            height={546}
            style={{ objectFit: 'cover', borderRadius: '10px' }}
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
                <Typography fontSize={18} fontWeight={600}>
                  {propertyDetails.city}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: '#808191' }} />
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
