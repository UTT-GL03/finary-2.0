import "../Dashboard.css";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Link } from "react-router";

import { data } from "../../lib/data";
import { useExpenseData } from "../hooks/useExpenseData";
import { Balance } from "./Balance";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import { KeyData } from "./KeyData";

Chart.register(CategoryScale);

export function Dashboard() {
  const userName = "Nathan";
  const userId = data.users.find((user) => user.user == userName)?.user_id;
  const expenses = data.expenses.filter((expense) => expense.user_id === userId);

  const {
    totalIncome,
    totalOutcome,
    incomesCategoriesCount,
    outcomesCategoriesCount,
    months,
    monthlyIncome,
    monthlyOutcome
  } = useExpenseData(expenses);

  return (
    <main className="container">
      <h1>Bonjour {userName}</h1>
      
      <Balance totalIncome={totalIncome} totalOutcome={totalOutcome} />

      <article>
        <BarChart 
          months={months} 
          monthlyIncome={monthlyIncome} 
          monthlyOutcome={monthlyOutcome} 
        />
      </article>

      <article>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Income</h2>
          <Link to="/incomes">View all</Link>
        </header>
        <div className="grid">
          <div>
            <PieChart categoriesData={incomesCategoriesCount} />
          </div>
          <KeyData 
            categoriesData={incomesCategoriesCount} 
            total={totalIncome} 
          />
        </div>
      </article>

      <article>
        <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h2>Outcome</h2>
          <Link to="/outcomes">View all</Link>
        </header>
        <div className="grid">
          <div>
            <PieChart categoriesData={outcomesCategoriesCount} />
          </div>
          <KeyData 
            categoriesData={outcomesCategoriesCount} 
            total={totalOutcome} 
          />
        </div>
      </article>
    </main>
  );
}