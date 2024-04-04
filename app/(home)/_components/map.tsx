"use client"

import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const BasicMap = () => {
  const [initialPosition, setInitial] = useState({ lat: 22.1696, lng: 91.4996 });
  const [destinationPosition, setDestination] = useState({ lat: 22.2637, lng: 91.7159 });
  const [shipPosition, setShipPosition] = useState(initialPosition);
  const [speed, setSpeed] = useState(20);

  const [reachedDes, setIsReached] = useState(false);

  const startMovement = () => {
    setIsReached(true);
    const speedInKmph = speed;
    const fps = 2;
    const metersPerFrame = (speedInKmph * 100) / (60 * 360 * fps);
    const interval = 1000 / fps;
    
    const intervalId = setInterval(() => {
      setShipPosition(prevPosition => {
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

  const handleInputChange = (event: { target: { name: any; value: any; }; }, positionType: string) => {
    const { name, value } = event.target;
    if (positionType === 'initial') {
        setInitial(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    } else if (positionType === 'destination') {
        setDestination(prevState => ({
            ...prevState,
            [name]: parseFloat(value)
        }));
    }
  };

  const changeSpeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(event.target.value);
    setSpeed(newSpeed);
  };

  const resetMovement = () => {
    setIsReached(false); 
    setShipPosition({ lat: 22.16996, lng: 91.4996 });
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
    <div className="flex flex-col justify-center items-center">
      
      <div className="flex gap-3 mb-5 w-[121vh]">
        <div className="flex border-[2px] p-4 rounded-lg w-full justify-between items-space">
          <div className="flex flex-col gap-y-1">
            <p className="font-bold">Starting</p>
            <div className="flex gap-[7px] mt-7 items-center">
                <p className="font-bold w-10">Lat:</p>
                <input
                    className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                    placeholder="Enter the Latitude"
                    onChange={(event) => handleInputChange(event, 'initial')}
                    defaultValue={initialPosition.lat}
                    name="lat"
                />
            </div>
            <div className="flex gap-[7px]">
                <p className="font-bold w-10">Long:</p>
                <input
                    className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                    placeholder="Enter the Longitude"
                    onChange={(event) => handleInputChange(event, 'initial')}
                    defaultValue={initialPosition.lng}
                    name="lng"
                />
            </div>
          </div>
          <div className="flex text-[blue]">
            <div className="flex gap-[7px] items-center">
                <p className="font-bold">Speed:</p>
                <input
                    className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                    placeholder="Enter the speed"
                    onChange={ (event) => changeSpeed(event) }
                    defaultValue={speed}
                    name="speed"
                />
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="font-bold">Ending</p>
            <div className="flex gap-[7px] items-center mt-7">
                <p className="font-bold w-11">Lat:</p>
                <input
                    className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                    placeholder="Enter the Latitude"
                    onChange={(event) => handleInputChange(event, 'destination')}
                    defaultValue={destinationPosition.lat}
                    name="lat"
                />
            </div>
            <div className="flex gap-[7px] items-center">
                <p className="font-bold">Long:</p>
                <input
                    className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                    placeholder="Enter the Longitude"
                    onChange={(event) => handleInputChange(event, 'destination')}
                    defaultValue={destinationPosition.lng}
                    name="lng"
                />
            </div>
          </div>
        </div>
        {reachedDes ? (
          <button className="border rounded-lg bg-red-400 px-4 py-1 w-[11.2rem]" onClick={resetMovement}>
            Reset
          </button>
        ) : (
          <button className="border rounded-lg bg-[#46ec46] px-4 py-1 w-[11.2rem] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]" onClick={startMovement}>
            Start
          </button>
        )}
      </div>

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
    </div>
  );
};

export default BasicMap;