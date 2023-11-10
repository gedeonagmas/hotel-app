import React, { useEffect, useState } from "react";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import { useForgetPasswordMutation } from "../features/api/apiSlice";
import Success from "../components/Success/Success";
import Loading from "../components/Loading";
import { Email } from "@mui/icons-material";

const Forget = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  const [forgetData, response] = useForgetPasswordMutation();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const forgetHandler = () => {
    forgetData({ email });
  };

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
        }, 8000))
      : null;
  }, [response]);

  return (
    <>
      <section className="login-section">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Forget Password
          </h1>
        </div>

        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}

        <div className="page-padding py-[10rem] flex justify-center">
          <div className="flex flex-col py-24 px-20 bg-black w-[55rem] min450:w-full  shadow-xl">
            <label className="text-[2rem] font-bold text-white">
              <Email sx={{ width: 56, height: 56 }} /> Enter Verification Email
              Address.
            </label>
            <label className="text-[2rem] mt-10 text-white mb-3 font-medium ">
              Email
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#00aeff] "
              placeholder="gedeonagmas@gmail.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            {pending ? (
              <div className="bg-[#00aeff] flex gap-2 items-center justify-center text-white py-4 font-medium text-[2rem] w-full mt-10">
                <Loading /> <p className="">Loading</p>
              </div>
            ) : (
              <button
                onClick={forgetHandler}
                className="bg-[#00aeff] text-white py-4 font-medium text-[2rem] w-full mt-10"
              >
                Forget
              </button>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Forget;
