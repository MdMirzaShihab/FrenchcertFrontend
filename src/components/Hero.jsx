import coverImg from "../assets/Cover.png";

const Hero = () => {
  return (
    <div className=" w-full bg-[#d8dce3] h-full">
      <div className="relative bg-yellow-50">
        <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-8/12 lg:py-24 xl:py-32">
              <div className="flex flex-col justify-center items-center lg:items-start py-6">
                <h1 className="text-blue-800 text-4xl md:text-6xl font-bold leading-tight text-center md:text-left">
                  Welcome To French Cert
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-500 font-semibold">
                  One stop professional certification solution.
                </p>
              </div>
            </div>
            <div className="ml-auto -mb-24 lg:-mb-56 lg:w-4/12 hidden lg:block">
              <img
                src={coverImg}
                alt="Cover tech image"
                className="animate-upDown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
