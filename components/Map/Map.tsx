import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import { randomId } from 'utils'
import { MapTypes } from '../../types/'

const mapStyle: React.CSSProperties = {
  width: '500px',
  height: '500px',
}

const Map = ({ data, position }: MapTypes) => {
  return (
    <MapContainer
      center={position}
      zoom={5}
      scrollWheelZoom={false}
      style={mapStyle}
      key={randomId}
    >
      <GeoJSON data={data} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
