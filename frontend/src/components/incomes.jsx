import { data } from "../../lib/data";

import { LineChart } from "./line-chart";
import { CustomTable } from "./custom-table";

export function Incomes() {
  const incomes = data.expenses.filter((expense) => expense.amount > 0);

  const incomeChartData = {};

    const tableContent =[];

    incomes.forEach((income) => {
        tableContent.push([income.amount, income.created_at, income.category]);
    })

  const taleData = {
    headers: ['amount', 'date', 'category'],
    content: tableContent
  }

  incomes.forEach((income) => {
    
    const date = income.created_at.split(" ")[0];

    
    if (!incomeChartData[date]) {
      incomeChartData[date] = 0;
    }
    incomeChartData[date] += income.amount;
  });

  return (
    <div>
      <h1>Incomes</h1>
      <div >
      <LineChart chartData={incomeChartData} />

      <CustomTable tableData={taleData} />
      </div>
    </div>
  );
}
