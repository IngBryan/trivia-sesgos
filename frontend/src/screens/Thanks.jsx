import { motion } from 'motion/react'

export default function Thanks() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <p style={{
        fontSize: 'clamp(0.75rem, 1.4vmin, 1rem)',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: 'var(--text-dim)',
        marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
      }}>
        Trivia completada
      </p>

      <h1 style={{
        fontSize: 'clamp(2.2rem, 7vmin, 5.5rem)',
        fontWeight: 800,
        lineHeight: 1.15,
        marginBottom: 'clamp(2rem, 5vh, 4rem)',
      }}>
        ¡Gracias por participar!
      </h1>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ fontSize: 'clamp(0.9rem, 2vmin, 1.3rem)', color: 'var(--text-dim)' }}
      >
        Presioná cualquier botón para volver al inicio
      </motion.p>
    </motion.div>
  )
}
