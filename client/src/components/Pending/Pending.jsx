import React from "react";
import Loading from "../Loading";
import { Close } from "@mui/icons-material";

const Pending = (props) => {
  return (
    <div className="fixed z-40 top-32 text-black font-extrabold bg-opacity-60 bg-white h-[100vh] left-0 w-full flex flex-col items-center justify-center">
      <div className="flex gap-4 items-center -mt-32 bg-black justify-center py-5 px-5 w-auto rounded-md">
        <Loading /> <p className="text-[20px] text-white"> Loading...</p>
      </div>

      <Close
        onClick={() => props.setPending(false)}
        xs={{ width: 36, height: 36 }}
        fontSize="large"
        className="absolute cursor-pointer hover text-gray-800 top-4 right-5"
      />
    </div>
  );
};

export default Pending;
