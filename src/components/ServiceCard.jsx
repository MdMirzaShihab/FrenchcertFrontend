import React from "react";

const ServiceCard = ({ serviceName, serviceDescription, onReadMore }) => {
  // Limit the description to 100 characters
  const truncatedDescription =
    serviceDescription.length > 100
      ? `${serviceDescription.slice(0, 100)}...`
      : serviceDescription;

  return (
    <div className="bg-gradient-to-b from-white to-blue-200 shadow-2xl shadow-blue-300 rounded-2xl p-4 border-4 border-blue-200 sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
      <div className="relative w-full">
        <button
          onClick={onReadMore} // Use the passed handler
        >
          <div className="py-7 flex flex-col text-center">
            <p className="text-blue-500 px-2 pb-4 font-bold font-ubuntu text-[24px]">
              {serviceName}
            </p>
            <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
              {truncatedDescription}
            </p>
            {/* Show "Read More" button if description is truncated */}
            {serviceDescription.length > 100 && (
              <p className="mt-4 text-blue-500 font-semibold hover:underline">
                Read More
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
