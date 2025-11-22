import React from 'react'

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
      <a href="/ships">
        <img
          src="/resources/img/home-img.svg"
          alt="home"
          style={{ height: 40 }}
        />
      </a>
    </div>
  )
}
