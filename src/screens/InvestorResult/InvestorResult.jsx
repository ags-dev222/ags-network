import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const mockInvestors = [
  {
    name: 'KIC',
    location: 'Accra',
    round: 'Series A',
    dealSize: '$500K - 1M',
    support: '$100M',
    email: 'kic@gmail.com'
  },
  // Duplicate for demo
  {
    name: 'KIC',
    location: 'Accra',
    round: 'Series A',
    dealSize: '$500K - 1M',
    support: '$100M',
    email: 'kic@gmail.com'
  }
];

const InvestorResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  return (
    <div className="p-8">
      <h2 className="text-green-700 font-semibold text-xl mb-6">Investors & Funding</h2>
      <div className="bg-gray-100 p-4 rounded-md mb-4 text-xs flex items-center justify-between">
        <span>Showing {mockInvestors.length} Investors Found</span>
        
    <button onClick={() => navigate('/find-investors')} className="flex items-center ml-60 -mr-64 bg-green-700 text-white px-4 py-1 text-xs rounded-full hover:bg-green-800 transition">
    Search Again
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
    />
  </svg>
  
</button>

<button className="flex items-center border text-xs border-green-700 text-green-700 px-4 py-1 rounded-full whitespace-nowrap">
  Investors
  <BanknotesIcon className="h-4 w-4 ml-1" />
</button>

    
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="text-gray-600 ">
          <tr>
            <th className="py-2 font-normal">Investor</th>
            <th className="font-normal">Location</th> 
            <th className="font-normal">Support Round</th>
            <th className="font-normal">Deal Size</th>
            <th className="font-normal">Total Support</th>
            <th className="font-normal">Contact</th>
          </tr>
        </thead>
        <tbody>
          {mockInvestors.map((inv, index) => (
            <tr key={index} className="bg-gray-100  text-xs border-b-2 border-white">
              <td className="py-2 w-6 h-6 flex items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe3dlW4tkKnuMngkGeTuJ9DYfsPqIxBYmCg&s" alt="Investor" className="h-5 w-5 rounded-full object-cover" />
                {inv.name}
              </td>
              <td>{inv.location}</td>
              <td>{inv.round}</td>
              <td>{inv.dealSize}</td>
              <td>{inv.support}</td>
              <td>{inv.email}</td>
              <td>
                  <Link to="/investor-contact-card" className="text-green-700">
                    Click to Send a Message
                  </Link>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvestorResults;
