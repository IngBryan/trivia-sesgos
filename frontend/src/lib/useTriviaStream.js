import { useState, useEffect, useRef } from 'react'

export function useTriviaStream() {
  const [state, setState] = useState({ version: 0, screen: 'MODE_SELECT', payload: null, transition: 'fade' })
  const versionRef = useRef(0)

  useEffect(() => {
    const es = new EventSource('/api/stream')

    es.addEventListener('screen', (e) => {
      const data = JSON.parse(e.data)
      if (data.version > versionRef.current) {
        versionRef.current = data.version
        setState(data)
      }
    })

    es.onerror = () => {
      // EventSource se reconecta solo
    }

    return () => es.close()
  }, [])

  return state
}
