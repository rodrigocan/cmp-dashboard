import { useGetIdentity } from "@pankod/refine-core"
import { FieldValues, useForm } from "@pankod/refine-react-hook-form"

import Form from "components/common/Form"

const CreateProperty = () => {
  const { data: user } = useGetIdentity()
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit
  } = useForm()

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
      email: user.email
    })
  }

  return (
    <Form
      type="Cadastro"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    />
  )
}

export default CreateProperty