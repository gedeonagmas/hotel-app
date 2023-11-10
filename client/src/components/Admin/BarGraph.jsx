import React from "react";

const BarGraph = () => {
  return (
    <div className="px-4 py-5 text-[13px] text-gray-500 flex flex-col shadow-lg ml-5 shadow-gray-500 w-[100%]">
      <p className="text-[16px]">Last 12 Month Revenue</p>
      <div className="flex relative gap-5 mt-4">
        <div className="flex flex-col mt-5 gap-5">
          <p className="">$2000</p>
          <p className="">$4000</p>
          <p className="">$6000</p>
          <p className="">$8000</p>
          <p className="">$10000</p>
          <p className="">$12000</p>
          <p className="">$14000</p>
          <p className="">$16000</p>
          <p className="">$18000</p>
        </div>
        <div className="h-full mt-2 w-1 bg-gray-300"></div>
        <div className="w-full relative flex gap-7 ">
          <div className="h-24 flex items-center justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$2000</p>
          </div>
          <div className="h-40 flex items-center ml-[63px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$3000</p>
          </div>
          <div className="h-52 flex items-center left-[125px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$4000</p>
          </div>
          <div className="h-64 flex items-center left-[177px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$5000</p>
          </div>
          <div className="h-72 flex items-center left-[217px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$4000</p>
          </div>
          <div className="h-80 flex items-center left-[260px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$3000</p>
          </div>
          <div className="h-96 flex items-center left-[300px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$4000</p>
          </div>
          <div className="h-[230px] flex items-center left-[340px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$3000</p>
          </div>
          <div className="h-96 flex items-center left-[396px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$2000</p>
          </div>
          <div className="h-80 flex items-center left-[470px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$2000</p>
          </div>
          <div className="h-64 flex items-center left-[534px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$1000</p>
          </div>
          <div className="h-52 flex items-center left-[605px] justify-center absolute bottom-0 w-2 bg-gray-400">
            <p className="">$1000</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-2 h-1 bg-gray-400"></div>
      <div className="flex gap-7 ml-[68px]">
        <p className="text-[12px]">January</p>
        <p className="text-[12px]">February</p>
        <p className="text-[12px]">March</p>
        <p className="text-[12px]">April</p>
        <p className="text-[12px]">May</p>
        <p className="text-[12px]">June</p>
        <p className="text-[12px]">July</p>
        <p className="text-[12px]">August</p>
        <p className="text-[12px]">September</p>
        <p className="text-[12px]">October</p>
        <p className="text-[12px]">November</p>
        <p className="text-[12px]">December</p>
      </div>
    </div>
  );
};

export default BarGraph;
