import { useEffect } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'

const columnsVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const colVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 250, damping: 22 },
  },
}

export default function Feedback({ payload }) {
  useEffect(() => {
    if (payload?.correct) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4caf50', '#81c784', '#a5d6a7', '#4a6cf7', '#9333ea'],
        })
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [payload?.correct])

  if (!payload) return null

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        style={{
          fontSize: 'clamp(1.4rem, 4.5vmin, 3.2rem)',
          fontWeight: 700,
          marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)',
        }}
      >
        {payload.questionText}
      </motion.h1>

      {/* Resultado: correcto o incorrecto */}
      <motion.p
        initial={payload.correct
          ? { opacity: 0, scale: 0.5 }
          : { opacity: 0, x: 0 }}
        animate={payload.correct
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, x: [0, -12, 12, -12, 12, 0] }}
        transition={payload.correct
          ? { type: 'spring', stiffness: 400, damping: 12, delay: 0.2 }
          : { duration: 0.5, delay: 0.2 }}
        style={{
          fontSize: 'clamp(1.2rem, 3vmin, 2rem)',
          color: payload.correct ? 'var(--correct-border)' : 'var(--wrong-border)',
          fontWeight: 600,
          marginBottom: 'clamp(1.5rem, 5vh, 3.5rem)',
        }}
      >
        {payload.correct ? '¡Correcto!' : 'Incorrecto'}
      </motion.p>

      <motion.div
        className="feedback-columns"
        variants={columnsVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tu elección */}
        <motion.div className="fb-col" variants={colVariants}>
          <p className="fb-col-label">Tu elección</p>
          {payload.correct ? (
            <motion.div
              className="fb-col-letter"
              style={{ background: 'var(--correct-border)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.4 }}
            >
              ✓
            </motion.div>
          ) : (
            <motion.div
              className="fb-col-letter"
              style={{ background: 'var(--wrong-border)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1, x: [0, -8, 8, -8, 0] }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              ✗
            </motion.div>
          )}
          <p className="fb-col-text">{payload.chosenText}</p>
        </motion.div>

        {/* Respuesta correcta (solo si erró y hay correcta) */}
        {payload.correctText && !payload.correct && (
          <motion.div className="fb-col" variants={colVariants}>
            <p className="fb-col-label">Respuesta correcta</p>
            <motion.div
              className="fb-col-letter"
              style={{ background: 'var(--correct-border)' }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.55 }}
            >
              ✓
            </motion.div>
            <p className="fb-col-text">{payload.correctText}</p>
          </motion.div>
        )}

        {/* ¿Por qué? */}
        <motion.div className="fb-col por-que" variants={colVariants}>
          <p className="fb-col-label">¿Por qué?</p>
          <p className="fb-col-text">
            {payload.explanation ||
              'La respuesta de la IA refleja sesgos presentes en los datos con los que fue entrenada. Los modelos de lenguaje reproducen patrones y estereotipos que aparecen con frecuencia en los textos de internet.'}
          </p>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: 'clamp(1.5rem, 4vh, 3rem)',
          color: 'var(--text-dim)',
          fontSize: 'clamp(0.85rem, 2vmin, 1.3rem)',
        }}
      >
        Presioná cualquier botón para continuar
      </motion.p>
    </motion.div>
  )
}
