export function KeyData({ categoriesData, total }) {
  return (
    <div>
      <p><strong>Total: {total}€</strong></p>
      {Object.entries(categoriesData).map(([key, value]) => (
        <p key={key}>
          {key}: <strong>{value}€</strong>
        </p>
      ))}
      {Object.keys(categoriesData).length === 0 && <p>No categories</p>}
    </div>
  );
}