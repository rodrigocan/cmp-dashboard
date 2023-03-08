import { BaseKey } from "@pankod/refine-core"

export interface FormValues {
  name: string
  city: string
  address: string
  zip_code: string
}

export interface PropertyCardProps {
  id?: BaseKey | undefined
  name: string
  city: string
}