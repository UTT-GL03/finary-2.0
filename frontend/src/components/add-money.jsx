import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function AddMoney({ open, setOpen, transactionType }) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");


    const [loading, setLoading] = useState(false);


    const handleSubmit = async () => {
        //setOpen(false);
        console.log(amount, category, date);
        setLoading(true);
        const amountNumber = transactionType === "outcome" ? Number(-amount) : Number(amount);
        const response = await fetch("http://localhost:5984/finary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + btoa("admin:secret"),
            },
            body: JSON.stringify({
                id: uuidv4(),
                amount: amountNumber,
                category,
                created_at: date,
                user_id: "10",
            }),
        });
        const result = await response.json();
        console.log(result);
        setLoading(false);
        setOpen(false);
    }
    return (
        <>
            <button onClick={() => setOpen(true)}>+ Add</button>
            <dialog open={open}>
                <article>
                    <h2>Add {transactionType}</h2>
                    <p>
                        Please enter the {transactionType} details below:
                    </p>
                    <ul>
                        <label>Amount: </label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <label>Category: </label>
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <label>Date: </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    </ul>
                    <footer>
                        <button class="secondary" onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                        <button onClick={() => handleSubmit()} disabled={loading}>{loading ? "Loading..." : "Confirm"}</button>
                    </footer>
                </article>
            </dialog>
        </>
    );
}