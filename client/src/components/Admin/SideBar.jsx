import React, { useContext } from "react";
import {
  Class,
  Dashboard as Dash,
  House,
  LightMode,
  Nightlight,
  People,
  Schedule,
  Star,
} from "@mui/icons-material";
import { navContext } from "../../App";

const SideBar = (props) => {
  const context = useContext(navContext);

  const focusHandler = (id) => {
    const lists = ["dashboard", "users", "hotels", "transactions", "rates"];
    lists.map((e) => {
      const val = document.getElementById(e);
      val?.classList?.remove("text-[#00aeff]");
      val?.classList?.remove("font-extrabold");
      if (e === id) {
        val?.classList?.add("font-extrabold");
        val?.classList?.add("text-[#00aeff]");
      }
    });

    props.data.map((d) => {
      d(false);
      switch (id) {
        case "dashboard":
          props.data[0](true);
          break;
        case "users":
          props.data[1](true);
          break;
        case "hotels":
          props.data[2](true);
          break;
        case "transactions":
          props.data[3](true);
          break;
        case "rates":
          props.data[4](true);
          break;
        default:
          props.data[0](true);
          break;
      }
    });
  };

  return (
    <div className="flex px-4 h-full relative border-l flex-col shadow-lg shadow-gray-500 gap-3 pt-1 w-[200px] min-w-[200px] ">
      <div className="flex flex-col gap-1 relative py-1dd">
        <p className="text-[14px] absolute top-1 right-0 justify-end self-end font-light">
          {new Date().toString().split(" ").splice(0, 4).join(" ")}
        </p>
        <p
          className={`text-[16px] mt-10 ${
            context.nightMode ? "text-gray-400" : "text-gray-900"
          } font-bold uppercase`}
        >
          {new Date().getUTCHours() > 6
            ? "Good Afternoon"
            : new Date().getUTCHours() > 12
            ? "Good Evening"
            : "Good Morning"}{" "}
          {JSON.parse(localStorage.getItem("hotel-user-data-gedeon")).firstName}
        </p>
      </div>

      <div className="h-[79vh] pb-9 mt-1">
        <div className="gap-1">
          <p className="text-gray-500">Night Mode</p>
          <div className="flex text-gray-500 font-extrabold cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2">
            <div
              onClick={() => context.setNightMode(true)}
              className="h-10 w-10 hover:text-[#00aeff] cursor-pointer rounded-md mt-2 text-white flex items-center justify-center border bg-gray-900 border-gray-300"
            >
              <Nightlight fontSize="" />
            </div>
            <div
              onClick={() => context.setNightMode(false)}
              className="h-10 hover:text-[#00aeff] cursor-pointer w-10 text-black rounded-md mt-2 flex items-center justify-center border bg-white border-gray-500"
            >
              <LightMode fontSize="" />
            </div>
          </div>
        </div>

        <div className="gap-1 mt-5">
          <p className="text-gray-500">Main</p>
          <div
            id="dashboard"
            onClick={() => focusHandler("dashboard")}
            className="flex text-[#00aeff] font-extrabold hover:text-[#00aeff] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Dash fontSize="" /> <p className="">Dashboard</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-5">
          <p className="text-gray-500">Lists</p>
          <div
            id="users"
            onClick={() => focusHandler("users")}
            className="flex hover:text-[#00aeff] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <People fontSize="" /> <p className="">Users</p>
          </div>
          <div
            id="hotels"
            onClick={() => focusHandler("hotels")}
            className="flex hover:text-[#00aeff] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <House fontSize="" /> <p className="">Hotels</p>
          </div>
          <div
            id="transactions"
            onClick={() => focusHandler("transactions")}
            className="flex hover:text-[#00aeff] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Schedule fontSize="" /> <p className="">Transactions</p>
          </div>
          <div
            id="rates"
            onClick={() => focusHandler("rates")}
            className="flex hover:text-[#00aeff] cursor-pointer ease-in duration-200 items-center justify-start gap-5 ml-2"
          >
            <Star fontSize="" /> <p className="">Ratings</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
