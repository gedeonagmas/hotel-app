import { ArrowBackIos } from "@mui/icons-material";
import React from "react";

const HeaderBox = (props) => {
  return (
    <div className="flex flex-col gap-4 relative min-w-[200px] rounded-xl shadow-lg shadow-gray-500 w-[250px] h-48">
      <div className="flex w-full text-[18px] px-5 py-2 justify-between">
        <p className="font-bold ">{props.title}</p>
        <p className="text-emerald-500 font-bold">
          <ArrowBackIos className="rotate-90 mt-1" /> {props.percent}%
        </p>
      </div>
      <p className="font-extrabold text-[20px] px-5">{props.number}</p>
      <div className="flex w-full text-[14px] px-5 py-2  justify-between">
        <p
          onClick={() => {
            props.props.map((p) => p(false));
            props.goto(true);
          }}
          className="font-bold cursor-pointer hover:text-gray-600 underline"
        >
          See All {props.title}
        </p>
        <div
          className={`h-auto w-auto ${props.bg} shadow-xl rounded-full -mt-4 px-2 py-2`}
        >
          <props.icon fontSize="large" className={`${props.color} shadow-xl`} />
        </div>
      </div>
    </div>
  );
};

export default HeaderBox;
