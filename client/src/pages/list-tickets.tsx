import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
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
  { field: "property", headerName: "Imóvel", width: 220 },
  { field: "sector", headerName: "Setor", width: 300 },
  { field: "status", headerName: "Status", width: 120 },
  {
    field: "actions",
    headerName: "Ações",
    width: 160,
    renderCell: function render({ row }) {
      return (
        <>
          <ShowButton hideText recordItemId={row._id} />
          <EditButton hideText recordItemId={row._id} />
          <DeleteButton hideText recordItemId={row._id} />
        </>
      )
    }
  }
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