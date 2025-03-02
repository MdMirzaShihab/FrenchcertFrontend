const ServiceCard = ({ serviceName, serviceDescription }) => {
    return (
      <div className="bg-gradient-to-b from-white to-blue-200 shadow-2xl rounded-2xl sm:w-[299px] w-full transition-transform duration-700 transform hover:-translate-y-3">
        <div className="relative w-full">
        </div>
        <div className="py-7 flex flex-col text-center">
          <p className="text-blue-500 px-2 pb-4 font-bold font-ubuntu text-[24px]">
            {serviceName}
          </p>
          <p className="text-[#808080] px-2 font-medium font-ubuntu text-[16px]">
            {serviceDescription}
          </p>
        </div>
      </div>
    );
  };


  export default ServiceCard