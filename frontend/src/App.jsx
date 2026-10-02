import { useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useTriviaStream } from './lib/useTriviaStream'
import ModeSelect from './screens/ModeSelect'
import Attract from './screens/Attract'
import IncoAttract from './screens/IncoAttract'
import Intro from './screens/Intro'
import Question from './screens/Question'
import Feedback from './screens/Feedback'
import Thanks from './screens/Thanks'

const SCREENS = {
  MODE_SELECT: ModeSelect,
  ATTRACT: Attract,
  INCO_ATTRACT: IncoAttract,
  INTRO: Intro,
  QUESTION: Question,
  FEEDBACK: Feedback,
  THANKS: Thanks,
}

function App() {
  const state = useTriviaStream()
  const Screen = SCREENS[state.screen] || ModeSelect

  useEffect(() => {
    const map = { '1': '0', '2': '1', '3': '2', a: '0', b: '1', c: '2' }
    const onKey = (e) => {
      const value = map[e.key]
      const type = value !== undefined ? 'SELECT' : 'ANY'
      fetch('/api/input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, value: value ?? e.key }),
      })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Screen key={state.screen} payload={state.payload} />
    </AnimatePresence>
  )
}

export default App
