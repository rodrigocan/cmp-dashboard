import { Add } from "@mui/icons-material"
import { useTable } from "@pankod/refine-core"
import {
  Box,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem
} from "@pankod/refine-mui"
import { useNavigate } from "@pankod/refine-react-router-v6"
import { useMemo } from "react"

import { PropertyCard, CustomButton } from "components"

import { cities } from "components/common/cities"

const ListProperties = () => {
  const navigate = useNavigate()

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    filters,
    setFilters
  } = useTable()

  const allProperties = data?.data ?? []

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : [],
    );

    return {
      name:
        logicalFilters.find((item) => item.field === "name")?.value ||
        "",
      city:
        logicalFilters.find((item) => item.field === "city")
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
            {!allProperties.length
              ? "Nenhum imóvel encontrado"
              : "Imóveis"}
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
                      value: e.currentTarget.value
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
                value={currentFilterValues.city}
                onChange={(e) => {
                  setFilters(
                    [
                      {
                        field: "city",
                        operator: "eq",
                        value: e.target.value
                      }
                    ],
                    "replace"
                  )
                }}
              >
                <MenuItem value="" disabled>Todas cidades</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
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
          title="Cadastrar imóvel"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties?.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            name={property.name}
            city={property.city}
          />
        ))}
      </Box>

      {allProperties.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Anterior"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box
            display={{ xs: "hidden", sm: "flex" }}
            alignItems="center"
            gap="5px"
          >
            Página{" "}
            <strong>
              {current} de {pageCount}
            </strong>
          </Box>
          <CustomButton
            title="Próxima"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ "aria-label": "Without label" }}
            defaultValue={10}
            onChange={(e) =>
              setPageSize(
                e.target.value ? Number(e.target.value) : 10,
              )
            }
          >
            {[10, 20, 30].map((size) => (
              <MenuItem key={size} value={size}>
                Mostrar {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  )
}

export default ListProperties