import { useEffect, useState } from "react";
import { useParams } from 'react-router'

export function Detail() {
  const {id} = useParams()
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/data.json")
      .then((x) => x.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
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

