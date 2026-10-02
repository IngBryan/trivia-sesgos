import { useState } from 'react'
import { motion } from 'motion/react'

const STAR_COLORS = ['#facc15', '#4a6cf7', '#0ea5a0', '#fff']
const CHIP_COLORS = ['#4a6cf7', '#0ea5a0', '#facc15']

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

const recapLabel = {
  fontSize: 'clamp(0.9rem, 2.2vmin, 1.5rem)',
  color: 'var(--text-dim)',
  marginBottom: '0.6rem',
}

// Resultado de la trivia de género: cuántas veces coincidió con la respuesta de la IA.
function GenderRecap({ payload }) {
  const { matches, total } = payload
  return (
    <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
      <p className="arcade-hint" style={recapLabel}>Tu resultado</p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.25, 1] }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontFamily: 'var(--arcade-font)',
          fontSize: 'clamp(3.5rem, 12vmin, 9rem)',
          lineHeight: 1,
          color: '#facc15',
          textShadow: '0 0 28px #eab308, 0 5px 0 #7c2d12',
        }}
      >
        {matches} / {total}
      </motion.div>
      <p style={{ fontSize: 'clamp(1rem, 2.6vmin, 1.8rem)', marginTop: '0.8rem' }}>
        Coincidiste con la IA en {matches} de {total} {total === 1 ? 'respuesta' : 'respuestas'}
      </p>
      <p style={{ fontSize: 'clamp(0.85rem, 2vmin, 1.3rem)', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
        La IA aprende de textos humanos y puede repetir sus sesgos.
      </p>
    </div>
  )
}

// Resultado de la trivia InCo: los grupos de investigación que fue descubriendo.
function IncoRecap({ payload }) {
  const { groups } = payload
  return (
    <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)', maxWidth: '90%' }}>
      <p className="arcade-hint" style={recapLabel}>Tu recorrido</p>
      <p style={{ fontSize: 'clamp(1.1rem, 3vmin, 2.2rem)', marginBottom: '1.2rem' }}>
        Hoy conociste {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'} de investigación
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
        {groups.map((g, i) => {
          const color = CHIP_COLORS[i % CHIP_COLORS.length]
          return (
            <motion.span
              key={g}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + 0.15 * i, type: 'spring', stiffness: 300, damping: 18 }}
              style={{
                padding: '0.5rem 1.1rem',
                borderRadius: '999px',
                border: '2px solid ' + color,
                boxShadow: '0 0 16px ' + color + '66',
                background: 'var(--card-bg)',
                fontSize: 'clamp(0.9rem, 2.2vmin, 1.5rem)',
                fontWeight: 700,
              }}
            >
              {g}
            </motion.span>
          )
        })}
      </div>
    </div>
  )
}

export default function Thanks({ payload }) {
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

      {payload?.mode === 'INCO' && <IncoRecap payload={payload} />}
      {payload?.mode === 'GENERO' && <GenderRecap payload={payload} />}

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
