import React, { useState } from 'react'
import ShipCard from '../components/ShipCard'
import { useShips } from '../hooks/useShips'

export default function ShipsList(){
  const [search, setSearch] = useState('')
  const [q, setQ] = useState('')
  const { ships } = useShips(q)

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <form className="page__search" onSubmit={(e)=>{ e.preventDefault(); setQ(search) }} style={{marginTop:10}}>
        <input className="search-input page__search-input page__search-item" type="text" name="search" placeholder="Поиск контейнеровоза" value={search} onChange={e=>setSearch(e.target.value)} />
        <button className="btn search-btn page__search-item" type="submit">Найти</button>
      </form>

      <ul className="ship-cards" style={{listStyle:'none', padding:0, marginTop:20}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:28, justifyContent:'center'}}>
          {ships.map(s=> <div key={s.ship_id ?? s.ShipID} style={{display:'flex', justifyContent:'center'}}><ShipCard ship={s} /></div>)}
        </div>
      </ul>
    </div>
  )
}
