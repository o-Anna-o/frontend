// src/hooks/useShips.ts
import { useEffect, useRef, useState } from 'react'
import { getShips, ShipsFilterParams } from '../api'

type UseShipsArg = string | ShipsFilterParams | undefined

export function useShips(param?: UseShipsArg) {
  const [ships, setShips] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const paramRef = useRef<UseShipsArg>(param)
  const fetchIdRef = useRef(0)

  function normalize(p: UseShipsArg): ShipsFilterParams | undefined {
    if (!p) return undefined
    if (typeof p === 'string') {
      const st = p.trim()
      return st ? { search: st } : undefined
    }
    return p
  }

  // keep paramRef in sync
  useEffect(() => {
    paramRef.current = param
  }, [param])

  useEffect(() => {
    let cancelled = false
    const fetchId = ++fetchIdRef.current

    const timer = setTimeout(() => {
      (async () => {
        setLoading(true)
        setError(null)
        try {
          const params = normalize(paramRef.current)
          console.log('[useShips] load with params:', params)
          const res = await getShips(params)
          console.log("🚢 API RAW RESPONSE:", res)

          if (cancelled || fetchId !== fetchIdRef.current) return
          const arr = Array.isArray(res) ? res : (res?.data ?? res ?? [])
          let result = Array.isArray(arr) ? arr : []
          
          // дополнительная фильтрация на фронтенде:
          if (params?.search) {
            const searchLower = params.search.toLowerCase()
            result = result.filter(ship =>
              typeof ship.Name === 'string' && ship.Name.toLowerCase().includes(searchLower)
            )
          }

          setShips(result)
        } catch (e: any) {
          if (!cancelled) setError(String(e?.message ?? e))
        } finally {
          if (!cancelled) setLoading(false)
        }
      })()
    }, 250)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
   
  }, [param])

  return { ships, loading, error, setShips }
}
