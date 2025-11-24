import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Incomes() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [incomeChartData, setIncomeChartData] = useState(null);
  const [tableData, setTableData] = useState(null);

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
    if (data) {
      const incomes = data.expenses.filter((expense) => expense.amount > 0);

      // Process chart data
      const chartData = {};
      incomes.forEach((income) => {
        const date = income.created_at.split(" ")[0];
        if (!chartData[date]) {
          chartData[date] = income.amount;
        } else {
          chartData[date] += income.amount;
        }
      });
      setIncomeChartData(chartData);

      // Process table data
      setTableData({
        headers: ['amount', 'date', 'category', 'action'],
        content: incomes.map((income) => [income.amount, income.created_at, income.category, income.id])
      });
    }
  }, [data]);

  if (loading || !incomeChartData || !tableData) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{padding: '2rem'}}>
      <h1>Incomes</h1>
      <LineChart chartData={incomeChartData} />
      <CustomTable tableData={tableData} />
      <div data-testid="incomes-loaded" style={{display: 'none'}}></div>
    </div>
  );
}
