import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";
import '@picocss/pico/css/pico.css'

export function LineChart({ chartData }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Destroy existing chart before creating a new one (important when React rerenders)
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: Object.keys(chartData),
        datasets: [
          {
            label: "Incomes",
            data: Object.values(chartData),
            borderColor: "white",
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Amount",
            },
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      chartInstanceRef.current.destroy();
    };
  }, [chartData]);
  return (
    <article>
    <canvas ref={chartRef}></canvas>
    </article>
  );
}
