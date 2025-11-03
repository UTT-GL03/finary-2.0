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