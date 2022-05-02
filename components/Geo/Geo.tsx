import { useState } from 'react'
import osmtogeojson from 'osmtogeojson'
import { GeoJsonObject } from 'geojson'
import { LatLngTuple } from 'leaflet'
import Form from '../Form'
import Map from '../Map'

import { UserSubmitFormShort } from '../../types/'

export const Geo = () => {
  const [position, setPosition] = useState<LatLngTuple>([0, 0])
  const [geoData, setGeoData] = useState<GeoJsonObject>()

  const submitData = (data: UserSubmitFormShort) => {
    const MIN_MAX_RANGE = 0.0125
    const lat = +data.lat
    const lng = +data.lng
    const minLat = lat - MIN_MAX_RANGE
    const minLng = lng - MIN_MAX_RANGE
    const maxLat = lat + MIN_MAX_RANGE
    const maxLng = lng + MIN_MAX_RANGE
    const bbox = `${minLat},${minLng},${maxLat},${maxLng}`

    setPosition([lat, lng])
    fetchData(bbox)
  }

  const fetchData = async (bbox: string) => {
    try {
      const res = await fetch(
        `http://www.openstreetmaps.org/api/0.6/map?bbox=${bbox}`
      )
      const data = await res.text()
      const xml = new window.DOMParser().parseFromString(data, 'text/xml')
      const osmJson = osmtogeojson(xml)
      setGeoData(osmJson as GeoJsonObject)
      console.log(osmJson)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Form submitData={submitData} />

      {geoData && <Map data={geoData} position={position} />}
    </>
  )
}
