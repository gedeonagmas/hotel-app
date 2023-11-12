import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import Loading from "../components/Loading";
import { navContext } from "../App";

function Login() {
  const context = useContext(navContext);
  const navigate = useNavigate();
  const [loginData, loginResponse] = useLoginMutation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passVisibility, setPassVisibility] = useState(true);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);

  const gotoHandler=()=>{
    window.location = ('https://hotel-app-client-three.vercel.app'); 
  }
  // need a refresh
  useEffect(() => {
    loginResponse.status === "fulfilled"
      ? (setError(false),
        localStorage.setItem(
          "hotel-jwt-data-gedeon",
          "Bearer " + JSON.parse(JSON.stringify(loginResponse?.data?.token))
        ),
        localStorage.setItem(
          "hotel-user-data-gedeon",
          JSON.stringify(loginResponse?.data?.data)
        )
        context.setUserType(
          JSON.parse(localStorage.getItem("hotel-user-data-gedeon")).role
        ),
        context.setSetting(true),
        context.setLogin(false),
        navigate("/",{replace:true}),
         gotoHandler(),
        window.location.reload(true))
      : null;

    loginResponse.status === "rejected"
      ? (setError(true), setErrorMessage(loginResponse?.error?.data?.message))
      : setError(false);

    loginResponse.status === "pending" ? setPending(true) : setPending(false);
  }, [loginResponse]);

  const loginHandler = async () => {
    setPending(true);
    loginData({ userName, password });
  };

  const visibilityHandler = (id, type, val) => {
    type === "hide" ? setPassVisibility(true) : setPassVisibility(false);
    const aa = document.getElementById(id);
    aa.setAttribute("type", val);
  };

  return (
    <>
      <section className="login-section">
        {/* form  */}
        <div className="page-padding py-[10rem] flex justify-center">
          {error && errorMessage && (
            <Error message={errorMessage} setError={setError} />
          )}
          <div className="flex flex-col py-40 relative px-20 bg-black w-[96%] xl:w-[50%] shadow-xl">
            <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
              Sign In
            </h1>
            <label className="text-[2rem] text-white mb-3 font-medium ">
              User Name
            </label>
            <input
              className="text-[1.7rem] px-8 py-4 mb-10 w-full outline-[#00aeff] "
              placeholder="gedeonagmas"
              type="email"
              onChange={(e) => setUserName(e.target.value)}
            ></input>

            <label className="text-[2rem] text-white mb-3 font-medium outline-[#00aeff] outline-2">
              Password
            </label>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="pass"
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Password"
                type="password"
              ></input>
              {passVisibility && (
                <Visibility
                  onClick={() => visibilityHandler("pass", "visible", "text")}
                  fontSize="large"
                  className="absolute z-10 right-3 top-5 cursor-pointer hover:bg-gray-200"
                />
              )}
              {!passVisibility && (
                <VisibilityOff
                  onClick={() => visibilityHandler("pass", "hide", "password")}
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
                onClick={loginHandler}
                className="bg-[#00aeff] text-white py-4 font-medium text-[2rem] w-full mt-10"
              >
                Sign In
              </button>
            )}

            <div className="flex relative justify-evenly text-white items-center mt-16 min450:flex-col">
              <Link
                to="/signup"
                className="hover:text-[#00aeff] hover:text-[1.6rem] hover:underline font-bold text-[1.5rem]"
              >
                New to Gymate? Sign Up
              </Link>
              <Link
                to="/forget"
                className="hover:text-[#00aeff] font-bold hover:text-[1.6rem] hover:underline text-[1.5rem]"
              >
                Forget Password?
              </Link>
            </div>

            <p className="text-[#ffffffbc] text-[1.4rem] mt-3">
              <span className="text-[#00aeff]">Test Account</span> - gedeon{" "}
              <span className="text-[#00aeff]"> / </span>
              123Gedi.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Login;
