import { h, Component } from 'preact';
import './style.css';

export default class Erizabesu extends Component {
  state = { boardIndex: 0 };

  componentDidMount() {
    this.interval = setInterval(this.next.bind(this), 2000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  next() {
    this.setState({
      boardIndex: (this.state.boardIndex + 1) % this.props.data.length
    });
  }

  render({ data, className, ...props }, { boardIndex }) {
    return (
      <div
        {...props}
        class={['erizabesu', props.class, className].filter(Boolean).join(' ')}
      >
        <div
          class="boards"
          style={{
            transform: `translateX(${-boardIndex * 100}%)`,
            transition: 'transform 0.5s ease'
          }}
        >
          {data.map(board => (
            <a class="board" style={{ backgroundImage: `url(${board.url})` }} />
          ))}
        </div>
      </div>
    );
  }
}
