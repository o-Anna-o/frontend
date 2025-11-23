import { useEffect, useState } from 'react'
import { getShips, ShipsFilterParams } from '../api'

type ShipForFilter = { Name?: string; [key: string]: any }

export function useShips(appliedSearch?: string) {
  const [ships, setShips] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const fetchShips = async () => {
      setLoading(true)
      setError(null)
      try {
        const params: ShipsFilterParams | undefined = appliedSearch
          ? { search: appliedSearch }
          : undefined
        const res = await getShips(params)
        let arr = Array.isArray(res) ? res : res?.data ?? res ?? []

        // фронтенд фильтрация по Name
        if (params?.search) {
          const searchLower = params.search.toLowerCase()
          arr = arr.filter(
            (ship: ShipForFilter) =>
              typeof ship.Name === 'string' &&
              ship.Name.toLowerCase().includes(searchLower)
          )
        }

        if (!cancelled) setShips(arr)
      } catch (e: any) {
        if (!cancelled) setError(String(e?.message ?? e))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchShips()
    return () => { cancelled = true }
  }, [appliedSearch])

  return { ships, loading, error, setShips }
}
