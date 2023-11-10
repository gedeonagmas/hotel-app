import React from "react";

const Footer = () => {
  return (
    <section
      className="flex mt-20 flex-col pb-10 items-center justify-center px-20 w-full h-auto"
      id="footer"
    >
      <div className="flex flex-col md:flex-row gap-5 items-start justify-between w-full h-auto">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold titled relative">Our branches</h3>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> Mirpur{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> Farmgate{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> Badda{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> Aftabnagar{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> Uttara{" "}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold titled relative">Quick Links</h3>
          <a href="#">
            <i className="fas fa-arrow-right"></i> home{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> vehicles{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> services{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> featured{" "}
          </a>
          <a href="#">
            <i className="fas fa-arrow-right"></i> reviews{" "}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold titled relative">Contact Info</h3>
          <a href="#">
            <i className="fas fa-phone"></i> +251 0954104637{" "}
          </a>
          <a href="#">
            <i className="fas fa-phone"></i> +251 0922544008{" "}
          </a>
          <a href="#">
            <i className="fas fa-envelope"></i> hotelreserve@gmail.com{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> gedeonagmas2580@gmail.com{" "}
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"></i> paulosermias1@gmail.com{" "}
          </a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold titled relative">Socials</h3>
          <a href="#">
            <i className="fab fa-facebook-f"></i> facebook{" "}
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i> twitter{" "}
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i> instagram{" "}
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i> linkedin{" "}
          </a>
          <a href="#">
            <i className="fab fa-pinterest"></i> pinterest{" "}
          </a>
        </div>
      </div>

      <div className="mt-10">
        {" "}
        Made with ❤️ | All rights reserved{" "}
        {new Date().toISOString().split("-")[0]}
      </div>
    </section>
  );
};

export default Footer;
