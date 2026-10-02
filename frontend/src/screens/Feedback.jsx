import { motion } from 'motion/react'
import { Sparkles, UserRound } from 'lucide-react'

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


function IconCircle({ icon, gradient }) {
  return (
    <div style={{
      width: 'clamp(80px, 12vmin, 130px)',
      height: 'clamp(80px, 12vmin, 130px)',
      borderRadius: '50%',
      background: gradient,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      margin: '0 auto clamp(0.75rem, 2vh, 1.5rem)',
    }}>
      {icon}
    </div>
  )
}

function splitRows(photos) {
  const rows = Math.max(1, Math.round(Math.sqrt(photos.length)))
  const base = Math.floor(photos.length / rows)
  const extra = photos.length % rows
  const result = []
  let i = 0
  for (let r = 0; r < rows; r++) {
    const size = base + (r < extra ? 1 : 0)
    result.push(photos.slice(i, i + size))
    i += size
  }
  return result
}

const FRAME_COLORS = ['#4a6cf7', '#0ea5a0', '#facc15']

function PhotoAlbum({ photos, alt }) {
  if (photos.length === 0) return null

  let order = 0
  return (
    <div className="research-photo-frame">
      {splitRows(photos).map((row, r) => (
        <div className="research-photo-row" key={r}>
          {row.map((src) => {
            const i = order++
            return (
              <motion.div
                className="research-photo-cell"
                key={src}
                style={{ '--frame': FRAME_COLORS[i % FRAME_COLORS.length] }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: [0.7, 1.06, 1] }}
                transition={{ delay: 0.3 + 0.07 * i, duration: 0.4 }}
              >
                <img className="research-photo" src={src} alt={alt} />
                <span className="research-photo-corners" />
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function ResearchFeedback({ payload }) {
  const photos = payload.photoPaths ?? []

  return (
    <motion.div
      className="research-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 22 }}
    >
      <div className="research-col research-col-photo">
        {payload.chosenText && (
          <p className="research-chosen-label">{payload.chosenText}</p>
        )}
        <PhotoAlbum photos={photos} alt={payload.groupName} />
      </div>

      <div className="research-col research-col-info">
        <p className="research-group-name">{payload.groupName ?? 'Grupo por confirmar'}</p>
        <p className="research-description">{payload.groupDescription ?? 'Información del grupo próximamente.'}</p>
      </div>
    </motion.div>
  )
}

export default function Feedback({ payload }) {
  if (!payload) return null

  const isResearch = payload.type === 'INVESTIGACION'

  return (
    <motion.div
      className={`screen${isResearch ? ' screen-research' : ''}`}
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
          fontSize: 'clamp(0.75rem, 1.6vmin, 1.1rem)',
          color: 'var(--text-dim)',
          textTransform: 'uppercase',
          fontFamily: 'var(--arcade-font)',
          letterSpacing: '2px',
          marginBottom: isResearch ? 'clamp(0.4rem, 1vh, 0.75rem)' : 'clamp(0.75rem, 2vh, 1.5rem)',
        }}
      >
        Pregunta {payload.index} de {payload.total}
      </motion.p>

      {!isResearch && (
        <motion.h1 className="arcade-heading"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{
            fontSize: 'clamp(1.5rem, 5vmin, 3.5rem)',
            fontWeight: 700,
            marginBottom: 'clamp(1rem, 3vh, 2rem)',
          }}
        >
          {payload.questionText}
        </motion.h1>
      )}

      {isResearch && <ResearchFeedback payload={payload} />}

      {!isResearch && <motion.div
        className="feedback-columns"
        variants={columnsVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tu elección */}
        <motion.div
          className="fb-col"
          variants={colVariants}
          style={{
            border: '2px solid #0ea5a0',
            boxShadow: '0 0 28px rgba(14, 165, 160, 0.35)',
            background: 'linear-gradient(160deg, #0d1f2d 0%, var(--card-bg) 60%)',
          }}
        >
          <p className="fb-col-label" style={{ color: '#0ea5a0' }}>Tu elección</p>
          <IconCircle
            gradient="var(--option-b)"
            icon={<UserRound size="55%" />}
          />
          <p style={{
            fontSize: 'clamp(1.5rem, 3.5vmin, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.3,
          }}>{payload.chosenText}</p>
        </motion.div>

        {/* La IA elegiría */}
        <motion.div
          className="fb-col"
          variants={colVariants}
          style={{
            border: '2px solid #9333ea',
            boxShadow: '0 0 28px rgba(147, 51, 234, 0.35)',
            background: 'linear-gradient(160deg, #1a0d2d 0%, var(--card-bg) 60%)',
          }}
        >
          <p className="fb-col-label" style={{ color: '#9333ea' }}>La IA elegiría</p>
          <IconCircle
            gradient="var(--option-c)"
            icon={<Sparkles size="55%" />}
          />
          <p style={{
            fontSize: 'clamp(1.5rem, 3.5vmin, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            lineHeight: 1.3,
          }}>
            {payload.correctText ?? 'No registrada'}
          </p>
        </motion.div>

        {/* ¿Por qué? */}
        <motion.div
          className="fb-col por-que"
          variants={colVariants}
          style={{
            border: '2px solid #4a6cf7',
            boxShadow: '0 0 28px rgba(74, 108, 247, 0.35)',
            background: 'linear-gradient(160deg, #0d1228 0%, var(--card-bg) 60%)',
          }}
        >
          <p className="fb-col-label" style={{ color: '#4a6cf7' }}>¿Por qué?</p>
          <p className="fb-col-text">
            {payload.explanation ??
              'La IA aprende de grandes volúmenes de texto humano y reproduce los estereotipos de género que aparecen con frecuencia en esos datos.'}
          </p>
        </motion.div>
      </motion.div>}

      <motion.p className="arcade-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: isResearch ? 'clamp(0.4rem, 1vh, 0.75rem)' : 'clamp(1.5rem, 4vh, 3rem)',
          color: 'var(--text-dim)',
          fontSize: 'clamp(0.75rem, 1.6vmin, 1.1rem)',
        }}
      >
        Presioná cualquier botón para continuar
      </motion.p>
    </motion.div>
  )
}
