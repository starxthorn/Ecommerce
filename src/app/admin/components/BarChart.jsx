import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartdata, setChartdata] = useState({
    datasets: [],
  });
  const [chartoptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartdata({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          data: [18127, 22210, 19490, 17842, 22475, 2000, 30200],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, .4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Rvenue",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);

  return (
    <div className="bg-white h-[47vh] rounded-lg px-4 border border-gray-300">
      <Bar data={chartdata} options={chartoptions} />
    </div>
  );
};

export default BarChart;
