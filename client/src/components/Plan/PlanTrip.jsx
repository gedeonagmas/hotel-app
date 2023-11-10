import { HouseSiding, Luggage, Payment } from "@mui/icons-material";
import React from "react";

const PlanTrip = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center my-32">
      <p className="text-[24px] font-bold text-gray-500 py-3">
        Make a decision now
      </p>
      <p className="text-[32px] font-bold text-gray-800">It will be fun</p>
      <div className="grid grid-cols-1 mt-24 w-full md:grid-cols-2 xl:grid-cols-3 items-center justify-center text-center">
        <div className="flex w-full flex-col gap-1 text-center items-center justify-center">
          <HouseSiding
            sx={{ width: 56, height: 56 }}
            className="text-[#00aeff]"
          />
          <p className="text-[20px] font-bold mt-10">Select your hotel</p>
          <p className="">we provide the best available</p>
          <p className="">hotel in the country</p>
        </div>
        <div className="flex w-full flex-col gap-1 text-center items-center justify-center">
          <Payment sx={{ width: 56, height: 56 }} className="text-[#00aeff]" />
          <p className="text-[20px] font-bold mt-10">Made a Payment</p>
          <p className="">we have online payment system</p>
          <p className="">easy to use and pay</p>
        </div>
        <div className="flex w-full flex-col gap-1 text-center items-center justify-center">
          <Luggage sx={{ width: 56, height: 56 }} className="text-[#00aeff]" />
          <p className="text-[20px] font-bold mt-10">Have a fun</p>
          <p className="">Enjoy your self with</p>
          <p className="">our better service</p>
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;
