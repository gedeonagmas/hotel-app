import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateTransactionsMutation } from "../features/api/apiSlice";
import Pending from "./Pending/Pending";
import Error from "./Error/Error";

const Success = () => {
  const navigate = useNavigate();
  const [paymentData, response] = useCreateTransactionsMutation();
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [rejectedButton, setRejectedButton] = useState(false);

  useEffect(() => {
    const data = JSON.parse(
      window.localStorage.getItem("hotel-payment-data-gedeon")
    );
    if (data) paymentData(data);
    if (!data) navigate("/data-not-found");
  }, []);

  useEffect(() => {
    if (response.status === "fulfilled") {
      window.localStorage.removeItem("hotel-payment-data-gedeon");
      setError(false);
      setPending(false);
      setSuccess(true);
    } else if (response.status === "rejected") {
      setRejectedButton(true);
      setPending(false);
      setSuccess(false);
      setError(true);
    }
  }, [response]);

  return (
    <div className="text-xl pt-52 font-extrabold w-full h-full flex flex-col items-center justify-center">
      <div className="bg-gray-900 w-full fixed h-32 top-0 left-0"></div>
      {pending && <Pending setPending={setPending} />}
      {success && (
        <div className="flex w-[50%] flex-col text-[16px] items-center justify-center gap-2">
          <p className="mt-2 font-extrabold text-[20px] text-gray-500">
            Payment Successful.
          </p>
          <img
            src="./success.png"
            alt="success"
            className="w-[70%] h-[70%] rounded"
          />
          <button
            onClick={() => navigate("/")}
            className="mt-2 rounded hover:text-gray-200 px-10 py-4 text-white bg-gray-900"
          >
            Back to Home
          </button>
        </div>
      )}
      {rejectedButton && (
        <div className="flex w-[50%] flex-col text-[16px] items-center justify-center gap-2">
          <p className="font-bold text-center text-[20px] text-gray-500">
            If your payment is not successful
          </p>
          {/* <br /> */}
          <p className="font-bold mt-1 text-center text-[20px] text-gray-500">
            click here to refresh.
          </p>
          <Link
            onClick={() => navigate("/success", { replace: true })}
            to="/success"
            className="mt-2 rounded hover:text-gray-200 px-10 py-4 text-white bg-gray-900"
          >
            Refresh
          </Link>
        </div>
      )}
      {error && (
        <Error
          message="Something Went Wrong Please try again!"
          setError={setError}
        />
      )}
    </div>
  );
};

export default Success;
