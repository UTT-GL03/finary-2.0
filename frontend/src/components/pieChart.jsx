import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = Math.floor((i * 360) / numColors);
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

export function PieChart({ categoriesData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && Object.keys(categoriesData).length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const categories = Object.keys(categoriesData);
      const values = Object.values(categoriesData);

      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categories,
          datasets: [{
            data: values,
            backgroundColor: generateColors(categories.length),
            borderWidth: 2,
            borderColor: '#fff',
            hoverOffset: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return label + ': ' + value + '€';
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [categoriesData]);

  return <canvas ref={chartRef} className="pie-chart"></canvas>;
}