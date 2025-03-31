import React from 'react';
import { MapContainer, TileLayer, Marker, Popup  } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from '../../assents/images/pin.png';

// Фикс для стандартных маркеров Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  shadowUrl: require('../../assents/images/pin.png'),
});

export default function MapComponent() {
  const position = [50.460721862381796, 30.406412894294842]; // Координаты Киева

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
      </Marker>
    </MapContainer>
  );
}