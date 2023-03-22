import { HttpError } from "@pankod/refine-core"
import { SaveButton } from "@pankod/refine-mui"

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@pankod/refine-mui"

import { UseModalFormReturnType } from "@pankod/refine-react-hook-form"

export interface IssueInfo {
  _id?: string
  date_time: Date
  user_email: string
  description: string
}

export const IssueModal: React.FC<
  UseModalFormReturnType<IssueInfo, HttpError>
> = ({
  saveButtonProps,
  modal: { visible, close },
  register,
  formState: { errors }
}) => {
  return (
    <Dialog
      open={visible}
      onClose={close}
      PaperProps={{ sx: { minWidth: 500 } }}
    >
      <DialogTitle>Adicionar diagnóstico do chamado</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            {...register("issue", {
              required: "Campo obrigatório"
            })}
            error={!!errors.description}
            margin="normal"
            fullWidth
            label="Diagnóstico"
            name="issue"
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