import { getToken } from './auth'
const API_BASE = '/api'

export async function getShips(params?: { search?: string }) {
  const url = new URL(API_BASE + '/ships', window.location.origin)
  if (params?.search) url.searchParams.set('search', params.search)
  const res = await fetch(url.toString())
  const j = await res.json().catch(()=>null)
  if (j && j.data && Array.isArray(j.data)) return j.data
  if (j && Array.isArray(j)) return j
  return j ?? []
}

export async function addShipToRequest(shipId:number){
  console.log('[DEBUG api] addShipToRequest token=', getToken());
  const token = getToken();
  const headers: Record<string,string> = {'Content-Type':'application/json'};
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const response = await fetch(`${API_BASE}/ships/${shipId}/add-to-ship-bucket`, {
    method: 'POST',
    headers,
    credentials: 'include'
  });

  if (!response.ok) {
    let text = ''
    try { text = await response.text() } catch(e) {}
    throw new Error('HTTP ' + response.status + (text ? ': ' + text : ''))
  }
  try { return await response.json() } catch { return {} }
}

// получить одну заявку по id
export async function getRequestShip(id: number | string) {
  const url = new URL(`/api/request_ship/${id}`, window.location.origin).toString()
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(()=> '')
    throw new Error('HTTP ' + res.status + (text ? ': ' + text : ''))
  }
  const j = await res.json().catch(()=>null)
  if (j && j.data && typeof j.data === 'object') return j.data
  return j ?? {}
}

// получить корзину/черновик
export async function getRequestShipBasket() {
  console.log('[DEBUG api] getRequestShipBasket token=', getToken());
  const res = await fetch('/api/request_ship/basket')
  if (!res.ok) {
    const text = await res.text().catch(()=> '')
    throw new Error('HTTP ' + res.status + (text ? ': ' + text : ''))
  }
  const j = await res.json().catch(()=>null)
  if (!j) return null
  if (j.data && typeof j.data === 'object') {
    return {
      request_ship_id: j.data.request_ship_id ?? j.data.requestShipId ?? j.data.requestShipID ?? null,
      ships_count: j.data.ships_count ?? j.data.shipsCount ?? j.count ?? null,
      raw: j.data
    }
  }
  return j
}
