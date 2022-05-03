import { useEffect, useState } from 'react'
import osmtogeojson from 'osmtogeojson'
import { GeoJsonObject } from 'geojson'
import { LatLngTuple } from 'leaflet'
import Form from '@/components/Form'
import Map from '@/components/Map'
import useFetch from 'hooks/useFetch'
import { MIN_MAX_RANGE } from 'utils/constants'

import { UserSubmitFormShort } from 'types/'

export const Geo = () => {
  const [position, setPosition] = useState<LatLngTuple>([0, 0])
  const [geoData, setGeoData] = useState<GeoJsonObject>()
  const [url, setUrl] = useState('')

  const { data, loading, error } = useFetch<Document>(url, undefined, true)

  const submitData = (data: UserSubmitFormShort) => {
    const lat = +data.lat
    const lng = +data.lng
    const minLat = lat - MIN_MAX_RANGE
    const minLng = lng - MIN_MAX_RANGE
    const maxLat = lat + MIN_MAX_RANGE
    const maxLng = lng + MIN_MAX_RANGE
    const bbox = `${minLng},${minLat},${maxLng},${maxLat}`

    setPosition([lat, lng])
    setUrl(`http://www.openstreetmaps.org/api/0.6/map?bbox=${bbox}`)
  }

  useEffect(() => {
    if (data) {
      const osmJson = osmtogeojson(data)
      setGeoData(osmJson as GeoJsonObject)
    }
  }, [data])

  return (
    <>
      <Form submitData={submitData} />
      {error && <p>There was an error loading the data</p>}
      {loading && <p>Loading</p>}
      {geoData && <Map data={geoData} position={position} />}
    </>
  )
}
