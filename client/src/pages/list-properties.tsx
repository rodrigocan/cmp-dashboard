import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
  DataGrid,
  GridColumns,
} from '@pankod/refine-mui'

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Nome',
    width: 250,
  },
  {
    field: 'city',
    headerName: 'Cidade',
    width: 250,
  },
  {
    field: 'address',
    headerName: 'Endereço',
    width: 300,
  },
  {
    field: 'actions',
    headerName: 'Ações',
    flex: 1,
    renderCell: function render({ row }) {
      return (
        <>
          <ShowButton hideText recordItemId={row._id} />
          <EditButton hideText recordItemId={row._id} />
          <DeleteButton hideText recordItemId={row._id} />
        </>
      )
    },
  },
]

export const ListProperties = () => {
  const { dataGridProps } = useDataGrid()

  return (
    <List>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row._id}
          {...dataGridProps}
          columns={columns}
        />
      </div>
    </List>
  )
}
