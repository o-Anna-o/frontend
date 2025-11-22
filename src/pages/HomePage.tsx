import React from 'react'
import { Link } from 'react-router-dom'
import ShipListIcon from '../components/ShipListIcon'
import Breadcrumbs from '../components/Breadcrumbs'

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <ShipListIcon />
      <Breadcrumbs />

      <div style={{
        backgroundColor: '#3A3A3A',
        color: 'white',
        padding: '40px 100px',
        borderRadius: '10px',
        marginTop: '50px',
        textAlign: 'center'
      }}>
        <h1>Расчёт времени погрузки контейнеровоза в порту</h1>
        <p style={{ marginTop: 20 }}>
          Добро пожаловать! Вы можете перейти к списку кораблей, чтобы рассчитать время погрузки.
        </p>
      </div>
    </div>
    
  )
}
