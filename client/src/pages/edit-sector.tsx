import { FieldValues, useForm } from '@pankod/refine-react-hook-form'

import EditSectorForm from 'components/sector/EditSectorForm'

const EditSector = () => {
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm()

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
    })
  }

  return (
    <EditSectorForm
      type="Edição"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      onFinishHandler={onFinishHandler}
    />
  )
}

export default EditSector
