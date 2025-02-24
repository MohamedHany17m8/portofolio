import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa"; // Import arrow icons from react-icons
import customerImage from "../assets/images/customer1.jpeg"; // Import image from assets folder

const CardComponent = ({
  imageSrc = customerImage, // Default image
  heading = "Noteworthy technology acquisitions 2021", // Default heading
  paragraph = "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.", // Default paragraph
  popupContent = "Detailed information about the image and heading. This could include more context, background, or any other relevant details.", // Default popup content
}) => {
  const [showMore, setShowMore] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      setShowPopup(false);
    }
  };

  return (
    <>
      {/* Main Card */}
      <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm mb-4 transform transition-transform duration-300 scale-95 hover:scale-100">
        <a href="#" onClick={togglePopup}>
          <img
            className="rounded-t-lg cursor-pointer"
            src={imageSrc}
            alt="Customer"
          />
        </a>
        <div className="p-5">
          <a href="#" onClick={togglePopup}>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
              {heading}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700">{paragraph}</p>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showMore ? "max-h-96" : "max-h-0"
            }`}
          >
            <p className="mb-3 font-normal text-gray-700">{popupContent}</p>
          </div>
          <button
            onClick={toggleShowMore}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-all duration-300"
          >
            <span>{showMore ? "See Less" : "See More"}</span>
            {showMore ? (
              <FaArrowDown
                className={`transition-transform duration-500 ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            ) : (
              <FaArrowDown
                className={`transition-transform duration-500 ${
                  showMore ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className="popup-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ease-in-out z-50"
          onClick={closePopup}
        >
          <div className="bg-white scale-[.7] rounded-lg shadow-lg border border-gray-400 max-w-lg lg:max-w-xl lg:scale-[.7] mx-4 transition-transform duration-300 ease-in-out transform mt-24">
            <img
              className="rounded-t-lg w-full"
              src={imageSrc}
              alt="Customer"
            />
            <h2 className="text-2xl p-2 font-bold mt-4">{heading}</h2>
            <p className="mt-2 text-lg p-2">{popupContent}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CardComponent;
