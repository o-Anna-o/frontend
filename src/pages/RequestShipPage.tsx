import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestShip } from '../api'

export default function RequestShipPage(){
  const { id } = useParams<{id:string}>()
  const [data, setData] = useState<any>(null)

  useEffect(()=>{
    if(!id) return
    getRequestShip(Number(id)).then(d=>setData(d)).catch(()=>setData(null))
  },[id])

  if(!data) return <div style={{padding:20}}>Заявка не найдена</div>

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <header style={{marginTop:10}}>
        <a href="/ships"><img className="home-img header-icon" src="/resources/img/home-img.svg" alt="home" /></a>
      </header>
      <div className="request" style={{width:1350, display:'flex', flexDirection:'column', alignItems:'center', gap:30, backgroundColor:'#3A3A3A', borderRadius:5, padding:'33px 120px'}}>
        <h1>Расчёт времени погрузки контейнеров</h1>
        <div style={{width:1198}}>
          <p><b>Комментарий:</b> {data.comment}</p>
          <p><b>Контейнеры 20ft:</b> {data.containers_20ft_count}</p>
          <p><b>Контейнеры 40ft:</b> {data.containers_40ft_count}</p>
          <p><b>Время погрузки:</b> {data.loading_time}</p>
        </div>
        <h2>Выбранные контейнеровозы</h2>
        <div className="request__cards" style={{display:'flex', flexDirection:'column', gap:30}}>
          {data.ships && data.ships.length ? data.ships.map((si:any, idx:number)=> (
            <div key={idx} className="request__card" style={{display:'flex', flexDirection:'row', gap:40, width:1198, border:'2px solid #AA9B7D', padding:30, borderRadius:5}}>
              <h2 className="request__card__title" style={{width:148}}>{si.ship?.name ?? si.Ship?.Name}</h2>
              {si.ship?.photo_url || si.Ship?.PhotoURL ? <img src={'http://localhost:9000/loading-time-img/img/' + (si.ship?.photo_url ?? si.Ship?.PhotoURL)} style={{width:360}} /> : null}
              <div className="ship-card__text">
                <p><b>Вместимость:</b> {si.ship?.capacity ?? si.Ship?.Capacity} TEU</p>
                <p><b>Габариты:</b> длина {si.ship?.length ?? si.Ship?.Length} м, ширина {si.ship?.width ?? si.Ship?.Width} м</p>
                <p><b>Краны:</b> {si.ship?.cranes ?? si.Ship?.Cranes} одновременно</p>
              </div>
              <div className="ship-card__other" style={{display:'flex', flexDirection:'column', gap:30}}>
                <div className="ship-card__other-item ship-card__cnt"><p>Количество</p><input className="ship-card__cnt-input" type="text" value={si.ships_count ?? si.ShipsCount} readOnly/></div>
              </div>
            </div>
          )) : <div>Нет выбранных контейнеровозов. Добавьте контейнеровоз для расчета.</div>}
        </div>
      </div>
    </div>
  )
}
