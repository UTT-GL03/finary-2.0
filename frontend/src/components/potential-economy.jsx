import '@picocss/pico/css/pico.css';

export function PotentialEconomy({ expenses }) {
    // Calculate category statistics
    const getCategoryStats = () => {
        const categoryMap = {};

        expenses.forEach((expense) => {
            const category = expense.category || 'Uncategorized';
            if (!categoryMap[category]) {
                categoryMap[category] = {
                    count: 0,
                    total: 0,
                };
            }
            categoryMap[category].count += 1;
            categoryMap[category].total += Math.abs(expense.amount);
        });

        // Convert to array and sort by count (most common)
        const sortedCategories = Object.entries(categoryMap)
            .map(([category, stats]) => ({
                category,
                count: stats.count,
                total: stats.total,
                average: stats.total / stats.count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 3); // Get top 3

        return sortedCategories;
    };

    const topCategories = getCategoryStats();

    // Calculate potential savings (20% reduction suggestion)
    const calculatePotentialSavings = (total) => {
        return total * 0.2; // 20% savings potential
    };

    if (topCategories.length === 0) {
        return (
            <article>
                <h3>💰 Potential Savings</h3>
                <p>No expense data available yet.</p>
            </article>
        );
    }

    const totalPotentialSavings = topCategories.reduce(
        (sum, cat) => sum + calculatePotentialSavings(cat.total),
        0
    );

    return (
        <article style={{ marginTop: '2rem' }}>
            <h3>💰 Potential Savings Analysis</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--muted-color)' }}>
                Based on your top 3 most frequent expense categories, here's how much you could save by reducing spending by 20%:
            </p>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
                {topCategories.map((category, index) => {
                    const potentialSavings = calculatePotentialSavings(category.total);
                    const medals = ['🥇', '🥈', '🥉'];

                    return (
                        <div
                            key={category.category}
                            style={{
                                padding: '1.5rem',
                                background: 'var(--card-background-color)',
                                borderRadius: '8px',
                                border: '1px solid var(--card-border-color)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                transition: 'transform 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{medals[index]}</span>
                                    <strong style={{ fontSize: '1.1rem' }}>{category.category}</strong>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--muted-color)' }}>
                                    {category.count} transactions • Total: ${category.total.toFixed(2)}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.85rem', color: 'var(--muted-color)', marginBottom: '0.25rem' }}>
                                    Potential Savings
                                </div>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>
                                    ${potentialSavings.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.1) 0%, rgba(34, 197, 94, 0.1) 100%)',
                    borderRadius: '8px',
                    border: '2px solid rgba(74, 222, 128, 0.3)',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontSize: '0.9rem', color: 'var(--muted-color)', marginBottom: '0.5rem' }}>
                    Total Potential Monthly Savings
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4ade80' }}>
                    ${totalPotentialSavings.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted-color)', marginTop: '0.5rem' }}>
                    That's ${(totalPotentialSavings * 12).toFixed(2)} per year! 🎯
                </div>
            </div>
        </article>
    );
}
