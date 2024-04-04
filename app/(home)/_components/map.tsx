"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
  const [shipPosition, setShipPosition] = useState({ lat: 22.16996, lng: 91.4996 });
  const destinationPosition = { lat: 22.2637, lng: 91.7159 };

  const startMovement = () => {
    const stepSize = 10; // Adjust this value to control the speed of movement
    const interval = setInterval(() => {
      setShipPosition(prevPosition => ({
        lat: prevPosition.lat + (destinationPosition.lat - prevPosition.lat) / stepSize,
        lng: prevPosition.lng + (destinationPosition.lng - prevPosition.lng) / stepSize
      }));
      const distanceToDestinationLat = Math.abs(shipPosition.lat - destinationPosition.lat);
      const distanceToDestinationLng = Math.abs(shipPosition.lng - destinationPosition.lng);
      if (distanceToDestinationLat < 0.0001 && distanceToDestinationLng < 0.0001) {
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
    iconSize: [10, 60],
    iconAnchor: [5, 30]
  });

  const calculateAngle = (pointA: { lng: number; lat: number; }, pointB: { lng: number; lat: number; }) => {
    return Math.atan2(pointB.lng - pointA.lng, pointB.lat - pointA.lat) * (180 / Math.PI);
  };
  
  
  const centerCoordinates = [
    [22.16996, 91.4996],
    [22.2637, 91.7159],
  ];
  const angle = calculateAngle({ lat: centerCoordinates[0][0], lng: centerCoordinates[0][1] }, destinationPosition);
  const center: [number, number] = [
    centerCoordinates.reduce((acc, curr) => acc + curr[0], 0) / centerCoordinates.length,
    centerCoordinates.reduce((acc, curr) => acc + curr[1], 0) / centerCoordinates.length
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <button className="border rounded-lg bg-lime-400 px-4 py-1 mt-[10px]" onClick={startMovement}>
        Start
      </button>
      <MapContainer center={center} zoom={11}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[22.16996, 91.4996]} icon={greenIcon} />
        {/* <Marker position={shipPosition} icon={shipIcon}/> */}

        <Marker position={shipPosition} icon={L.divIcon({
            className: 'ship-icon',
            html: `<img style="transform: rotate(${angle}deg); width: 10px; height: 60px; margin-top: -24px" src="ship.png"/>`
        })}/>

        <Marker position={[22.2637, 91.7159]} icon={redIcon} />
      </MapContainer>
    </div>
  );
};

export default BasicMap;