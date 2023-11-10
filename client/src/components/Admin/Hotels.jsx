import React, { useContext, useEffect, useState } from "react";
import VisibilityOn from "@mui/icons-material/Visibility";
import Delete from "@mui/icons-material/Delete";
import {
  useCreateHotelsMutation,
  useUpdateFactoryMutation,
  useReadHotelsQuery,
} from "../../features/api/apiSlice";
import Pending from "../Pending/Pending";
import Error from "../Error/Error";
import Success from "../Success/Success";
import Warning from "../Warning/Warning";
import { navContext } from "../../App";
import { Close, Image } from "@mui/icons-material";

const Hotels = ({ type }) => {
  let response = {};
  const context = useContext(navContext);
  const {
    data,
    isFetching,
    isError,
    error: err,
  } = useReadHotelsQuery({ type: "muti" });
  const [createHotelData, createHotelResponse] = useCreateHotelsMutation();
  const [deleteData, deleteResponse] = useUpdateFactoryMutation();
  const [user, setUser] = useState();
  const [hotelData, setHotelData] = useState();
  const [pending, setPending] = useState(false);
  const [cancel, setCancel] = useState(true);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [createPopup, setCreatePopUp] = useState(false);
  const [detailPopup, setDetailPopUp] = useState(false);
  const [id, setId] = useState();

  const [name, setName] = useState("");
  const [distance, setDistance] = useState(0);
  const [specialService, setSpecialService] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [deluxe, setDeluxe] = useState(1);
  const [twoBed, setTwoBed] = useState(1);
  const [penthouse, setPenthouse] = useState(1);
  const [startRoom, setStartRoom] = useState(1);
  const [lastRoom, setLastRoom] = useState(2);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState(1);
  const [coverPhotos, setCoverPhotos] = useState("");

  const createHotelHandler = () => {
    setPending(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("distance", distance);
    formData.append("specialService", specialService);
    formData.append("city", city);
    formData.append("location", location);
    formData.append("deluxe", deluxe);
    formData.append("twoBed", twoBed);
    formData.append("penthouse", penthouse);
    formData.append("startRoom", startRoom);
    formData.append("lastRoom", lastRoom);
    formData.append("description", description);
    formData.append("phone", phone);
    formData.append("price", price);
    for (let i = 0; i < coverPhotos?.length; i++) {
      formData.append("images", coverPhotos[i]);
    }
    formData.append("createdAt", Date.now());

    createHotelData(formData);
  };

  const deleteHandler = () => {
    setPending(true);
    id && deleteData({ id, type: "hotels" });
  };

  useEffect(() => {
    isError
      ? (setErrorMessage(err?.data?.message), setError(true))
      : setError(false);
  }, [isError]);

  useEffect(() => {
    if (createHotelResponse) response = { ...createHotelResponse };
  }, [createHotelResponse]);

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
        setCreatePopUp(false),
        setWarning(false))
      : null;
  }, [response]);

  useEffect(() => {
    if (data) {
      setHotelData(data?.data);
    }
  }, [data]);

  return (
    <div className="mx-1 flex flex-col items-center ">
      <div className="w-full my-4 mx-4 flex justify-between">
        <p className="text-xl font-bold my-4 self-start mx-4 uppercase">
          Hotels{" "}
          <span className="">
            {"("}
            {hotelData?.length}
            {")"}
          </span>
        </p>
        <button
          onClick={() => setCreatePopUp(true)}
          className="px-4 py-4 ease-in-out min-w-[160px] duration-150 hover:text-gray-200 text-white bg-[#00aeff]  border-gray-400 rounded-sm font-bold"
        >
          Add New
        </button>
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
            <td className="px-1 border-r border-gray-500 text-center">Image</td>
            <td className="px-1 border-r border-gray-500 text-center ">Name</td>
            <td className="px-1 border-r border-gray-500 text-center">City</td>
            <td className="px-1 border-r border-gray-500 text-center">
              Location
            </td>
            <td className="px-1 border-r border-gray-500 text-center">Price</td>
            <td className="px-1 border-r border-gray-500 text-center">
              Deluxe
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Two Bed
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Pentdouse
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Start Room
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Average Rating
            </td>
            <td className="px-1 border-r border-gray-500 text-center">
              Actions
            </td>
          </tr>
        </thead>
        {hotelData && hotelData.length > 0 ? (
          hotelData?.map((d, i) => {
            return (
              <tbody key={d._id} className="py-1">
                <tr className="py-1 border border-gray-500 text-center ">
                  <td className="px-1 border-r border-gray-500 text-center">
                    {i + 1}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    <img
                      src={d.images[0]}
                      alt="profile"
                      className="w-12 my-[2px] mx-[2px] h-12 border rounded-full"
                    />
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.name}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.city}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.location}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.price}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.deluxe}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.twoBed}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.penthouse}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.startRoom}
                  </td>
                  <td className="px-1 border-r border-gray-500 text-center">
                    {d.totalRating}
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
              {user?.images?.map((im, i) => {
                return (
                  <img
                    src={im}
                    alt="profile"
                    className="w-24 h-24 rounded-md border border-gray-200"
                  />
                );
              })}
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Name :</p>{" "}
              <p className="font-normal">{user.name}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">City :</p>{" "}
              <p className="font-normal">{user.city}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Location :</p>{" "}
              <p className="font-normal">{user.location}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Price :</p>{" "}
              <p className="font-normal">{user.price}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Phone :</p>{" "}
              <p className="font-normal">{user.phone}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Distance :</p>{" "}
              <p className="font-normal">{user.distance}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Deluxe :</p>{" "}
              <p className="font-normal">{user.deluxe}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Two Bed :</p>{" "}
              <p className="font-normal">{user.twoBed}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Penthouse :</p>{" "}
              <p className="font-normal">{user.penthouse}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Start Room :</p>{" "}
              <p className="font-normal">{user.startRoom}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Last Room :</p>{" "}
              <p className="font-normal">{user.lastRoom}</p>
            </div>
            <div className="border rounded-md py-2 px-4 gap-2 flex justify-between">
              <p className="font-bold">Total Rating :</p>{" "}
              <p className="font-normal">{user.totalRating}</p>
            </div>
            <Close
              onClick={() => setDetailPopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
      {createPopup && (
        <div className="fixed z-30 top-32 text-gray-600 font-extrabold bg-opacity-70 bg-black h-[100vh] left-0 w-full flex flex-col items-center justify-center">
          <div
            onClick={() => setCreatePopUp(false)}
            className="fixed z-30 text-gray-600 font-extrabold bg-transparent h-[100vh] left-0 w-full flex flex-col items-center justify-center"
          ></div>
          <div
            className={`z-40 -top-14 py-5 ${
              context.nightMode ? "bg-gray-900" : "bg-white"
            } h-[85vh] relative px-10 w-[90%] sm:w-[75%] max-h-[85vh] overflow-y-scroll md:w-[60%] lg:w-[50%] rounded-md`}
          >
            <h3 className="text-[28px] titled relative font-bold">
              Hotel Information
            </h3>
            <p className="text-[14px] py-2">
              All Fields Marked as{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>{" "}
              are Required !!
            </p>
            <p className="text-[14px] mt-2">
              Name{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Name"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Distance{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setDistance(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Distance from center"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Special Service{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setSpecialService(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="e.g free airport taxi"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              City{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="City"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Location{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="e.g addis ababa, bole, curve 23"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Deluxe{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setDeluxe(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Deluxe Room"
              type="number"
              min={0}
            ></input>
            <p className="text-[14px] mt-2">
              Two Bed Room{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setTwoBed(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Two Bed Room"
              type="number"
              min={0}
            ></input>
            <p className="text-[14px] mt-2">
              Penthouse Apartment{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPenthouse(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Penthouse Apartment"
              type="number"
              min={0}
            ></input>
            <p className="text-[14px] mt-2">
              Start Room Number{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setStartRoom(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Start Room Number"
              type="number"
              min={0}
            ></input>
            <p className="text-[14px] mt-2">
              Last Room Number{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setLastRoom(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Last Room Number"
              type="number"
              min={0}
            ></input>

            <p className="text-[14px] mt-2">
              Phone{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Phone"
              type="text"
            ></input>
            <p className="text-[14px] mt-2">
              Price{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-20 py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Price"
              type="number"
              min={0}
            ></input>
            <p className="text-[14px] mt-2">
              Description{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-auto py-4 px-2 rounded-md mt-2 border focus:outline-none"
              placeholder="Description"
              name=""
              id=""
              cols="30"
              rows="6"
            ></textarea>
            <p className="text-[14px] mt-2">
              Cover Photos{" "}
              <span className="text-[#ff0336] text-[15px] font-bold">*</span>
            </p>
            <div className="relative w-full h-[51px] text-[14px] border border-solid border-[#e4e4e4] outline-none mb-1">
              <input
                onChange={(e) => setCoverPhotos(e.target.files)}
                className="w-full opacity-0 h-[51px] absolute z-10 text-[14px] border border-solid border-[#e4e4e4] outline-none"
                placeholder="You can select up to 10 images"
                type="file"
                multiple
              ></input>
              <div className="w-full h-[51px] py-1 flex items-center px-[20px] text-[14px] outline-none">
                <Image fontSize="large" /> Select Cover Photos
              </div>
            </div>
            <button
              onClick={createHotelHandler}
              type="submit"
              className="text-white bg-[#00aeff] rounded-sm w-full py-[15px] px-[40px] font-bold text-[16px] uppercase self-center mt-6"
            >
              Create
            </button>
            <Close
              onClick={() => setCreatePopUp(false)}
              fontSize="large"
              className="cursor-pointer absolute hover:text-gray-800 top-2 right-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
