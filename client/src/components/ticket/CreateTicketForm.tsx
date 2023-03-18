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

interface IService {
  _id: string
  subject: string
  theme: string
  name: string
}

const CreateTicketForm = ({
  type,
  register,
  watch,
  setValue,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  ticketImage

}: TicketFormProps) => {
  const { data: propertiesData } = useList<IProperty, HttpError>({
    resource: "properties",
    config: {
      filters: [
        {
          field: "city",
          operator: "eq",
          value: watch("city")
        }
      ]
    },
    queryOptions: {
      enabled: !!watch("city")
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
      enabled: !!watch("property")
    }
  })

  const sectors = sectorsData?.data ?? []
  const filteredSectors = sectors.filter((sector) => sector.locationProperty.name === watch("property"))

  const { data: servicesData } = useList<IService, HttpError>({
    resource: "services"
  })

  const servicesObjects = servicesData?.data ?? []
  const subjects = [...new Set(servicesObjects.map((service) => service.subject))].sort()
  const themes = [
    ...new Set(servicesObjects
      .filter((service) => service.subject === watch("subject"))
      .map((service) => service.theme))
  ].sort()
  const services = [
    ...new Set(servicesObjects
      .filter((service) => service.subject === watch("subject"))
      .filter((service) => service.theme === watch("theme"))
      .map((service) => service.name))
  ]

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
          onSubmit={handleSubmit(onFinishHandler)}
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
              onChange={(e) => setValue(
                "city",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              {...register("city", { required: true })}
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
            <Select
              onChange={(e) => setValue(
                "property",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              {...register("property", { required: true })}
            >
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
            <Select
              onChange={(e) => setValue(
                "sector",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              {...register("sector", { required: true })}
            >
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
              {...register("requester", { required: true })}
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
              {...register("contact_phone", { required: true })}
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
              {...register("contact_email", { required: true })}
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
              Selecione a especialidade do serviço
            </FormHelperText>
            <Select
              onChange={(e) => setValue(
                "subject",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              {...register("subject", { required: true })}
            >
              <MenuItem value="">-</MenuItem>
              {subjects.length > 0 && subjects.map((subject) => (
                <MenuItem key={subject} value={subject}>{subject}</MenuItem>
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
              Selecione o tipo do serviço
            </FormHelperText>

            <Select
              onChange={(e) => setValue(
                "theme",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              {...register("theme", { required: true })}
            >
              <MenuItem value="">-</MenuItem>
              {themes.length > 0 && themes.map((theme) => (
                <MenuItem key={theme} value={theme}>{theme}</MenuItem>
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
              Selecione o serviço
            </FormHelperText>

            <Select
              onChange={(e) => setValue(
                "service",
                typeof e.target.value === "string"
                  ? e.target.value : ""
              )}
              defaultValue=""
              {...register("service", { required: true })}
            >
              <MenuItem value="">-</MenuItem>
              {services.length > 0 && services.map((service) => (
                <MenuItem key={service} value={service}>{service}</MenuItem>
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
              Descreva a demanda
            </FormHelperText>

            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              multiline
              minRows={4}
              {...register("description", { required: true })}
            />
          </FormControl>

          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            mb={2}
          >
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Gostaria de adicionar uma foto? (opcional)
              </Typography>

              <Button
                component="label"
                sx={{
                  width: "fit-content",
                  color: "#2ed480",
                  textTransform: "capitalize",
                  fontSize: 16
                }}
              >
                Anexar
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(
                    e: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                    handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#808191"
              sx={{ workBreak: "break-all" }}
            >
              {ticketImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Enviando..." : "Enviar"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  )
}

export default CreateTicketForm