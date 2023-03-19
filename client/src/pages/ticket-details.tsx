import { useShow } from "@pankod/refine-core"
import {
  Show,
  TextFieldComponent as TextField,
  Typography,
  Box,
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

        {ticket?.photo && (
          <>
            <Typography variant="body1" fontWeight="bold">
              Foto anexada na abertura:
            </Typography>
            <Box
              component="img"
              sx={{
                width: 400
              }}
              src={ticket?.photo}
            />
          </>
        )}

        <Typography variant="body1" fontWeight="bold">
          Status:
        </Typography>
        <TextField value={ticket?.status ?? ""} />

        <Typography variant="body1" fontWeight="bold">
          Aberto em:
        </Typography>
        <TextField
          value={
            new Date(ticket?.createdAt).toLocaleString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          }
        />

        <Typography variant="body1" fontWeight="bold">
          Atualizado em:
        </Typography>
        <TextField
          value={
            new Date(ticket?.updatedAt).toLocaleString("pt-BR", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })
          }
        />
      </Stack>
    </Show>
  )
}

export default TicketDetails