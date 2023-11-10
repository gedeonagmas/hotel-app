import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { Image, Visibility, VisibilityOff } from "@mui/icons-material";
import { useSignupMutation } from "../features/api/apiSlice";
import Loading from "../components/Loading";
import Success from "../components/Success/Success";
import Error from "../components/Error/Error";
import { navContext } from "../App";

function Signup() {
  const navigate = useNavigate();
  const context = useContext(navContext);
  const [signupData, signupResponse] = useSignupMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passVisibility, setPassVisibility] = useState(true);
  const [confPassVisibility, setConfPassVisibility] = useState(true);

  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [pending, setPending] = useState(false);

  const signupHandler = () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("userName", userName);
    formData.append("phone", phone);
    formData.append("city", city);
    formData.append("profilePicture", profilePicture);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    signupData(formData);
  };

  useEffect(() => {
    signupResponse.status === "pending" ? setPending(true) : setPending(false);
    signupResponse.status === "rejected"
      ? (setErrorMessage(signupResponse?.error?.data?.message), setError(true))
      : setError(false);

    signupResponse.status === "fulfilled"
      ? (setSuccessMessage(signupResponse.data.message),
        setError(false),
        setSuccess(true),
        localStorage.setItem(
          "hotel-jwt-data-gedeon",
          "Bearer " + JSON.parse(JSON.stringify(signupResponse?.data?.token))
        ),
        localStorage.setItem(
          "hotel-user-data-gedeon",
          JSON.stringify(signupResponse?.data?.data)
        ),
        context.setLogin(false),
        setTimeout(() => {
          setSuccess(false);
          navigate("/", { replace: true });
        }, 2000))
      : setSuccess(false);
  }, [signupResponse]);

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
      <section className="login-section ">
        <div className="login-banner relative justify-center flex">
          <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
            Sign Up
          </h1>
        </div>

        {/* form  */}
        <div className="pb-[10rem] pt-[2rem] flex justify-center page-padding">
          {" "}
          {errorMessage && error && (
            <Error message={errorMessage} setError={setError} />
          )}
          {successMessage && success && <Success message={successMessage} />}
          <div className="flex w-[60%] flex-col pt-[3px] pr-[50px] pb-[5px] pl-[45px] bg-[#f8f8f8] relative md1000:w-[65%] md1000:flex text-gray-500  md1000:flex-col md1000:mx-auto min800:w-[90%] min620:w-full">
            <h3 className="text-[28px] font-bold mb-14">Your Information</h3>
            <span className="bg-[#ff0336] w-[50px] h-[4px] absolute top-[47px]"></span>
            <p className="text-[14px] py-2">
              All Fields Marked as{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>{" "}
              are Required !!
            </p>
            <p className="text-[14px] mt-2">
              First Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="First Name"
              type="text"
            ></input>
            <p className="text-[14px]">
              Last Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Last Name"
              type="text"
            ></input>
            <p className="text-[14px]">
              Email{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Email"
              type="email"
            ></input>
            <p className="text-[14px]">
              User Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="User Name"
              type="text"
            ></input>
            <p className="text-[14px]">
              City{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="City"
              type="text"
            ></input>
            <p className="text-[14px]">
              Phone{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Phone"
              type="text"
            ></input>

            <p className="text-[14px]">
              Password{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
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
            <p className="text-[14px]">
              Confirm Password{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="conf"
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Confirm Password"
                type="password"
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
            <p className="text-[14px]">
              Profile Picture{"("}optional{")"}
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full opacity-0 h-[51px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                placeholder="Confirm Password"
                type="file"
              ></input>
              <div className="w-full h-[51px] py-1 flex items-center px-[20px] text-[14px] outline-none">
                {/* <img
                    src={"./discover.png"}
                    alt="profile"
                    className="w-20 h-full bg-gray-200 rounded-full"
                  /> */}
                <Image fontSize="large" /> Select Profile Picture
              </div>
            </div>

            <div className="w-full flex items-center gap-2">
              {pending ? (
                <div className="text-white w-52 flex items-center justify-center gap-3 bg-[#00aeff] rounded-sm py-[12px] px-[15px] font-bold text-[14px] self-center mt-6">
                  <Loading /> <p className="">Loading</p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setPending(true);
                    signupHandler();
                  }}
                  type="submit"
                  className="text-white bg-[#00aeff] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
                >
                  Signup
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Signup;
