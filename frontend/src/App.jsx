import "./App.css";

import { data } from "../lib/data";

function App() {
  const userName = "Nathan";
  
  

  const userId = data.users.find((user) => user.user == userName)?.user_id;
  
  const expenses = data.expenses.filter((expense) => expense.user_id === userId);

  const incomes = expenses.filter((expense) => expense.amount > 0);
  const outcomes = expenses.filter((expense) => expense.amount < 0);
  

  return (
    <div>
      <h1>Bonjour {userName}</h1>
      <h1>Data</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.amount}</li>
        ))}
      </ul>
      <div>
        <h2>Income: </h2>
        {incomes.map((income) => (
          <li>{income.amount}</li>
        ))}
      </div>
      <div>
        <h2>Outcome: </h2>
        {outcomes.map((outcome) => (
          <li>{outcome.amount}</li>
        ))}
      </div>
    </div>
  );
}

export default App;
