export function Balance({ totalIncome, totalOutcome }) {
  const balance = totalIncome + totalOutcome;
  
  return (
    <article>
      <h2>Global data</h2>
      <p>Balance: <strong>{balance}€</strong></p>
    </article>
  );
}