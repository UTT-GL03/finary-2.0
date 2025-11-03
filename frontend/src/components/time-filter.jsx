export function TimeFilter({ currentFilter, setCurrentFilter, availableMonths }) {
  return (
    <select
      value={currentFilter}
      onChange={(e) => setCurrentFilter(e.target.value)}
      style={{ marginBottom: "1rem" , maxWidth: '200px'}}
    >
      <option value="all">All months</option>
      {availableMonths.map((month) => (
        <option key={month.value} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  );
}
