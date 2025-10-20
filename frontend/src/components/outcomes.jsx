import { data } from '../../lib/data';
import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Outcomes() {
    const outcomes = data.expenses.filter((expense) => expense.amount < 0);
    const outcomeChartData = {};
    const tableContent =[];

    outcomes.forEach((outcome) => {
        tableContent.push([outcome.amount, outcome.created_at, outcome.category]);
    })

    const tableData = {
        headers: ['amount', 'date', 'category'],
        content: tableContent
    }

    outcomes.forEach((outcome) => {
        const date = outcome.created_at.split(" ")[0];
        if (!outcomeChartData[date]) {
            outcomeChartData[date] = 0;
        }
        outcomeChartData[date] += outcome.amount;
    })

    return (
        <div>
            <h1>Outcomes</h1>
            <LineChart chartData={outcomeChartData} />
            <CustomTable tableData={tableData} />
        </div>
    );
}