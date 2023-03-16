import { useState } from "react"
import { HttpError, useList } from "@pankod/refine-core"
import {
  Box,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  Button
} from "@pankod/refine-mui"

import { TicketFormProps } from "interfaces/common"
import CustomButton from "components/common/CustomButton"

import { cities } from "components/common/cities"

interface IProperty {
  _id: string
  name: string
}

interface ISector {
  _id: string
  name: string
  locationProperty: IProperty
}

const CreateTicketForm = ({
  type
}: TicketFormProps) => {
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [selectedProperty, setSelectedProperty] = useState<string>("")
  const [selectedSector, setSelectedSector] = useState<string>("")

  const { data: propertiesData, isLoading, isError } = useList<IProperty, HttpError>({
    resource: "properties",
    config: {
      filters: [
        {
          field: "city",
          operator: "eq",
          value: selectedCity
        }
      ]
    },
    queryOptions: {
      enabled: !!selectedCity
    }
  })

  const properties = propertiesData?.data ?? []

  const { data: sectorsData } = useList<ISector, HttpError>({
    resource: "sectors",
    // config: {
    //   filters: [
    //     {
    //       field: "locationProperty.name",
    //       operator: "eq",
    //       value: selectedProperty
    //     }
    //   ]
    // },
    queryOptions: {
      enabled: !!selectedProperty
    }
  })

  const sectors = sectorsData?.data ?? []
  const filteredSectors = sectors.filter((sector) => sector.locationProperty.name === selectedProperty)

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} de Chamado
      </Typography>

      <Box
        mt={2.5}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
      >
        <form
          style={{
            marginTop: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Selecione a cidade
            </FormHelperText>
            <Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">-</MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Selecione o imóvel
            </FormHelperText>
            <Select value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
              <MenuItem value="">-</MenuItem>
              {properties.length > 0 && properties.map((property) => (
                <MenuItem key={property._id} value={property.name}>{property.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Selecione o setor
            </FormHelperText>
            <Select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
              <MenuItem value="">-</MenuItem>
              {filteredSectors.length > 0 && filteredSectors.map((sector) => (
                <MenuItem key={sector._id} value={sector.name}>{sector.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Preencha com o seu nome
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Preencha com o seu telefone de contato
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </FormControl>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d"
              }}
            >
              Preencha com o seu e-mail de contato
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
            />
          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

export default CreateTicketForm