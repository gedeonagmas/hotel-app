import React, { useContext, useEffect, useState } from "react";
import { navContext } from "../../App";
import Warning from "../Warning/Warning";
import Pending from "../Pending/Pending";
import Success from "../Success/Success";
import Error from "../Error/Error";
import { format } from "timeago.js";
import {
  useDeleteRateMutation,
  useReadMultipleRateQuery,
} from "../../features/api/apiSlice";
import Visibility from "@mui/icons-material/Visibility";
import { Close, Delete } from "@mui/icons-material";

const Ratings = () => {
  let response = {};
  const context = useContext(navContext);
  const { data, isFetching, isError, error: err } = useReadMultipleRateQuery();
  const [deleteData, deleteResponse] = useDeleteRateMutation();
  const [user, setUser] = useState();

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
    id && deleteData({ id });
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
        setError(true),
        setSuccess(true),
        setTimeout(() => {
          setSuccess(false);
        }, 3000),
        setWarning(false))
      : null;
  }, [response]);

  return (
    <div>
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          Ratess ({data ? data.data?.length : "0"})
        </p>
      </div>
      <table className="w-[1120px]  max-h-[90vh] border">
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
        <thead
          className={`${context.nightMode ? "bg-gray-800" : "bg-gray-200"}`}
        >
          <tr className="border border-gray-500">
            <td className="px-1 border-l border-r border-gray-500 text-center  py-1">
              No.
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Full Name
            </td>
            <td className="px-1 border-r border-gray-500 text-center ">
              Hotel Id
            </td>{" "}
            <td className="px-1 border-r border-gray-500 text-center">
              User Id
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Comment
            </td>{" "}
            <td className="px-1 border-r border-gray-500 text-center">Date</td>
            <td className="px-1 border-r border-gray-500 text-center">Value</td>
            <td className="px-1 border-r border-gray-500 text-center">
              Actions
            </td>
          </tr>
        </thead>
        {data && data.data.length > 0 ? (
          data?.data?.map((d, i) => {
            return (
              <tbody className="py-1 border border-gray-500">
                <tr className="border-t border-gray-500">
                  <td className="px-1 border-r border-gray-500 text-center">
                    {i + 1}
                  </td>

                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.fullName}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.hotel}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.user}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.comment.split(" ").splice(0, 10).join(" ")}...
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {format(d.createdAt)}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.value}
                  </td>

                  <td className="px-1 py-1 flex items-center text-center self-center justify-center gap-3">
                    <div
                      onClick={() => {
                        setUser(d);
                        setDetailPopUp(true);
                      }}
                      className="border flex gap-4 py-1 px-2 cursor-pointer hover:bg-[#00aeff] hover:text-white items-center justify-center rounded-md"
                    >
                      <Visibility fontSize="large" /> Detail
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
            } rounded-lg border w-auto -mt-32 flex flex-col gap-1 items-start justify-center py-4 z-40 px-44 shadow-lg shadow-gray-500`}
          >
            <p className="font-bold text-[16px]">Detail Information </p>{" "}
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Reviewer :</p>{" "}
              <p className="font-normal">{user.fullName}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Hotel Id :</p>{" "}
              <p className="font-normal">{user.hotel}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">User Id :</p>{" "}
              <p className="font-normal">{user.user}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Value :</p>{" "}
              <p className="font-normal">{user.value}</p>
            </div>
            <div className="border rounded-md w-full py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Comment :</p>{" "}
              <p className="font-normal w-auto max-w-[500px]">{user.comment}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Date :</p>{" "}
              <p className="font-normal">{format(user.createdAt)}</p>
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

export default Ratings;
