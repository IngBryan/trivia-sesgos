import { motion } from 'motion/react'

export default function Intro() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          fontSize: 'clamp(1.6rem, 5vmin, 3.5rem)',
          fontWeight: 700,
          marginBottom: 'clamp(1rem, 3vh, 2rem)',
        }}
      >
        ¿Cómo completaría esta frase una inteligencia artificial?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          fontSize: 'clamp(1rem, 2.5vmin, 1.6rem)',
          color: 'var(--text-dim)',
          maxWidth: '700px',
          lineHeight: 1.6,
        }}
      >
        Vas a ver una serie de frases incompletas. Elegí la opción que creas que
        la IA elegiría para completarla.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ delay: 0.5, duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontSize: 'clamp(0.85rem, 2vmin, 1.2rem)',
          color: 'var(--text-dim)',
          marginTop: 'clamp(1.5rem, 4vh, 3rem)',
        }}
      >
        Presioná cualquier botón para comenzar
      </motion.p>
    </motion.div>
  )
}
