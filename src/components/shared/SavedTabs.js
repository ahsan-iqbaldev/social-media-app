import React, { useState } from 'react';

const SavedTabs = () => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <div className="bg-gray-100 font-sans flex h-screen items-center justify-center">
        <div x-data="{ openTab: 1 }" className="p-8">
          <div className="max-w-md mx-auto">
            <div className="mb-4 flex space-x-4 p-2 bg-white rounded-lg shadow-md">
              <button
                onClick={() => setOpenTab(1)}
                className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                  openTab === 1 ? 'bg-blue-600 text-white' : ''
                }`}
              >
                Section 1
              </button>
              <button
                onClick={() => setOpenTab(2)}
                className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                  openTab === 2 ? 'bg-blue-600 text-white' : ''
                }`}
              >
                Section 2
              </button>
              <button
                onClick={() => setOpenTab(3)}
                className={`flex-1 py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue transition-all duration-300 ${
                  openTab === 3 ? 'bg-blue-600 text-white' : ''
                }`}
              >
                Section 3
              </button>
            </div>

            <div
              x-show="openTab === 1"
              className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">Section 1 Content</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam justo nec justo
                lacinia, vel ullamcorper nibh tincidunt.
              </p>
            </div>

            <div
              x-show="openTab === 2"
              className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">Section 2 Content</h2>
              <p className="text-gray-700">
                Proin non velit ac purus malesuada venenatis sit amet eget lacus. Morbi quis purus id
                ipsum ultrices aliquet Morbi quis.
              </p>
            </div>

            <div
              x-show="openTab === 3"
              className="transition-all duration-300 bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600"
            >
              <h2 className="text-2xl font-semibold mb-2 text-blue-600">Section 3 Content</h2>
              <p className="text-gray-700">
                Fusce hendrerit urna vel tortor luctus, nec tristique odio tincidunt. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia Curae.
              </p>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/alpinejs@2.8.2/dist/alpine.min.js" defer></script>
    </>
  );
};

export default SavedTabs;
