import React from 'react'
import './section.css'
import MapComponent from '../Component/MapComponent/MapComponent'

export default function Map() {
  return (
    <section className="map-sec" id="map">
      <div className="map-container">
        <h2>Карта</h2>
        <MapComponent/>
      </div>
    </section>
  )
}
