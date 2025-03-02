import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import { servicesData } from "../constants/servicesData";

const HomePage = () => {
  return (
    <div>
      <Hero />
      {/* Our Services Section */}
      <div className="bg-blue-100 py-16">
        <div className="container m-auto px-6 md:px-12 lg:px-7">
          {/* Section Title */}
          <h2 className="text-blue-800 text-4xl md:text-5xl font-bold text-center mb-8">
            Our Services
          </h2>
          {/* Services Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.serviceID}
                serviceName={service.serviceName}
                serviceDescription={service.serviceDescription}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;