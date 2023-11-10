import React, { useEffect, useState } from "react";
import Location from "@mui/icons-material/LocationOn";
import Close from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";
import Pay from "../components/Pay";
import Error from "../components/Error/Error";
import { Star } from "@mui/icons-material";
import {
  useCreateRateMutation,
  useReadHotelsQuery,
  useReadRateQuery,
} from "../features/api/apiSlice";
import Pending from "../components/Pending/Pending";
import Success from "../components/Success/Success";

const Book = () => {
  const [createRateData, response] = useCreateRateMutation();
  const location = useLocation();

  const {
    data: hotelData,
    isFetching: hotelIsFetching,
    isError: hotelIsError,
    error: hotelErr,
  } = useReadHotelsQuery({ id: location?.state.id, type: "single" });

  useEffect(() => {
    hotelIsError
      ? (setErrorMessage(hotelErr?.data?.message), setError(true))
      : setError(false);
  }, [hotelIsError]);

  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadRateQuery({ id: hotelData?.data[0]?._id });

  const [hotel, setHotel] = useState();
  const [totalValue, setTotalValue] = useState(0);
  const [popup, setPopup] = useState(false);
  const [rate, setRate] = useState(3);
  const [comment, setComment] = useState("");
  const [paymentPopup, setPaymentPopup] = useState(false);
  const [rateData, setRateData] = useState();

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    response?.status === "pending" ? setPending(true) : setPending(false);
    response?.status === "rejected"
      ? (setErrorMessage(response?.error?.data?.message), setError(true))
      : null;
    response?.status === "fulfilled"
      ? (setSuccessMessage(response?.data?.message),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 5000),
        setWarning(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (data) {
      setRateData(data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (hotelData) {
      setHotel(hotelData?.data[0]);
    }
  }, [hotelData]);

  const addHandler = (val, price) => {
    if (val === true) {
      setTotalValue(totalValue + price);
    } else if (val === false) {
      setTotalValue(totalValue - price);
    }
    if (totalValue < 0) {
      setTotalValue(0);
    }
  };

  useEffect(() => {
    if (totalValue > 0) {
      setError(false);
    }
  }, [totalValue]);

  const rateHandler = () => {
    setPending(true);
    createRateData({
      comment,
      value: rate,
      hotel: hotel?._id,
      fullName:
        JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))?.firstName +
        " " +
        JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))?.lastName,
      user: JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))?._id,
      createdAt: Date.now(),
    });
    window.scrollTo({ top: 2030, behavior: "smooth" });
  };

  return (
    <div className="w-full h-auto">
      {hotel && (
        <div className="w-full relative mt-32 pt-6 pb-10 flex flex-col px-2 xl:px-20 items-start justify-center">
          {pending && cancel && <Pending setPending={setCancel} />}
          {successMessage && success && <Success message={successMessage} />}
          {errorMessage && error && (
            <Error message={errorMessage} setError={setError} />
          )}
          {isFetching && cancel && <Pending setPending={setCancel} />}
          {hotelIsFetching && cancel && <Pending setPending={setCancel} />}
          <div className="w-full flex flex-col xl:flex-row justify-between items-center">
            <div className="flex flex-col items-start justify-center">
              <p className="text-[24px] font-extrabold text-black">
                {hotel.name}
              </p>
              <p className="text-[14px] mt-2 text-gray-700 ">
                <Location sx={{ width: 20, height: 20 }} /> {hotel.location}
              </p>{" "}
            </div>
            <button
              onClick={() => {
                setPopup(true);
              }}
              className="py-3 mt-2 text-[18px] xl:mt-0 rounded-md hover:text-gray-200 text-white bg-[#00aeff] px-3 w-auto"
            >
              Reserve or Book Now!
            </button>
          </div>
          <p className="text-[#00aeff] font-semibold mt-2 text-[18px] self-start">
            Excellent Location - {hotel.distance}m from the center
          </p>
          <p className="text-green-500 font-semibold mt-2 text-[18px] self-start">
            Book a stay over ${hotel.price} at this property and get a free
            airport taxi.
          </p>

          <div className="w-full grid grid-cols-1 items-center justify-center lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-4">
            {hotel.images.map((image, i) => {
              return (
                <img
                  key={i}
                  src={image}
                  alt="hotel"
                  className="w-full border border-gray-200 h-[250px] object-cover object-center rounded-sm"
                />
              );
            })}
          </div>

          <div className="flex flex-col xl:flex-row gap-x-5 gay-y-3 mt-3 items-start justify-start">
            <div className="flex flex-col items-start">
              <p className="text-[24px] mt-3 font-bold text-black">
                Experience World Class Service
              </p>
              <p className="text-[16px] mt-3 w-full text-gray-700">
                {hotel.description}.
              </p>
            </div>
            <div className="flex w-full bg-blue-100 mt-4 xl:mt-0 gap-2 px-2 py-2 rounded-md flex-col">
              <p className="text-[20px] font-bold text-black">
                Perfect for a 2 night stay!
              </p>
              <p className="text-[16px] text-gray-700">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
                iure architecto doloremque molestias.
              </p>
              <p className="text-[24px] text-black">
                ${hotel.price} for (2 nights)
              </p>
              <button
                onClick={() => {
                  setPopup(true);
                }}
                className="py-3 mt-4 text-[18px] xl:mt-0 rounded-sm hover:text-gray-200 text-white bg-[#00aeff] px-3 w-auto"
              >
                Reserve or Book Now!
              </button>
            </div>
          </div>

          {popup && (
            <div className="fixed z-30 top-[60px] text-gray-600 font-extrabold bg-opacity-50 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
              <div
                onClick={() => setPopup(false)}
                className="fixed z-20 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
              ></div>
              <div
                className={`relative rounded-lg border -mt-16 w-[95%] sm:w-[75%] h-[85vh] overflow-y-scroll md:w-[60%] lg:w-[50%] text-[18px] xl:w-[40%]d bg-white flex flex-col items-center justify-center pb-4 pt-4 z-30 xl:px-10 px-3`}
              >
                <p className="self-start">Select your rooms:</p>
                <div className="flex w-full mt-3 justify-between items-center gap-4">
                  <div className="flex flex-col items-s">
                    <p className="font-bold text-black">Deluxe Room</p>
                    <p className="text-[16px]">
                      King size bed,1 bathroom, balcony
                    </p>
                    <p className="font-semibold">Max People {hotel.deluxe}</p>
                    <p className="font-bold text-[20px] text-black">
                      ${hotel.price}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 1}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 2}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 3}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 4}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-5 justify-between items-center gap-4">
                  <div className="flex flex-col items-s">
                    <p className="font-bold text-black">2 Small Bed</p>
                    <p className="text-[16px]">
                      2 Small bed, 1 bathroom, balcony
                    </p>
                    <p className="font-semibold">Max People 2</p>
                    <p className="font-bold text-black text-[20px]">
                      ${hotel.price - 40}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 1}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 2}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 3}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 4}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 5}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 6}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price - 40)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full mt-5 justify-between items-center gap-4">
                  <div className="flex flex-col items-s">
                    <p className="font-bold text-black">Penthouse Apartment</p>
                    <p className="text-[16px]">
                      2 Queen Bed, 1 bathroom, terrace
                    </p>
                    <p className="font-semibold">Max People 4</p>
                    <p className="font-bold text-black text-[20px]">
                      ${hotel.price + 120}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 5}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price + 120)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>{" "}
                    <div className="flex text-[14px] items-center justify-center flex-col">
                      <p className="">{hotel.lastRoom - 6}</p>
                      <input
                        onChange={(e) =>
                          addHandler(e.target.checked, hotel.price + 120)
                        }
                        type="checkbox"
                        name=""
                        id=""
                        className="w-10 h-10"
                      />
                    </div>
                  </div>
                </div>
                <p className="py-2 font-extrabold text-[20px] text-black">
                  Total: ${totalValue}
                </p>
                <button
                  onClick={() => {
                    if (totalValue > 0) {
                      setPaymentPopup(true);
                    } else if (totalValue <= 0) {
                      setError(true);
                    }
                  }}
                  className="py-3 text-[20px] rounded-md bg-[#00aeff] text-white hover:text-gray-200 w-full px-4"
                >
                  Pay and Reserve
                </button>
                {error && (
                  <Error
                    message="you must select at least 1 room"
                    setError={setError}
                  />
                )}
                <Close
                  xs={{ width: 56, height: 56 }}
                  fontSize="large"
                  className="absolute cursor-pointer top-2 right-2 hover:text-gray-700"
                  onClick={() => setPopup(false)}
                />
              </div>
            </div>
          )}
          {paymentPopup && (
            <div className="fixed z-40 top-[60px] text-gray-600 font-extrabold bg-opacity-50 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
              <div
                onClick={() => setPaymentPopup(false)}
                className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
              ></div>
              <div
                className={`relative rounded-lg border -mt-16 w-[95%] sm:w-[75%] h-[85vh] overflow-y-scroll md:w-[60%] lg:w-[50%] text-[18px] xl:w-[40%]d bg-white flex flex-col items-center justify-center pb-4 pt-4 z-30 xl:px-10 px-3`}
              >
                <Pay
                  hotelName={hotel.name}
                  firstName={
                    JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))
                      ?.firstName
                  }
                  lastName={
                    JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))
                      ?.lastName
                  }
                  email={
                    JSON.parse(localStorage.getItem("hotel-user-data-gedeon"))
                      ?.email
                  }
                  amount={totalValue}
                />
                <Close
                  xs={{ width: 56, height: 56 }}
                  fontSize="large"
                  className="absolute cursor-pointer top-2 right-2 hover:text-gray-700"
                  onClick={() => setPaymentPopup(false)}
                />
              </div>
            </div>
          )}

          <div className="w-full relative gap-2 h-auto mt-14 pt-6 pb-10 flex flex-col px-2 xl:px-20 items-start justify-center">
            <p className="text-[32px] self-center flex items-center justify-center relative titled font-bold">
              Ratings {hotel?.totalRating}/5
              <Star
                sx={{ width: 40, height: 40 }}
                className="text-yellow-600 ml-2"
              />
              <Star
                sx={{ width: 40, height: 40 }}
                className="text-yellow-600"
              />
              <Star
                sx={{ width: 40, height: 40 }}
                className="text-yellow-600"
              />
            </p>
            <p className="text-[18px] self-center text-gray-600 font-bold mt-3">
              Our best Ratings They where given by our clients
            </p>
            {rateData &&
              rateData?.map((r) => {
                return (
                  <div
                    key={r._id}
                    className="flex flex-col xl:flex-row mt-5 gap-2 relative justify-between w-full h-auto py-4 px-4 rounded-lg bg-white shadow-md shadow-gray-300"
                  >
                    <p className="font-bold">{r?.fullName}:-</p>
                    <p className="text-gray-500 self-start">{r?.comment}</p>
                    <p className="text-yellow-600 flex items-center justify-center font-extrabold">
                      {r?.value}/5{" "}
                      <Star
                        sx={{ width: 32, height: 32 }}
                        className="text-yellow-600"
                      />
                    </p>
                  </div>
                );
              })}

            <p className="text-[32px] self-center font-bold titled relative mt-10">
              Rate Us
            </p>

            <textarea
              onChange={(e) => setComment(e.target.value)}
              name=""
              id=""
              cols="30"
              className="w-full py-4 border px-5 border-gray-300 focus:outline-cyan-500 rounded-md mt-2"
              rows="5"
              placeholder="Your Comment..."
            ></textarea>
            <p className="text-[18px] mt-4 text-gray-400 font-bold">
              Select Your Rating Out of 5
            </p>
            <div className="w-full flex relative gap-5 items-center justify-between mt-2">
              <input
                value={rate}
                className="w-full"
                type="range"
                id="points"
                min="1"
                max="5"
                step="0.1"
                onChange={(e) => setRate(e.target.value)}
              />
              <p className="text-[24px] flex gap-1 w-auto font-bold text-yellow-600">
                {rate}{" "}
              </p>
            </div>
            <button
              onClick={rateHandler}
              className="w-auto mt-3 px-20 py-4 rounded-lg hover:text-gray-200 bg-[#00aeff] text-white text-[20px]"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
