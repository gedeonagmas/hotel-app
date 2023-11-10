import React, { useContext, useEffect, useState } from "react";
import Hotel from "@mui/icons-material/HouseTwoTone";
import Menu from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useReadProfileInfoQuery } from "../../features/api/apiSlice";
import { navContext } from "../../App";
import { Dashboard, LogoutOutlined } from "@mui/icons-material";

const NavBar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  useEffect(()=>{
    window.location.reload(true);
  });
  // const [mobile, setMobile] = useState(false);
  // const context = useContext(navContext);
  const { data, isFetching, isError, error: err } = useReadProfileInfoQuery();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const jwt = localStorage.getItem("jwt");
  //   jwt && user
  //     ? (context.setUserType(user.role), context.setSetting(true))
  //     : (context.setUserType(""), context.setSetting(false));
  // }, []);

  useEffect(() => {
    data?.data &&
      localStorage.setItem(
        "hotel-user-data-gedeon",
        JSON.stringify(data?.data)
      );
  }, [data]);

  const logoutHandler = (device) => {
    localStorage.removeItem("hotel-jwt-data-gedeon");
    localStorage.removeItem("hotel-user-data-gedeon");
    context.setSetting(false);
    device === "mobile" ? setMobile(false) : setMobile(true);
    context.setLogin(true);
  };

  return (
    <div className="bg-[#00aeff] fixed overflow-y-scroll z-50 top-0 left-0 text-white text-[18px] py-10 px-2 xl:px-20 w-full flex items-center justify-between">
      {/* <Link to="/" className="flex">
        <Hotel className="text-black" sx={{ width: 56, height: 56 }} />
        <div className="mt-1">
          <p className="text-black text-[20px] uppercase font-extrabold">
            Reserve <span className="text-black">Hotel</span>
          </p>
          <p className="text-[16px] -mt-1">ultimate hotel experience</p>
        </div>
      </Link> */}
      <Link to="/" className="flex">
        <p className="text-white text-[20px] uppercase font-extrabold">
          Reserve <span className="text-black">Hotel</span>
        </p>
      </Link>
      <div
        onClick={() => setMobileNav(true)}
        className="block lg:hidden cursor-pointer"
      >
        <Menu sx={{ width: 36, height: 36 }} />
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-8">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/hotels">Reserve Hotels</Link>
          </li>
          <li>
            <Link to="contact">Contact</Link>
          </li>
        </ul>
      </div>

      {data?.data?.role === "user" && (
        <div className="hidden lg:flex items-center justify-center gap-5">
          <Link
            onClick={logoutHandler}
            to="/login"
            className="text-white flex py-1 px-2  border-white rounded-lg items-center justify-center gap-1"
          >
            <LogoutOutlined fontSize="large" /> Logout
          </Link>
          <Link
            to="/profile"
            className="flex items-center border justify-center gap-2 py-1 px-2 bg-white rounded-lg border-white text-black"
          >
            <img
              src={data?.data?.profilePicture}
              alt={data?.data?.role}
              className="w-12 border h-12 rounded-full"
            />
            <p className="">{data?.data?.userName}</p>
          </Link>
        </div>
      )}

      {data?.data?.role === "admin" && (
        <div className="hidden lg:flex items-center justify-center gap-5">
          <Link
            to="/admindashboard"
            className="text-white flex py-1 px-2  border-white rounded-lg items-center justify-center gap-1"
          >
            <Dashboard fontSize="large" /> Dashboard
          </Link>
          <Link
            onClick={logoutHandler}
            to="/login"
            className="text-white flex py-1 px-2 rounded-lg items-center justify-center gap-1"
          >
            <LogoutOutlined fontSize="large" /> Logout
          </Link>
          <Link
            to="/profile"
            className="flex relative items-center bg-white text-black justify-center gap-2 py-1 px-2 rounded-lg border-white "
          >
            <img
              src={data?.data?.profilePicture}
              alt={data?.data?.role}
              className="w-12 border h-12 rounded-full"
            />
            <p className="">{data?.data?.userName}</p>
          </Link>
        </div>
      )}

      {!data && (
        <div className="hidden lg:flex gap-5">
          <Link to="/signup" className=" border-white text-white">
            Register
          </Link>
          <Link to="/login" className="  text-white">
            Login
          </Link>
        </div>
      )}

      {mobileNav && (
        <div className="flex fixed z-40 text-[24px] font-semibold top-0 left-0 text-black flex-col w-full h-full bg-gray-100 items-center justify-center gap-3 ">
          <ul className="flex flex-col gap-5">
            <li>
              <Link onClick={() => setMobileNav(false)} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setMobileNav(false)} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={() => setMobileNav(false)} to="/hotels">
                Reserve Hotels
              </Link>
            </li>
            <li>
              <Link onClick={() => setMobileNav(false)} to="/contact">
                Contact
              </Link>
            </li>

            {data?.data?.role === "user" && (
              <>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center border justify-start gap-2 rounded-lg border-white text-black"
                  >
                    <img
                      src={data?.data?.profilePicture}
                      alt={data?.data?.role}
                      className="w-12 border h-12 rounded-full"
                    />
                    <p className="">{data?.data?.userName}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logoutHandler}
                    to="/login"
                    className="text-black flex py-1 px-2 border border-white rounded-lg items-center justify-start gap-1"
                  >
                    <LogoutOutlined fontSize="large" /> Logout
                  </Link>
                </li>
              </>
            )}

            {data?.data?.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/admindashboard"
                    className="text-black flex py-1 px-2 border border-white rounded-lg items-center justify-start gap-1"
                  >
                    <Dashboard fontSize="large" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center border justify-start gap-2 py-1 px-2 rounded-lg border-white text-black"
                  >
                    <img
                      src={data?.data?.profilePicture}
                      alt={data?.data?.role}
                      className="w-12 border h-12 rounded-full"
                    />
                    <p className="">{data?.data?.userName}</p>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={logoutHandler}
                    to="/login"
                    className="text-black flex py-1 px-2 border border-white rounded-lg items-center justify-start gap-1"
                  >
                    <LogoutOutlined fontSize="large" /> Logout
                  </Link>
                </li>
              </>
            )}

            {!data && (
              <>
                <li>
                  <Link to="/signup" className=" border-white text-black">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="  text-black">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          <Close
            sx={{ width: 44, height: 44 }}
            onClick={() => setMobileNav(false)}
            className="absolute top-5 right-3 cursor-pointer hover:scale-105 ease-in-out duration-150"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
