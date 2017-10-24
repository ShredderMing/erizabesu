import { h, Component } from 'preact';
import './style.css';

export default class Erizabesu extends Component {
  static defaultProps = { autoPlay: true, allowMouseSwipe: true };
  state = { boardIndex: 0, transition: true };

  componentDidMount() {
    this.autoPlay();
    this.dataLength = this.props.data.length;

    this.boards.addEventListener('mousedown', this.onMouseDown);
    this.boards.addEventListener('touchstart', this.onSwipeStart);
    this.boards.addEventListener('touchmove', this.onSwipeMove);
    this.boards.addEventListener('touchend', this.onSwipeEnd);
  }

  componentWillUnmount() {
    this.clearAutoPlay();

    this.boards.removeEventListener('mousedown', this.onMouseDown);
    this.boards.removeEventListener('touchstart', this.onSwipeStart);
    this.boards.removeEventListener('touchmove', this.onSwipeMove);
    this.boards.removeEventListener('touchend', this.onSwipeEnd);
  }

  autoPlay = () => {
    if (this.props.autoPlay && !this.interval) {
      this.interval = setInterval(this.nextBoard, 2000);
    }
  };

  clearAutoPlay = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  nextBoard = () => {
    this.setState({
      boardIndex: (this.state.boardIndex + 1) % this.dataLength
    });
  };

  onSwipeStart = e => {
    this.clearAutoPlay();
    this.setState({ transition: false });
    this.startX = getX(e);
    this.startIndex = this.state.boardIndex;
  };

  onSwipeMove = e => {
    const deltaX = getX(e) - this.startX;
    this.setState({
      boardIndex: this.startIndex - deltaX / this.boards.clientWidth
    });
  };

  onSwipeEnd = e => {
    this.autoPlay();
    this.setState({ transition: true });
    let boardIndex = this.state.boardIndex;
    if (boardIndex < 0) {
      boardIndex = 0;
    } else if (boardIndex > this.dataLength - 1) {
      boardIndex = this.dataLength - 1;
    } else {
      boardIndex = Math.round(this.state.boardIndex);
    }
    this.setState({ boardIndex });
  };

  onMouseDown = e => {
    e.preventDefault();
    if (this.props.allowMouseSwipe) {
      this.mouseDown = true;
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
      this.onSwipeStart(e);
    }
  };

  onMouseMove = e => {
    if (this.mouseDown) {
      this.onSwipeMove(e);
    }
  };

  onMouseUp = e => {
    this.mouseDown = false;
    document.removeEventListener('mouseup', this.onMouseUp);
    document.removeEventListener('mousemove', this.onMouseMove);
    this.onSwipeEnd(e);
  };

  onBoardClick = e => {
    if (this.startX !== getX(e)) {
      e.preventDefault();
    }
  };

  render({ data, className, indicator, ...props }, { boardIndex, transition }) {
    return (
      <div
        {...props}
        class={['erizabesu', props.class, className].filter(Boolean).join(' ')}
      >
        <div
          ref={c => (this.boards = c)}
          class="boards"
          style={
            transition
              ? {
                  transform: `translateX(${-boardIndex * 100}%)`,
                  transition: 'transform 0.5s ease'
                }
              : {
                  transform: `translateX(${-boardIndex * 100}%)`
                }
          }
        >
          {data.map(board => (
            <a
              class="board"
              href={board.href}
              target={board.target}
              onClick={this.onBoardClick}
              style={{ backgroundImage: `url(${board.img})` }}
            />
          ))}
        </div>
        {indicator
          ? h(indicator, { num: data.length, index: boardIndex }, null)
          : ''}
      </div>
    );
  }
}

function getX(e) {
  if ('touches' in e) {
    return e.touches[0].pageX;
  }
  return e.screenX;
}
