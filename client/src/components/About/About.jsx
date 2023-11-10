import Footer from "../Footer/Footer";
import { LocalHotel, People, Watch } from "@mui/icons-material";

function About({ type }) {
  return (
    <>
      <div className="w-full h-auto flex flex-col py-10 px-2 xl:px-20 items-center justify-center my-32">
        <p className="text-[24px] font-bold text-gray-500 py-3">
          Why Choose Us
        </p>
        <p className="text-[32px] font-bold text-gray-800">About Company</p>
        <div className="flex flex-col w-full xl:flex-row gap-5 xl:gap-20 mt-20 justify-between items-center">
          <img
            src="cycling.jpg"
            alt=""
            className="h-[300px] w-[400px] rounded-lg border-gray-300 border"
          />
          <div className="flex px-4 xl:px-32 w-full relative flex-col self-start gap-5 ">
            <p className="font-bold">Best Service provider company.</p>
            <p className="">
              We are the best reservation system provider in the country. we
              provide a Professional world class hotels with online payment
              system. our system is easy to use and attractive.
            </p>
            <div className="flex self-end justify-between items-center gap-10 w-full">
              <div className="flex flex-col items-center justify-center gap-2">
                <LocalHotel
                  sx={{ width: 56, height: 56 }}
                  className="text-[#00aeff]"
                />
                <p className="text-[20px] font-bold">Over 44 hotels</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <People
                  sx={{ width: 56, height: 56 }}
                  className="text-[#00aeff]"
                />
                <p className="text-[20px] font-bold">Professional Operators</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Watch
                  sx={{ width: 56, height: 56 }}
                  className="text-[#00aeff]"
                />
                <p className="text-[20px] font-bold">24/7 services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {type === "about" && <Footer />}
    </>
  );
}

export default About;
