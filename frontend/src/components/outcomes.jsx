import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";
import { AddMoney } from "./add-money";
import { PotentialEconomy } from "./potential-economy";
import { ExpenseFilter } from "./expense-filter";

export function Outcomes() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [lastDateIndex, setLastDateIndex] = useState(null);

  const [outcomeChartData, setOutcomeChartData] = useState(null);
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
    const dataToProcess = filteredData || data;
    if (dataToProcess) {
      const outcomes = dataToProcess.expenses.filter((expense) => expense.amount < 0);

      // Process chart data
      const chartData = {};
      const reversedOutcomes = [...outcomes].reverse();
      reversedOutcomes.forEach((outcome) => {
        const date = outcome.created_at.split(" ")[0];
        if (!chartData[date]) {
          chartData[date] = 0;
        }
        chartData[date] += outcome.amount;
      });
      setOutcomeChartData(chartData);

      // Process table data
      setTableData({
        headers: ['amount', 'date', 'category', 'action'],
        content: outcomes.map((outcome) => [outcome.amount, outcome.created_at, outcome.category, outcome.id])
      });
    }
  }, [data, filteredData]);


  const handleFilterChange = (filteredExpenses) => {
    setFilteredData({ expenses: filteredExpenses });
  };

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


  if (loading || !outcomeChartData || !tableData) {

    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Outcomes</h1>
        <AddMoney open={dialogOpen} setOpen={setDialogOpen} transactionType="outcome" />
      </div>

      {outcomeChartData && tableData && (
        <>
          <LineChart chartData={outcomeChartData} />
          <PotentialEconomy expenses={data.expenses.filter((expense) => expense.amount < 0)} />
          <ExpenseFilter data={data} onFilterChange={handleFilterChange} />
          <CustomTable tableData={tableData} />
          <button onClick={handleLoadMore}>Load More</button>
        </>
      )}

    </div>
  );
}