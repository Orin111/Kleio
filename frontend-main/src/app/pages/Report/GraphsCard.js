import React from 'react';
import {PieChart, Pie, Cell, Legend } from "recharts";
import _ from 'lodash';
const data = [
  [
    {
      "name": "Family",
      "value": 471
    },
    {
      "name": "Home",
      "value": 176
    },
    {
      "name": "Food",
      "value": 170
    },
    {
      "name": "Health",
      "value": 278
    }
  ],
  [
    {
      "name": "2000",
      "value": 278
    },
    {
      "name": "1990",
      "value": 327
    },
    {
      "name": "1980",
      "value": 584
    },
    {
      "name": "1970",
      "value": 172
    }
  ]
];

const COLORS = ['#0088FE', '#00C49F', '#9A55FF', '#FF8042'];

const RADIAN = Math.PI / 180;

export const GraphsCard = () => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col rounded-xl text-center p-2 bg-orange-200 justify-between m-6">
      <p className=" text-2xl font-bold	mb-1 text-black">Topics</p>
      <div className="flex flex-row justify-evenly items-center  mb-6 text-4xl">
        {_.map(data, chartData => (
          <PieChart width={300} height={200}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend wrapperStyle={{fontSize: 14, bottom: -10}} iconType="square" iconSize={10} />
          </PieChart>
        ))}
      </div>
    </div>
  );
}