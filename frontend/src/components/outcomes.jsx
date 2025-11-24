import { useEffect, useState } from "react";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Outcomes() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [outcomeChartData, setOutcomeChartData] = useState({});
    const [lastDateIndex, setLastDateIndex] = useState(null);
    const [tableData, setTableData] = useState({
        headers: ['amount', 'date', 'category', 'action'],
        content: []
    });


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
            const outcomes = data.expenses.filter((expense) => expense.amount < 0);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{padding: '2rem'}}>
            <h1>Outcomes</h1>
            {outcomeChartData && tableData && (
                <>
                    <LineChart chartData={outcomeChartData} />
                    <button onClick={handleLoadMore}>Load More</button>
                    <CustomTable tableData={tableData} />
                </>
            )}
        </div>
    );
}