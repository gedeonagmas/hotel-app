import { Close } from "@mui/icons-material";
import React from "react";

const Error = (props) => {
  return (
    <div className="flex items-start justify-center z-50 fixed w-auto top-44 right-4 flex-col shadow-sm shadow-black gap-2  h-auto py-8 px-2 rounded-md bg-red-200 border border-red-500">
      <p className="underline text-[14px] font-bold text-red-600">
        Error Messages {"("}
        {props?.message?.split("**").length}
        {")"}
      </p>

      {props?.message?.split("**").map((err, i) => {
        return (
          <p className="text-[14px] text-red-500">
            {i + 1}. {err.split("#")[0]} <br /> {err.split("#")[1]}
          </p>
        );
      })}

      <Close
        fontSize="large"
        onClick={() => props.setError(false)}
        className="absolute top-2 right-2 cursor-pointer"
      />
    </div>
  );
};

export default Error;
