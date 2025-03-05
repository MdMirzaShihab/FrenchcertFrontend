import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { companiesData, servicesData, trainingData, accreditationData } from "../../constants/staticData";

const CompanyDetails = () => {
  const { companyID } = useParams();
  const company = companiesData.find(
    (company) => company.companyID === parseInt(companyID)
  );

  if (!company) {
    return <div className="text-center text-red-500">Company not found.</div>;
  }

  // Helper functions
  const getCertificateStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    if (expiry < today) return "expired";
    if (expiry <= threeMonthsFromNow) return "expiring";
    return "valid";
  };

  // Get suggestions
  const certificateSuggestions = servicesData.filter(service => 
    !company.certifications.some(cert => cert.certificationName === service.serviceName)
  );

  const trainingSuggestions = trainingData.filter(training =>
    !company.trainings.some(t => t.trainingID === training.trainingID)
  );

  const accreditationSuggestions = accreditationData.filter(acc =>
    !company.accreditations.some(a => a.accreditationID === acc.accreditationID)
  );

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Cover Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            {company.companyName}
          </h1>
          <div className="text-gray-700 space-y-2">
            <p><strong>Email:</strong> {company.companyEmail}</p>
            <p><strong>Phone:</strong> {company.companyPhone}</p>
            <p><strong>Address:</strong> {company.companyAddress}</p>
          </div>
        </div>

        {/* Mini Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-blue-800">Certificates</h3>
            <p className="text-3xl font-semibold">{company.certifications.length}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-green-800">Trainings</h3>
            <p className="text-3xl font-semibold">{company.trainings.length}</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg text-center">
            <h3 className="text-xl font-bold text-purple-800">Accreditations</h3>
            <p className="text-3xl font-semibold">{company.accreditations.length}</p>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.certifications.map((cert) => {
              const status = getCertificateStatus(cert.expiryDate);
              const cardColor = status === "expired" ? "bg-red-50" : status === "expiring" ? "bg-yellow-50" : "bg-green-50";
              const textColor = status === "expired" ? "text-red-800" : status === "expiring" ? "text-yellow-800" : "text-green-800";
              const buttonClasses = status === "expired" 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-blue-500 hover:bg-blue-600";

              return (
                <div key={cert.certificationID} className={`${cardColor} p-4 rounded-lg shadow-md`}>
                  <h3 className={`text-xl font-bold ${textColor}`}>{cert.certificationName}</h3>
                  <p className="text-gray-700"><strong>ID:</strong> {cert.certificationID}</p>
                  <p className="text-gray-700"><strong>Issue Date:</strong> {cert.issueDate}</p>
                  <p className="text-gray-700"><strong>Expiry Date:</strong> {cert.expiryDate}</p>
                  <p className="text-gray-700"><strong>Status:</strong> {status.toUpperCase()}</p>
                  {(status === "expired" || status === "expiring") && (
                    <button className={`mt-2 px-4 py-2 text-white rounded-lg transition-colors duration-300 ${buttonClasses}`}>
                      {status === "expired" ? "Reissue" : "Renew"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Certificate Suggestions */}
          {certificateSuggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-700 mb-4">Suggested Certifications</h3>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {certificateSuggestions.map((service) => (
                  <SwiperSlide key={service.serviceID}>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800">{service.serviceName}</h3>
                      <p className="text-gray-600 text-sm mt-2">{service.serviceDescription.slice(0, 100)}...</p>
                      <button className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Trainings Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Trainings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.trainings.map((training) => (
              <div key={training.trainingID} className="bg-green-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800">{training.trainingName}</h3>
                <p className="text-gray-700"><strong>Completed:</strong> {training.completionDate}</p>
              </div>
            ))}
          </div>

          {/* Training Suggestions */}
          {trainingSuggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-green-700 mb-4">Suggested Trainings</h3>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {trainingSuggestions.map((training) => (
                  <SwiperSlide key={training.trainingID}>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800">{training.trainingName}</h3>
                      <p className="text-gray-600 text-sm mt-2">{training.trainingDescription.slice(0, 100)}...</p>
                      <button className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* Accreditations Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-4">Accreditations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.accreditations.map((acc) => (
              <div key={acc.accreditationID} className="bg-purple-50 p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-purple-800">{acc.accreditationName}</h3>
                <p className="text-gray-700"><strong>Issued:</strong> {acc.issueDate}</p>
                <p className="text-gray-700"><strong>Expires:</strong> {acc.expiryDate}</p>
              </div>
            ))}
          </div>

          {/* Accreditation Suggestions */}
          {accreditationSuggestions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-purple-700 mb-4">Suggested Accreditations</h3>
              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {accreditationSuggestions.map((acc) => (
                  <SwiperSlide key={acc.accreditationID}>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold text-gray-800">{acc.accreditationName}</h3>
                      <p className="text-gray-600 text-sm mt-2">{acc.accreditationDescription.slice(0, 100)}...</p>
                      <button className="mt-3 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-300">
                        Learn More
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;