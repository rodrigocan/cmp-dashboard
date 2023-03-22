import { useGetIdentity, HttpError } from "@pankod/refine-core"
import { useModalForm } from "@pankod/refine-react-hook-form"
import { useShow } from "@pankod/refine-core"
import {
  Show,
  TextFieldComponent as TextField,
  Typography,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from "@pankod/refine-mui"
import { InfoOutlined, TroubleshootOutlined } from "@mui/icons-material"

import { AddInfoModal, ProgressInfo } from "components/ticket/AddInfoModal"
import { IssueModal, IssueInfo } from "components/ticket/IssueModal"

const TicketDetails = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const ticket = data?.data

  const { data: user } = useGetIdentity()

  const addInfoModalFormProps = useModalForm<
    ProgressInfo,
    HttpError
  >({
    refineCoreProps: { action: "edit", redirect: "show" },
    values: {
      user_email: user?.email,
      updateType: "info"
    }
  })

  const issueModalFormProps = useModalForm<
    IssueInfo,
    HttpError
  >({
    refineCoreProps: { action: "edit", redirect: "show" },
    values: {
      user_email: user?.email,
      updateType: "issue"
    }
  })

  const {
    modal: { show: showAddInfoModal }
  } = addInfoModalFormProps

  const {
    modal: { show: showIssueModal },
    watch
  } = issueModalFormProps

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

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" fontWeight="bold">
            Andamento do chamado:
          </Typography>

          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1}>
            <Button
              variant="contained"
              onClick={() => showAddInfoModal(ticket?._id)}
              color="warning"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <InfoOutlined />
                <Typography fontSize={12}>Adicionar informação</Typography>
              </Stack>
            </Button>

            <AddInfoModal {...addInfoModalFormProps} />

            <Button
              variant="contained"
              onClick={() => showIssueModal(ticket?._id)}
              color="info"
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={1}
              >
                <TroubleshootOutlined />
                <Typography fontSize={12}>Diagnóstico</Typography>
              </Stack>
            </Button>

            <IssueModal {...issueModalFormProps} />
          </Stack>
        </Stack>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data/hora</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Informação</TableCell>
                <TableCell>Anexo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ticket?.progress_info?.sort(
                (a: ProgressInfo, b: ProgressInfo) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime()
              ).map((progress_info: ProgressInfo) => (
                <TableRow key={progress_info._id}>
                  <TableCell>
                    {new Date(progress_info.date_time).toLocaleString("pt-BR", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </TableCell>
                  <TableCell>{progress_info.user_email}</TableCell>
                  <TableCell>{progress_info.info}</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Show>
  )
}

export default TicketDetails