// src/components/Navbar.tsx
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CART_ICON_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAn0lEQVR4nO3QMQ4BURSF4ckUEol1qGgobIGFaaxIi0ah0lAohE0QkU9GRvcGY15iIv72nXv+d2+S/BzoYq08a3RelTex8zl7tJ4JxnlwhbTE1imW+eykKNTGCVcM3i1/gH4+e0EvFJiKxywkyH4fi3NIcCepiKKerwnQwDZwhkVMwSYgmEcRlOUveMlfUG/BUTwOIcEoe4hRjmHVS9SHGxku7S0HDKVsAAAAAElFTkSuQmCC'

export default function Navbar() {
  const [count, setCount] = useState<number | null>(null)
  const [requestId, setRequestId] = useState<number | null>(null)

  async function fetchBasket() {
    const token = localStorage.getItem('lt_token')
    if (!token) {
      setCount(null)
      setRequestId(null)
      return
    }

    try {
      const res = await fetch('/api/request_ship/basket')
      const json = await res.json().catch(() => null)
      if (!json) {
        setCount(null)
        setRequestId(null)
        return
      }
      let c = null
      let id = null
      if (typeof json === 'object') {
        c = json.request_ship_count ?? json.count ?? null
        id = json.request_ship_id ?? null
        if (json.data && typeof json.data === 'object') {
          id = id ?? json.data.request_ship_id ?? json.data.requestShipId ?? json.data.requestShipID ?? null
          c = c ?? json.data.ships_count ?? json.data.shipsCount ?? json.count ?? null
        }
      }
      setCount(c)
      setRequestId(id)
    } catch (e) {
      setCount(null)
      setRequestId(null)
    }
  }

  useEffect(() => {
    fetchBasket()
    const handler = () => fetchBasket()
    window.addEventListener('lt:basket:refresh', handler)
    return () => window.removeEventListener('lt:basket:refresh', handler)
  }, [])

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 12, top: 12 }}>
        {count && count > 0 ? (
          <Link to={requestId ? `/request_ship/${requestId}` : '/request_ship'} className="cart-link" style={{ textDecoration: 'none' }}>
            <img className="loading_time-img cart-link-icon" src={'data:image/png;base64,' + CART_ICON_BASE64} alt="busket" />
            <span className="cart-count">{count}</span>
          </Link>
        ) : (
          <span className="cart-link cart-link--disabled">
            <img className="loading_time-img cart-link-icon--disabled" src={'data:image/png;base64,' + CART_ICON_BASE64} alt="busket" />
          </span>
        )}
      </div>

      <Link to="/ships" style={{
          textDecoration: 'none',
          color: '#fff',
          fontSize: '32px'
        }}>
        Контейнеровозы
      </Link>
    </div>
  )
}
