import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getShips } from '../api'
import ShipListIcon from '../components/ShipListIcon'
import Breadcrumbs from '../components/Breadcrumbs'
import mock from '../mock'

// Используем any, потому что API может отдавать разные схемы (snake_case или PascalCase)
export default function ShipPage(){
  const { id } = useParams()
  const [ship, setShip] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    let cancelled = false

    const load = async () => {
      setLoading(true)
      try {
        const list = await getShips()       // пробуем backend
        if (cancelled) return

        // Нормализуем ответ: массив или { data: [...] } или {count,data}
        const arr: any[] = Array.isArray(list) ? list : list?.data ?? list?.ships ?? []

        // ищем, поддерживая оба варианта полей: ship_id или ShipID
        const s = arr.find((x: any) =>
          String(x.ship_id ?? x.ShipID ?? x.id ?? x.ID) === String(id)
        )

        if (!cancelled) setShip(s ?? null)
      } catch (err) {
        console.warn('Backend unavailable → using mock', err)

        if (cancelled) return

        // mock у тебя в snake_case, но на всякий случай поддерживаем оба
        const s = mock.find((m: any) =>
          String(m.ship_id ?? m.ShipID ?? m.id ?? m.ID) === String(id)
        )

        setShip(s ?? null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [id])

  if (loading) return <div style={{ padding: 20 }}>Загрузка...</div>
  if (!ship) return <div style={{ padding: 20 }}>Корабль не найден</div>

  // пытаемся получить фото из любых существующих полей
  const photo = ship.photo_url ?? ship.PhotoURL ?? ship.photo ?? ship.Photo
  const src = photo ? `http://localhost:9000/loading-time-img/img/${photo}` : ''

  // при выводе полей используем both-case fallback
  const name = ship.name ?? ship.Name ?? 'Без названия'
  const capacity = ship.capacity ?? ship.Capacity ?? ''
  const length = ship.length ?? ship.Length ?? ''
  const width = ship.width ?? ship.Width ?? ''
  const containers = ship.containers ?? ship.Containers ?? ''
  const cranes = ship.cranes ?? ship.Cranes ?? ''
  const description = ship.description ?? ship.Description ?? ''

  return (
    <>
      <ShipListIcon />
      <Breadcrumbs />
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <div className="ship-card" style={{backgroundColor:'#3A3A3A', borderRadius:5, padding:'33px 120px', display:'flex', flexDirection:'column', alignItems:'center', gap:30}}>
          
          <h1>{name}</h1>

          {src && (
            <img
              className="ship-card__img"
              src={src}
              alt={name}
              style={{width:814}}
              onError={(e:any) => { e.target.style.display = 'none' }}
            />
          )}

          <div className="ship-card__text" style={{width:814}}>
            <p><b>Вместимость:</b> {capacity} TEU</p>
            <p><b>Габариты:</b> длина {length} м, ширина {width} м</p>
            <p><b>Максимальное число контейнеров на 40 футов: </b>{containers} штук</p>
            <p><b>Максимальное число кранов:</b> {cranes} одновременно</p>
            <p><b>Особенности:</b> {description}</p>
          </div>

        </div>
      </div>
    </>
  )
}
