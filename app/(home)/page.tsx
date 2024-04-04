"use client"

import BasicMap from "./_components/map";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <div className="flex border-[2px] p-4 rounded-lg gap-[8rem] justify-center items-center">
        <div className="flex flex-col">
          <p className="font-bold">Starting</p>
          <div className="flex gap-[7px] mt-7">
            <p className="font-bold">Lat:</p>
            <p>22.16996</p>
          </div>
          <div className="flex gap-[7px]">
            <p className="font-bold">Long:</p>
            <p>91.4996</p>
          </div>
        </div>
        <div className="flex text-[blue]">
          <div className="flex gap-[7px]">
            <p className="font-bold">Speed:</p>
            <p>20 kmph</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">Ending</p>
          <div className="flex gap-[7px] mt-7">
            <p className="font-bold">Lat:</p>
            <p>22.2637</p>
          </div>
          <div className="flex gap-[7px]">
            <p className="font-bold">Long:</p>
            <p>91.7159</p>
          </div>
        </div>
      </div>
      {/* Map component */}
      {/* <img src="greenicon.png" alt="location_svgreen.png"  /> */}
      <BasicMap />
    </main>
  );
}
