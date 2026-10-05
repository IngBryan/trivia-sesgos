import { motion } from 'motion/react'

// Pantalla inicial de la trivia INCO: mismo diseño que Attract (género).
export default function IncoAttract() {
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
          fontSize: 'clamp(0.75rem, 1.4vmin, 20rem)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--text-dim)',
          marginBottom: 'clamp(1rem, 2.5vh, 2rem)',
        }}>
          Trivia interactiva · InCo
        </p>

        <h1 style={{
          fontSize: 'clamp(2rem, 5.5vmin, 20rem)',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: 'clamp(2rem, 5vh, 4rem)',
        }}>
          Conocé qué hacemos en el InCo
        </h1>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 'clamp(0.9rem, 2vmin, 20rem)',
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
            borderLeft: '4px solid #0ea5a0',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.9rem, 2vmin, 20rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#0ea5a0',
            marginBottom: '0.6em',
          }}>
            ¿Qué hacemos en el InCo?
          </p>
          <p style={{
            fontSize: 'clamp(1.1rem, 3.2vmin, 20rem)',
            color: 'var(--text)',
            lineHeight: 1.6,
          }}>
            Investigamos cómo usar la computación para resolver problemas reales
            vinculados a: la salud, el campo, la seguridad, la educación y mucho más.
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
            borderLeft: '4px solid #eab308',
          }}
        >
          <p style={{
            fontSize: 'clamp(0.9rem, 2vmin, 20rem)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: '#eab308',
            marginBottom: '0.6em',
          }}>
            ¿Cómo se juega?
          </p>
          <p style={{
            fontSize: 'clamp(1.1rem, 3.2vmin, 20rem)',
            color: 'var(--text)',
            lineHeight: 1.6,
          }}>
            Elegí la problemática que más te interese y descubrí
            qué grupo de investigación trabaja en resolverla.
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
