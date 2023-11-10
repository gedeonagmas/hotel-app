import { useContext, useEffect, useState } from "react";
import { useSendEmailMutation } from "../../features/api/apiSlice";
import Footer from "../Footer/Footer";
import { Email, Phone, Telegram } from "@mui/icons-material";
import Success from "../Success/Success";
import Error from "../Error/Error";

function Contact({ type }) {
  const [emailData, emailResponse] = useSendEmailMutation();
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  const [fill, setFill] = useState(false);
  const [cancel, setCancel] = useState(true);

  const sendEmail = () => {
    setCancel(true);
    if (names.length > 1 && email.includes("@") && message.length > 1) {
      emailData({
        name: names,
        email,
        message,
      });
      setDone(true);
      setTimeout(() => {
        setDone(false);
      }, 5000);
    } else {
      setFill(true);
      setTimeout(() => {
        setFill(false);
      }, 8000);
    }
  };

  useEffect(() => {
    if (done) setCancel(false);
  }, [done]);

  return (
    <>
      <div
        className={`w-full h-auto flex flex-col ${
          type === "home" ? "py-10" : "py-2"
        } 
        my-32 px-2 xl:px-20 items-center justify-center `}
      >
        {type === "home" && (
          <p className="text-[24px] font-bold text-gray-500 py-3">Contact Us</p>
        )}
        {type === "home" && (
          <p className="text-[32px] font-bold text-gray-800">
            Tell us what do you want?
          </p>
        )}
        <div className="w-full px-2">
          <div className="flex flex-col xl:flex-row mt-20">
            {done && (
              <Success message="Email Sent Thank you for contacting us!!" />
            )}
            {fill && cancel && (
              <Error
                message="All fields are required please fill out correctly"
                setError={setCancel}
              />
            )}
            <div className="flex flex-col gap-4 pr-2 xl:pr-20 w-full">
              <p className="text-[32px] font-bold">
                Need additional <br /> information?
              </p>
              <p className="text-[20px] text-gray-500">
                We are the best reservation system provider in the country. we
                provide a Professional world class hotels with online payment
                system. our system is easy to use and attractive.
              </p>
              <p className="text-gray-500 flex items-center justify-start gap-5 text-[20px]">
                <Phone
                  sx={{ width: 20, height: 20 }}
                  className="text-gray-500"
                />
                +251 0954104637
              </p>
              <p className="text-gray-500 flex items-center justify-start gap-5 text-[20px]">
                <Email
                  sx={{ width: 20, height: 20 }}
                  className="text-gray-500"
                />
                gedeonagmas2580@gmail.com
              </p>
              <p className="text-gray-500 flex items-center justify-start gap-5 text-[20px]">
                <Telegram
                  sx={{ width: 20, height: 20 }}
                  className="text-gray-500"
                />
                @gedi3777
              </p>
            </div>
            <div className="flex w-full flex-col gap-2">
              <label className="py-2">
                Full Name <b>*</b>
              </label>
              <input
                className="py-5 w-full px-5 rounded-lg border border-gray-200 bg-white focus:outline-cyan-400"
                onChange={(e) => setNames(e.target.value)}
                type="text"
                placeholder={"e.g: Gedeon Agmas"}
              />

              <label className="">
                Email <b>*</b>
              </label>
              <input
                className="py-5 w-full px-5 rounded-lg border border-gray-200 bg-white focus:outline-cyan-400"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="youremail@example.com"
              />

              <label className="">
                Tell us about it
                <b>*</b>
              </label>
              <textarea
                className="py-5 w-full px-5 rounded-lg border border-gray-200 bg-white focus:outline-cyan-400"
                onChange={(e) => setMessage(e.target.value)}
                placeholder={"Write Here.."}
                name=""
                id=""
                cols="30"
                rows="4"
              ></textarea>

              <button
                className="py-5 mt-4 w-full px-5 rounded-lg hover:text-gray-200 text-white  bg-[#00aeff] "
                onClick={sendEmail}
                type="button"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
      {type === "contact" && <Footer />}
    </>
  );
}

export default Contact;
