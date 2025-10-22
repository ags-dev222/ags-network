import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { logger } from '../../lib/logger';

// Validation schema
const investorSearchSchema = z.object({
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long'),
  amount: z.string()
    .min(1, 'Amount is required')
    .regex(/^\$?[\d,]+(\s*-\s*\$?[\d,]+)?$/, 'Please enter a valid amount (e.g., $10,000 or $10,000 - $50,000)'),
  fundingRound: z.string()
    .min(1, 'Funding round is required'),
  investorType: z.string()
    .min(1, 'Investor type is required'),
});

const FindInvestor = () => {
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(investorSearchSchema),
  });

  const onSubmit = async (data) => {
    try {
      logger.formSubmit('FindInvestor', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/investor-result', { state: data });
    } catch (error) {
      logger.error('Form submission error', error);
    }
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

          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
            <div>
              <input
                type="text"
                {...register('companyName')}
                placeholder="Enter your company name"
                className={`w-full bg-gray-100 px-4 py-2 rounded border ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.companyName ? 'true' : 'false'}
              />
              {errors.companyName && (
                <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                {...register('amount')}
                placeholder="Amount looking (E.g $10,000 or $10,000 - $50,000)"
                className={`w-full bg-gray-100 px-4 py-2 rounded border ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.amount ? 'true' : 'false'}
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>

            <div>
              <select
                {...register('fundingRound')}
                className={`w-full bg-gray-100 px-4 py-2 rounded border ${
                  errors.fundingRound ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.fundingRound ? 'true' : 'false'}
              >
                <option value="">Select funding round</option>
                <option value="Pre-Seed">Pre-Seed</option>
                <option value="Seed">Seed</option>
                <option value="Series A">Series A</option>
                <option value="Series B">Series B</option>
                <option value="Series C">Series C</option>
                <option value="Series D+">Series D+</option>
              </select>
              {errors.fundingRound && (
                <p className="text-red-500 text-xs mt-1">{errors.fundingRound.message}</p>
              )}
            </div>

            <div>
              <select
                {...register('investorType')}
                className={`w-full bg-gray-100 px-4 py-2 rounded border ${
                  errors.investorType ? 'border-red-500' : 'border-gray-300'
                }`}
                aria-invalid={errors.investorType ? 'true' : 'false'}
              >
                <option value="">Select investor type</option>
                <option value="Angel">Angel Investor</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Corporate">Corporate Investor</option>
                <option value="Private Equity">Private Equity</option>
                <option value="Government">Government Grant</option>
              </select>
              {errors.investorType && (
                <p className="text-red-500 text-xs mt-1">{errors.investorType.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Searching...' : 'Find your investor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FindInvestor;
