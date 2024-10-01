import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';



import './Grafic.css'

import revenueData from "./data/revenueData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Grafic  ()  {
  return (
    <div className="Grafic">
      <div className="dataCard revenueCard">
        <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#064FF0",
                borderColor: "#064FF0",
              },
              
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.3,
              },
            },
            plugins: {
              title: {
                text: "consumo de energia  ",
              },
            },
          }}
        />
      </div>
      
    </div>
  );
};
export default Grafic