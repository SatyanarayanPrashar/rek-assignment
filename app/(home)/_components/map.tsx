"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
  const [center, setCenter] = useState({ lat: 22.2637, lng: 91.7159 });

  const [shipPosition, setShipPosition] = useState({ lat: 22.16996, lng: 91.4996 });
  const destinationPosition = { lat: 22.2637, lng: 91.7159 };

  const startMovement = () => {
    const interval = setInterval(() => {
      setShipPosition(prevPosition => ({
        lat: prevPosition.lat + (destinationPosition.lat - prevPosition.lat) / 100,
        lng: prevPosition.lng + (destinationPosition.lng - prevPosition.lng) / 100
      }));

      if (
        Math.abs(shipPosition.lat - destinationPosition.lat) < 0.0001 &&
        Math.abs(shipPosition.lng - destinationPosition.lng) < 0.0001
      ) {
        clearInterval(interval);
      }
    }, 100);
  };

    const greenIcon = new Icon({
      iconUrl: "greenicon.png",
      iconSize: [38, 38]
    });
    const redIcon = new Icon({
      iconUrl: "redicon.png",
      iconSize: [38, 38]
    });
    const shipIcon = new Icon({
      iconUrl: "ship.png",
      iconSize: [10, 60]
    });

    return (
      <div className="flex flex-col justify-center items-center">
        <button className="border rounded-lg bg-lime-400 px-4 py-1 mt-[10px]"
          onClick={ ()=> { startMovement(); } }
        >
          start
        </button>
        <MapContainer center={center} zoom={11}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <Marker position={[22.16996, 91.4996]} icon={greenIcon} ></Marker>
          <Marker position={shipPosition} icon={shipIcon}></Marker>
          <Marker position={[22.2637, 91.7159]} icon={redIcon} ></Marker>
        </MapContainer>
      </div>
    );
};

export default BasicMap;