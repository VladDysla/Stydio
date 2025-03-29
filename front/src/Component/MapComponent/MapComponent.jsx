import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export default function MapComponent() {
   const position = [50.460721862381796, 30.406412894294842]; // Координаты Киева
  return (
<MapContainer 
      center={position} 
      zoom={13} 
      style={{ 
        height: "clamp(300px, 50vh, 512px)", 
        width: "100%",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Beauty Studio<br />
          вулиця Данила Щербаківського 4<br />
          Київ, 03190, Україна
        </Popup>
      </Marker>
    </MapContainer>
  )
}
