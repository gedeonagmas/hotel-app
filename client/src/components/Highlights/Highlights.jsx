import React from "react";

const Highlights = () => {
  return (
    <div className="grid place-items-center items-center px-2 xl:px-20 justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5 h-auto py-10">
      <div className="min-w-[300px] w-full  relative h-[300px]">
        <img
          src="running.jpg"
          alt=""
          className="w-full h-full rounded-xl object-cover object-center"
        />
        <div className="flex absolute text-[32px] bottom-4 bg-gray-200 h-auto w-auto bg-transparent left-4 flex-col text-white font-bold">
          <p className="">Addiss Ababa</p>
          <p className="">10 Hotels</p>
        </div>
      </div>
      <div className="min-w-[300px] w-full  relative h-[300px]">
        <img
          src="workout.jpg"
          alt=""
          className="w-full h-full rounded-xl object-cover object-center"
        />
        <div className="flex absolute text-[32px] bottom-4 bg-gray-200 h-auto w-auto bg-transparent left-4 flex-col text-white font-bold">
          <p className="">Bahir Dar</p>
          <p className="">5 Hotels</p>
        </div>
      </div>
      <div className="min-w-[300px] w-full  relative h-[300px]">
        <img
          src="cycling.jpg"
          alt=""
          className="w-full h-full rounded-xl object-cover object-center"
        />
        <div className="flex absolute text-[32px] bottom-4 bg-gray-200 h-auto w-auto bg-transparent left-4 flex-col text-white font-bold">
          <p className="">Hawassa</p>
          <p className="">4 Hotels</p>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
