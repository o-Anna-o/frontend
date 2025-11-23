// src/components/ShipListIcon.tsx

import React from 'react'
import { Link } from 'react-router-dom'

export default function ShipListIcon() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <Link to="/ships">
        <img
          src="/resources/img/home-img.svg"
          alt="home"
          style={{ height: 40 }}
        />
      </Link>
    </div>
  )
}
