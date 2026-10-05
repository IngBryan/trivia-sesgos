import { motion } from 'motion/react'
import { Bot, Cpu } from 'lucide-react'

const MODES = [
  {
    letter: 'A',
    title: 'Sesgos de género',
    subtitle: 'en la Inteligencia Artificial',
    Icon: Bot,
    bg: 'linear-gradient(160deg, #101a4f 0%, #1f3acb 100%)',
    fromX: -60,
  },
  {
    letter: 'B',
    title: 'Conocé qué hacemos en el InCo',
    subtitle: 'Problemas reales que se resuelven con computación',
    Icon: Cpu,
    bg: 'linear-gradient(160deg, #052e2c 0%, #0d9488 100%)',
    fromX: 60,
  },
]

function Panel({ mode }) {
  const { letter, title, subtitle, Icon, bg, fromX } = mode
  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(0.75rem, 2.5vh, 2rem)',
        padding: 'clamp(1.5rem, 4vw, 4rem)',
        background: bg,
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Icono grande de fondo, muy tenue */}
      <Icon
        strokeWidth={1}
        style={{
          position: 'absolute',
          width: '55vmin',
          height: '55vmin',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          opacity: 0.07,
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative',
        width: 'clamp(70px, 15vmin, 150px)',
        height: 'clamp(70px, 15vmin, 150px)',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        border: '3px solid rgba(255,255,255,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(2.2rem, 8vmin, 20rem)',
        fontWeight: 800,
        color: '#fff',
      }}>
        {letter}
      </div>

      <h2 style={{
        position: 'relative',
        fontSize: 'clamp(1.6rem, 5vmin, 20rem)',
        fontWeight: 800,
        lineHeight: 1.1,
        color: '#fff',
      }}>
        {title}
      </h2>

      <p style={{
        position: 'relative',
        fontSize: 'clamp(0.95rem, 2.4vmin, 20rem)',
        color: 'rgba(255,255,255,0.85)',
        maxWidth: '28ch',
      }}>
        {subtitle}
      </p>

      <p style={{
        position: 'relative',
        marginTop: 'clamp(0.5rem, 2vh, 1.5rem)',
        padding: '0.5rem 1.4rem',
        borderRadius: '999px',
        border: '2px solid rgba(255,255,255,0.7)',
        fontSize: 'clamp(0.9rem, 2.2vmin, 20rem)',
        fontWeight: 700,
        color: '#fff',
        letterSpacing: '1px',
      }}>
        Presioná {letter}
      </p>
    </motion.div>
  )
}

export default function ModeSelect() {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ padding: 0, justifyContent: 'flex-start' }}
    >
      <div style={{
        width: '100%',
        padding: 'clamp(0.75rem, 2.5vh, 2rem) 1rem',
        background: 'var(--card-bg)',
      }}>
        <p style={{
          fontSize: 'clamp(0.7rem, 1.3vmin, 20rem)',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: 'var(--text-dim)',
          marginBottom: '0.3rem',
        }}>
          Trivia interactiva · FING
        </p>
        <h1 style={{ fontSize: 'clamp(1.5rem, 4.5vmin, 20rem)', fontWeight: 800 }}>
          ¿Qué trivia querés jugar?
        </h1>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', minHeight: 0 }}>
        {MODES.map((m) => (
          <Panel key={m.letter} mode={m} />
        ))}
      </div>
    </motion.div>
  )
}
