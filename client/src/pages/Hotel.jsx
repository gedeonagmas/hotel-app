import React, { useEffect, useState } from "react";
import Star from "@mui/icons-material/Star";
import { Link, useNavigate } from "react-router-dom";
import { useReadHotelsQuery } from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import Pending from "../components/Pending/Pending";

const Hotel = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadHotelsQuery({ type: "multi" });

  const [hotelData, setHotelData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    if (searchValue?.length > 0) {
      setHotelData(
        data?.data?.filter((e) =>
          e.name
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
        )
      );
    } else {
      setHotelData(data?.data);
    }
  }, [data, searchValue]);

  useEffect(() => {
    if (rating) {
      setHotelData(data?.data?.filter((e) => e.totalRating <= rating));
    } else {
      setHotelData(data?.data);
    }
  }, [data, rating]);

  useEffect(() => {
    if (price) {
      setHotelData(data?.data?.filter((e) => e.price <= price));
    } else {
      setHotelData(data?.data);
    }
  }, [data, price]);

  const navigateHandler = (id) => {
    navigate("/reserve", { state: { id: id } });
  };

  return (
    <div className="w-full relative mt-32 pb-10 flex flex-col px-2 xl:px-20 items-center justify-center">
      <div className="w-full fixed z-10 py-[18px] top-[64px] bg-[#00aeff] flex flex-col gap-y-2 xl:flex-row items-center justify-between text-white h-auto px-2 xl:px-20">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="w-full text-black rounded-md xl:w-1/2 px-5 mt-3 py-4 border border-gray-300 focus:outline-cyan-400"
          placeholder="Search..."
        />
        <div className="flex bg-white mt-4 text-black px-2 py-2 rounded-md xl:ml-4 w-full xl:w-1/2 flex-col items-center justify-between">
          <div className="flex justify-between items-center w-full">
            <p htmlFor="points" className="text-[13px] flex items-start">
              <span className="hidden xl:block mr-1">Filter by </span> Price (0
              - 1000$):{" "}
              <span className="font-bold text-yellow-500">{price}.00$</span>{" "}
            </p>
            <input
              value={price}
              className="ml-2 w-1/2"
              type="range"
              id="points"
              min="0"
              max="1000"
              step="10"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <p htmlFor="points" className="text-[13px] flex items-start ">
              <span className="hidden xl:block mr-1">Filter by </span> Rating (1
              - 5)
              <Star
                sx={{ width: 20, height: 20 }}
                className="text-yellow-500 ml-1"
              />
              <Star
                sx={{ width: 20, height: 20 }}
                className="text-yellow-500 ml-1"
              />
              <div className="hidden xl:block">
                <Star
                  sx={{ width: 20, height: 20 }}
                  className="text-yellow-500 ml-1"
                />
              </div>
              <span className="font-bold text-yellow-500 ml-2 ">{rating}</span>{" "}
            </p>
            <input
              value={rating}
              className="ml-2 text-yellow-500 w-1/2"
              type="range"
              id="points"
              min="1"
              max="5"
              step="0.1"
              color="red"
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
        </div>{" "}
      </div>
      <p className="fixed overflow-y-hidden top-[215px] xl:top-[150px] h-10 py-1 flex items-center justify-end text-end w-full bg-gray-100 z-10  px-2 xl:px-20 text-black left-0 text-[16px]">
        {hotelData?.length} Results
      </p>
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      <div className="flex mt-48 xl:mt-[65px] rounded-lg flex-col w-full items-center h-auto justify-center">
        {hotelData && hotelData.length > 0 ? (
          hotelData?.map((d, i) => {
            return (
              <div
                key={d._id}
                className="flex  rounded-lg flex-col mt-14 xl:flex-row gap-4 py-3 px-3 border border-gray-300 w-full items-center h-auto justify-center"
              >
                <img
                  src={d?.images[0]}
                  alt="hotel"
                  className="xl:max-w-[400px] w-full rounded-sm object-center object-cover h-[270px]"
                />
                <div className="flex w-full relative px-2 flex-col justify-center items-start">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-[16px] font-bold xl:text-[26px] md:font-extrabold text-[#00aeff]">
                      {d.name}
                    </p>
                    <p className="flex items-center text-[14px] xl:text-[20px] justify-center gap-1 ">
                      Excellent{" "}
                      <Star
                        sx={{ width: 32, height: 32 }}
                        className="text-yellow-600 xl:ml-2"
                      />
                      <span className="py-1 rounded-md px-2 bg-[#00aeff] text-white font-bold">
                        {d.totalRating}
                      </span>
                    </p>
                  </div>
                  <p className="text-[18px] my-1 text-gray-500">
                    {d.distance}m from center
                  </p>
                  <p className="text-[16px] px-2 py-1 my-2 rounded-md bg-green-600 text-white">
                    {d.specialService}
                  </p>
                  <p className="text-[18px] mt-1 text-black">
                    Stay in the heart of {d.city}
                  </p>
                  <div className="flex flex-col xl:flex-row items-start w-full justify-between">
                    <p className="text-[16px] mt-2 max-w-[450px] text-gray-600">
                      {d.description.split(" ").splice(0, 20).join(" ")}...
                    </p>
                    <div className="flex flex-row justify-between w-full xl:w-auto xl:flex-col-reverse gap-2 items-center xl:items-end">
                      <p className="text-[18px] text-gray-400">
                        Includes Taxes and fees
                      </p>
                      <p className="text-[24px] font-bold">${d.price}</p>
                    </div>
                  </div>{" "}
                  <div className="flex flex-col xl:flex-row w-full items-start justify-between">
                    <div className="flex items-start flex-col">
                      <p className="text-green-600 text-[18px] font-bold">
                        Free Cancelation
                      </p>
                      <p className="text-green-600 text-[14px] lg:text-[18px]">
                        You can cancel later, so look in this great price today.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigateHandler(d._id);
                      }}
                      className="px-5 w-full hover:text-gray-200 xl:w-auto self-start text-center mt-2 xl:mt-0 lg:self-end py-3 rounded-md text-white bg-[#00aeff]"
                    >
                      See Availability
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex mt-48 xl:mt-[65px] rounded-lg flex-col w-full items-center h-auto justify-center">
            There is no data to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotel;
