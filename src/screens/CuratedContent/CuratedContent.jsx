import React from 'react';

const CuratedContent = () => {
  const startups = Array(6).fill({
    name: 'MY FIGTECH',
    sector: 'Fin-Tech',
    stage: 'Seed',
    logo: 'https://via.placeholder.com/24' // Replace with actual logo URL
  });

  const topSearches = [
    {
      category: "EDTECH",
      title: "Ed-Tech funding | Ghana",
      queries: [
        "Ed-Tech funding | Ghana",
        "Investors experienced in EDTECH | Ghana",
        "Ed-Tech startups | Ghana"
      ],
      img: "/edtech.jpg"
    },
    {
      category: "AGRITECH",
      title: "Agritech funding | Ghana",
      queries: [
        "Agritech platform startups | Ghana",
        "Top Ghanaian Agritech Companies",
        "Agritech Startups"
      ],
      img: "/agritech.jpg"
    },
    {
      category: "FINTECH",
      title: "Top Ghanaian Fintechs",
      queries: [
        "Top Ghanaian Fintechs",
        "Fintech funding | Ghana",
        "Fintech Ghana"
      ],
      img: "/fintech.jpg"
    },
    {
      category: "EDTECH",
      title: "Ed-Tech funding | Ghana",
      queries: [
        "Ed-Tech funding | Ghana",
        "Investors experienced in EDTECH | Ghana",
        "Ed-Tech startups | Ghana"
      ],
      img: "/edtech.jpg"
    },
    {
      category: "AGRITECH",
      title: "Agritech funding | Ghana",
      queries: [
        "Agritech platform startups | Ghana",
        "Top Ghanaian Agritech Companies",
        "Agritech Startups"
      ],
      img: "/agritech.jpg"
    },
    {
      category: "FINTECH",
      title: "Top Ghanaian Fintechs",
      queries: [
        "Top Ghanaian Fintechs",
        "Fintech funding | Ghana",
        "Fintech Ghana"
      ],
      img: "/fintech.jpg"
    }
  ];

  return (
    <div className="space-y-12 p-4 md:p-8 font-sans">

   

      {/* Hero Section */}
      <section className="relative z-20 bg-black text-black rounded-xql overflow-hidden h-96"
       style={{
        background:
          "linear-gradient(140deg, rgba(0,0,0,0) 0%, rgba(41,45,50,1) 75%), url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPXhhsOG41684ujgToDMfGiRRVHLnp8Nkm0w&s) 50% 30% / cover",
      }}
    >
  

  <div className="relative z-10 flex justify-end items-end h-full p-8">
    <div className="w-80 h-48 bg-white rounded-lg p-8">
      <h2 className="text-lg font-bold -mt-4 text-black">CURATED CONTENT</h2>
      <p className="mt-2 text-sm max-w-md">
        Stay informed with hand-picked insights, articles, and resources tailored for Ghana’s startup ecosystem.
      </p>
      <button className="mt-8 bg-green-700 hover:bg-green-800 text-white text-xs px-3 py-1 rounded-lg">
        Sign up Now!
      </button>
    </div>
  </div>
</section>


      {/* Startups and Support Insights */}
      

<div className="grid md:grid-cols-2 gap-6">
  <div className="bg-yellow-100 w-full h-64 p-6 rounded-lg ">
    <h3 className="font-bold mb-2 -mt-4 text-m">Top Thriving Supported Startups</h3>
    <ul>
      {/* Heading Row */}
      <li className="flex justify-between py-1 text-sm font-bold  mb-1">
        <span>Company</span>
        <span>Sector</span>
        <span>Stage</span>
      </li>

      {/* Data Rows */}
      {startups.map((s, i) => (
        <li key={i} className="flex justify-between py-1 text-sm">
          <span className="flex items-center gap-2">
        <img src="data:image/png;base64,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" alt="Image" className="h-5 w-5 object-cover " />
        {s.name}
      </span>
          <span className="-ml-8  mr-8 font-semibold">{s.sector}</span>
          <span className="-ml-6 font-semibold">{s.stage}</span>
        </li>
      ))}
    </ul>
  </div>


        <div className=" p-6 rounded-lg">
          <h3 className="font-bold -mt-6 text-lg"></h3>
          <img src="/support.jpg" alt="Support Chart" className="w-full h-64" />
        </div>
      </div>

      {/* Top Searches */}
      <div>
        <h3 className="text-lg font-bold mb-4">Top Searches</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {topSearches.map((item, idx) => (
            <div key={idx} className="bg-white shadow rounded-lg overflow-hidden">
              <img src={item.img} alt={item.category} className="w-full h-48 object-cover" />
              <div className="p-4">
                <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">{item.category}</span>
                <ul className="mt-3 text-sm space-y-1">
                  {item.queries.map((q, i) => (
                    <li key={i}>• {q}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      <footer className=" text-gray-800 pt-8">
      {/* Newsletter Section */}
      <div className="mx-auto max-w-2xl bg-green-800 rounded-lg text-white py-6 px-6 text-center">
      <h4 className="text-lg font-bold mb-3">
       Subscribe to our Newsletter to get <br /> Updates to our Latest Collection
      </h4>

        <div className="flex justify-center">
  
  <div className="flex rounded-full overflow-hidden border h-10 border-gray-300">
  <div className="pl-3 mt-2.5 -mr-2 text-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  </div>
    <input
      type="email"
      placeholder="Enter your email"
      className="p-3 w-64 focus:outline-none text-sm text-white bg-transparent"
    />
    <button className="px-4 bg-white mt-1 mb-1 mr-1 rounded-full text-sm text-green-600 font-normal hover:bg-gray-200">
      Subscribe
    </button>
  </div>
</div>

      </div>

      {/* Footer Links */}
      <div className="mx-auto max-w-5xl py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-32 text-sm">
          {/* Logo & Description */}
          <div>
            <img
              src="/logo.png"
              alt="AGS"
              className="h-12 mb-4" // Replace with your logo
            />
            <p>
              Lorem ipsum is simply dummy text of the print typeset industry.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-3">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-bold mb-3">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Ghana Startup Week
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Activities
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold mb-3">Contact Us</h4>
            <ul className="space-y-2">
              <li>+233 24 315 8077</li>
              <li>agsghana@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border  mr-16 ml-16"></div>
      {/* Footer Bottom */}
      <div className=" py-4 text-center text-xs">
        <p>
          Copyright © 2025 | Powered by Association Of Ghana Startups | Developed
          by Frontend Dev Team - AGS
        </p>
      </div>
    </footer>
    </div>
  );
};

export default CuratedContent;
