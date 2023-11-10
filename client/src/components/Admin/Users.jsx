import React, { useContext, useEffect, useState } from "react";
import VisibilityOn from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import {
  useCreateHotelsMutation,
  useUpdateFactoryMutation,
  useReadHotelsQuery,
  useGetAllUserQuery,
} from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import Success from "../Success/Success";
import Warning from "../Warning/Warning";
import { navContext } from "../../App";
import { Close, Image } from "@mui/icons-material";

const Users = ({ type }) => {
  let response = {};
  const context = useContext(navContext);
  const { data, isFetching, isError, error: err } = useGetAllUserQuery();
  const [deleteData, deleteResponse] = useUpdateFactoryMutation();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [detailPopup, setDetailPopUp] = useState(false);
  const [id, setId] = useState();

  const deleteHandler = () => {
    setPending(true);
    id && deleteData({ id, type: "users" });
  };

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    if (deleteResponse) response = { ...deleteResponse };
  }, [deleteResponse]);

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
        setDetailPopUp(false),
        setWarning(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (data) {
      setUserData(data?.data);
    }
  }, [data]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          Users{" "}
          <span className="">
            {"("}
            {userData?.length}
            {")"}
          </span>
        </p>
      </div>
      {warning && (
        <Warning
          setWarning={setWarning}
          deleteHandler={deleteHandler}
          id={id}
        />
      )}
      {pending && cancel && <Pending setPending={setCancel} />}
      {successMessage && success && <Success message={successMessage} />}
      {errorMessage && error && (
        <Error message={errorMessage} setError={setError} />
      )}
      {isFetching && cancel && <Pending setPending={setCancel} />}
      <table className="w-[1120px]  max-h-[90vh] border">
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <tr className="border-t border-gray-500">
            <td className="px-1 border-l border-r border-gray-500 text-center  py-1">
              No.
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Profile
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              First Name
            </td>
            <td className="px-1 border-r border-gray-500 text-center ">
              Last Name
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              User Name
            </td>
            <td className="px-1 border-r border-gray-500 text-center">Email</td>
            <td className="px-1 border-r border-gray-500 text-center">Phone</td>
            <td className="px-1 border-r border-gray-500 text-center">City</td>
            <td className="px-1 border-r border-gray-500 text-center">Role</td>
            <td className="px-1 border-r border-gray-500 text-center">
              Actions
            </td>
          </tr>
        </thead>
        {userData && userData.length > 0 ? (
          userData?.map((d, i) => {
            return (
              <tbody key={d._id} className="py-1">
                <tr className="py-1 border border-gray-500 text-center ">
                  <td className="px-1 border-r border-gray-500 text-center">
                    {i + 1}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    <img
                      src={d.profilePicture}
                      alt="profile"
                      className="w-12 my-[2px] mx-[2px] h-12 border rounded-full"
                    />
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.firstName}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.lastName}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.userName}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.email}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.phone}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.city}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.role}
                  </td>
                  <td className="px-1 py-1 flex items-center text-center self-center justify-center gap-3">
                    <div
                      onClick={() => {
                        setUser(d);
                        setDetailPopUp(true);
                      }}
                      className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-[#00aeff] hover:text-white items-center justify-center rounded-md"
                    >
                      <VisibilityOn fontSize="large" /> Detail
                    </div>{" "}
                    <div
                      onClick={() => {
                        setId(d._id);
                        setWarning(true);
                      }}
                      className="border flex gap-2 py-1 px-2 cursor-pointer hover:bg-[#ff0336] hover:text-white items-center justify-center rounded-md"
                    >
                      <Delete fontSize="large" /> Delete
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <tbody className="py-1">
            <tr className="pl-2 py-1 mt-40 border border-l-0 border-r-0">
              <td className="px-1 border border-gray-400">
                There is no data to display
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {detailPopup && user && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setDetailPopUp(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`relative ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } rounded-lg border h-[82vh] -mt-24 overflow-y-scroll w-auto flex flex-col gap-1 items-start justify-center py-14 z-40 px-44 shadow-lg shadow-gray-500`}
          >
            <p className="font-bold mt-20 text-[16px]">Profile Information </p>{" "}
            <div className="grid grid-cols-5 w-full gap-2">
              <img
                src={user.profilePicture}
                alt="profile"
                className="w-24 h-24 rounded-md border border-gray-200"
              />
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">First Name :</p>{" "}
              <p className="font-normal">{user.firstName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Last Name :</p>{" "}
              <p className="font-normal">{user.lastName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">User Name :</p>{" "}
              <p className="font-normal">{user.userName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Email :</p>{" "}
              <p className="font-normal">{user.email}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Phone :</p>{" "}
              <p className="font-normal">{user.phone}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">City :</p>{" "}
              <p className="font-normal">{user.city}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Role :</p>{" "}
              <p className="font-normal">{user.role}</p>
            </div>
            <Close
              onClick={() => setDetailPopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
