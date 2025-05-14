import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Metric Card Component
const MetricCard = ({ title, value, subtitle, change }) => {
  const isPositive = change && change.startsWith('+');
  const trendZigzag = isPositive ? '↘︎↗︎' : '↗︎↘︎';
  const arrowColor = isPositive ? 'text-green-600' : 'text-red-500';

  return (
    <div className="bg-gray-100 text-green-700 p-4 ml-4 mr-4 rounded-md  w-full">
      <h4 className="text-sm">{title}</h4>
      <div className="text-2xl font-bold">{value}</div>
      <h6 className="text-xs">{subtitle}</h6>
      
      {change && (
        <div className="mt-1">
          <div
            className={`h-2 w-32 rounded-full mb-1 ${
              isPositive ? 'bg-green-500' : 'bg-red-500'
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

const GrowthChart = ({ data }) => {
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'green'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'green'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'green'
        }
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 ml-4 -mr-3 rounded-md ">
      <h4 className="text-green-700 mb-2">Growth Insights</h4>
      <div className="h-56">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

const SectorPieChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: 'green'
        }
      }
    }
  };

  return (
    <div className="bg-gray-100 p-4 ml-4 -mr-3 rounded-md ">
      <h4 className="text-green-700 mb-2">Startup Sectors</h4>
      <div className="h-56">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

const MembershipReport = ({ startups }) => (
  <div className="bg-gray-100 p-4 -mr-4 rounded-md ml-4 h-60 w-full">
    <div className="flex justify-between items-right gap-4 mb-2">
      <h4 className="font-semibold">Overall Startups</h4>
      <button className="px-6 py-1 bg-gray-900 ml-48 text-white text-sm rounded-full">View</button>
      <button className="px-3 py-1 border border-gray-900 text-gray-900 text-sm rounded-full">Download</button>
    </div>
    <table className="min-w-full -ml-2 space-x-4 text-sm text-left">
      <thead className="text-medium text-gray-800">
        <tr>
          <td className="p-2">Startup Company</td>
          <td className="p-2">Location</td>
          <td className="p-2">Sector</td>
          <td className="p-2">Stage</td>
          <td className="p-2">Funding</td>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {startups.map((startup, i) => (
          <tr key={i}>
            <td className="p-2">
              <div className="flex items-center gap-2">
                <img
                  src="data:image/png;base64,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"
                  alt="My Figtech"
                  className="w-5 h-5"
                />
                <span>{startup.name}</span>
              </div>
            </td>
            <td className="p-2">{startup.location}</td>
            <td className="p-2 text-green-700 font-bold">{startup.sector}</td>
            <td className="p-2">{startup.stage}</td>
            <td className="p-2">{startup.funding}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TopStartups = ({ startups }) => (
  <div className="bg-yellow-100 text-gray-900 p-4 ml-8 -mr-4 rounded-md  h-60 overflow-auto">
    <h4 className="font-semibold mb-4">Top Startups</h4>
    <ul className="space-y-4">
      {startups.map((startup, i) => (
        <li key={i} className="flex items-center gap-3">
          <img
            src="/main.jpeg" // Replace with your actual image path
            alt=""
            className="w-5 h-5 rounded-full mt-1"
          />
          <div>
            <p className="font-medium">{startup.name}</p>
            <p className="text-gray-700 text-xs">{startup.location}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Report = () => {
  const statCards = [
    { title: 'Ed-Techs', value: '2,500', subtitle: 'Startups', change: '+70.0%' },
    { title: 'Fin-Techs', value: '2,500', subtitle: 'Startups', change: '+70.0%' },
    { title: 'Agritechs', value: '2,500', subtitle: 'Startups', change: '+70.0%' },
    { title: 'Marketing', value: '2,500', subtitle: 'Startups', change: '+70.0%' },
    { title: 'E-commerce', value: '$10,000', subtitle: "Revenue", change: '+70.0%' },
    { title: 'Digital Identity', value: '$10,000', subtitle: "Revenue", change: '+70.0%' }
  ];

  const growthData = {
    labels: ['1st-Q', '2nd-Q', '3rd-Q', '4th-Q'],
    datasets: [
      {
        label: 'Growth',
        data: [2000, 800, 1200, 2100],
        backgroundColor: '#86efac'
      }
    ]
  };

  const pieData = {
    labels: ['Ed-Tech', 'Fintech', 'Agritech', 'Marketing'],
    datasets: [
      {
        data: [25, 25, 25, 25],
        backgroundColor: ['#4ade80', '#86efac', '#fde68a', '#a3e635']
      }
    ]
  };

  const startups = [
    { name: 'MY FIGTECH', location: 'Accra', sector: 'Fin-Tech', stage: 'Ideation', funding: 'Grant' },
    { name: 'MY FIGTECH', location: 'Takoradi', sector: 'Ed-Tech', stage: 'Expansion', funding: 'Series C' },
    { name: 'MY FIGTECH', location: 'Tema', sector: 'Prop-Tech', stage: 'Seed', funding: 'Series A' },
    { name: 'MY FIGTECH', location: 'Cape Coast', sector: 'E-Commerce', stage: 'Growth', funding: 'Series B' }
  ];

  const topStartups = Array(6).fill({ name: 'Castle Royal Hommes', location: 'Accra' });

  return (
    <div className="p-6 bg-white min-h-screen items-center space-y-6">
      {/* Header */}
      <h1 className="text-lg font-bold ml-4 mb-8 -mt-4 text-green-700">Startup Companies Report</h1>

      {/* Metric Cards */}
      <div className="flex justify-between gap-4 w-full">
      <div className="grid grid-cols-5 gap-4">
        {statCards.map((card, i) => (
          <MetricCard 
            key={i} 
            title={card.title} 
            value={card.value} 
            subtitle={card.subtitle}
            change={card.change} 
          />
        ))}
        <div className="col-span-2">
          <GrowthChart data={growthData} />
        </div>
        <div className="col-span-2">
          <SectorPieChart data={pieData} />
        </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-5 gap-4">
        
       
      </div>

      {/* Table and Top Startups */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <MembershipReport startups={startups} />
        </div>
        <div className="col-span-2">
          <TopStartups startups={topStartups} />
        </div>
      </div>
    </div>
  );
};

export default Report;