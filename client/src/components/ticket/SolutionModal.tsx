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

export interface SolutionInfo {
  _id?: string
  date_time: Date
  user_email: string
  info: string
}

export const SolutionModal: React.FC<
  UseModalFormReturnType<SolutionInfo, HttpError>
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
        <DialogTitle>Adicionar solução do chamado</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            autoComplete="off"
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              {...register('solution', {
                required: 'Campo obrigatório',
              })}
              error={!!errors.info}
              margin="normal"
              fullWidth
              label="Solução"
              name="solution"
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
