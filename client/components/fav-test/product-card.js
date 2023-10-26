import React from 'react'
import FavFcon from './fav-icon'

export default function ProductCard({
  id,
  name,
  price,
  is_favorite,
  handleTriggerFav,
}) {
  return (
    <li>
      <FavFcon
        is_favorite={is_favorite}
        id={id}
        handleTriggerFav={handleTriggerFav}
      />
      <span>
        {name} / {price}
      </span>
    </li>
  )
}
