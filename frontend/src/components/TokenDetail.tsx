import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { stellarService } from '../services/stellar'

export const TokenDetail: React.FC = () => {
  const { address } = useParams<{ address: string }>()
  const [token, setToken] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return
    stellarService
      .getTokenInfo(address)
      .then((t) => setToken(t))
      .catch((err) => setError(err.message || 'Unable to load token'))
  }, [address])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Token Detail</h2>
      <div className="p-4 rounded-lg border border-gray-300 bg-white">
        {error && <p className="text-red-500">{error}</p>}
        {!token && !error && <p className="text-gray-500">Loading token {address}...</p>}
        {token && <pre className="text-xs overflow-auto">{JSON.stringify(token, null, 2)}</pre>}
      </div>
    </div>
  )
}
