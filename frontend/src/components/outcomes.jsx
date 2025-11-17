import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Outcomes() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [outcomeChartData, setOutcomeChartData] = useState({});
    const [tableData, setTableData] = useState({
        headers: ['amount', 'date', 'category', 'action'],
        content: []
    });

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
            const outcomes = data.expenses.filter((expense) => expense.amount < 0);

            // Process chart data
            const chartData = {};
            outcomes.forEach((outcome) => {
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
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{padding: '2rem'}}>
            <h1>Outcomes</h1>
            {outcomeChartData && tableData && (
                <>
                    <LineChart chartData={outcomeChartData} />
                    <CustomTable tableData={tableData} />
                </>
            )}
        </div>
    );
}