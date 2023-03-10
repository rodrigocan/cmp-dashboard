import { Add } from "@mui/icons-material"
import { useTable, useList } from "@pankod/refine-core"
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@pankod/refine-mui"
import { useNavigate } from "@pankod/refine-react-router-v6"
import { useMemo } from "react"

import { CustomButton } from "components"

const ListSectors = () => {
  const navigate = useNavigate()

  const { data: propertiesData } = useList({
    resource: "properties"
  })

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    filters,
    setFilters
  } = useTable()

  const locationProperties = propertiesData?.data ?? []

  const allSectors = data?.data ?? []

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : [],
    );

    return {
      name:
        logicalFilters.find((item) => item.field === "name")?.value ||
        "",
      locationProperty:
        logicalFilters.find((item) => item.field === "locationProperty")
          ?.value || "",
    };
  }, [filters])

  if (isLoading) return <Typography>Carregando...</Typography>
  if (isError) return <Typography>Erro</Typography>

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            {!allSectors.length
              ? "Nenhum setor encontrado"
              : "Setores"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <Box
              display="flex"
              gap={2}
              flexWrap="wrap"
              mb={{ xs: "20px", sm: 0 }}
            >
              <TextField
                variant="outlined"
                color="info"
                placeholder="Procure pelo nome"
                value={currentFilterValues.name}
                onChange={(e) => {
                  setFilters([
                    {
                      field: "name",
                      operator: "contains",
                      value: e.target.value
                        ? e.currentTarget.value
                        : undefined
                    }
                  ])
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue=""
                value={currentFilterValues.locationProperty}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "locationProperty",
                        operator: "eq",
                        value: e.target.value
                      }
                    ],
                    "replace"
                  )
                }}
              >
                <MenuItem value="" disabled>Todos imóveis</MenuItem>
                {locationProperties.map((locationProperty) => (
                  <MenuItem key={locationProperty._id} value={locationProperty._id}>
                    {locationProperty.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CustomButton
          title="Cadastrar setor"
          handleClick={() => navigate("/sectors/create")}
          backgroundColor="#465be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <pre>{JSON.stringify(allSectors, undefined, 2)}</pre>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead></TableHead>
        </Table>
      </TableContainer> */}
    </Box>
  )
}

export default ListSectors