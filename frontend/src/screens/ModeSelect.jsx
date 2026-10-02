import { motion } from 'motion/react'

const MODES = [
  { letter: 'A', cls: 'opt-a', title: 'Sesgos de género', subtitle: 'en la Inteligencia Artificial' },
  { letter: 'B', cls: 'opt-b', title: 'Conocé qué hacemos en el InCo', subtitle: 'Problemas reales que se resuelven con computación' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
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

export default function ModeSelect() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p style={{
        fontSize: 'clamp(0.75rem, 1.4vmin, 1rem)',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        color: 'var(--text-dim)',
        marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
      }}>
        Trivia interactiva · FING
      </p>

      <h1 style={{
        fontSize: 'clamp(1.8rem, 5vmin, 3.8rem)',
        fontWeight: 800,
        marginBottom: 'clamp(2rem, 6vh, 4rem)',
      }}>
        ¿Qué trivia querés jugar?
      </h1>

      <motion.div
        className="options-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {MODES.map((m) => (
          <motion.div
            key={m.letter}
            className={`option-card ${m.cls}`}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <div className="option-letter">{m.letter}</div>
            <span className="option-text" style={{ fontWeight: 700 }}>{m.title}</span>
            <span className="option-text" style={{ fontSize: 'clamp(0.9rem, 2vmin, 1.4rem)', opacity: 0.85 }}>
              {m.subtitle}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          marginTop: 'clamp(1.5rem, 4vh, 3rem)',
          color: 'var(--text-dim)',
          fontSize: 'clamp(0.85rem, 2vmin, 1.3rem)',
        }}
      >
        Presioná A o B para elegir
      </motion.p>
    </motion.div>
  )
}
