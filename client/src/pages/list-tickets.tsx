import {
  useDataGrid,
  List,
  DataGrid,
  GridColumns
} from "@pankod/refine-mui"

const columns: GridColumns = [
  { field: "createdAt", headerName: "Aberto em", width: 150, valueFormatter: (params) => {
    if (params.value == null) {
      return ""
    }

    const valueFormatted = new Date(params.value).toLocaleString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })

    return valueFormatted
  }},
  { field: "property", headerName: "Imóvel", width: 200 },
  { field: "sector", headerName: "Setor", width: 200 },
  { field: "service", headerName: "Serviço", width: 250 },
  { field: "status", headerName: "Status", width: 150 }
]

const ListTickets = () => {
  const { dataGridProps } = useDataGrid()

  return (
    <List>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          {...dataGridProps}
          columns={columns}
        />
      </div>
    </List>
  )
}

export default ListTickets