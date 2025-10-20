import { data } from '../../lib/data';

export function Outcomes() {
    const outcomes = data.expenses.filter((expense) => expense.amount < 0);
    return (
        <div>
            <h1>Outcomes</h1>
            <ul>
                {outcomes.map((outcome) => (
                    <div key={outcome.id}>
                        <li > {outcome.amount} - {outcome.created_at} - {outcome.category}</li>
                    </div>
                ))}
            </ul>
        </div>
    )   
}