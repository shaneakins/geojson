import { GeoJsonObject } from 'geojson'
import { LatLngTuple } from 'leaflet'

export type FieldTypes = {
  label: string
  name: string
  register?: any
  required?: boolean
  //   onChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void
  //   min?: number
  //   max?: number
  validate: (num: number) => boolean
}

export type UserSubmitFormShort = {
  lat: string
  lng: string
}

export type MapTypes = {
  data: GeoJsonObject
  position: LatLngTuple
}
