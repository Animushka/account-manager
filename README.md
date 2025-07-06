# Account Manager

![Vue](https://img.shields.io/badge/Vue-3.3-green)
![Vuetify](https://img.shields.io/badge/Vuetify-3.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Pinia](https://img.shields.io/badge/Pinia-2.0-orange)

Система управления учетными записями с поддержкой LDAP и локальной аутентификации.

## 📌 Основные возможности

- ✅ Создание учетных записей (LDAP/локальные)
- ✅ Редактирование существующих записей
- ✅ Удаление учетных записей
- ✅ Валидация полей формы
- ✅ Автоматическое сохранение состояния
- ✅ Адаптивный интерфейс

## 🛠 Технологический стек

- **Frontend**:
  - Vue 3 (Composition API)
  - Vuetify 3 (UI компоненты)
  - Pinia (состояние приложения)
  - TypeScript
  - Vite (сборка)

- **Дополнительно**:
  - Vue Router
  - Pinia Persisted State

## 🚀 Быстрый старт

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Animushka/account-manager
   cd account-manager
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите сервер разработки:
   ```bash
   npm run dev
   ```

4. Для production-сборки:
   ```bash
   npm run build
   ```

## 🏗 Структура проекта

```
account-manager/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AccountForm.vue
│   │   └── AccountList.vue
│   ├── stores/
│   │   └── accountStore.ts
│   ├── types/
│   │   └── account.ts
│   ├── views/
│   │   └── HomeView.vue
│   ├── App.vue
│   └── main.ts
├── public/
├── package.json
└── vite.config.ts
```

## 📝 Особенности реализации

1. **Типы учетных записей**:
   - LDAP (без пароля)
   - Локальные (с обязательным паролем)

2. **Валидация**:
   - Логин: обязательное поле, макс. 100 символов
   - Пароль: обязателен для локальных записей
   - Метки: необязательные, макс. 50 символов

3. **Сохранение состояния**:
   - Данные сохраняются в localStorage
   - Восстанавливаются при перезагрузке страницы
