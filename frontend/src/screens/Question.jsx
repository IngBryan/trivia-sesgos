import { motion } from 'motion/react'

const LETTERS = ['A', 'B', 'C']
const OPT_CLASSES = ['opt-a', 'opt-b', 'opt-c']

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22 },
  },
}

export default function Question({ payload }) {
  if (!payload) return null

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35 }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 'clamp(0.85rem, 2vmin, 1.3rem)',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)',
        }}
      >
        Pregunta {payload.index} de {payload.total}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 250, damping: 20 }}
        style={{
          fontSize: 'clamp(1.6rem, 5vmin, 3.8rem)',
          fontWeight: 700,
          marginBottom: 'clamp(1rem, 3vh, 2rem)',
        }}
      >
        ¿Cómo completaría esta frase una inteligencia artificial?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        style={{
          fontSize: 'clamp(1.5rem, 4.5vmin, 3.2rem)',
          fontWeight: 300,
          marginBottom: 'clamp(2rem, 6vh, 4rem)',
          lineHeight: 1.4,
        }}
      >
        "{payload.text}"
      </motion.p>

      <motion.div
        className="options-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {payload.options.map((op, i) => (
          <motion.div
            key={op.id}
            className={`option-card ${OPT_CLASSES[i] || ''}`}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <div className="option-letter">{LETTERS[i] || i + 1}</div>
            <span className="option-text">{op.text}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.6 }}
        style={{
          marginTop: 'clamp(1.5rem, 4vh, 3rem)',
          color: 'var(--text-dim)',
          fontSize: 'clamp(0.85rem, 2vmin, 1.3rem)',
        }}
      >
        Presioná A, B o C para elegir
      </motion.p>
    </motion.div>
  )
}
