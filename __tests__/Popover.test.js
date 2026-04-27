import { Popover } from '../src/Popover';

describe('Popover', () => {
  let btn;
  let popover;

  beforeEach(() => {
    document.body.innerHTML = `
      <button
        id="btn"
        data-toggle="popover"
        data-title="Popover title"
        data-content="Amazing content"
      >Click</button>
    `;
    btn = document.getElementById('btn');
  });

  afterEach(() => {
    if (popover) {
      popover.destroy();
      popover = null;
    }
    document.body.innerHTML = '';
  });

  // --- show / hide / isOpen ---

  test('isOpen() возвращает false изначально', () => {
    popover = new Popover(btn);
    expect(popover.isOpen()).toBe(false);
  });

  test('show() добавляет .popover в DOM', () => {
    popover = new Popover(btn);
    popover.show();
    expect(document.querySelector('.popover')).not.toBeNull();
  });

  test('show() отображает title из data-атрибута', () => {
    popover = new Popover(btn);
    popover.show();
    expect(document.querySelector('.popover-header').textContent).toBe('Popover title');
  });

  test('show() отображает content из data-атрибута', () => {
    popover = new Popover(btn);
    popover.show();
    expect(document.querySelector('.popover-body').textContent).toBe('Amazing content');
  });

  test('isOpen() возвращает true после show()', () => {
    popover = new Popover(btn);
    popover.show();
    expect(popover.isOpen()).toBe(true);
  });

  test('show() повторно не создаёт второй popover', () => {
    popover = new Popover(btn);
    popover.show();
    popover.show();
    expect(document.querySelectorAll('.popover').length).toBe(1);
  });

  test('hide() удаляет .popover из DOM', () => {
    popover = new Popover(btn);
    popover.show();
    popover.hide();
    expect(document.querySelector('.popover')).toBeNull();
  });

  test('isOpen() возвращает false после hide()', () => {
    popover = new Popover(btn);
    popover.show();
    popover.hide();
    expect(popover.isOpen()).toBe(false);
  });

  test('hide() не бросает ошибку если popover уже скрыт', () => {
    popover = new Popover(btn);
    expect(() => popover.hide()).not.toThrow();
  });

  // --- toggle по клику ---

  test('клик по кнопке показывает popover', () => {
    popover = new Popover(btn);
    btn.click();
    expect(popover.isOpen()).toBe(true);
  });

  test('второй клик по кнопке скрывает popover', () => {
    popover = new Popover(btn);
    btn.click();
    btn.click();
    expect(popover.isOpen()).toBe(false);
  });

  test('клик вне popover скрывает его', () => {
    popover = new Popover(btn);
    btn.click();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(popover.isOpen()).toBe(false);
  });

  // --- позиционирование ---

  test('show() устанавливает style.left и style.top', () => {
    popover = new Popover(btn);
    popover.show();
    const el = document.querySelector('.popover');
    expect(el.style.left).toBeDefined();
    expect(el.style.top).toBeDefined();
  });

  // --- destroy ---

  test('destroy() скрывает popover и снимает обработчик', () => {
    popover = new Popover(btn);
    popover.show();
    popover.destroy();
    expect(popover.isOpen()).toBe(false);
    btn.click();
    expect(popover.isOpen()).toBe(false);
    popover = null;
  });
});
