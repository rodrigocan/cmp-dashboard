/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { HttpError } from '@pankod/refine-core'
import {
  SaveButton,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@pankod/refine-mui'

import { UseModalFormReturnType } from '@pankod/refine-react-hook-form'

export interface ProgressInfo {
  _id?: string
  date_time: Date
  user_email: string
  info: string
  updateType: 'info' | 'issue' | 'solution'
}

export const AddInfoModal: React.FC<
  UseModalFormReturnType<ProgressInfo, HttpError>
> = ({
  saveButtonProps,
  modal: { visible, close },
  register,
  formState: { errors },
}) => {
    return (
      <Dialog
        open={visible}
        onClose={close}
        PaperProps={{ sx: { minWidth: 500 } }}
      >
        <DialogTitle>Adicionar informação ao chamado</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              {...register('info', {
                required: 'Campo obrigatório',
              })}
              error={!!errors.info}
              margin="normal"
              fullWidth
              label="Informação"
              name="info"
              autoFocus
              multiline
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancelar</Button>
          <SaveButton {...saveButtonProps}>Adicionar</SaveButton>
        </DialogActions>
      </Dialog>
    )
  }
