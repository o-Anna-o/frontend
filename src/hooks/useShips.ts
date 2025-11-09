import { useEffect, useState } from 'react'
import { getShips } from '../api'

export function useShips(search?: string) {
  const [ships, setShips] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(()=>{
    let cancelled = false
    setLoading(true); setError(null)

    const doFetch = async () => {
      try {
        const data = await getShips(search ? { search } : undefined)
        if (cancelled) return
        let arr = Array.isArray(data) ? data as any[] : []
        if (search && search.trim() !== '') {
          const q = search.trim().toLowerCase()
          arr = arr.filter(s => ((s.name ?? s.Name) ?? '').toString().toLowerCase().includes(q))
        }
        setShips(arr)
      } catch (e:any) {
        if(!cancelled) setError(String(e))
      } finally {
        if(!cancelled) setLoading(false)
      }
    }

    doFetch()
    return ()=>{ cancelled = true }
  }, [search])

  return { ships, loading, error, setShips }
}
