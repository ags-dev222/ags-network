import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ import this

const FindInvestor = () => {
  const navigate = useNavigate(); // ✅ create navigate function

  const [form, setForm] = useState({
    companyName: '',
    amount: '',
    fundingRound: '',
    investorType: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', form);
    // ✅ Navigate to results page
    navigate('/investor-result', { state: form });
  };

  return (
    <div className="min-h-screen bg-white to-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-6">
        <h3 className="text-lg font-bold text-green-700 mb-16 -mt-8 text-left">Investors & Funding</h3>
        <div className="flex flex-col mt-auto items-center justify-center bg-white">
          <h1 className="text-3xl font-semibold text-center mb-2">Find Your Investor</h1>
          <p className="text-m text-gray-600 mb-6 text-center">
            Enter the details to access find a suitable Investor
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
            <input
              type="text"
              name="companyName"
              placeholder="Enter your company name"
              value={form.companyName}
              onChange={handleChange}
              className="w-full bg-gray-100 border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="amount"
              placeholder="Amount looking (E.g $10,000)"
              value={form.amount}
              onChange={handleChange}
              className="w-full bg-gray-100 border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="fundingRound"
              placeholder="Funding round (E.g Series A)"
              value={form.fundingRound}
              onChange={handleChange}
              className="w-full bg-gray-100 border-gray-300 px-4 py-2 rounded"
            />
            <input
              type="text"
              name="investorType"
              placeholder="Investor type (E.g Corporate)"
              value={form.investorType}
              onChange={handleChange}
              className="w-full bg-gray-100 border-gray-300 px-4 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Find your investor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindInvestor;
