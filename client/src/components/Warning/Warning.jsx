import { Close, Delete } from "@mui/icons-material";
import React, { useContext } from "react";
import { navContext } from "../../App";

const Warning = (props) => {
  const context = useContext(navContext);
  return (
    <div className="fixed z-30 top-32 text-gray-600 text-[16px] font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
      <div
        onClick={() => props.setWarning(false)}
        className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
      ></div>
      <div
        className={`${
          context.nightMode ? "bg-gray-900" : "bg-white"
        } px-4 w-auto z-40 -mt-32 relative flex flex-col items-center justify-center border py-10 rounded-lg shadow-md shadow-black`}
      >
        <p className="text-[14px]">Are You Sure?</p>
        <p>This Action is Can't be undone!!</p>
        <button
          onClick={() => props.deleteHandler()}
          className="py-3 px-5 hover:text-gray-200 w-full  flex gap-3 items-center mt-4 bg-[#ff0336] text-white justify-center"
        >
          <Delete fontSize="large" /> Delete
        </button>
        <Close
          onClick={() => props.setWarning(false)}
          fontSize="large"
          className="absolute top-1 hover:text-gray-800 right-2 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Warning;
