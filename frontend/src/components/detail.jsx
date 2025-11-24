import { useEffect, useState } from "react";
import { useParams } from 'react-router'

export function Detail() {
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
  
      const query = {
        selector: {
          id: String(id),
        },
      };
      const response = await fetch("http://localhost:5984/finary/_find", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("admin:secret"),
        },
        body: JSON.stringify(query),
      }); 
      const result = await response.json();
      const doc = result.docs[0];
      console.log("Doc: ", doc);
      setDetail(doc);
  
      setLoading(false);
    };
  
    fetchData();
  }, []);



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

