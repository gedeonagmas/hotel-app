import { ArrowBackIos, Menu } from "@mui/icons-material";
import React, { useContext } from "react";
import { navContext } from "../../App";

const Chart = () => {
  const context = useContext(navContext);
  return (
    <div className="w-[350px] px-5 py-7 text-[15px] h-auto rounded-md text-gray-600 shadow-lg shadow-gray-500">
      <div className="flex justify-between">
        <p className="text-[16px]">Total Revenue</p>
        {/* <Menu fontSize="large" /> */}
      </div>
      <div className="relative w-full items-center justify-center mt-5 flex flex-col gap-5">
        <div className="h-[100px] relative w-[100px] rounded-full flex items-center justify-center bg-blue-500">
          <div
            className={`absolute h-[90px] w-[90px] ${
              context?.nightMode ? "bg-gray-900" : "bg-white"
            } flex items-center justify-center rounded-full z-10`}
          >
            <p className="text-[20px] font-bold">65%</p>
          </div>
        </div>
        <p className="">Total Sales Made today</p>
        <p className="font-extrabold text-[20px]">$420</p>
        <p className="text-center text-[14px]">
          Previous Transaction Processing. Last Payments <br /> may not be
          included.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center w-44 px-2 py-5">
            <p className="">Target</p>
            <div className="flex items-center text-[14px] font-bold text-[#ff0336] justify-center gap-1">
              <ArrowBackIos className="rotate-90 mt-[5px] " />
              $412k
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-44 px-2 py-3">
            <p className="">Last Week</p>
            <div className="flex items-center text-[14px] font-bold text-yellow-500 justify-center gap-3">
              <ArrowBackIos className="rotate-90 mt-[5px] " />
              $412k
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-44 px-2 py-3">
            <p className="">Last Month</p>
            <div className="flex items-center text-[14px] font-bold text-emerald-500 justify-center gap-3">
              <ArrowBackIos className="rotate-90 mt-[5px] " />
              $412k
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
