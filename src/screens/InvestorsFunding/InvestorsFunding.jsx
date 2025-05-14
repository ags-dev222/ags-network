import React from 'react';

const investorsData = [
  { name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  { name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  { name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Kumasi', support: 'Series A', deal: '$500K - 1M',total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Tema', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Takoradi', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Cape Coast', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Accra', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' },
  {  name: "KIC", location: 'Tema', support: 'Series A', deal: '$500K - 1M', total:'$100M', nss: '1,000-2,000', top: 'My Figtech, Crop Capital...' }
];

const InvestorsFunding = () => {
  return (
    <div className="min-h-screen bg-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6">
        <h3 className="text-lg font-bold text-green-700 mb-2 -mt-8 text-left">Investors & Funding</h3>

  {/* Action Buttons */}
<div className="flex flex-wrap items-center justify-between px-2 py-4 bg-gray-100 mb-3 rounded-lg gap-2">
  {/* Showing results text */}
  <div className="text-sm text-gray-300 ml-4 whitespace-nowrap">
    Showing 580 results
  </div>
  
  <div className="flex items-center gap-48">
    {/* Search bar */}
    <div className="relative ">
      <input
        type="text"
        placeholder="Search for Investors"
        className="pl-8 pr-4 py-1 border rounded-full text-sm w-40 md:w-64"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 absolute left-3 top-2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    
    {/* Buttons */}
    <div className="flex space-x-2 mr-4 text-xs">
      <button className="bg-green-700 text-white px-4 py-1 rounded-full flex items-center gap-1 whitespace-nowrap">
        Sort
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <line x1="6" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button className="flex items-center border border-green-700 text-green-700 px-4 py-1 rounded-full whitespace-nowrap">
        Download 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
        </svg>
      </button>
    </div>
  </div>
</div>

        {/* Table */}
        <div className="overflow-auto rounded-lg">
          <table className="min-w-full text-xs">
            <thead className="text-gray-700 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-sm">Investor</th>
                <th className="px-4 py-3 font-medium text-sm">Location</th>
                <th className="px-4 py-3 font-medium text-sm">Support Round</th>
                <th className="px-4 py-3 font-medium text-sm">Deal Size</th>
                <th className="px-4 py-3 font-medium text-sm">Total Support</th>
                <th className="px-4 py-3 font-medium text-sm">No. Supp. Startups</th>
                <th className="px-4 py-3 font-medium text-sm">Top Supp. Startups</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y-4  divide-white">
              {investorsData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  
                  <td className="px-4 py-2 flex items-center text-xs space-x-2">
                    <div className="h-6 w-6 flex items-center justify-center text-xs font-bold text-green-900">
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe3dlW4tkKnuMngkGeTuJ9DYfsPqIxBYmCg&s" alt="Investor" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-2">{item.location}</td>
                  <td className="px-4 py-2 text-green-700 font-medium">{item.support}</td>
                  <td className="px-4 py-2">{item.deal}</td>
                  <td className="px-4 py-2">{item.total}</td>
                  <td className="px-4 py-2">{item.nss}</td>
                  <td className="px-4 py-2">{item.top}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvestorsFunding;