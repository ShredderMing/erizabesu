import { h } from 'preact'
import './style.css'

const Prev = ({ num, index, className, prevBoard, ...props }) => (
  <div
    {...props}
    class={['arrow left', props.class, className].filter(Boolean).join(' ')}
    onClick={e => {
      prevBoard()
      props.onClick && props.onClick(e)
    }}
  >
    <svg viewBox="-2 -2 34 64">
      <path
        d="M30 0 L0 30 L30 60"
        stroke="#FFF"
        stroke-width="3"
        fill="none"
        stroke-linejoin="miter"
      />
    </svg>
  </div>
)

const Next = ({ num, index, className, nextBoard, ...props }) => (
  <div
    {...props}
    class={['arrow right', props.class, className].filter(Boolean).join(' ')}
    onClick={e => {
      nextBoard()
      props.onClick && props.onClick(e)
    }}
  >
    <svg viewBox="-2 -2 34 64">
      <path
        d="M0 0 L30 30 L0 60"
        stroke="#FFF"
        stroke-width="3"
        fill="none"
        stroke-linejoin="miter"
      />
    </svg>
  </div>
)

export { Prev, Next }
