import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = (props) => {
  return (
    <div className="mt-40">
      <div className="flex flex-col items-center justify-center">
        <p className="text-[32px] font-bold">Page Not Found</p>
        <img src="./error2.jpg" alt="page not found" className="w-[30%]" />
        <Link
          to="/"
          className="mt-2 text-[16px] hover:text-gray-200 px-10 py-4 rounded-md text-white bg-black"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
