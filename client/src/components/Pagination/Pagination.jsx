import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React from "react";

const Pagination = (props) => {
  const goTo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  let size = [1, 2, 3];

  return (
    <div className="mt-10 absolute bottom-0 left-0 w-full items-center text-[16px] font-bold justify-center flex gap-1">
      <button
        id="backward"
        onClick={() => {
          props.setCounter(props.counter - 1);
          goTo();
        }}
        className="py-5 hover:bg-gray-200 px-5 rounded-sm border border-gray-300 bg-white text-black"
      >
        <ArrowBackIos fontSize="large" />
      </button>

      {size.map((d, i) => {
        return (
          <button
            key={i}
            onClick={() => {
              props.setCounter(i + 1);
              goTo();
            }}
            className={`py-5 px-10 rounded-sm border ${
              props.counter === i + 1
                ? "bg-[#ff0336] text-white"
                : "bg-white text-black"
            } border-gray-300`}
          >
            {d}
          </button>
        );
      })}

      <button
        onClick={() => {
          props.setCounter(props.counter + 1);
          goTo();
        }}
        id="forward"
        className="py-5 hover:bg-gray-200 px-5 rounded-sm border border-gray-300 bg-white text-black"
      >
        <ArrowForwardIos fontSize="large" />
      </button>
    </div>
  );
};

export default Pagination;
