import React from "react";

const Success = (props) => {
  return (
    <div className="flex items-start justify-center fixed w-auto top-44 z-50 max-w-[400px] right-4 flex-col shadow-sm shadow-black gap-2  h-auto py-8 px-2 rounded-md bg-emerald-200 border border-emerald-500">
      <p className="text-[14px] font-bold text-emerald-500">{props.message}</p>
    </div>
  );
};

export default Success;
