/* eslint-disable no-restricted-globals */
import { Typography, Paper, Stack } from '@pankod/refine-mui'
import { useShow, useDelete } from '@pankod/refine-core'
import { useNavigate, useParams } from '@pankod/refine-react-router-v6'
import { Edit, Delete } from '@mui/icons-material'

import { CustomButton } from 'components'

const SectorDetails = () => {
  const navigate = useNavigate()
  const { queryResult } = useShow()
  const { mutate } = useDelete()
  const { id } = useParams()

  const { data, isLoading, isError } = queryResult

  const sectorDetails = data?.data ?? {}

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (isError) {
    return <div>Erro</div>
  }

  const handleDeleteSector = () => {
    const response = confirm('Tem certeza que deseja excluir este setor?')

    if (response) {
      mutate(
        {
          resource: 'sectors',
          id: id as string,
        },
        {
          onSuccess: () => {
            navigate('/sectors')
          },
        },
      )
    }
  }

  return (
    <Paper sx={{ height: '100%', padding: '12px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={24} fontWeight={700} color="#11142D">
          Setor:
        </Typography>

        <Stack direction="row" gap={2}>
          <CustomButton
            title="Editar"
            backgroundColor="#475BE8"
            color="#FCFCFC"
            icon={<Edit />}
            handleClick={() => navigate(`/sectors/edit/${sectorDetails._id}`)}
          />

          <CustomButton
            title="Excluir"
            backgroundColor="#d42e2e"
            color="#FCFCFC"
            icon={<Delete />}
            handleClick={() => handleDeleteSector()}
          />
        </Stack>
      </Stack>
      <Typography fontSize={20} fontWeight={700} color="#11142D">
        {sectorDetails.name}
      </Typography>
      <Typography>Telefone: {sectorDetails.phone}</Typography>
      <Typography>E-mail: {sectorDetails.contactEmail}</Typography>
      <Typography>Imóvel: {sectorDetails.locationProperty.name}</Typography>
    </Paper>
  )
}

export default SectorDetails
