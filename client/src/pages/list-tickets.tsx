import {
  useDataGrid,
  List,
  DataGrid,
  GridColumns
} from "@pankod/refine-mui"

const columns: GridColumns = [
  { field: "createdAt", headerName: "Aberto em", width: 200 },
  { field: "property", headerName: "Imóvel", width: 200 },
  { field: "sector", headerName: "Setor", width: 200 },
  { field: "service", headerName: "Serviço", width: 200 },
  { field: "status", headerName: "Status", width: 200 }
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