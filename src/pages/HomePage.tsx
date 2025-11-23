import React from 'react'
import { Link } from 'react-router-dom'
import ShipListIcon from '../components/ShipListIcon'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <ShipListIcon />

      <div style={{
        backgroundColor: '#3A3A3A',
        color: 'white',
        padding: '40px 100px',
        borderRadius: '10px',
        marginTop: '50px',
        textAlign: 'center'
      }}>
        <h1>Loading Time Ship</h1>
        <p style={{ marginTop: 20 }}>
          Добро пожаловать в Loading Time Ship! Здесь вы можете рассчитать времени погрузки контейнеровоза в порту.
        </p>
      </div>
    </div>
    
  )
}
