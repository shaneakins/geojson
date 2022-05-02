import { useState } from 'react'
import osmtogeojson from 'osmtogeojson'
import { GeoJsonObject } from 'geojson'
import { LatLngTuple } from 'leaflet'
import Form from '../Form'
import Map from '../Map'

import { UserSubmitFormShort } from '../../types'

export const Geo = () => {
  const [inputs, setInputs] = useState({
    minLat: 0,
    minLong: 0,
    maxLat: 0,
    maxLong: 0,
  })

  const [position, setPosition] = useState<LatLngTuple>([0, 0])
  //   const [geoData, setGeoData] = useState<GeoJSON.FeatureCollection>()
  const [geoData, setGeoData] = useState<GeoJsonObject>()
  //   const [geoData, setGeoData] =
  //     useState<GeoJSON.FeatureCollection<GeoJSON.GeometryObject, any>>()

  //   const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) =>
  //     setInputs((prev) => ({ ...prev, [evt.target.name]: evt.target.value }))

  //   const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
  //   const onSubmit = (data: UserSubmitForm) => {
  //     const bbox = `${data.minLat},${data.minLong},${data.maxLat},${data.maxLong}`
  //     setInputs({
  //       minLat: +data.minLat,
  //       minLong: +data.minLong,
  //       maxLat: +data.maxLat,
  //       maxLong: +data.maxLong,
  //     })
  //     setCenter([
  //       (+data.maxLat + +data.minLat) / 2,
  //       (+data.maxLong + +data.minLong) / 2,
  //     ])
  //     fetchData(bbox)
  //   }
  const submitData = (data: UserSubmitFormShort) => {
    const MIN_MAX_RANGE = 0.0125
    const lat = +data.lat
    const lng = +data.lng
    const minLat = lat - MIN_MAX_RANGE
    const minLng = lng - MIN_MAX_RANGE
    const maxLat = lat + MIN_MAX_RANGE
    const maxLng = lng + MIN_MAX_RANGE
    const bbox = `${minLat},${minLng},${maxLat},${maxLng}`
    // setInputs({
    //   minLat: minLat,
    //   minLong: minLong,
    //   maxLat: maxLat,
    //   maxLong: maxLong,
    // })
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
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Field label='lat' register={register} required validate={isLatValid} />
        <Field
          label='long'
          register={register}
          required
          validate={isLongValid}
        />
        {errors.lat && errors.lat.type === 'validate' && (
          <div>Latitude must be between -90 and 90</div>
        )}
        {errors.long && errors.long.type === 'validate' && (
          <div>Longitude must be between 0 and 179.99</div>
        )} */}

      {/*  <Field
          label='minLat'
          register={register}
          required
          // onChange={handleChange}
        />
        <Field
          label='minLong'
          register={register}
          required
          // onChange={handleChange}
        />
        <Field
          label='maxLat'
          register={register}
          required
          // onChange={handleChange}
        />
        <Field
          label='maxLong'
          register={register}
          required
          // onChange={handleChange}
        /> */}
      {/* <input type='submit' value='Submit' />
      </form> */}
      {geoData && <Map data={geoData} position={position} />}
    </>
  )
}

// export default Geo
