export interface CustomButtonProps {
  type?: string
  title: string
  backgroundColor: string
  color: string
  fullWidth?: boolean
  icon?: ReactNode
  disabled?: boolean
  handleClick?: () => void
}

export interface ProfileProps {
  type: string
  name: string
  avatar: string
  email: string
}

export interface PropertyProps {
  _id: string
  name: string
  city: string
  address: string
  zip_code: string
  photo: string
}

export interface FormProps {
  type: string
  register: any
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  handleImageChange: (file) => void
  onFinishHandler: (data: FieldValues) => Promise<void> | void
  propertyImage: { name: string; url: string }
}

export interface SectorFormProps {
  type: string
  register: any
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  onFinishHandler: (data: FieldValues) => Promise<void> | void
}

export interface TicketFormProps {
  type: string
  register: any
  watch: any
  setValue: any
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  handleImageChange: (file) => void
  onFinishHandler: (data: FieldValues) => Promise<void> | void
  ticketImage: { name: string; url: string }
}

export interface FormDialogProps {
  register: any
  onFinish: (
    values: FieldValues,
  ) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  onFinishHandler: (data: FieldValues) => Promise<void> | void
}
