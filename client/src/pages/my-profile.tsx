import { useGetIdentity, useOne } from "@pankod/refine-core"

import { Profile } from "components"

const MyProfile = () => {
  const { data: user } = useGetIdentity()
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid
  })

  const myProfile = data?.data ?? []

  if (isLoading) return <div>Carregando...</div>
  if (isError) return <div>Erro</div>

  return (
    <Profile
      type="Meu"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
    />
  )
}

export default MyProfile