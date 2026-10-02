import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const TARGET = [9, 9, 9]
const SETTLE_MS = [300, 450, 600]
const TICK_MS = 25

// Puntaje estilo arcade: los dígitos giran rápido y se frenan de a uno hasta quedar en 999.
function ScoreCounter({ onDone }) {
  const [digits, setDigits] = useState([0, 0, 0])
  const [done, setDone] = useState(false)
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      const t = Date.now() - start
      setDigits(TARGET.map((d, i) => (t >= SETTLE_MS[i] ? d : Math.floor(Math.random() * 10))))
      if (t >= SETTLE_MS[SETTLE_MS.length - 1]) {
        clearInterval(id)
        setDone(true)
        onDoneRef.current?.()
      }
    }, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
      <p className="arcade-hint" style={{ fontSize: 'clamp(0.9rem, 2.2vmin, 1.5rem)', color: 'var(--text-dim)', marginBottom: '0.6rem' }}>
        Your score
      </p>
      <motion.div
        animate={done ? { scale: [1, 1.15, 1] } : {}}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', gap: 'clamp(0.4rem, 1.2vmin, 1rem)', justifyContent: 'center' }}
      >
        {digits.map((d, i) => (
          <div
            key={i}
            style={{
              width: 'clamp(3.2rem, 11vmin, 8rem)',
              height: 'clamp(4.2rem, 14vmin, 10rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--arcade-font)',
              fontSize: 'clamp(3rem, 11vmin, 8rem)',
              color: done ? '#facc15' : '#fff',
              background: 'var(--card-bg)',
              border: '3px solid ' + (done ? '#facc15' : 'rgba(255,255,255,0.35)'),
              borderRadius: '12px',
              boxShadow: done ? '0 0 30px rgba(250,204,21,0.6)' : '0 0 14px rgba(74,108,247,0.35)',
              textShadow: done ? '0 0 18px #eab308' : 'none',
            }}
          >
            {d}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

const STAR_COLORS = ['#facc15', '#4a6cf7', '#0ea5a0', '#fff']

// Estrellitas que suben por la pantalla, posiciones y tiempos fijos por render inicial.
function Stars() {
  const [stars] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      left: Math.random() * 100,
      size: 0.8 + Math.random() * 1.6,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 3,
      color: STAR_COLORS[i % STAR_COLORS.length],
    })),
  )
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
      {stars.map((st, i) => (
        <motion.span
          key={i}
          initial={{ y: '105vh', opacity: 0 }}
          animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: 180 }}
          transition={{ duration: st.duration, delay: st.delay, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            left: st.left + '%',
            fontSize: st.size + 'rem',
            color: st.color,
            textShadow: '0 0 10px ' + st.color,
          }}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export default function Thanks() {
  const [scored, setScored] = useState(false)

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <Stars />

      <p style={{
        fontSize: 'clamp(0.75rem, 1.4vmin, 1rem)',
        textTransform: 'uppercase',
          fontFamily: 'var(--arcade-font)',
        letterSpacing: '3px',
        color: 'var(--text-dim)',
        marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
      }}>
        ★ Trivia completada ★
      </p>

      <h1 className="arcade-title" style={{
        color: '#facc15',
        textShadow: '0 0 26px #eab308, 0 5px 0 #7c2d12',
        fontSize: 'clamp(2.2rem, 7vmin, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        marginBottom: 'clamp(2rem, 5vh, 4rem)',
      }}>
        ¡Gracias por participar!
      </h1>

      
      <ScoreCounter onDone={() => setScored(true)} />

      <div style={{ height: 'clamp(2rem, 5vmin, 4rem)', marginTop: 'calc(-1 * clamp(1rem, 3vh, 2.5rem))', marginBottom: 'clamp(1rem, 3vh, 2.5rem)' }}>
        {scored && (
          <motion.p
            initial={{ scale: 0, rotate: -8 }}
            animate={{ scale: [0, 1.4, 1], rotate: -4, opacity: [1, 1, 0, 0, 1] }}
            transition={{
              scale: { duration: 0.4 },
              opacity: { duration: 0.9, repeat: Infinity, times: [0, 0.4, 0.45, 0.5, 0.55], ease: 'linear' },
            }}
            style={{
              fontFamily: 'var(--arcade-font)',
              fontStyle: 'italic',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontSize: 'clamp(1.2rem, 4vmin, 3rem)',
              color: '#f43f5e',
              textShadow: '0 0 20px #f43f5e, 0 3px 0 rgba(0,0,0,0.6)',
            }}
          >
            ¡Nuevo récord!
          </motion.p>
        )}
      </div>

      <motion.p className="arcade-hint"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.52, 1] }}
        style={{ fontSize: 'clamp(0.9rem, 2vmin, 1.3rem)', color: 'var(--text-dim)' }}
      >
        Presioná cualquier botón para volver al inicio
      </motion.p>
    </motion.div>
  )
}
