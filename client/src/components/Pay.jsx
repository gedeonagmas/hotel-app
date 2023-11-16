import React, { useEffect } from "react";

const Pay = (props) => {
  useEffect(() => {
    window.localStorage.setItem(
      "hotel-payment-data-gedeon",
      JSON.stringify(props)
    );
  }, []);

  return (
    <div>
      <form
        method="POST"
        className=""
        action="https://api.chapa.co/v1/hosted/pay"
      >
        <input
          type="hidden"
          name="public_key"
          value="CHAPUBK_TEST-7osxyPCBKmA3NdC9nlaZkIrHMas5Falj"
        />
        <input type="hidden" name="tx_ref" value={`gedi-tx-${Date.now()}`} />
        <input type="hidden" name="amount" value={props.amount} />
        <input type="hidden" name="currency" value="ETB" />
        <input type="hidden" name="email" value={props.email} />
        <input type="hidden" name="first_name" value={props.firstName} />
        <input type="hidden" name="last_name" value={props.lastName} />
        <input type="hidden" name="title" value="Let us do this" />
        <input
          type="hidden"
          name="description"
          value="Paying with Confidence with cha"
        />
        <input
          type="hidden"
          name="logo"
          value="https://yourcompany.com/logo.png"
        />
        <input
          type="hidden"
          name="callback_url"
          value="https://hotel-app-client-three.vercel.app"
        />
        <input
          type="hidden"
          name="return_url"
          value={`https://hotel-app-client-three.vercel.app/success`}
        />
        <input type="hidden" name="meta[title]" value="test" />
        <div className="flex p-5 font-bold text-[16px] flex-col gap-2">
          <p className="self-start  font-extrabold underline">
            Payment Information
          </p>
          <img
            src="./chappa.png"
            alt="chappa"
            className="w-full rounded-lg h-44 mt-2"
          />
          <div className="flex gap-10">
            <p>First Name:</p>
            <p className="text-gray-500">{props.firstName}</p>
          </div>
          <div className="flex gap-10 items-center">
            <p>Last Name:</p>
            <p className="text-gray-500">{props.lastName}</p>
          </div>
          <div className="flex gap-10 items-center">
            <p>Email:</p>
            <p className="text-gray-500">{props.email}</p>
          </div>
          <div className="flex gap-10 items-center">
            <p>Amount:</p>
            <p className="text-gray-500">{props.amount} birr</p>
          </div>
          <div className="flex gap-10 items-center">
            <p>Method:</p>
            <div className="flex gap-3">
              <p className="text-gray-500">Chappa</p>
              <input type="radio" defaultChecked name="" id="ids" />
            </div>
          </div>
        </div>
        <button
          className="py-4 h-20 rounded font-bold w-[100%] text-[18px] px-10 mt-2 bg-[#00aeff] text-white hover:text-gray-200"
          type="submit"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Pay;
