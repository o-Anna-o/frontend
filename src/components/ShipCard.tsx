import React from 'react'
import defaultImg from '../assets/default-ship.png'
import { addShipToRequest } from '../api'
import { getToken } from '../auth'
import { useNavigate } from 'react-router-dom'

export default function ShipCard({ship}:{ship:any}){
  const buildImgSrc = (p?: string|null) => {
    if(!p) return defaultImg;
    try { new URL(p); return p } catch(e) { return 'http://localhost:9000/loading-time-img/img/' + p }
  }
  const src = buildImgSrc(ship.photo_url ?? ship.PhotoURL)
  const id = ship.ship_id ?? ship.ShipID
  const name = ship.name ?? ship.Name
  const capacity = ship.capacity ?? ship.Capacity
  const cranes = ship.cranes ?? ship.Cranes
  const navigate = useNavigate()

  const handleAdd = async (e:any) => {
    e.preventDefault()
    const token = getToken()
    if(!token) {
      navigate('/login')
      return
    }
    try {
      await addShipToRequest(Number(id))
      window.dispatchEvent(new Event('lt:basket:refresh'))
      alert('Корабль добавлен в заявку')
    } catch(err:any) {
      alert('Ошибка при добавлении: ' + (err.message || 'unknown'))
    }
  }

  return (
    <div className="ship-item" style={{maxWidth:660, backgroundColor:'#3A3A3A', padding:40, borderRadius:5, display:'flex', flexDirection:'column', alignItems:'center', gap:26}}>
      <div className="ship-image" style={{width:561}}>
        <img src={src} alt={name} style={{maxWidth:'100%', maxHeight:318, objectFit:'contain'}} onError={(e:any)=>{ e.target.style.display='none' }} />
      </div>

      <h2><a href={'/ship/' + id} style={{color:'#fff', textDecoration:'none'}}>{name}</a></h2>

      <div className="ship-item-text" style={{width:489, textAlign:'left', display:'flex', flexDirection:'column', gap:18}}>
        <p><b>Вместимость:</b> {capacity} TEU</p>
        <p><b>Краны:</b> {cranes} одновременно</p>
      </div>

      <div style={{width:489}}>
        <form onSubmit={handleAdd} style={{display:'inline'}}>
          <button type="submit" className="btn card-btn" style={{width:'100%'}}>Добавить</button>
        </form>
      </div>
    </div>
  )
}
