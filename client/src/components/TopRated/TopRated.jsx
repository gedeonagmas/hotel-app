import React, { useEffect, useState } from "react";
import Star from "@mui/icons-material/Star";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useReadHotelsQuery } from "../../features/api/apiSlice";
import Error from "../Error/Error";
import Pending from "../Pending/Pending";
import { useNavigate } from "react-router-dom";

const TopRated = () => {
  const navigate = useNavigate();
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadHotelsQuery({ type: "multi" });

  const [hotelData, setHotelData] = useState();

  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setHotelData(data?.data?.filter((d, i) => i < 5));
    }
  }, [data]);

  return (
    <div className="w-full px-2 lg:px-20 h-auto py-10 mt-10">
      <p className="text-[32px] font-bold relative auto titled">
        Top Rated Hotels
      </p>
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      <div className="grid place-items-center items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full gap-5 h-auto py-5">
        {hotelData &&
          hotelData?.map((d) => {
            return (
              <div
                key={d._id}
                className="min-w-[200px] w-full  relative h-[250px] min-h-[200px]"
              >
                <img
                  src={d?.images[0]}
                  alt=""
                  className="w-full h-full brightness-75 rounded-xl object-cover object-center"
                />
                <div className="flex flex-col absolute bottom-2 bg-gray-200 h-auto w-auto bg-transparent left-4 text-white font-bold">
                  <p className="text-[20px]">{d.name}</p>
                  <p className="text-[20px]">{d.city}</p>
                  <div
                    onClick={() =>
                      navigate("/reserve", { state: { id: d._id } })
                    }
                    className="text-[#00aeff] cursor-pointer mt-1 text-[14px] bg-white rounded-lg flex gap-1 items-center justify-center w-full py-1"
                  >
                    Visit{" "}
                    <ArrowForward
                      fontSize="large"
                      sx={{ width: 20, height: 20 }}
                      className=" "
                    />
                  </div>
                </div>
                <div className="flex text-[20px] brightness-100 absolute top-1 right-2 text-white font-extrabold items-center justify-center gap-1">
                  <Star
                    sx={{ width: 32, height: 32 }}
                    className="text-yellow-600"
                  />
                  <p className="">{d.totalRating} / 5</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopRated;
