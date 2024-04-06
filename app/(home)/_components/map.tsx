"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from "usehooks-ts";

const BasicMap = ({ initialPosition, destinationPosition,  speed }: { initialPosition: {lat: number, lng: number}, destinationPosition: {lat: number, lng: number}, speed: number }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [reachedDes, setIsReached] = useState(false);
  const [shipPosition, setShipPosition] = useState(initialPosition);

  useEffect(() => {
    setShipPosition(initialPosition);
  }, [initialPosition]);

  const startMovement = () => {
    setIsReached(true);
    const speedInKmph = speed;
    const fps = 2;
    const metersPerFrame = (speedInKmph * 100) / (60 * 360 * fps);
    const interval = 1000 / fps;
    
    const intervalId = setInterval(() => {
      setShipPosition(prevPosition => {
        console.log(prevPosition);
        const dLat = destinationPosition.lat - prevPosition.lat;
        const dLng = destinationPosition.lng - prevPosition.lng;
        const distanceToDestination = Math.sqrt(dLat * dLat + dLng * dLng);

        const unitLat = dLat / distanceToDestination;
        const unitLng = dLng / distanceToDestination;
  
        const newLat = prevPosition.lat + unitLat * metersPerFrame;
        const newLng = prevPosition.lng + unitLng * metersPerFrame;

        if (Math.abs(newLat - destinationPosition.lat) < Math.abs(unitLat * metersPerFrame) &&
            Math.abs(newLng - destinationPosition.lng) < Math.abs(unitLng * metersPerFrame)) {
          clearInterval(intervalId);
          return destinationPosition;
        }
  
        return { lat: newLat, lng: newLng };
      });
    }, interval);
  };
  
  const resetMovement = () => {
    setIsReached(false); 
    setShipPosition(initialPosition);
  };
  
  const greenIcon = new Icon({
    iconUrl: "greenicon.png",
    iconSize: [38, 38]
  });
  const redIcon = new Icon({
    iconUrl: "redicon.png",
    iconSize: [38, 38]
  });

  const calculateAngle = (pointA: { lng: number; lat: number; }, pointB: { lng: number; lat: number; }) => {
    return Math.atan2(pointB.lng - pointA.lng, pointB.lat - pointA.lat) * (180 / Math.PI);
  };
  
  const centerCoordinates = [
    [initialPosition.lat, initialPosition.lng],
    [destinationPosition.lat, destinationPosition.lng],
  ];
  const angle = calculateAngle({ lat: centerCoordinates[0][0], lng: centerCoordinates[0][1] }, destinationPosition);
  const center: [number, number] = [
    centerCoordinates.reduce((acc, curr) => acc + curr[0], 0) / centerCoordinates.length,
    centerCoordinates.reduce((acc, curr) => acc + curr[1], 0) / centerCoordinates.length
  ];

  return (
    <div className={isMobile ? "bg-[white]" : "flex justify-center relative items-center"}>
      <div className={isMobile ? "reltive" :"absolute left-[-232px] bottom-[12rem] z-9999"}>
        {reachedDes ? (
            <button className={isMobile ? "border rounded-lg bg-[#ec4646] px-4 py-1 mt-3 w-[100%] h-[4rem]" : "border rounded-lg bg-[#ec4646] px-4 py-1 w-[11rem] h-[4rem]"} onClick={resetMovement}>
              Reset
            </button>
          ) : (
            <button className={isMobile ? "border rounded-lg bg-[#46ec46] px-4 py-1 mt-3 w-[100%] h-[4rem] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]" : "border rounded-lg bg-[#46ec46] px-4 py-1 w-[12.5rem] h-[4rem] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"} onClick={startMovement}>
              Start
            </button>
        )}
      </div>
      {initialPosition.lat !== 0 && initialPosition.lng !== 0 && destinationPosition.lat != 0 && destinationPosition.lng != 0 &&(
        <MapContainer center={center} zoom={11}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
              <Marker position={initialPosition} icon={greenIcon} />
              <Marker position={shipPosition} icon={L.divIcon({
                  className: 'ship-icon',
                  html: `<img style="transform: rotate(${angle}deg); width: 10px; height: 60px; margin-top: -25px;" src="ship.png"/>`
              })}/>

              <Marker position={destinationPosition} icon={redIcon} />
        </MapContainer>
      )}

    </div>
  );
};

export default BasicMap;