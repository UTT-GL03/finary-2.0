import { useEffect, useState } from "react";
import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";
import { AddMoney } from "./add-money";

export function Incomes() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [lastDateIndex, setLastDateIndex] = useState(null);

  const [incomeChartData, setIncomeChartData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const currentTime = new Date().toISOString();
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = {
          selector: {
            _id: { $gt: null },
            user_id: "10",
            created_at: { $lt: currentTime },
          },
          sort: [{ created_at: "desc" }],
          limit: 30,
        };
        const response = await fetch("http://localhost:5984/finary/_find", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("admin:secret"),
          },
          body: JSON.stringify(query),
        });
        const result = await response.json();
        const docs = result.docs;
        setLastDateIndex(docs[docs.length - 1].created_at);
        setData({ expenses: docs });
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
      const reversedIncomes = [...incomes].reverse();
      reversedIncomes.forEach((income) => {
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
        headers: ["amount", "date", "category", "action"],
        content: incomes.map((income) => [
          income.amount,
          income.created_at,
          income.category,
          income.id,
        ]),
      });
    }
  }, [data]);

  const handleLoadMore = async () => {
    if (!lastDateIndex) return;
    setLoading(true);
    try {
      const query = {
        selector: {
          _id: { $gt: null },
          user_id: "10",
          created_at: { $lt: lastDateIndex },
        },
        sort: [{ created_at: "desc" }],
        limit: 30,
      };
      const response = await fetch("http://localhost:5984/finary/_find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:secret"),
        },
        body: JSON.stringify(query),
      });
      const result = await response.json();
      const docs = result.docs;
      setLastDateIndex(docs[docs.length - 1].created_at);
      // Merge new data with existing data
      setData({ expenses: [...data.expenses, ...docs] });
    } catch (err) {
      console.error("Failed to fetch more data:", err);
    }
    setLoading(false);
  };

  if (loading || !incomeChartData || !tableData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Incomes</h1>
        <AddMoney open={dialogOpen} setOpen={setDialogOpen} transactionType="income" />
      </div>
      <LineChart chartData={incomeChartData} />
      <CustomTable tableData={tableData} />
      <button onClick={handleLoadMore}>Load More</button>
      <div data-testid="incomes-loaded" style={{ display: "none" }}></div>
    </div>
  );
}
