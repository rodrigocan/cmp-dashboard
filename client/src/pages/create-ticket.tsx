import { useState } from "react"
import { FieldValues, useForm } from "@pankod/refine-react-hook-form"

import CreateTicketForm from "components/ticket/CreateTicketForm"

const CreateTicket = () => {
  const [ticketImage, setTicketImage] = useState({ name: "", url: "" })
  const {
    refineCore: { onFinish, formLoading },
    register,
    watch,
    setValue,
    handleSubmit
  } = useForm()

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setTicketImage({ name: file?.name, url: result })
    )
  }

  const onFinishHandler = async (data: FieldValues) => {
    await onFinish({
      ...data,
      photo: ticketImage.url ? ticketImage.url : ""
    })

  }

  return (
    <CreateTicketForm
      type="Abertura"
      register={register}
      watch={watch}
      setValue={setValue}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      ticketImage={ticketImage}
    />
  )
}

export default CreateTicket