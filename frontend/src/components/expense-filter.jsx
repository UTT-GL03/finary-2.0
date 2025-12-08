import { useState, useEffect } from "react";

export function ExpenseFilter({ data, onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    amountMin: "",
    amountMax: "",
    month: "",
  });

  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);

  // Extract unique categories and months from data
  useEffect(() => {
    if (data && data.expenses) {
      // Get unique categories
      const uniqueCategories = [...new Set(data.expenses.map(expense => expense.category))];
      setCategories(uniqueCategories);

      // Get unique months (YYYY-MM format)
      const uniqueMonths = [...new Set(data.expenses.map(expense => {
        const date = expense.created_at.split(" ")[0]; // Get date part
        return date.substring(0, 7); // Get YYYY-MM
      }))].sort().reverse(); // Sort descending (newest first)
      setMonths(uniqueMonths);
    }
  }, [data]);

  // Apply filters whenever filters change
  useEffect(() => {
    if (data && data.expenses) {
      let filteredExpenses = data.expenses;

      // Filter by category
      if (filters.category) {
        filteredExpenses = filteredExpenses.filter(
          expense => expense.category === filters.category
        );
      }

      // Filter by amount range
      if (filters.amountMin) {
        filteredExpenses = filteredExpenses.filter(
          expense => Math.abs(expense.amount) >= parseFloat(filters.amountMin)
        );
      }
      if (filters.amountMax) {
        filteredExpenses = filteredExpenses.filter(
          expense => Math.abs(expense.amount) <= parseFloat(filters.amountMax)
        );
      }

      // Filter by month
      if (filters.month) {
        filteredExpenses = filteredExpenses.filter(expense => {
          const expenseMonth = expense.created_at.split(" ")[0].substring(0, 7);
          return expenseMonth === filters.month;
        });
      }

      onFilterChange(filteredExpenses);
    }
  }, [filters, data, onFilterChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      amountMin: "",
      amountMax: "",
      month: "",
    });
  };

  return (
    <div style={{ 
      padding: "1rem", 
      border: "1px solid #ddd", 
      borderRadius: "8px", 
      marginBottom: "1rem",
    }}>
      <h3>Filters</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        
        {/* Category Filter */}
        <div>
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Amount Range Filter */}
        <div>
          <label htmlFor="amount-min">Min Amount:</label>
          <input
            type="number"
            id="amount-min"
            placeholder="0"
            value={filters.amountMin}
            onChange={(e) => handleFilterChange("amountMin", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="amount-max">Max Amount:</label>
          <input
            type="number"
            id="amount-max"
            placeholder="∞"
            value={filters.amountMax}
            onChange={(e) => handleFilterChange("amountMax", e.target.value)}
          />
        </div>

        {/* Month Filter */}
        <div>
          <label htmlFor="month-filter">Month:</label>
          <select
            id="month-filter"
            value={filters.month}
            onChange={(e) => handleFilterChange("month", e.target.value)}
          >
            <option value="">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        <div style={{ display: "flex", alignItems: "end" }}>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>
    </div>
  );
}