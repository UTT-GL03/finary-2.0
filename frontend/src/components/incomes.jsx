import { data } from '../../lib/data';

export function Incomes() {
    const incomes = data.expenses.filter((expense) => expense.amount > 0);
    return (
        <div>
            <h1>Incomes</h1>
            <ul>
                {incomes.map((income) => (
                    <div key={income.id}>
                        <li > + {income.amount} - {income.created_at} - {income.category}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}