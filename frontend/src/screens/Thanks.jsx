import { motion } from 'motion/react'

const CHIP_COLORS = ['#4a6cf7', '#0ea5a0', '#facc15']

const recapLabel = {
  fontSize: 'clamp(0.9rem, 2.2vmin, 20rem)',
  color: 'var(--text-dim)',
  marginBottom: '0.6rem',
}

// Resultado de la trivia de género: cuántas veces coincidió con la respuesta de la IA.
function GenderRecap({ payload }) {
  const { matches, total } = payload
  return (
    <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)' }}>
      <p style={recapLabel}>Tu resultado</p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 16 }}
        style={{
          fontSize: 'clamp(3.5rem, 12vmin, 20rem)',
          fontWeight: 800,
          lineHeight: 1,
        }}
      >
        {matches} / {total}
      </motion.div>
      <p style={{ fontSize: 'clamp(1rem, 2.6vmin, 20rem)', marginTop: '0.8rem' }}>
        Coincidiste con la Inteligencia Artificial en {matches} de {total} {total === 1 ? 'respuesta' : 'respuestas'}
      </p>
      <p style={{ fontSize: 'clamp(0.85rem, 2vmin, 20rem)', color: 'var(--text-dim)', marginTop: '0.4rem' }}>
        La Inteligencia Artificial aprende de textos humanos y puede repetir sus sesgos.
      </p>
    </div>
  )
}

// Resultado de la trivia del Instituto de Computación: los grupos de investigación que fue descubriendo.
function IncoRecap({ payload }) {
  const { groups } = payload
  return (
    <div style={{ marginBottom: 'clamp(2rem, 5vh, 4rem)', maxWidth: '90%' }}>
      <p style={recapLabel}>Tu recorrido</p>
      <p style={{ fontSize: 'clamp(1.1rem, 3vmin, 20rem)', marginBottom: '1.2rem' }}>
        Hoy conociste {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'} de investigación
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
        {groups.map((g, i) => (
          <motion.span
            key={g}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + 0.15 * i, type: 'spring', stiffness: 300, damping: 18 }}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: '999px',
              border: '2px solid ' + CHIP_COLORS[i % CHIP_COLORS.length],
              background: 'var(--card-bg)',
              fontSize: 'clamp(0.9rem, 2.2vmin, 20rem)',
              fontWeight: 700,
            }}
          >
            {g}
          </motion.span>
        ))}
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
      <p style={{
        fontSize: 'clamp(0.75rem, 1.4vmin, 20rem)',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: 'var(--text-dim)',
        marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
      }}>
        Trivia completada
      </p>

      <h1 style={{
        fontSize: 'clamp(2.2rem, 7vmin, 20rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        marginBottom: 'clamp(2rem, 5vh, 4rem)',
      }}>
        ¡Gracias por participar!
      </h1>

      {payload?.mode === 'INCO' && <IncoRecap payload={payload} />}
      {payload?.mode === 'GENERO' && <GenderRecap payload={payload} />}

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 'clamp(0.9rem, 2vmin, 20rem)', color: 'var(--text-dim)' }}
      >
        Presioná cualquier botón para volver al inicio
      </motion.p>
    </motion.div>
  )
}
