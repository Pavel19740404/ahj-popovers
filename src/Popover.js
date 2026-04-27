export class Popover {
  constructor(element) {
    this.element = element;
    this.popoverEl = null;

    this.onClick = this.onClick.bind(this);
    this.onDocumentClick = this.onDocumentClick.bind(this);

    this.element.addEventListener('click', this.onClick);
  }

  onClick(e) {
    e.stopPropagation();
    if (this.isOpen()) {
      this.hide();
    } else {
      this.show();
    }
  }

  onDocumentClick() {
    this.hide();
  }

  show() {
    if (this.isOpen()) return;

    const title = this.element.dataset.title;
    const content = this.element.dataset.content;

    const el = document.createElement('div');
    el.className = 'popover';

    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = title;

    const body = document.createElement('div');
    body.className = 'popover-body';
    body.textContent = content;

    el.appendChild(header);
    el.appendChild(body);

    document.body.appendChild(el);
    this.popoverEl = el;

    this.position();

    document.addEventListener('click', this.onDocumentClick);
  }

  hide() {
    if (!this.isOpen()) return;
    this.popoverEl.remove();
    this.popoverEl = null;
    document.removeEventListener('click', this.onDocumentClick);
  }

  isOpen() {
    return this.popoverEl !== null;
  }

  position() {
    const triggerRect = this.element.getBoundingClientRect();
    const popoverRect = this.popoverEl.getBoundingClientRect();

    const left = triggerRect.left + window.scrollX
      + triggerRect.width / 2
      - popoverRect.width / 2;

    const top = triggerRect.top + window.scrollY
      - popoverRect.height
      - 8;

    this.popoverEl.style.left = `${left}px`;
    this.popoverEl.style.top = `${top}px`;
  }

  destroy() {
    this.hide();
    this.element.removeEventListener('click', this.onClick);
  }
}
