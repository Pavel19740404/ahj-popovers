import { Tooltip } from '../src/tooltip';

describe('Tooltip', () => {
  let tooltip;

  beforeEach(() => {
    document.body.innerHTML = `
      <form class="form">
        <div class="form-control">
          <input id="login" name="login" type="text" />
        </div>
      </form>
    `;
    tooltip = new Tooltip();
  });

  afterEach(() => {
    document.querySelectorAll('.form-error').forEach((el) => el.remove());
    document.body.innerHTML = '';
  });

  // --- Constructor ---

  test('создаётся с пустым массивом _tooltips', () => {
    expect(tooltip._tooltips).toEqual([]);
  });

  // --- showTooltip() ---

  test('showTooltip() добавляет элемент .form-error в DOM', () => {
    const el = document.getElementById('login');
    tooltip.showTooltip('Ошибка!', el);
    expect(document.querySelector('.form-error')).not.toBeNull();
  });

  test('showTooltip() отображает переданное сообщение', () => {
    const el = document.getElementById('login');
    tooltip.showTooltip('Представьтесь, пожалуйста!', el);
    expect(document.querySelector('.form-error').textContent).toBe('Представьтесь, пожалуйста!');
  });

  test('showTooltip() возвращает числовой id', () => {
    const el = document.getElementById('login');
    const id = tooltip.showTooltip('Ошибка!', el);
    expect(typeof id).toBe('number');
  });

  test('showTooltip() возвращает уникальные id при каждом вызове', () => {
    const el = document.getElementById('login');
    const id1 = tooltip.showTooltip('Ошибка 1', el);
    const id2 = tooltip.showTooltip('Ошибка 2', el);
    expect(id1).not.toBe(id2);
  });

  test('showTooltip() добавляет запись в _tooltips', () => {
    const el = document.getElementById('login');
    tooltip.showTooltip('Ошибка!', el);
    expect(tooltip._tooltips.length).toBe(1);
  });

  test('showTooltip() сохраняет id и element в _tooltips', () => {
    const el = document.getElementById('login');
    const id = tooltip.showTooltip('Ошибка!', el);
    expect(tooltip._tooltips[0].id).toBe(id);
    expect(tooltip._tooltips[0].element).toBeInstanceOf(HTMLElement);
  });

  test('showTooltip() может добавить несколько tooltip одновременно', () => {
    const el = document.getElementById('login');
    tooltip.showTooltip('Ошибка 1', el);
    tooltip.showTooltip('Ошибка 2', el);
    expect(document.querySelectorAll('.form-error').length).toBe(2);
    expect(tooltip._tooltips.length).toBe(2);
  });

  test('showTooltip() устанавливает style.left и style.top', () => {
    const el = document.getElementById('login');
    tooltip.showTooltip('Ошибка!', el);
    const tooltipEl = document.querySelector('.form-error');
    expect(tooltipEl.style.left).toBeDefined();
    expect(tooltipEl.style.top).toBeDefined();
  });

  // --- removeTooltip() ---

  test('removeTooltip() удаляет элемент из DOM', () => {
    const el = document.getElementById('login');
    const id = tooltip.showTooltip('Ошибка!', el);
    tooltip.removeTooltip(id);
    expect(document.querySelector('.form-error')).toBeNull();
  });

  test('removeTooltip() удаляет запись из _tooltips', () => {
    const el = document.getElementById('login');
    const id = tooltip.showTooltip('Ошибка!', el);
    tooltip.removeTooltip(id);
    expect(tooltip._tooltips.length).toBe(0);
  });

  test('removeTooltip() удаляет только нужный tooltip', () => {
    const el = document.getElementById('login');
    const id1 = tooltip.showTooltip('Ошибка 1', el);
    tooltip.showTooltip('Ошибка 2', el);
    tooltip.removeTooltip(id1);
    const remaining = document.querySelectorAll('.form-error');
    expect(remaining.length).toBe(1);
    expect(remaining[0].textContent).toBe('Ошибка 2');
    expect(tooltip._tooltips.length).toBe(1);
  });
});

