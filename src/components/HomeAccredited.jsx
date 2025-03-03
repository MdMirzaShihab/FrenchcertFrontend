import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import AccreditationCard from "./DisplayCard";
import AccreditationsReadMore from "./ReadMoreDisplayCard";
import { accreditationData } from "../constants/staticData";
import cert from "../assets/Cert.png"; // Import the 3D image

const HomeAccredited = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAccreditation, setSelectedAccreditation] = useState(null);

  const filteredAccreditations = accreditationData.filter((accreditation) =>
    accreditation.accreditationName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleReadMore = (accreditation) => {
    setSelectedAccreditation(accreditation);
  };

  const handleClosePopup = () => {
    setSelectedAccreditation(null);
  };

  return (
    <div className="bg-red-50 py-16">
      <div className="m-auto flex flex-col items-center px-6 md:px-12 lg:px-7">
        <div className="flex items-center gap-8">
          <div>
            <h2 className="text-red-800 text-4xl md:text-5xl font-bold text-center mb-8">
              Our Accreditations
            </h2>
            <div className="w-full max-w-md mb-8">
              <input
                type="text"
                placeholder="Search accreditations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <div className="relative h-64 hidden md:block">
            <img
              src={cert}
              alt="3D Certificate"
              className="w-full h-full object-contain animate-upDown"
            />
          </div>
        </div>
        {/* Swiper Slider with Navigation Arrows */}
        <div className="w-full px-10 relative">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            navigation={true}
            modules={[Navigation]}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}>
            {filteredAccreditations.map((accreditation) => (
              <SwiperSlide
                key={accreditation.accreditationID}
                className="py-12 px-6">
                <AccreditationCard
                  displayName={accreditation.accreditationName}
                  displayDescription={accreditation.accreditationDescription}
                  onReadMore={() => handleReadMore(accreditation)}
                  color="red"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selectedAccreditation && (
        <AccreditationsReadMore
          displayName={selectedAccreditation.accreditationName}
          displayDescription={selectedAccreditation.accreditationDescription}
          onClose={handleClosePopup}
          color="red"
        />
      )}
    </div>
  );
};

export default HomeAccredited;
