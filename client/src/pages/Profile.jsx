import React, { useContext, useEffect, useState } from "react";
import {
  useChangePasswordMutation,
  useReadProfileInfoQuery,
  useUpdateProfileInfoMutation,
  useUpdateProfilePictureMutation,
} from "../features/api/apiSlice";
import Error from "../components/Error/Error";
import Success from "../components/Success/Success";
import { navContext } from "../App";
import { useNavigate } from "react-router-dom";
import Pending from "../components/Pending/Pending";

const Profile = () => {
  const navigate = useNavigate();
  const context = useContext(navContext);
  let serverResponse = {};
  const { data, isFetching, isError, error: err } = useReadProfileInfoQuery();

  const [infoData, infoResponse] = useUpdateProfileInfoMutation();

  const [profilePicData, profilePicResponse] =
    useUpdateProfilePictureMutation();

  const [passwordData, passwordResponse] = useChangePasswordMutation();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pass, setPass] = useState(false);

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    setFirstName(data?.data?.firstName);
    setLastName(data?.data?.lastName);
    setEmail(data?.data?.email);
    setUserName(data?.data?.userName);
    setPhone(data?.data?.phone);
    setCity(data?.data?.city);
    setProfilePicture(data?.data?.profilePicture);
  }, [data]);

  const infoUpdateHandler = () => {
    setPass(false);
    setPending(true);
    infoData({
      firstName,
      lastName,
      email,
      userName,
      role: "user",
      phone,
      city,
      id: data?.data?._id,
    });
  };

  const profilePicUpdateHandler = () => {
    setPass(false);
    setPending(true);
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);
    formData.append("id", data?.data?._id);
    profilePicData(formData);
  };

  const passwordUpdateHandler = () => {
    setPass(true);
    setPending(true);
    passwordData({
      currentPassword,
      newPassword,
      confirmPassword,
      id: data?.data?._id,
    });
  };

  useEffect(() => {
    if (infoResponse) {
      serverResponse = { ...infoResponse };
    }
  }, [infoResponse]);

  useEffect(() => {
    if (profilePicResponse) {
      serverResponse = { ...profilePicResponse };
    }
  }, [profilePicResponse]);

  useEffect(() => {
    if (passwordResponse) {
      serverResponse = { ...passwordResponse };
    }
  }, [passwordResponse]);

  useEffect(() => {
    serverResponse?.status === "pending" ? setPending(true) : setPending(false);

    serverResponse?.status === "rejected"
      ? (setErrorMessage(serverResponse?.error?.data?.message), setError(true))
      : null;

    serverResponse?.status === "fulfilled" && !pass
      ? (localStorage.removeItem("hotel-user-data-gedeon"),
        localStorage.setItem(
          "hotel-user-data-gedeon",
          JSON.stringify(serverResponse?.data?.data)
        ),
        setSuccessMessage(serverResponse?.data.message),
        setPending(false),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 2000),
        setPass(false))
      : null;

    serverResponse?.status === "fulfilled" && pass
      ? (localStorage.removeItem("hotel-user-data-gedeon"),
        localStorage.removeItem("hotel-jwt-data-gedeon"),
        setSuccessMessage(serverResponse?.data.message),
        setError(false),
        setSuccess(true),
        setTimeout(() => {
          context.setSetting(false);
          context.setLogin(true);
          navigate("/login", { replace: true });
        }, 4000),
        setPass(false))
      : null;
  }, [serverResponse]);

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <div className="pb-32 w-full h-auto">
      <h1 className="text-white absolute bottom-[25px] text-[3rem] font-bold">
        Profile Info
      </h1>
      {pending && cancel && <Pending setPending={setCancel} />}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {data?.data ? (
        <div className="pb-[10rem] w-full pt-[3rem] flex flex-col items-center justify-center page-padding">
          {successMessage && success && <Success message={successMessage} />}
          <div className="flex flex-col pt-[32px] pr-[50px] pb-[5px] pl-[45px] bg-[#f8f8f8] relative xl:w-[65%] xl:flex text-gray-500  xl:flex-col xl:mx-auto w-[98%]">
            <h3 className="text-[28px] font-bold mt-20 titled relative mb-5">
              Your information's
            </h3>
            <span className="bg-[#00aeff] w-[50px] h-[4px] absolute top-[47px]"></span>

            <p className="text-[14px] mt-2">
              First Name{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="First Name"
              type="text"
              value={firstName}
            ></input>
            <p className="text-[14px]">
              Last Name{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Last Name"
              type="text"
              value={lastName}
            ></input>
            <p className="text-[14px]">
              Email{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Email"
              type="email"
              value={email}
            ></input>
            <p className="text-[14px]">
              User Name{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setUserName(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="User Name"
              type="text"
              value={userName}
            ></input>
            <p className="text-[14px]">
              City{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="City"
              type="text"
              value={city}
            ></input>
            <p className="text-[14px]">
              Phone{" "}
              <span className="text-[#00aeff] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
              placeholder="Phone"
              type="text"
              value={phone}
            ></input>
            <div className="w-full flex items-center gap-2">
              <button
                onClick={infoUpdateHandler}
                type="submit"
                className="text-white bg-[#00aeff] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
              >
                Update
              </button>
            </div>
          </div>

          {/* profile picture */}
          <div className="flex flex-col pt-[32px] mt-10 pr-[50px] pb-[20px] pl-[45px] bg-[#f8f8f8] relative xl:w-[65%] xl:flex text-gray-500  xl:flex-col xl:mx-auto w-[98%]">
            <h3 className="text-[28px] font-bold mb-5 titled relative">
              Profile Picture
            </h3>
            <div className="relative w-full h-auto text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8">
              <input
                onChange={(e) => setProfilePicture(e.target.files[0])}
                className="w-full opacity-0 h-[100px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                placeholder="profile picture"
                type="file"
              ></input>
              <div className="w-full h-[100px] py-2 flex gap-4 items-center text-[14px] outline-none">
                <img
                  src={data?.data?.profilePicture}
                  alt="profile picture"
                  className="h-[100px] w-[100px] rounded-full"
                />{" "}
                Click To Select New Profile Picture
              </div>

              <button
                onClick={profilePicUpdateHandler}
                type="submit"
                className="text-white bg-[#00aeff] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
              >
                Update
              </button>
            </div>
          </div>

          {/* update password */}
          <div className="flex flex-col pt-[32px] pb-3 pr-[50px] pl-[45px] bg-[#f8f8f8] relative xl:w-[65%] xl:flex text-gray-500  xl:flex-col xl:mx-auto w-[98%]">
            <h3 className="text-[28px] font-bold titled relative mb-14">
              Change Password
            </h3>

            <div className="relative w-full h-auto text-[14px]  outline-none mb-8">
              <p className="text-[14px]">Current Password</p>
              <input
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Current Password"
                type="text"
              ></input>
              <p className="text-[14px]">New Password</p>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="New Password"
                type="text"
              ></input>
              <p className="text-[14px]">Confirm Password</p>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-[12px] px-[20px] h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-8"
                placeholder="Confirm Password"
                type="text"
              ></input>

              <button
                onClick={passwordUpdateHandler}
                type="submit"
                className="text-white bg-[#00aeff] rounded-sm w-52 py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
