import { motion } from 'motion/react'

export default function Attract() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          fontSize: 'clamp(2rem, 6vmin, 4.5rem)',
          fontWeight: 700,
          marginBottom: 'clamp(1rem, 3vh, 2rem)',
        }}
      >
        <motion.span
          animate={{
            textShadow: [
              '0 0 20px rgba(74, 108, 247, 0)',
              '0 0 40px rgba(74, 108, 247, 0.4)',
              '0 0 20px rgba(74, 108, 247, 0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Trivia de Sesgos
        </motion.span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: [0.4, 1, 0.4], y: 0 }}
        transition={{
          opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 0.6, delay: 0.3 },
        }}
        style={{
          fontSize: 'clamp(1rem, 2.5vmin, 1.6rem)',
          color: 'var(--text-dim)',
        }}
      >
        Presioná cualquier botón para comenzar
      </motion.p>
    </motion.div>
  )
}
