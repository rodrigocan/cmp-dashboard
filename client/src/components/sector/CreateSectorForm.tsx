import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
} from '@pankod/refine-mui'

import { useList } from '@pankod/refine-core'

import { SectorFormProps } from 'interfaces/common'
import CustomButton from 'components/common/CustomButton'

const CreateSectorForm = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: SectorFormProps) => {
  const { data } = useList({
    resource: 'properties',
  })

  const properties = data?.data ?? []

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} de Setor
      </Typography>

      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Digite o nome do setor
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('name', { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Digite o telefone do setor
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('phone', { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Digite o e-mail de contato do setor
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('contactEmail', { required: true })}
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: '#11142d',
              }}
            >
              Selecione o imóvel de localização do setor
            </FormHelperText>
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ 'aria-label': 'Without label' }}
              {...register('locationProperty', { required: true })}
            >
              {properties.map((property) => (
                <MenuItem key={property._id} value={property._id}>
                  {property.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomButton
            type="submit"
            title={formLoading ? 'Cadastrando...' : 'Cadastrar'}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default CreateSectorForm
