

import { data } from "../../lib/data";

export function Dashboard() {
  const userName = "Nathan";

  const userId = data.users.find((user) => user.user == userName)?.user_id;

  const expenses = data.expenses.filter(
    (expense) => expense.user_id === userId
  );

  const incomes = expenses.filter((expense) => expense.amount > 0);
  const outcomes = expenses.filter((expense) => expense.amount < 0);

  let totalIncome = 0;
  let totalOutcome = 0;

  incomes.forEach((income) => (totalIncome += income.amount));
  outcomes.forEach((outcome) => (totalOutcome += outcome.amount));

  const incomesCategoriesCount = {};
  const outcomesCategoriesCount = {};
  incomes.forEach((income) => {
    incomesCategoriesCount[income.category] =
      (incomesCategoriesCount[income.category] || 0) + income.amount;
  });

  outcomes.forEach((outcome) => {
    outcomesCategoriesCount[outcome.category] =
      (outcomesCategoriesCount[outcome.category] || 0) + outcome.amount;
  });
  console.log("cat : ", incomesCategoriesCount);

  return (
    <div>
      <h1>Bonjour {userName}</h1>
      <h1>Data</h1>
      <p>Balance: {totalIncome + totalOutcome}</p>
      <ul>
        {expenses.map((expense) => (
          <div>
            <li key={expense.id}>{expense.amount}</li>
            <li key={expense.id}>{expense.created_at}</li>
          </div>
        ))}
      </ul>
      <div>
        <h2>Income: </h2>
        <p>Total : {totalIncome}</p>
        {Object.entries(incomesCategoriesCount).map(([key, value]) => (
          <div key={key}>
            <span>{key}: </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div>
        <h2>Outcome: </h2>
        <p>Total : {totalOutcome}</p>
        {Object.entries(outcomesCategoriesCount).map(([key, value]) => (
          <div key={key}>
            <span>{key}: </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      
    </div>
  );
}


