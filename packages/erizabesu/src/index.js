import { h, Component, cloneElement } from 'preact'
import './style.css'

export default class Erizabesu extends Component {
  static defaultProps = {
    autoplay: true,
    autoplaySpeed: 3000,
    allowMouseSwipe: true,
    infinite: true
  }
  state = { boardIndex: 0, transition: true }

  componentDidMount() {
    this.autoPlay()
    this.dataLength = this.props.data.length

    this.boards.addEventListener('mousedown', this.onMouseDown)
    this.boards.addEventListener('touchstart', this.onSwipeStart)
    this.boards.addEventListener('touchmove', this.onSwipeMove)
    this.boards.addEventListener('touchend', this.onSwipeEnd)
  }

  componentWillReceiveProps(nextProps) {
    this.dataLength = nextProps.data.length
  }

  componentWillUnmount() {
    this.clearAutoPlay()

    this.boards.removeEventListener('mousedown', this.onMouseDown)
    this.boards.removeEventListener('touchstart', this.onSwipeStart)
    this.boards.removeEventListener('touchmove', this.onSwipeMove)
    this.boards.removeEventListener('touchend', this.onSwipeEnd)
  }

  autoPlay = () => {
    if (this.props.autoplay && !this.interval) {
      this.interval = setInterval(this.next, this.props.autoplaySpeed)
    }
  }

  clearAutoPlay = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  prev = () => {
    const boardIndex = this.state.boardIndex - 1
    if (this.props.infinite && boardIndex === -1) {
      setTimeout(() => {
        this.setState({ boardIndex: this.dataLength - 1, transition: true })
      }, 0)
      this.setState({ boardIndex: this.dataLength, transition: false })
    } else if (boardIndex === -1) {
      this.setState({ boardIndex: this.dataLength - 1, transition: true })
    } else {
      this.setState({ boardIndex, transition: true })
    }
  }

  next = () => {
    const boardIndex = this.state.boardIndex + 1
    if (this.props.infinite && boardIndex === this.dataLength + 1) {
      setTimeout(() => {
        this.setState({ boardIndex: 1, transition: true })
      }, 0)
      this.setState({ boardIndex: 0, transition: false })
    } else if (!this.props.infinite && boardIndex === this.dataLength) {
      this.setState({ boardIndex: 0, transition: true })
    } else {
      this.setState({ boardIndex, transition: true })
    }
  }

  onSwipeStart = e => {
    this.clearAutoPlay()
    this.setState({ transition: false })
    this.startX = getX(e)
    this.startIndex = this.state.boardIndex
    this.startTime = Date.now()
  }

  onSwipeMove = e => {
    const deltaX = getX(e) - this.startX
    this.deltaX = deltaX
    let boardIndex = this.startIndex - deltaX / this.boards.clientWidth
    if (this.props.infinite) {
      if (boardIndex >= this.dataLength) {
        boardIndex -= this.dataLength
      } else if (boardIndex <= 0) {
        boardIndex += this.dataLength
      }
    }
    this.setState({
      boardIndex
    })
  }

  onSwipeEnd = e => {
    this.autoPlay()
    this.setState({ transition: true })
    const boardIndex = this.state.boardIndex
    const deltaX = this.deltaX
    const deltaTime = Date.now() - this.startTime

    if (!this.props.infinite) {
      if (boardIndex < 0) {
        return this.setState({ boardIndex: 0 })
      }
      if (boardIndex > this.dataLength - 1) {
        return this.setState({ boardIndex: this.dataLength - 1 })
      }
    }
    if (deltaTime < 250 && Math.abs(deltaX) > 20) {
      if (deltaX > 0) {
        return this.setState({ boardIndex: Math.floor(boardIndex) })
      }
      if (deltaX < 0) {
        return this.setState({ boardIndex: Math.ceil(boardIndex) })
      }
    }
    return this.setState({ boardIndex: Math.round(boardIndex) })
  }

  onMouseDown = e => {
    e.preventDefault()
    if (this.props.allowMouseSwipe) {
      this.mouseDown = true
      document.addEventListener('mouseup', this.onMouseUp)
      document.addEventListener('mousemove', this.onMouseMove)
      this.onSwipeStart(e)
    }
  }

  onMouseMove = e => {
    if (this.mouseDown) {
      this.onSwipeMove(e)
    }
  }

  onMouseUp = e => {
    this.mouseDown = false
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mousemove', this.onMouseMove)
    this.onSwipeEnd(e)
  }

  onBoardClick = e => {
    if (this.startX !== getX(e)) {
      e.preventDefault()
    }
  }

  swipeBoard = boardIndex => {
    boardIndex = boardIndex % this.dataLength
    this.clearAutoPlay()
    this.setState({ boardIndex, transition: true })
    this.autoPlay()
  }

  prevBoard = () => {
    this.clearAutoPlay()
    this.prev()
    this.autoPlay()
  }

  nextBoard = () => {
    this.clearAutoPlay()
    this.next()
    this.autoPlay()
  }

  render(
    { data, className, infinite, children, ...props },
    { boardIndex, transition }
  ) {
    const style = { transform: `translateX(${-boardIndex * 100}%)` }
    if (transition) style.transition = 'transform 0.5s ease'
    return (
      <div
        {...props}
        class={['erizabesu', props.class, className].filter(Boolean).join(' ')}
      >
        <div ref={c => (this.boards = c)} class="boards" style={style}>
          {data
            .concat(infinite ? [data[0]] : [])
            .map(board => (
              <a
                class="board"
                href={board.href}
                target={board.target}
                onClick={this.onBoardClick}
                style={{ backgroundImage: `url(${board.img})` }}
              />
            ))}
        </div>
        {children.map(child =>
          cloneElement(child, {
            num: data.length,
            index: boardIndex === data.length ? 0 : boardIndex,
            swipeBoard: this.swipeBoard,
            prevBoard: this.prevBoard,
            nextBoard: this.nextBoard
          })
        )}
      </div>
    )
  }
}

function getX(e) {
  if ('touches' in e) {
    return e.touches[0].pageX
  }
  return e.screenX
}
