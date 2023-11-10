import React, { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Success from "../components/Success/Success";
import Error from "../components/Error/Error";
import { useResetPasswordMutation } from "../features/api/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Key, Visibility, VisibilityOff } from "@mui/icons-material";

const Reset = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const [resetData, response] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const resetHandler = () => {
    location?.search &&
      resetData({
        password,
        confirmPassword,
        resetToken: location?.search?.split("?")[1],
      });
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
        }, 3000),
        navigate("/login", { replace: true }))
      : null;
  }, [response]);

  const [passVisibility, setPassVisibility] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(true);
  const visibilityHandler = (id, type, field, val) => {
    field === "conf"
      ? type === "hide"
        ? setConfPassVisibility(true)
        : setConfPassVisibility(false)
      : type === "hide"
      ? setPassVisibility(true)
      : setPassVisibility(false);

    const aa = document.getElementById(id);
    aa.setAttribute("type", val);
  };
  return (
    <>
      <section className="login-section">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Reset Password
          </h1>
        </div>

        {successMessage && success && <Success message={successMessage} />}
        {errorMessage && error && (
          <Error message={errorMessage} setError={setError} />
        )}

        <div className="page-padding py-[10rem] flex justify-center">
          <div className="flex flex-col py-24 px-20 bg-black w-[55rem] min450:w-full  shadow-xl">
            <label className="text-[2rem] font-bold text-white">
              <Key sx={{ width: 56, height: 56 }} className="rotate-45" /> Enter
              your new password.
            </label>
            <label className="text-[2rem] mt-10 text-white mb-3 font-medium ">
              New Password
            </label>
            <div className="relative">
              <input
                id="pass"
                className="text-[1.7rem] px-8 mt-1 py-4 mb-10 w-full outline-[#00aeff] "
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              {passVisibility && (
                <Visibility
                  onClick={() =>
                    visibilityHandler("pass", "visible", "pass", "text")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
              {!passVisibility && (
                <VisibilityOff
                  onClick={() =>
                    visibilityHandler("pass", "hide", "pass", "password")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
            </div>

            <label className="text-[2rem] mt-4 text-white mb-3 font-medium ">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="conf"
                className="text-[1.7rem] px-8 mt-1 py-4 mb-10 w-full outline-[#00aeff] "
                placeholder="confirm password"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
              {confPassVisibility && (
                <Visibility
                  onClick={() =>
                    visibilityHandler("conf", "visible", "conf", "text")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
              {!confPassVisibility && (
                <VisibilityOff
                  onClick={() =>
                    visibilityHandler("conf", "hide", "conf", "password")
                  }
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
            </div>

            {pending ? (
              <div className="bg-[#00aeff] flex gap-2 items-center justify-center text-white py-4 font-medium text-[2rem] w-full mt-10">
                <Loading /> <p className="">Loading</p>
              </div>
            ) : (
              <button
                onClick={resetHandler}
                className="bg-[#00aeff] text-white py-4 font-medium text-[2rem] w-full mt-10"
              >
                Reset
              </button>
            )}
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default Reset;
