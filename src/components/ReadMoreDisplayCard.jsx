import React from "react";

const ReadMoreDisplayCard = ({ displayName, displayDescription, onClose, color }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white border-4 border-${color}-200 rounded-2xl shadow-2xl p-8 max-w-lg w-full relative`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Popup Content */}
        <h3 className={`text-${color}-500 text-2xl font-bold font-ubuntu mb-4`}>
          {displayName}
        </h3>
        <p className="text-[#808080] font-medium font-ubuntu text-[16px]">
          {displayDescription}
        </p>
      </div>
    </div>
  );
};

export default ReadMoreDisplayCard;