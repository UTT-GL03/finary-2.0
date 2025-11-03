import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Incomes() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [incomeChartData, setIncomeChartData] = useState({});
  const [tableData, setTableData] = useState({
    headers: ['amount', 'date', 'category', 'action'],
    content: []
  });

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then((x) => x.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
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

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{padding: '2rem'}}>
      <h1>Incomes</h1>
    {incomeChartData && tableData && (
      <>
        <LineChart chartData={incomeChartData} />
        <CustomTable tableData={tableData} />
      </>
    )}
    </div>
  );
}
