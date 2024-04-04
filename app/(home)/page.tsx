"use client"

import React, { useState } from "react";
import dynamic from 'next/dynamic';

const BasicMap = dynamic(() => import('./_components/map'), {ssr: false})

export default function Home() {

  const [initialPosition, setInitial] = useState({ lat: 22.1696, lng: 91.4996 });
  const [destinationPosition, setDestination] = useState({ lat: 22.2637, lng: 91.7159 });
  const [speed, setSpeed] = useState(20);

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

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
       <div className="flex gap-3 mb-5 w-[121vh]">
        <div className="flex border-[2px] p-4 rounded-lg w-[80%] justify-between">
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
      </div> 

      <BasicMap initialPosition={initialPosition} destinationPosition={destinationPosition} speed={speed} />
    </main>
  );
}