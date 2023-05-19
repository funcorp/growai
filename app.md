1. Модель данных
   Сущность Поля
   Vitrine id, title, slug, order, cover
   Bot id, vitrineId, name, slug, avatarUrl, shortDescription, providerConfig

На старте — JSON‑seed в app/lib/seed.ts, потом — drizzle.

2. API‑эндпоинты (Route Handlers)
   Route Возвращает
   GET /api/vitrines?limit=2 все витрины c первыми 2 ботами
   GET /api/vitrines/[slug] полный список ботов витрины
   GET /api/bots/[id] метаданные + system‑prompt бота

3. Роутинг
   URL Компонент Сценарий
   / Home (RSC) Вертикальный стек витрин‑каруселей
   /v/[vitrineSlug] BotListPage (RSC) Все боты выбранной витрины
   /chat/[botSlug] ChatPage (CSR) Чат с ботом (берём из шаблона)

4. Главное UI‑дерево
   <VitrineCarousel> — full‑height секции со snap‑scroll.

<VitrinePreview> — заголовок + 2 <BotCard> + кнопка «Смотреть все».

<BotCard> — аватар, имя; клик → чат.

<BotListPage> — грид всех <BotCard> внутри витрины.

Стиль: Tailwind классы + компоненты shadcn/ui (Card, Avatar, Button).

5. Хранение и состояние
   История чатов и пользователей — как в оригинале, Postgres + Drizzle.

UI‑состояние (scroll pos, filters) — локальный useState или URL‑параметры.

Для WebView обрабатываем аппаратную кнопку «назад» через popstate.

6. Адаптация под WebView
<meta name="viewport" content="width=device-width,initial-scale=1" />.

Избегаем position: fixed поверх скролла (частая боль WebView).

Вся навигация внутри одного домена; не открываем внешние вкладки.

Выключаем PWA‑SW, если кэш WebView мешает обновлениям.

В мобильном приложении WebView указывает на production URL.
