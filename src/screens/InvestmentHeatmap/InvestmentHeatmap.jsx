import React, { useState } from 'react';

const years = Array.from({ length: 12 }, (_, i) => 2021 + i);

const views = ['Annually', 'Quarterly', 'Monthly'];

const investmentData = {
  2021: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',
    ]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$400M'),
  },
  2022: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2023: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2024: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2025: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2026: {
    monthly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', '$100M', '$45M', '$35M', '$46M', '$28M', '$78M', '$48M', '$77M',]),
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2027: {
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  2028: {
    quarterly: Array(10).fill([
      '$20M', '$15M', '$15M', '$500K', 
    ]),
    annually: Array(10).fill('$350M'),
  },
  
};

export default function InvestmentHeatmap() {
  const [selectedYear, setSelectedYear] = useState(2025); // Default year is 2025
  const [selectedView, setSelectedView] = useState('Annually'); // Default view is Annually
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Control dropdown visibility

  const getHeaders = () => {
    if (selectedView === 'Monthly') {
      return ['Sector', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }
    if (selectedView === 'Quarterly') {
      return ['Sector', 'Q1 - ' + selectedYear, 'Q2 - ' + selectedYear, 'Q3 - ' + selectedYear, 'Q4 - ' + selectedYear];
    }
    if (selectedView === 'Annually') {
      return ['Sector', ...years];
    }
    return [];
  };
  
  

  const getData = () => {
    if (selectedView === 'Annually') {
      const rowCount = investmentData[2025]?.annually?.length || 0;
      return Array.from({ length: rowCount }).map((_, rowIndex) => {
        return years.map((year) => investmentData[year]?.annually?.[rowIndex] || '-');
      });
    }
  
    // For Quarterly or Monthly
    return investmentData[selectedYear]?.[selectedView.toLowerCase()] || [];
  };
  
  
  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-lg font-bold text-green-700 mb-6 mt-2 text-left">Investment Heatmap</h1>

      {/* View and Actions */}
      <div className="flex justify-between items-center px-2 py-1 text-xs rounded-full bg-gray-50 -mt-2 p-3 rounded mb-6">
        {/* Left side: View buttons */}
        <div className="flex space-x-4">
          {views.map((view) => (
            <button
              key={view}
              className={`px-2 py-1 rounded-lg ${
                selectedView === view ? 'bg-green-700 text-white' : 'bg-gray-300 text-black border'
              }`}
              onClick={() => setSelectedView(view)}
            >
              {view}
            </button>
          ))}
        </div>

        {/* Right side: Year, Sort, Download */}
        <div className="flex items-center space-x-4">
          
          

          {/* SVG Button for Dropdown */}
          <div className="relative">
          <button
  onClick={() => setDropdownVisible(!isDropdownVisible)}
  className={`px-4 py-1 border rounded-full flex items-center gap-2 ${
    selectedYear ? 'bg-green-700 text-white' : 'bg-white text-black'
  }`}
>
  {selectedYear}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <line x1="6" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="17" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</button>


            {/* Dropdown Menu */}
            {isDropdownVisible && (
              <div className="absolute mt-2 p-2 border rounded bg-white shadow-lg w-full z-10">
                {years.map((year) => (
  <div
    key={year}
    className={`py-2 px-4 cursor-pointer rounded-full ${
      selectedYear === year ? 'bg-green-700 text-white' : 'hover:bg-gray-200'
    }`}
    onClick={() => {
      setSelectedYear(year);
      setDropdownVisible(false);
    }}
  >
    {year}
  </div>
))}

              </div>
            )}
          </div>

          <button className="bg-white text-green-700 border px-2 py-1 rounded-full flex items-center gap-2">
            Download
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto items-center">
        <table className="min-w-full divide-y-2 divide-white">
          <thead>
            <tr className="text-medium ">
              {getHeaders().map((header, index) => (
                <th
                key={index}
                className={`text-left p-2 font-normal ${
                  selectedView === 'Annually' && header === selectedYear ? '' : ''
                }`}
              >
                {header}
              </th>
              
              ))}
            </tr>
          </thead>
          <tbody>
  {getData().map((row, rowIndex) => (
    <tr key={rowIndex} className="text-xs border-b-4 border-white bg-gray-50">
      <td className="p-2 border-b-4  border-white">Agritech</td>

      
      {row.map((cell, cellIndex) => {
        // Highlight only for Annually
        let isHighlight = false;

if (selectedView === 'Annually') {
  isHighlight = years[cellIndex] === selectedYear;
} 
 else if (selectedView === 'Monthly') {
  const currentMonthIndex = new Date().getMonth(); // 0 = Jan
  isHighlight = cellIndex === currentMonthIndex;
}


        return (
          <td
  key={cellIndex}
  className={`p-2  border-b-2 border-white  ${
    isHighlight ? 'bg-green-700 text-white w-1 h-1 rounded-lg font-normal' : ''
  }`}
>
  {cell}
</td>

        );
      })}
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
}
