import { motion } from 'motion/react'

export default function Attract() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 0,
        padding: 0,
        textAlign: 'left',
      }}
    >
      {/* Columna izquierda — título */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22 }}
        style={{
          flex: '0 0 42%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 5vw, 5rem)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        }}
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
          fontSize: 'clamp(2rem, 5.5vmin, 4rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
        }}>
          Sesgos de género en la Inteligencia Artificial
        </h1>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 'clamp(0.9rem, 2vmin, 1.3rem)',
            color: 'var(--text-dim)',
          }}
        >
          Presioná cualquier botón para comenzar
        </motion.p>
      </motion.div>

      {/* Columna derecha — explicación */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'clamp(1rem, 3vh, 2rem)',
        padding: 'clamp(2rem, 5vw, 5rem)',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 22 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: 'clamp(14px, 2vw, 24px)',
            padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 2.5vw, 2.5rem)',
            borderLeft: '4px solid #4a6cf7',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.7rem, 1.2vmin, 0.9rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#4a6cf7',
            marginBottom: '0.6em',
          }}>
            ¿Qué son los sesgos de género?
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2.4vmin, 1.5rem)',
            color: 'var(--text)',
            lineHeight: 1.6,
          }}>
            Son estereotipos que asocian automáticamente roles, capacidades
            o características a un género en particular.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, type: 'spring', stiffness: 160, damping: 22 }}
          style={{
            background: 'var(--card-bg)',
            borderRadius: 'clamp(14px, 2vw, 24px)',
            padding: 'clamp(1.5rem, 3vh, 2.5rem) clamp(1.5rem, 2.5vw, 2.5rem)',
            borderLeft: '4px solid #9333ea',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.7rem, 1.2vmin, 0.9rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#9333ea',
            marginBottom: '0.6em',
          }}>
            ¿Por qué la IA puede estar sesgada?
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2.4vmin, 1.5rem)',
            color: 'var(--text)',
            lineHeight: 1.6,
          }}>
            La IA aprende de grandes volúmenes de texto humano y puede
            reproducir esos sesgos sin que nadie se lo haya enseñado
            explícitamente.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
