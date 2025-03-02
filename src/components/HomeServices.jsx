import React, { useState } from "react";
import ServiceCard from "../components/ServiceCard";
import ServicesReadMore from "../components/ServicesReadMore"; // Import the popup component
import { servicesData } from "../constants/servicesData";

const HomeServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedService, setSelectedService] = useState(null); // Track which service's popup is open

  // Filter services based on search query
  const filteredServices = servicesData.filter((service) =>
    service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle opening the popup
  const handleReadMore = (service) => {
    setSelectedService(service);
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedService(null);
  };

  return (
    <div className="bg-blue-100 py-16">
      <div className="container m-auto flex flex-col items-center px-6 md:px-12 lg:px-7">
        {/* Section Title */}
        <h2 className="text-blue-800 text-4xl md:text-5xl font-bold text-center mb-8">
          Our Services
        </h2>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-8">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Horizontally Scrollable Services Container */}
        <div className="w-full overflow-x-auto py-4 pb-16">
          <div className="flex gap-8" style={{ minWidth: `${filteredServices.length * 320}px` }}>
            {filteredServices.map((service) => (
              <div key={service.serviceID} className="flex-shrink-0 w-[300px]">
                <ServiceCard
                  serviceName={service.serviceName}
                  serviceDescription={service.serviceDescription}
                  onReadMore={() => handleReadMore(service)} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the Popup Outside the Scrollable Container */}
      {selectedService && (
        <ServicesReadMore
          serviceName={selectedService.serviceName}
          serviceDescription={selectedService.serviceDescription}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default HomeServices;