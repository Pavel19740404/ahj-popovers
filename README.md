# Popovers

[![Build Status](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/deploy.yml)

🔗 **[GitHub Pages — Live Demo](https://YOUR_USERNAME.github.io/YOUR_REPO/)**

Реализация Tooltip-виджета (аналог Bootstrap Popover) на чистом JavaScript без jQuery. Домашнее задание к занятию «Работа с HTML-формами».

---

## Функциональность

- Tooltip отображается **справа** от поля ввода, выровнен по вертикали по центру
- Позиционирование в **px** (без translate/translate3d)
- Поддержка **нескольких** одновременных tooltip через уникальные id
- Валидация формы с показом сообщений об ошибках
- Сохранение данных формы в `localStorage` при уходе со страницы

## Установка и запуск

```bash
npm install
npm start         # дев-сервер на http://localhost:8080
npm run build     # production-сборка в /dist
npm test          # авто-тесты
npm run coverage  # покрытие тестами
npm run lint      # ESLint
```

## Тесты

Написаны на **Jest + JSDOM**. Покрывают:
- конструктор — инициализация пустого массива `_tooltips`
- `showTooltip()` — добавление в DOM, текст, числовой id, уникальность id, запись в `_tooltips`
- `removeTooltip()` — удаление из DOM и из `_tooltips`, удаление только нужного tooltip

## Структура проекта

```
├── src/
│   ├── index.html        # HTML-шаблон с формой
│   ├── index.js          # Точка входа (импорт стилей и app)
│   ├── app.js            # Логика формы и валидации
│   ├── tooltip.js        # Класс Tooltip
│   └── styles.css        # Стили
├── __tests__/
│   └── Tooltip.test.js   # Авто-тесты (JSDOM)
├── __mocks__/
│   └── fileMock.js       # Мок для CSS/HTML в Jest
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions: тесты + сборка + деплой
├── .babelrc
├── .browserslistrc
├── .eslintrc.json
├── .gitignore
├── jest.config.js
├── webpack.config.js
└── package.json
```
