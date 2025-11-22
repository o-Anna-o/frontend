import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getShips } from '../api'
import ShipListIcon from '../components/ShipListIcon'
import Breadcrumbs from '../components/Breadcrumbs'

export default function ShipPage(){
  const { id } = useParams()
  const [ship, setShip] = useState<any>(null)

  useEffect(()=>{
    if(!id) return
    getShips().then(list => {
      const s = list.find((x:any)=> String(x.ship_id ?? x.ShipID) === String(id))
      setShip(s || null)
    }).catch(()=> setShip(null))
  },[id])

  if(!ship) return <div style={{padding:20}}>Корабль не найден</div>

  const src = ship.photo_url ?? ship.PhotoURL ? ('http://localhost:9000/loading-time-img/img/' + (ship.photo_url ?? ship.PhotoURL)) : ''

  return (
    <>
    <ShipListIcon />
    <Breadcrumbs />
      
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      
      <div className="ship-card" style={{backgroundColor:'#3A3A3A', borderRadius:5, padding:'33px 120px', display:'flex', flexDirection:'column', alignItems:'center', gap:30}}>
        <h1>{ship.name ?? ship.Name}</h1>
        {src && <img className="ship-card__img" src={src} alt={ship.name ?? ship.Name} style={{width:814}}/>}
        <div className="ship-card__text" style={{width:814}}>
          <p><b>Вместимость:</b> {ship.capacity ?? ship.Capacity} TEU</p>
          <p><b>Габариты:</b> длина {ship.length ?? ship.Length} м, ширина {ship.width ?? ship.Width} м</p>
          <p><b>Максимальное число контейнеров на 40 футов: </b>{ship.containers ?? ship.Containers} штук</p>
          <p><b>Максимальное число кранов:</b> {ship.cranes ?? ship.Cranes} одновременно</p>
          <p><b>Особенности:</b> {ship.description ?? ship.Description}</p>
        </div>
      </div>
    </div>
    </>
  )
}
