import React from "react";

const DisplayCard = ({ displayName, displayDescription, onReadMore, color }) => {
  // Limit the description to 100 characters
  const truncatedDescription =
    displayDescription.length > 100
      ? `${displayDescription.slice(0, 100)}...`
      : displayDescription;

  return (
    <div
      className={`bg-gradient-to-b from-white to-${color}-200 shadow-xl shadow-${color}-300 rounded-2xl p-4 border-4 border-${color}-200 sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3`}
    >
      <div className="relative w-full">
        <button onClick={onReadMore}>
          <div className="py-7 flex flex-col text-center">
            <p className={`text-${color}-500 px-2 pb-4 font-bold font-ubuntu text-[24px]`}>
              {displayName}
            </p>
            <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
              {truncatedDescription}
            </p>
            {/* Show "Read More" button if description is truncated */}
            {displayDescription.length > 100 && (
              <p className={`mt-4 text-${color}-400 hover:text-${color}-600 font-semibold hover:underline`}>
                Read More...
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default DisplayCard;