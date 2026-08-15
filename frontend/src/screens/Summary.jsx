import { motion } from 'motion/react'

export default function Summary({ payload }) {
  if (!payload) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}
    >
      <h2>Fin del juego</h2>
      <p style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>
        {payload.correctCount} de {payload.totalQuestions} correctas
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {payload.questions.map((q, i) => (
          <div
            key={i}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: q.correct ? '#1a3a2a' : '#3a1a1a',
              borderLeft: `4px solid ${q.correct ? '#4caf50' : '#e94560'}`,
            }}
          >
            <p style={{ fontWeight: 'bold' }}>{q.questionText}</p>
            <p>Tu respuesta: {q.chosenAnswer} {q.correct ? ' ✓' : ' ✗'}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '2rem', color: '#888', fontSize: '0.9rem' }}>
        Presioná cualquier tecla para volver al inicio
      </p>
    </motion.div>
  )
}
