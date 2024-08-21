"use client"
import * as React from "react";
import DonutChart from "react-donut-chart";

const data = [
  { label: 'Has Excess Inventory', value: 43 },
  { label: 'About to Expire', value: 9 },
  { label: 'Out of Stock', value: 16 },
  { label: 'Expired', value: 20 },
  { label: 'Low Stock Items', value: 12 },
];

const colors = ["#F99062", "#0CFFEF", "#FF2765", "#1A9258", "#6190C9"];

const Statistics = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
      {/* Donut Chart */}
      <div className="w-1/2 flex justify-center items-center font-thin">
        <DonutChart
          data={data}
          height={200}
          width={200}
          innerRadius={0.60}
          outerRadius={0.96}
          legend={false}
          colors={colors}
          strokeColor="#ffffff"
          className="donutchart"
        />
      </div>

      {/* Custom Legend */}
      <div className="w-1/2 flex flex-col justify-center items-start">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <span
              className="w-4 h-4 mr-2"
              style={{ backgroundColor: colors[index] }}
            ></span>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
