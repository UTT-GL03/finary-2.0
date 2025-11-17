import { useEffect, useState } from "react";
import { useParams } from 'react-router'

export function Detail() {
  const {id} = useParams()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      try {
        const response = await fetch(
          "http://localhost:5984/finary/_all_docs?include_docs=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Basic " + btoa("admin:secret"), // your CouchDB credentials
            },
          }
        );
  
        const result = await response.json();
        console.log("Result: ", result);
  
        // Extract docs and filter only expenses
        const rows = result.rows;
        console.log("Rows: ", rows);
        const expenses = rows.map(row => row.doc);
        console.log("Expenses: ", expenses);
        setData({expenses: expenses}); // <-- this is now the array you want
  
      } catch (err) {
        console.error("Failed to fetch CouchDB:", err);
      }
  
      setLoading(false);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (data && id) {
      const foundDetail = data.expenses.find(x => String(x.id) === id);
      setDetail(foundDetail);
    }
  }, [data, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!detail) {
    return <p>Détail non trouvé</p>;
  }

  return (
    <main className="container">
        <h1>Détail de la dépense: </h1>
        <li>Reference du paiement: {id}</li>
        <li>Date du paiement: {detail.created_at}</li>
        <li>Montant du paiement: {detail.amount}</li>
        <li>Catégorie du paiement: {detail.category}</li>
    </main>
  )
}

