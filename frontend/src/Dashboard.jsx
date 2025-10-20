import "./Dashboard.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect, useRef } from "react";

import { data } from "../lib/data";

Chart.register(CategoryScale);

function App() {
  const userName = "Nathan";
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const IncomeChartRef = useRef(null);
  const IncomeChartInstance = useRef(null);
  const OutcomeChartRef = useRef(null);
  const OutcomeChartInstance = useRef(null);

  const userId = data.users.find((user) => user.user == userName)?.user_id;

  const expenses = data.expenses.filter(
    (expense) => expense.user_id === userId
  );

  const incomes = expenses.filter((expense) => expense.amount > 0);
  const outcomes = expenses.filter((expense) => expense.amount < 0);

  let totalIncome = 0;
  let totalOutcome = 0;

  incomes.forEach((income) => (totalIncome += income.amount));
  outcomes.forEach((outcome) => (totalOutcome += outcome.amount));

  const incomesCategoriesCount = {};
  const outcomesCategoriesCount = {};
  incomes.forEach((income) => {
    incomesCategoriesCount[income.category] =
      (incomesCategoriesCount[income.category] || 0) + income.amount;
  });

  outcomes.forEach((outcome) => {
    outcomesCategoriesCount[outcome.category] =
      (outcomesCategoriesCount[outcome.category] || 0) + outcome.amount;
  });

  // Group expenses by month
  const monthlyData = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { income: 0, outcome: 0 };
    }
    
    if (expense.amount > 0) {
      monthlyData[monthYear].income += expense.amount;
    } else {
      monthlyData[monthYear].outcome += Math.abs(expense.amount);
    }
  });

  const months = Object.keys(monthlyData);
  const monthlyIncome = months.map(month => monthlyData[month].income);
  const monthlyOutcome = months.map(month => monthlyData[month].outcome);

  //generate colors for pie chart
  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const hue = Math.floor((i * 360) / numColors);
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  // global expense chart
  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Income',
              data: monthlyIncome,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            },
            {
              label: 'Outcome',
              data: monthlyOutcome,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + '€';
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y + '€';
                }
              }
            }
          }
        }
      });
    }


    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  //Income pie chart 
  useEffect(() => {
    if (IncomeChartRef.current && Object.keys(incomesCategoriesCount).length > 0) {
      if (IncomeChartInstance.current) {
        IncomeChartInstance.current.destroy();
      }

      const ctx = IncomeChartRef.current.getContext('2d');
      const categories = Object.keys(incomesCategoriesCount);
      const values = Object.values(incomesCategoriesCount);

      IncomeChartInstance.current = new Chart(ctx, {
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
                  const percentage = ((value / total) * 100).toFixed(1);
                  return label + ': ' + value + '€ (' + percentage + '%)';
                }
              }
            }
          }
        }
      });
    }

    // Cleanup function
    return () => {
      if (IncomeChartInstance.current) {
        IncomeChartInstance.current.destroy();
      }
    };
  }, [incomesCategoriesCount]);

  // Outcome pie chart
  useEffect(() => {
    if (OutcomeChartRef.current && Object.keys(outcomesCategoriesCount).length > 0) {
      if (OutcomeChartInstance.current) {
        OutcomeChartInstance.current.destroy();
      }
      const ctx = OutcomeChartRef.current.getContext('2d');
      const categories = Object.keys(outcomesCategoriesCount);
      const values = Object.values(outcomesCategoriesCount);
      OutcomeChartInstance.current = new Chart(ctx, {
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
    // Cleanup function
    return () => {
      if (OutcomeChartInstance.current) {
        OutcomeChartInstance.current.destroy();
      }
    };
  }, [outcomesCategoriesCount]);
    

  return (
    <main className="container">
      <h1>Bonjour {userName}</h1>
      
      <article>
        <h2>Global data</h2>
        <p>Balance: {totalIncome + totalOutcome}€</p>
        <canvas ref={chartRef}></canvas>
      </article>

      <article>
        <header>
          <h2>Income</h2>
        </header>
        <div className="grid">
          <div>
            <canvas ref={IncomeChartRef} className="pie-chart"></canvas>
          </div>
          <div>
            <p><strong>Total: {totalIncome}€</strong></p>
            {Object.entries(incomesCategoriesCount).map(([key, value]) => (
              <p key={key}>
                {key}: <strong>{value}€</strong>
              </p>
            ))}
            {Object.keys(incomesCategoriesCount).length === 0 && <p>No income categories</p>}
          </div>
        </div>
      </article>

      <article>
        <header>
          <h2>Outcome</h2>
        </header>
        <div className="grid">
          <div>
            <canvas ref={OutcomeChartRef} className="pie-chart"></canvas>
          </div>
          <div>
            <p><strong>Total: {totalOutcome}€</strong></p>
            {Object.entries(outcomesCategoriesCount).map(([key, value]) => (
              <p key={key}>
                {key}: <strong>{value}€</strong>
              </p>
            ))}
            {Object.keys(outcomesCategoriesCount).length === 0 && <p>No outcome categories</p>}
          </div>
        </div>
      </article>
    </main>
  );
}

export default App;