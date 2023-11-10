import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../components/Admin/Dashboard";
import { navContext } from "../App";
import SideBar from "../components/Admin/SideBar";
import Table from "../components/Admin/Hotels";
import Hotels from "../components/Admin/Hotels";
import Users from "../components/Admin/Users";
import Transactions from "../components/Admin/Transactions";
import Ratings from "../components/Admin/Ratings";

const AdminDashboard = () => {
  const context = useContext(navContext);
  const [dashboard, setDashboard] = useState(true);
  const [users, setUsers] = useState(false);
  const [hotels, setHotels] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [rates, setRates] = useState(false);

  const props = [setDashboard, setUsers, setHotels, setTransactions, setRates];

  return (
    <div className="flex text-[14px] h-[100vh] text-gray-500 flex-col w-full relative">
      <div
        className={`flex mt-32 flex-col ${
          context.nightMode ? "bg-gray-900" : "bg-white"
        } justify-center items-center w-full h-auto`}
      >
        <div className="flex w-full h-[88.6vh]">
          <SideBar data={props} />
          <div className="flex flex-[78%] w-[78%] h-auto p-3 mx-4 ">
            {dashboard && (
              <Dashboard
                setUsers={setUsers}
                setHotels={setHotels}
                setTransactions={setTransactions}
                setRates={setRates}
                props={props}
              />
            )}
            {hotels && <Hotels />}
            {users && <Users />}
            {transactions && <Transactions />}
            {rates && <Ratings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
