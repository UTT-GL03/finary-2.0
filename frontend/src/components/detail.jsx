
import { useParams } from 'react-router'

import { data } from '../../lib/data'

export function Detail() {
  const {id} = useParams()

  const detail = data.expenses.find(x => String(x.id) === id)

  

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

