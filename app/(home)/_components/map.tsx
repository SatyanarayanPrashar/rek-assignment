"use client"

import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
    const [center, setCenter] = useState({ lat: 22.2637, lng: 91.7159 });

    const greenIcon = new Icon({
      iconUrl: "greenicon.png",
      iconSize: [38, 38]
    });
    const redIcon = new Icon({
      iconUrl: "redicon.png",
      iconSize: [38, 38]
    });

    return (
      <MapContainer center={center} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[22.16996, 91.4996]} icon={greenIcon} ></Marker>
        <Marker position={[22.2637, 91.7159]} icon={redIcon} ></Marker>
      </MapContainer>
    );
};

export default BasicMap;