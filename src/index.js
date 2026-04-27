import './style.css';
import { Popover } from './Popover';

const btn = document.querySelector('[data-toggle="popover"]');
if (btn) {
  new Popover(btn);
}
