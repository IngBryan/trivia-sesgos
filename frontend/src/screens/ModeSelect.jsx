import { motion } from 'motion/react'
import { Bot, Cpu } from 'lucide-react'

const ARCADE_FONT = "Impact, Haettenschweiler, 'Arial Black', sans-serif"

const PANELS = {
  left: {
    letter: 'A',
    title: 'Sesgos de género',
    subtitle: 'en la Inteligencia Artificial',
    Icon: Bot,
    glow: '#4a6cf7',
    bg: 'linear-gradient(120deg, #0b1240 0%, #1f3acb 100%)',
    clip: 'polygon(0 0, 56% 0, 44% 100%, 0 100%)',
    fromX: '-100%',
    textStyle: { left: '5%', width: '35%', alignItems: 'flex-start', textAlign: 'left' },
    blinkDelay: 0,
  },
  right: {
    letter: 'B',
    title: 'Conocé qué hacemos en el InCo',
    subtitle: 'Problemas reales que se resuelven con computación',
    Icon: Cpu,
    glow: '#0ea5a0',
    bg: 'linear-gradient(240deg, #032b29 0%, #0d9488 100%)',
    clip: 'polygon(56% 0, 100% 0, 100% 100%, 44% 100%)',
    fromX: '100%',
    textStyle: { right: '5%', width: '35%', alignItems: 'flex-end', textAlign: 'right' },
    blinkDelay: 1.2,
  },
}

function Panel({ cfg }) {
  const { letter, title, subtitle, Icon, glow, bg, clip, fromX, textStyle, blinkDelay } = cfg
  return (
    <motion.div
      initial={{ x: fromX }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.1 }}
      style={{ position: 'absolute', inset: 0, clipPath: clip, background: bg, overflow: 'hidden' }}
    >
      {/* Pulso de brillo, alternado entre ambos lados */}
      <motion.div
        animate={{ opacity: [0, 0.35, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: blinkDelay }}
        style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 55%, ${glow}, transparent 65%)` }}
      />
      {/* Líneas de velocidad */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.12,
        background: 'repeating-linear-gradient(100deg, #fff 0 2px, transparent 2px 46px)',
      }} />
      {/* Icono gigante de fondo */}
      <Icon
        strokeWidth={1}
        style={{
          position: 'absolute',
          width: '60vmin',
          height: '60vmin',
          top: '50%',
          left: letter === 'A' ? '2%' : 'auto',
          right: letter === 'B' ? '2%' : 'auto',
          transform: 'translateY(-50%)',
          color: '#fff',
          opacity: 0.1,
        }}
      />

      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'clamp(0.75rem, 2.5vh, 2rem)',
        ...textStyle,
      }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: blinkDelay }}
          style={{
            width: 'clamp(70px, 16vmin, 160px)',
            height: 'clamp(70px, 16vmin, 160px)',
            borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #fff 0%, ${glow} 45%, #000 140%)`,
            boxShadow: `0 0 40px ${glow}, 0 8px 0 rgba(0,0,0,0.45)`,
            border: '4px solid rgba(255,255,255,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: ARCADE_FONT,
            fontSize: 'clamp(2.5rem, 9vmin, 6rem)',
            color: '#fff',
            textShadow: '0 3px 0 rgba(0,0,0,0.5)',
          }}
        >
          {letter}
        </motion.div>

        <h2 style={{
          fontFamily: ARCADE_FONT,
          fontSize: 'clamp(1.6rem, 6vmin, 4.2rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          textTransform: 'uppercase',
          lineHeight: 1.05,
          color: '#fff',
          textShadow: `0 0 24px ${glow}, 0 4px 0 rgba(0,0,0,0.5)`,
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: 'clamp(0.85rem, 2.2vmin, 1.5rem)',
          color: 'rgba(255,255,255,0.85)',
        }}>
          {subtitle}
        </p>

        <motion.p
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: blinkDelay }}
          style={{
            fontFamily: ARCADE_FONT,
            fontSize: 'clamp(1rem, 3vmin, 2rem)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#fff',
            textShadow: `0 0 14px ${glow}`,
          }}
        >
          Presioná {letter}
        </motion.p>
      </div>
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
      style={{ position: 'relative', padding: 0, overflow: 'hidden', background: '#05050f' }}
    >
      <Panel cfg={PANELS.left} />
      <Panel cfg={PANELS.right} />

      {/* Corte diagonal central */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <motion.line
          x1="56" y1="0" x2="44" y2="100"
          stroke="#fff"
          strokeWidth="5"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 10px #fff)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </svg>

      {/* Título superior */}
      <motion.h1
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 140, damping: 14 }}
        style={{
          position: 'absolute',
          top: 'clamp(0.75rem, 3vh, 2rem)',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: ARCADE_FONT,
          fontWeight: 400,
          fontSize: 'clamp(1.6rem, 5.5vmin, 4rem)',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: '#fff',
          textShadow: '0 0 20px rgba(255,255,255,0.7), 0 4px 0 rgba(0,0,0,0.6)',
        }}
      >
        ¡Elegí tu trivia!
      </motion.h1>

      {/* VS central */}
      <motion.div
        initial={{ scale: 0, rotate: -25 }}
        animate={{ scale: [0, 1.5, 1], rotate: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: ARCADE_FONT,
            fontStyle: 'italic',
            fontSize: 'clamp(3rem, 14vmin, 10rem)',
            color: '#facc15',
            textShadow: '0 0 30px #eab308, 5px 5px 0 #7c2d12, -2px -2px 0 #000',
          }}
        >
          VS
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
