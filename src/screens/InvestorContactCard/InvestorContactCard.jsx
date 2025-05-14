import React, { useState } from 'react';
import { BanknotesIcon } from '@heroicons/react/24/solid';

const InvestorContactCard = () => {
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with an actual form submission
    console.log("Message sent:", { companyName, message });
    setCompanyName('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8  text-gray-800">
      <h2 className="text-lg font-bold text-green-700 -mt-2 mb-16">Investors & Funding</h2>

      <div className="max-w-sm  mx-auto bg-white rounded-xl  space-y-6">
        {/* Investor Info Card */}
        <div className="flex items-center p-4 border rounded-lg">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe3dlW4tkKnuMngkGeTuJ9DYfsPqIxBYmCg&s" alt="Investor logo" className="h-16 w-16 border border-green-700 mr-8 rounded-full object-cover" />
          <div>
            <h3 className="text-lg font-bold">Kosmos Innovation Centre</h3>
            <p className="text-gray-500 text-sm">kic@gmail.com</p>
            <span className="inline-flex items-center gap-1 mt-2 bg-gray-200 text-green-700 text-xs px-2 py-1 rounded-md">
                <BanknotesIcon className="h-4 w-4" />
                    Investor
</span>

          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg space-y-4">
          <h4 className="font-bold text-lg text-gray-800">Send A Message</h4>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full px-4 py-2 border text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            placeholder="Type Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="w-full px-4 py-2 border text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 text-xs rounded-full hover:bg-green-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestorContactCard;
