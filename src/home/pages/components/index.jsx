import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/@/components/ui/tabs'



import '../components/style/Grafic.css'

import Datames from "./data/Datames.json";
import Dataano from "./data/Dataanual.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

function Grafic  ()  {
  return (
      <div className="Grafic-container">
         <Tabs defaultValue="week" className="tablist-container">
              <TabsList className="tablist-content">
            <div className="grafic-2">
            <TabsTrigger className="ano" value="ano">Ano</TabsTrigger>
              <TabsTrigger className="mes" value="mes">Mês</TabsTrigger>
              
            </div>
                   </TabsList>
                 <TabsContent className="Grafic-year" value="ano">
                   <div className="dataCard revenueCard">
            <Line
              data={{
                labels: Dataano.map((data) => data.ano),
                
                datasets: [
                  {
                    label: "Anual",
                    data:  Dataano.map((data) => data.consumo),
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
                    text: "consumo de energia   ",
                  },
                },
              }}
            />
                   </div>
           </TabsContent>


           <TabsContent className="Grafic-month" value="mes">
                   <div className="dataCard revenueCard">
            <Line
              data={{
                labels: Datames.map((data) => data.mes),
                datasets: [
                  {
                    label: "Mensal",
                    data: Datames.map((data) => data.consumo),
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
           </TabsContent>
         </Tabs>

      
    </div>
  );
};
export default Grafic