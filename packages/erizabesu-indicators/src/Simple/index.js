import { h, Component } from 'preact';
import './style.css';

export default class Simple extends Component {
  render({ num, index }) {
    const pos = Math.round(index);
    const children = [];
    for (let i = 0; i < num; i++) {
      if (i !== pos) {
        children[i] = <li />;
      } else {
        children[i] = <li class="active" />;
      }
    }
    return <ul class="indicator">{children}</ul>;
  }
}
