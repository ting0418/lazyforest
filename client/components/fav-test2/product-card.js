import React from 'react'
import FavFcon from './fav-icon'

export default function ProductCard({ id, name, price, handleTriggerFav }) {
  return (
    <li>
      <FavFcon id={id} handleTriggerFav={handleTriggerFav} />
      <span>
        {name} / {price}
      </span>
    </li>
  )
}
