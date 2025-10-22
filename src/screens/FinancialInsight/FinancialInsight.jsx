import React from 'react';
import { LineChart, PieChart } from '../../components/charts';

const FinancialInsights = () => {

  // Metric Card Component
const MetricCard = ({ title, value, change }) => {
  const isPositive = change && change.startsWith('+');
  const trendZigzag = isPositive ? '↘︎↗︎' : '↗︎↘︎';
  const arrowColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-gray-100 text-green-900 p-4 ml-4 mr-4 rounded-md shadow-md w-full">
      <h4 className="text-sm">{title}</h4>
      <div className="text-2xl font-bold">{value}</div>

      {change && (
        <div className="mt-1">
          <div
            className={`h-2 w-32 rounded-full mb-1 ${
              isPositive ? 'bg-green-300' : 'bg-red-300'
            }`}
          ></div>
          <div className={`flex items-center gap-1 text-xs ${arrowColor}`}>
            <span className="text-sm">{trendZigzag}</span>
            <span>{change}</span>
          </div>
        </div>
      )}
    </div>
  );
};


  // Membership Report Table
const MembershipReport = () => (
  <div className="bg-yellow-400 p-4 -mr-4 rounded-md ml-4  shadow-md h-60 w-78 ">
    <h4 className="font-semibold mb-2">Membership Report</h4>
    <table className="min-w-full -ml-2 space-x-4 text-sm text-left">
      <thead className=" text-medium text-gray-800">
        <tr>
          <td className="p-2">Startup Company</td>
          <td className="p-2">Address/Location</td>
          <td className="p-2">Sector</td>
          <td className="p-2">Stage</td>
          <td className="p-2">Funding</td>
        </tr>
      </thead>
      <tbody className="text-gray-600">
  <tr>
  <td className="p-2">
      <div className="flex items-center gap-2">
        <img
          src="data:image/png;base64,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"
          alt="My Figtech"
          className="w-5 h-5"
        />
        <span>MY FIGTECH</span>
      </div>
    </td>
    <td className="p-2">Accra</td>
    <td className="p-2 text-green-700 font-bold">Fin-Tech</td>
    <td className="p-2">Expansion</td>
    <td className="p-2">Grant</td>
    
  </tr>
  <tr>
  <td className="p-2">
      <div className="flex items-center gap-2">
        <img
          src="data:image/png;base64,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"
          alt="My Figtech"
          className="w-5 h-5"
        />
        <span>MY FIGTECH</span>
      </div>
    </td>
    <td className="p-2">Takoradi</td>
    <td className="p-2 text-green-700 font-bold">Ed-Tech</td>
    <td className="p-2">Seed</td>
    <td className="p-2">Series A</td>
    
  </tr>
  <tr>
  <td className="p-2">
      <div className="flex items-center gap-2">
        <img
          src="data:image/png;base64,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"
          alt="My Figtech"
          className="w-5 h-5 "
        />
        <span>MY FIGTECH</span>
      </div>
    </td>
    <td className="p-2">Tema</td>
    <td className="p-2 text-green-700 font-bold">Prop-Tech</td>
    <td className="p-2">Growth</td>
    <td className="p-2">Series C</td>
    
  </tr>
  <tr>
  <td className="p-2">
      <div className="flex items-center gap-2">
        <img
          src="data:image/png;base64,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"
          alt="My Figtech"
          className="w-5 h-5 "
        />
        <span>MY FIGTECH</span>
      </div>
    </td>
    <td className="p-2">Cape Coast</td>
    <td className="p-2 text-green-700 font-bold">E-Commerce</td>
    <td className="p-2">Startup</td>
    <td className="p-2">Series B</td>
    
  </tr>
</tbody>

    </table>
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-gray-900 text-white p-4 ml-8 mr-4 rounded-md shadow-md h-60 w-78 ">
    <h4 className="font-semibold mb-4">Top Investors</h4>
    <ul className="space-y-4">
      {[
        { name: 'ALX', location: 'Accra' },
        { name: 'NEIP', location: 'Accra' },
        { name: 'IPC', location: 'EastLegon' },
        
      ].map((event, index) => (
        <li key={index} className="flex items-start gap-2">
          <img
            src="/main.jpeg" // Replace with your actual image path
            alt={event.name}
            className="w-5 h-5 rounded-full mt-1"
          />
          <div>
            <span className="font-medium">{event.name}</span>
            {event.location && (
              <div className="text-sm text-gray-200">{`${event.location}`}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);



  return (
    <div className="p-6 bg-white min-h-screen space-y-8">
      <h2 className="text-lg ml-4 font-bold text-green-700">Financial Insights</h2>

      {/* Stat Cards */}
      <div className="flex justify-between gap-4 w-full">
  <MetricCard title="Total Revenue" value="$10,000" change="+2.0%" />
  <MetricCard title="Government Support" value="$2,000" change="-1.0%" />
  <MetricCard title="Partnership Support" value="$5,000" change="+3.0%" />
  <MetricCard title="Untitled Support" value="$1,000" change="+1.0%" />
</div>

      {/* Charts Section */}
  <div className="grid grid-cols-5 gap-4">
  {/* Financial Overview Chart */}
  <div className="col-span-3 bg-white p-6 rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold mb-4 text-gray-700">Revenue Trend</h4>
    <LineChart 
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total Revenue',
            data: [5000, 7500, 8200, 9100, 12000, 11500, 13200, 14800, 16500, 17200, 19000, 21000],
            borderColor: 'rgba(6, 99, 32, 1)',
            backgroundColor: 'rgba(6, 99, 32, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Government Support',
            data: [1500, 2000, 2200, 2500, 3000, 2800, 3200, 3500, 3800, 4000, 4200, 4500],
            borderColor: 'rgba(212, 165, 23, 1)',
            backgroundColor: 'rgba(212, 165, 23, 0.1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Partnership Support',
            data: [2000, 3000, 3500, 4000, 5500, 5200, 6000, 7000, 8000, 8500, 9500, 10500],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true,
          },
        ],
      }}
      height={300}
    />
  </div>

  {/* Pie Chart */}
  <div className="p-6 col-span-2 bg-white rounded-lg shadow-sm">
    <h4 className="text-lg font-semibold mb-4 text-gray-700">Revenue Sources</h4>
    <PieChart 
      data={{
        labels: ['Government', 'Partnerships', 'Grants', 'Investments', 'Others'],
        datasets: [
          {
            data: [4500, 10500, 3000, 2500, 500],
            backgroundColor: [
              'rgba(212, 165, 23, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(6, 99, 32, 0.8)',
              'rgba(239, 68, 68, 0.8)',
              'rgba(156, 163, 175, 0.8)',
            ],
            borderColor: [
              'rgba(212, 165, 23, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(6, 99, 32, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(156, 163, 175, 1)',
            ],
            borderWidth: 1,
          },
        ],
      }}
      height={280}
    />
  </div>
</div>


      {/* Investors Section */}
      {/* Membership Report */}
      <div className="grid grid-cols-5 gap-4">
      <div className="col-span-3">
      <MembershipReport />
      </div>
      <div className="col-span-2">
      <UpcomingEvents />
      </div>
    </div>
  </div>
  );
};

export default FinancialInsights;
