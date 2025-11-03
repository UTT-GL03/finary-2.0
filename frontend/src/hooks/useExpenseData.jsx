import { useMemo } from "react";

export function useExpenseData(expenses) {
  return useMemo(() => {
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
        (outcomesCategoriesCount[outcome.category] || 0) + Math.abs(outcome.amount);
    });

    // Group expenses by month
    const monthlyData = {};
    expenses.forEach((expense) => {
      const date = new Date(expense.created_at);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = { income: 0, outcome: 0 };
      }
      
      if (expense.amount > 0) {
        monthlyData[monthYear].income += expense.amount;
      } else {
        monthlyData[monthYear].outcome += Math.abs(expense.amount);
      }
    });

    const months = Object.keys(monthlyData);
    const monthlyIncome = months.map(month => monthlyData[month].income);
    const monthlyOutcome = months.map(month => monthlyData[month].outcome);

    return {
      totalIncome,
      totalOutcome,
      incomesCategoriesCount,
      outcomesCategoriesCount,
      months,
      monthlyIncome,
      monthlyOutcome
    };
  }, [expenses]);
}