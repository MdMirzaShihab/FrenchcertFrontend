import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css"; 
import "swiper/css/navigation"; 
import ServiceCard from "./DisplayCard";
import ServicesReadMore from "./ReadMoreDisplayCard";
import { servicesData } from "../constants/staticData";

const HomeServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = servicesData.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadMore = (service) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
  };

  return (
    <div className="bg-blue-100 py-16">
      <div className="m-auto flex flex-col items-center px-6 md:px-12 lg:px-7">
        <h2 className="text-blue-800 text-4xl md:text-5xl font-bold text-center mb-8">
        Certification of Management Systems
        </h2>

        <div className="w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            {filteredServices.map((service) => (
              <SwiperSlide
                key={service.serviceID}
                className="py-12 px-6">
                <ServiceCard
                  displayName={service.serviceName}
                  displayDescription={service.serviceDescription}
                  onReadMore={() => handleReadMore(service)}
                  color="blue"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {selectedService && (
        <ServicesReadMore
          displayName={selectedService.serviceName}
          displayDescription={selectedService.serviceDescription}
          onClose={handleClosePopup}
          color="blue"
        />
      )}
    </div>
  );
};

export default HomeServices;
