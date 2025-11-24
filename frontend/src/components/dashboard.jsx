import "../Dashboard.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useRef, useState } from "react";

import { TimeFilter } from "./time-filter";

Chart.register(CategoryScale);

export function Dashboard() {
  //For the moment we define the userName and Id here.
  const userName = "Nathan";
  const userId = "10";
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const IncomeChartRef = useRef(null);
  const IncomeChartInstance = useRef(null);
  const OutcomeChartRef = useRef(null);
  const OutcomeChartInstance = useRef(null);

  // State variables
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [expenses, setExpenses] = useState([]);

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);
  const [incomesCategoriesCount, setIncomesCategoriesCount] = useState({});
  const [outcomesCategoriesCount, setOutcomesCategoriesCount] = useState({});
  const [availableMonths, setAvailableMonths] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const response = await fetch(
          "http://localhost:5984/finary/_all_docs?include_docs=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("admin:secret"), // your CouchDB credentials
            },
          }
        );
  
        const result = await response.json();
        console.log("Result: ", result);
  
        // Extract docs and filter only expenses
        const rows = result.rows;
        console.log("Rows: ", rows);
        const expenses = rows.map(row => row.doc);
        console.log("Expenses: ", expenses);
        setData({expenses: expenses}); // <-- this is now the array you want
  
      } catch (err) {
        console.error("Failed to fetch CouchDB:", err);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, []);


  useEffect(() => {
    console.log("Data: ", data);
  }, [data]);
  
  

  // Process data when it's loaded
  useEffect(() => {
    if (!data) return;

    //const userId = data.users.find((user) => user.user == userName)?.user_id;
    

    const userExpenses = data.expenses.filter(
      (expense) => expense.user_id === userId
    );

    const userIncomes = userExpenses.filter((expense) => expense.amount > 0);
    const userOutcomes = userExpenses.filter((expense) => expense.amount < 0);

    let incomeTotal = 0;
    let outcomeTotal = 0;

    userIncomes.forEach((income) => (incomeTotal += income.amount));
    userOutcomes.forEach((outcome) => (outcomeTotal += outcome.amount));

    const incomesCategories = {};
    const outcomesCategories = {};
    userIncomes.forEach((income) => {
      incomesCategories[income.category] =
        (incomesCategories[income.category] || 0) + income.amount;
    });

    userOutcomes.forEach((outcome) => {
      outcomesCategories[outcome.category] =
        (outcomesCategories[outcome.category] || 0) + outcome.amount;
    });

    // Get available months from expenses data
    const months = [];
    const monthsSet = new Set();
    userExpenses.forEach((expense) => {
      const date = new Date(expense.created_at.replace(" ", "T"));
      const monthYear = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });
      if (!monthsSet.has(monthYear)) {
        monthsSet.add(monthYear);
        months.push({
          value: monthYear,
          label: monthYear,
        });
      }
    });

    // Sort months chronologically
    months.sort((a, b) => {
      const dateA = new Date(a.value);
      const dateB = new Date(b.value);
      return dateA - dateB;
    });

    // Update all state variables
    setExpenses(userExpenses);

    setTotalIncome(incomeTotal);
    setTotalOutcome(outcomeTotal);
    setIncomesCategoriesCount(incomesCategories);
    setOutcomesCategoriesCount(outcomesCategories);
    setAvailableMonths(months);
  }, [data]);

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

      const ctx = chartRef.current.getContext("2d");

      // Apply month filter to expenses
      let filteredExpenses = expenses;
      if (currentFilter !== "all") {
        filteredExpenses = expenses.filter((expense) => {
          const date = new Date(expense.created_at.replace(" ", "T"));
          const monthYear = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
          return monthYear === currentFilter;
        });
      }

      console.log("Filter expenses: ", filteredExpenses);
      // Group filtered expenses by month
      const filteredMonthlyData = {};
      filteredExpenses.forEach((expense) => {
        const date = new Date(expense.created_at.replace(" ", "T"));
        const monthYear = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });

        if (!filteredMonthlyData[monthYear]) {
          filteredMonthlyData[monthYear] = { income: 0, outcome: 0 };
        }

        if (expense.amount > 0) {
          filteredMonthlyData[monthYear].income += expense.amount;
        } else {
          filteredMonthlyData[monthYear].outcome += Math.abs(expense.amount);
        }
      });

      const filteredMonths = Object.keys(filteredMonthlyData);
      const filteredMonthlyIncome = filteredMonths.map(
        (month) => filteredMonthlyData[month].income
      );
      const filteredMonthlyOutcome = filteredMonths.map(
        (month) => filteredMonthlyData[month].outcome
      );

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: filteredMonths,
          datasets: [
            {
              label: "Income",
              data: filteredMonthlyIncome,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Outcome",
              data: filteredMonthlyOutcome,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + "€";
                },
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ": " + context.parsed.y + "€";
                },
              },
            },
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses, currentFilter]);

  //Income pie chart
  useEffect(() => {
    if (
      IncomeChartRef.current &&
      Object.keys(incomesCategoriesCount).length > 0
    ) {
      if (IncomeChartInstance.current) {
        IncomeChartInstance.current.destroy();
      }

      const ctx = IncomeChartRef.current.getContext("2d");
      const categories = Object.keys(incomesCategoriesCount);
      const values = Object.values(incomesCategoriesCount);

      IncomeChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              data: values,
              backgroundColor: generateColors(categories.length),
              borderWidth: 2,
              borderColor: "#fff",
              hoverOffset: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return label + ": " + value + "€ (" + percentage + "%)";
                },
              },
            },
          },
        },
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
    if (
      OutcomeChartRef.current &&
      Object.keys(outcomesCategoriesCount).length > 0
    ) {
      if (OutcomeChartInstance.current) {
        OutcomeChartInstance.current.destroy();
      }
      const ctx = OutcomeChartRef.current.getContext("2d");
      const categories = Object.keys(outcomesCategoriesCount);
      const values = Object.values(outcomesCategoriesCount);
      OutcomeChartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: categories,
          datasets: [
            {
              data: values,
              backgroundColor: generateColors(categories.length),
              borderWidth: 2,
              borderColor: "#fff",
              hoverOffset: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.parsed || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return label + ": " + value + "€ (" + percentage + "%)";
                },
              },
            },
          },
        },
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className="grid" />
          <article>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Global data</h2>
              <TimeFilter
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                availableMonths={availableMonths}
              />
            </div>
            <p>Balance: {totalIncome + totalOutcome}€</p>
            <canvas ref={chartRef} />
          </article>

          <article>
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Income</h2>
              <a href="/incomes">View all</a>
            </header>
            <div className="grid">
              <div>
                <canvas ref={IncomeChartRef} className="pie-chart"></canvas>
              </div>
              <div>
                <p>
                  <strong>Total: {totalIncome}€</strong>
                </p>
                {Object.entries(incomesCategoriesCount).map(([key, value]) => (
                  <p key={key}>
                    {key}: <strong>{value}€</strong>
                  </p>
                ))}
                {Object.keys(incomesCategoriesCount).length === 0 && (
                  <p>No income categories</p>
                )}
              </div>
            </div>
          </article>

          <article>
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Outcome</h2>
              <a href="/outcomes">View all</a>
            </header>
            <div className="grid">
              <div>
                <canvas ref={OutcomeChartRef} className="pie-chart"></canvas>
              </div>
              <div>
                <p>
                  <strong>Total: {totalOutcome}€</strong>
                </p>
                {Object.entries(outcomesCategoriesCount).map(([key, value]) => (
                  <p key={key}>
                    {key}: <strong>{value}€</strong>
                  </p>
                ))}
                {Object.keys(outcomesCategoriesCount).length === 0 && (
                  <p>No outcome categories</p>
                )}
              </div>
            </div>
          </article>
        </>
      )}
    </main>
  );
}
