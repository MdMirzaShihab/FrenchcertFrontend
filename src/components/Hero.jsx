const Hero = () => {
    return (
      <section className="relative w-full flex items-center justify-center bg-gray-900 text-white text-center p-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Verify Certificates Instantly
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300">
            Securely check and validate issued certificates with ease.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/validate"
              className="px-6 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition rounded-lg"
            >
              Verify Now
            </a>
            <a
              href="/login"
              className="px-6 py-3 text-lg font-semibold bg-gray-700 hover:bg-gray-800 transition rounded-lg"
            >
              Company Login
            </a>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  