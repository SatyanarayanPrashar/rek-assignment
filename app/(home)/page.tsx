"use client"

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { useMediaQuery } from "usehooks-ts";
import { LoadingBox } from "@/components/loading";
import { cn } from "@/lib/utils";

const BasicMap = dynamic(() => import('./_components/map'), {ssr: false})

export default function Home() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const [initialPosition, setInitial] = useState({ lat: 22.1696, lng: 91.4996 });
  const [shipPosition, setShipPosition] = useState(initialPosition);
  const [destinationPosition, setDestination] = useState({ lat: 22.2637, lng: 91.7159 });
  const [speed, setSpeed] = useState(20);

  useEffect(() => {
    setShipPosition(initialPosition);
  }, [initialPosition]);

  // const resetMovement = () => {
  //   setIsReached(false); 
  //   setShipPosition({ lat: 22.16996, lng: 91.4996 });
  // };

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

  if(loading) {
    return (
      <div className="min-h-full w-full flex justify-center items-center">
          <LoadingBox/>
      </div>
    )
  }

  return (
    <main className="flex w-[100%] gap-1">
       <aside 
            className={cn(
                "h-[100vh] bg-[re] relative flex w-60 flex-col border-r-2 px-4 py-5",
                isMobile && "w-0"
            )}
        >
            <img src="company.png" />
            <div className="border-b-2 pb-5 my-5">
                <p className="font-bold">Starting</p>
                <div className={isMobile ? "flex gap-20" : "flex gap-[7px] mt-1 items-center"}>
                    <p className="font-bold w-10">Lat:</p>
                    <input
                        className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                        placeholder="Enter the Latitude"
                        onChange={(event) => handleInputChange(event, 'initial')}
                        defaultValue={initialPosition.lat}
                        name="lat"
                    />
                </div>
                <div className={isMobile ? "flex gap-20" : "flex gap-[7px] mt-1 items-center"}>
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
            <div className="border-b-2 pb-5 mb-5">
                <p className="font-bold">Ending</p>
                <div className={isMobile ? "flex gap-20" : "flex gap-[7px] mt-1 items-center"}>
                    <p className="font-bold w-11">Lat:</p>
                    <input
                        className="border rounded-lg px-2 max-w-[7rem] h-[35px] focus:outline-none"
                        placeholder="Enter the Latitude"
                        onChange={(event) => handleInputChange(event, 'destination')}
                        defaultValue={destinationPosition.lat}
                        name="lat"
                    />
                </div>
                <div className={isMobile ? "flex gap-20" : "flex gap-[7px] mt-1 items-center"}>
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
        </aside>
        <BasicMap
          initialPosition={initialPosition}
          destinationPosition={destinationPosition} 
          speed={speed} 

        />
    </main>
  );
}