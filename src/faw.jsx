<div className="bg-white rounded-lg shadow-md overflow-hidden">
        <style dangerouslySetInnerHTML={{ __html: richTextStyles }} />
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">
            The Way visitors will see...
          </h2>
        </div>

        <div className="px-6 py-4">
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-3">
                    <FaTag className="mr-1" />
                    {certification.certificationType}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {certification.name}
                  </h1>
                </div>

                <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                  <FaClock className="mr-2" />
                  <span>{certification.durationInMonths} month program</span>
                </div>
              </div>
              <div
                className="certification-content"
                dangerouslySetInnerHTML={{ __html: certification.description }}
              />
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md overflow-hidden mb-12">
            <div className="p-8 md:p-10 text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {certification.callToAction}
              </h2>
              <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                Ready to get certified in {certification.certificationType}? Our
                experts will guide you through the entire process.
              </p>
              <button className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>