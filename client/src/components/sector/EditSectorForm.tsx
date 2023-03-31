import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
} from '@pankod/refine-mui'

import { SectorFormProps } from 'interfaces/common'
import CustomButton from 'components/common/CustomButton'

const EditSectorForm = ({
  type,
  register,
  handleSubmit,
  formLoading,
  onFinishHandler,
}: SectorFormProps) => {
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
              disabled
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

          <CustomButton
            type="submit"
            title={formLoading ? 'Salvando...' : 'Salvar'}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default EditSectorForm
