import { useImport, useExport, useNotification } from "@pankod/refine-core"

import { useDataGrid, ImportButton, List, ExportButton } from "@pankod/refine-mui"

import { Stack } from "@pankod/refine-mui"
import { DataGrid, GridColumns } from "@pankod/refine-mui"

interface IService {
  subject: string
  theme: string
  name: string
}

const columns: GridColumns = [
  { field: "subject", headerName: "Área", width: 200 },
  { field: "theme", headerName: "Tema", width: 200 },
  { field: "name", headerName: "Serviço", flex: 1 }
]

const ListServices = () => {
  const { dataGridProps } = useDataGrid()

  const { open } = useNotification()

  const { inputProps, isLoading } = useImport({
    onFinish: () => {
      open?.({
        message: "Importação concluída com sucesso",
        type: "success"
      })
    }
  })

  const { triggerExport, isLoading: exportLoading } = useExport<IService>({
    mapData: (item) => {
      return {
        subject: item.subject,
        theme: item.theme,
        name: item.name
      }
    },
    maxItemCount: 50
  })

  return (
    <List
      headerProps={{
        action: (
          <Stack direction="row">
            <ImportButton
              loading={isLoading}
              inputProps={inputProps}
            />
            <ExportButton
              loading={exportLoading}
              onClick={triggerExport}
            />
          </Stack>
        )
      }}
    >
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid getRowId={(row) => row._id} {...dataGridProps} columns={columns} />
      </div>
    </List>
  )
}

export default ListServices