import React from 'react';
import { BanknotesIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { logger } from '../../lib/logger';

// Validation schema
const contactSchema = z.object({
  companyName: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long (max 1000 characters)'),
});

const InvestorContactCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      logger.formSubmit('InvestorContact', data);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (you can use a toast library here)
      alert('Message sent successfully!');
      
      reset();
    } catch (error) {
      logger.error('Failed to send message', error);
      alert('Failed to send message. Please try again.');
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 border rounded-lg space-y-4">
          <h4 className="font-bold text-lg text-gray-800">Send A Message</h4>
          
          {isSubmitSuccessful && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded text-xs">
              Message sent successfully!
            </div>
          )}

          <div>
            <input
              type="text"
              {...register('companyName')}
              placeholder="Company Name"
              className={`w-full px-4 py-2 border text-xs rounded-md focus:outline-none focus:ring-2 ${
                errors.companyName
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
              aria-invalid={errors.companyName ? 'true' : 'false'}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register('message')}
              placeholder="Type Your Message (minimum 10 characters)"
              rows="5"
              className={`w-full px-4 py-2 border text-xs rounded-md focus:outline-none focus:ring-2 resize-none ${
                errors.message
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-green-500'
              }`}
              aria-invalid={errors.message ? 'true' : 'false'}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-700 text-white py-2 text-xs rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestorContactCard;
