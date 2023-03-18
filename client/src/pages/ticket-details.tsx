import { useShow } from "@pankod/refine-core"
import {
  Show,
  TextFieldComponent as TextField,
  Typography,
  Stack
} from "@pankod/refine-mui"

const TicketDetails = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const ticket = data?.data

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          ID:
        </Typography>
        <TextField value={ticket?._id ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Cidade:
        </Typography>
        <TextField value={ticket?.city ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Imóvel:
        </Typography>
        <TextField value={ticket?.property ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Setor:
        </Typography>
        <TextField value={ticket?.sector ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Solicitante
        </Typography>
        <TextField value={ticket?.requester ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Telefone de contato:
        </Typography>
        <TextField value={ticket?.contact_phone ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          E-mail de contato:
        </Typography>
        <TextField value={ticket?.contact_email ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Serviço:
        </Typography>
        <TextField value={`${ticket?.subject} - ${ticket?.theme} - ${ticket?.service}`} />

        <Typography variant="body1" fontWeight="bold">
          Descrição:
        </Typography>
        <TextField value={ticket?.description ?? ""} />
      </Stack>
    </Show>
  )
}

export default TicketDetails