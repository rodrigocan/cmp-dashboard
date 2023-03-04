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
    values: FieldValues
  ) => Promise<
    void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>
  >
  formLoading: boolean
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined
  onFinishHandler: (data: FieldValues) => Promise<void> | void
}