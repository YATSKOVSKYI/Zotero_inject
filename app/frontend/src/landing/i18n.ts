export const STYLES = ['ГОСТ 7.0.5-2008','APA 7th Edition','MLA 9th Edition','Vancouver','Chicago Author-Date','Harvard','IEEE','Nature','Science','Oxford','Turabian','AMA','CSE','ABNT','Elsevier','Springer','JSTOR','ACM','PLOS ONE','Cell','Lancet'];

export const I18N = {
  ru: {
    nav_what:'Что это', nav_how:'Как работает', nav_prompt:'Промпт', nav_free:'БЕСПЛАТНО', nav_cta:'Открыть',
    badge_free:'БЕСПЛАТНО', badge_ai:'Работает с любым ИИ', scroll_hint:'прокрутите',
    hero_label:'АВТОМАТИЗАЦИЯ ЦИТИРОВАНИЯ · ZOTERO NATIVE',
    h1a:'Преобразуйте [1][2][3] из ИИ', h1b:'в живые цитаты Zotero в Word.',
    hero_sub:'Zotero Inject берёт ваш .docx, .bib и экспорт Zotero HTML, связывает ссылки и возвращает документ с настоящими полями Zotero.',
    hero_point_1_k:'Вход',
    hero_point_1_v:'.docx + .bib + HTML из Zotero',
    hero_point_2_k:'Что делает',
    hero_point_2_v:'Меняет [1][2][3] на поля Zotero ADDIN',
    hero_point_3_k:'Результат',
    hero_point_3_v:'Add Bibliography и автопереформатирование',
    hero_demo_tag:'Пример на одном файле',
    hero_demo_before:'До обработки',
    hero_demo_before_note:'Текстовые маркеры, Zotero их не видит.',
    hero_demo_after:'После обработки',
    hero_demo_after_note:'Живые поля Zotero в том же .docx.',
    hero_demo_foot:'Откройте результат в Word и нажмите Add/Edit Bibliography: список литературы соберётся автоматически.',
    hm_free:'Бесплатно',
    cta_main:'Попробовать бесплатно →', cta_how:'Как это работает',
    p1a:'Ваша работа', p1b:'отправляете в ИИ', p1t:'НАЧАЛО',
    p2a:'Введение + [1][2][3]', p2t:'ИИ ПИШЕТ ЗА ВАС',
    p3b:'связывает с Zotero', p3t:'ОБРАБОТКА',
    p4a:'Откройте Word', p4b:'Add Bibliography → готово', p4t:'РЕЗУЛЬТАТ',

    s0_tag:'До и после', s0_h:'Было [1][2][3]. Стало — список литературы формируется автоматически.',
    s0_sub:'ИИ оставил числа в скобках — это просто текст, Zotero о них ничего не знает. После Zotero Inject каждый маркер становится живым полем: Word их видит, Zotero ими управляет — как будто вы вставили каждую ссылку вручную.',
    ba_before_lbl:'ДО — текст из ИИ', ba_before_ctx:'# Введение от ChatGPT / Claude',
    ba_before_1:'...исследование [1] показало,',
    ba_before_2:'что метод [2][3] эффективен [4-6]...',
    ba_before_note:'⚠ Просто текст. Zotero не в курсе. Список литературы — вручную.',
    ba_arrow:'Zotero Inject',
    ba_after_lbl:'ПОСЛЕ — живые поля Zotero', ba_after_ctx:'# Тот же .docx после обработки',
    ba_after_1:'...исследование (Smith, 2023)',
    ba_after_2:'показало, что метод эффективен...',
    ba_after_note:'✓ Поле Zotero. Нажмите «Add Bibliography» — список готов. Меняйте стиль — всё обновится автоматически.',
    why_text:'Представьте, что вы вручную вставили каждую ссылку через плагин Zotero — хотя ничего не делали. Именно это делает Zotero Inject. Удаляете цитату — она исчезает из списка. Меняете ГОСТ на APA — весь документ переформатируется за секунду. Никакой ручной работы.',

    s1_tag:'Пошагово', s1_h:'4 шага — и список литературы готов',
    s1_sub:'В первый раз это займёт около 10 минут. Далее — просто загружаете файлы и скачиваете результат.',
    pre_tag:'ОДИН РАЗ', pre_h:'Установите Better BibTeX для Zotero',
    pre_p:'Бесплатный плагин для Zotero. Создаёт стабильные ключи вида Smith2023 — именно по ним Zotero Inject находит ваши источники и связывает их с маркерами от ИИ.',
    pre_note:'Устанавливается один раз. После этого всё работает автоматически.',

    st1_tag:'ШАГ 01', st1_h:'Отправьте работу в ИИ и попросите написать введение',
    st1_p:'Прикрепите диплом, статью или диссертацию. ИИ напишет введение с маркерами [1][2][3] и создаст .bib-файл со списком источников. Мы подготовили готовый промпт — просто скопируйте его ниже.',
    any_ai:'+ любой другой',

    st2_tag:'ШАГ 02', st2_h:'ИИ пишет — вы не тратите время на ручные правки',
    st2_p:'В тексте появятся ссылки [1][2][3]. В конце будет .bib-файл с метаданными источников. Ключи записей вида Smith2023 совпадают с ключами Better BibTeX в вашей библиотеке Zotero — в этом и состоит связь.',
    st2_ex_l:'# .bib от ИИ выглядит так:',

    st3_tag:'ШАГ 03', st3_h:'Экспортируйте коллекцию из Zotero — 30 секунд',
    st3_p:'Нажмите правой кнопкой на коллекции в Zotero → «Экспортировать» → сохраните в формате HTML. Этот файл содержит идентификаторы ваших источников — Zotero Inject использует их, чтобы точно связать каждый [1][2][3] с нужной записью.',

    st4_tag:'ШАГ 04 — РЕЗУЛЬТАТ', st4_h:'Загрузите три файла. Получите .docx с живыми полями.',
    st4_p:'.docx с текстом, .bib от ИИ и HTML из Zotero — этого достаточно. На выходе вы получаете тот же документ, но каждый [1][2][3] превращается в живое поле Zotero. Откройте файл в Word → нажмите «Add/Edit Bibliography» → список литературы готов. Хотите сменить стиль — одна кнопка, и весь документ переформатируется. Удаляете цитату — она автоматически исчезает из библиографии.',
    st4_ex_l:'# В Word после открытия:',
    st4_ex_v1:'Add/Edit Bibliography → ', st4_ex_v2:'список литературы готов', st4_ex_v3:' ✓',

    s2_tag:'Промпт', s2_h:'Готовый промпт — просто скопируйте',
    s2_sub:'Вставьте в любой ИИ-чат вместе со своей работой. Формат точно подходит для Zotero Inject.',
    prompt_type:'ПРОМПТ ДЛЯ ЛЮБОГО ИИ-ЧАТА', copy_lbl:'Копировать', copy_ok:'Скопировано!',
    prompt_text:`Ознакомься с моей научной работой, прикреплённой к этому чату.

Напиши обширный раздел «Введение» (не менее 800 слов):
— Актуальность темы исследования
— Обзор существующей литературы с ссылками в тексте [1], [2], [3] ...
— Цель и задачи работы

ВАЖНО: Ссылки в тексте оформляй ТОЛЬКО как [1], [2], [3-5] и т.д.
НЕ используй скобки со звёздочками, (Author, Year) или другие форматы.

В конце предоставь список литературы в формате BibTeX (Better BibTeX для Zotero).
Каждая запись должна содержать: author, title, year, journal/booktitle, doi (если есть).
Формат ключа: AuthorYYYY (например: Smith2023, Иванов2022)`,

    s3_tag:'Возможности', s3_h:'Всё включено — бесплатно',
    b1_h:'9000+ стилей. Переключаете — всё обновляется автоматически.', b1_p:'ГОСТ, APA, Vancouver, IEEE — выбираете стиль в Word, и список литературы мгновенно переформатируется. Это работает, потому что ссылки живые, а не текстовые.',
    b1_more:'+ 9000 стилей',
    b2_h:'Живые поля, а не текст', b2_p:'В .docx вшиваются настоящие поля Zotero — такие же, как при ручной вставке через плагин. Word распознаёт их и корректно с ними работает. Нажмите «Add Bibliography» — список появится.',
    b3_h:'Проверяет источники через Crossref', b3_p:'Перед обработкой проверяет DOI у каждого источника, дополняет недостающие метаданные. Список литературы — точный.',
    b4_h:'[5][6][7][8] → [5–8] сам', b4_p:'Группы цитирований собираются автоматически по правилам ГОСТ и других стандартов. Никаких ручных правок.',
    b5_num:'FREE', b5_h:'Полностью бесплатно', b5_p:'Никакой подписки. Никакой регистрации. Загружаете — скачиваете.',
    b6_h:'Диплом, диссертация, статья — без разницы', b6_p:'Один процесс для любой академической работы. Работает с любым ИИ.',

    ticker_lbl:'Поддерживаемые стили цитирования',
    cta_free_badge:'БЕСПЛАТНЫЙ ИНСТРУМЕНТ',
    cta_h:'Попробуйте — введение и библиография за 10 минут.',
    cta_p:'ИИ напишет текст с [1][2][3]. Zotero Inject сделает ссылки живыми. Вам останется нажать «Add Bibliography».',
    cta_btn:'Открыть инструмент →',
    donate_eyebrow:'поддержать проект',
    donate_h:'Инструмент понравился?',
    donate_p:'Это бесплатный open-source проект. Если он сэкономил вам время на диплом или статью — поддержите разработку парой USDT.',
    donate_photo_main:'На это уходят часы.<br>Ваш донат — <em>топливо</em>.',
    donate_card_t:'Криптовалюта USDT',
    donate_card_s:'Сеть TRON (TRC-20). Только USDT — другие активы будут потеряны.',
    donate_warn:'<strong>Внимание:</strong> отправляйте только активы сети TRON на этот адрес.',
    footer:'© 2026 Zotero Inject — open source, free forever',
    meta_title:'Zotero Inject — введение и библиография через ИИ за 10 минут',
    meta_desc:'Бесплатно. ИИ пишет введение с [1][2][3] — Zotero Inject делает ссылки живыми в Word. Нажмите «Add Bibliography» — список готов.',
  },
  en: {
    nav_what:'What it does', nav_how:'How it works', nav_prompt:'Prompt', nav_free:'FREE', nav_cta:'Open App',
    badge_free:'FREE TOOL', badge_ai:'Works with any AI', scroll_hint:'scroll',
    hero_label:'CITATION AUTOMATION · ZOTERO NATIVE',
    h1a:'Turn AI [1][2][3] markers', h1b:'into live Zotero citations in Word.',
    hero_sub:'Zotero Inject takes your .docx, .bib, and Zotero HTML export, links citations, and returns the same document with real Zotero fields.',
    hero_point_1_k:'Input',
    hero_point_1_v:'.docx + .bib + Zotero HTML',
    hero_point_2_k:'Action',
    hero_point_2_v:'Replaces [1][2][3] with Zotero ADDIN fields',
    hero_point_3_k:'Result',
    hero_point_3_v:'Add Bibliography + instant style switching',
    hero_demo_tag:'Single-file example',
    hero_demo_before:'Before',
    hero_demo_before_note:'Plain text markers, Zotero cannot manage them.',
    hero_demo_after:'After',
    hero_demo_after_note:'Live Zotero fields in the same .docx.',
    hero_demo_foot:'Open the result in Word and click Add/Edit Bibliography: the reference list appears automatically.',
    hm_free:'Free',
    cta_main:'Try for free →', cta_how:'See how it works',
    p1a:'Your paper', p1b:'send to AI', p1t:'START',
    p2a:'Intro + [1][2][3]', p2t:'AI WRITES FOR YOU',
    p3b:'links to Zotero', p3t:'PROCESS',
    p4a:'Open Word', p4b:'Add Bibliography → done', p4t:'RESULT',

    s0_tag:'Before & after', s0_h:'Had [1][2][3]. Now — bibliography builds itself.',
    s0_sub:'AI left numbers in brackets — plain text, Zotero knows nothing about them. After Zotero Inject, every marker becomes a live field: Word sees it, Zotero manages it — as if you had inserted every citation manually.',
    ba_before_lbl:'BEFORE — text from AI', ba_before_ctx:'# Introduction from ChatGPT / Claude',
    ba_before_1:'...research [1] showed that',
    ba_before_2:'method [2][3] is effective [4-6]...',
    ba_before_note:'⚠ Plain text. Zotero has no idea. Reference list — your problem.',
    ba_arrow:'Zotero Inject',
    ba_after_lbl:'AFTER — live Zotero fields', ba_after_ctx:'# Same .docx after processing',
    ba_after_1:'...research (Smith, 2023)',
    ba_after_2:'showed that method is effective...',
    ba_after_note:'✓ Zotero field. Click "Add Bibliography" — list ready. Change style — everything updates itself.',
    why_text:'Imagine inserting every citation manually through the Zotero plugin — but doing nothing. That\'s exactly what Zotero Inject does. Delete a citation — it leaves the reference list. Switch from APA to Vancouver — the whole document reformats in a second. Zero manual work.',

    s1_tag:'Step by step', s1_h:'4 steps — reference list is ready',
    s1_sub:'First time takes about 10 minutes. After that — just upload files and download the result.',
    pre_tag:'ONE TIME ONLY', pre_h:'Install Better BibTeX for Zotero',
    pre_p:'A free Zotero plugin. Creates stable keys like Smith2023 — Zotero Inject uses them to find your sources and connect them to the AI\'s markers.',
    pre_note:'Install once. Everything runs automatically after that.',

    st1_tag:'STEP 01', st1_h:'Send your paper to AI — ask it to write the intro',
    st1_p:'Attach your thesis, article, or dissertation. AI will write the introduction with [1][2][3] markers and produce a .bib file with sources. We prepared a ready-to-use prompt — just copy it below.',
    any_ai:'+ any other',

    st2_tag:'STEP 02', st2_h:'AI writes — you do nothing',
    st2_p:'The text will have citations like [1][2][3]. At the end — a .bib file with source metadata. Entry keys like Smith2023 match the Better BibTeX keys in your Zotero library — that\'s the connection.',
    st2_ex_l:'# .bib from AI looks like this:',

    st3_tag:'STEP 03', st3_h:'Export your Zotero collection — 30 seconds',
    st3_p:'Right-click your collection in Zotero → "Export Collection" → save as HTML. This file contains the identifiers of your sources — Zotero Inject uses them to precisely connect each [1][2][3] to the right record.',

    st4_tag:'STEP 04 — RESULT', st4_h:'Upload three files. Get a live .docx.',
    st4_p:'.docx with text, .bib from AI, HTML from Zotero — that\'s all. Output: the same document, but every [1][2][3] is now a live Zotero field. Open in Word → click "Add/Edit Bibliography" → reference list is ready. Want to change style — one click, the whole document reformats. Delete a citation — it removes itself from the bibliography.',
    st4_ex_l:'# In Word after opening:',
    st4_ex_v1:'Add/Edit Bibliography → ', st4_ex_v2:'reference list ready', st4_ex_v3:' ✓',

    s2_tag:'Prompt', s2_h:'Ready prompt — just copy it',
    s2_sub:'Paste into any AI chat along with your paper. Works perfectly with Zotero Inject.',
    prompt_type:'PROMPT FOR ANY AI CHAT', copy_lbl:'Copy', copy_ok:'Copied!',
    prompt_text:`Review my academic paper attached to this chat.

Write a comprehensive Introduction section (at least 800 words):
— Relevance and background of the research topic
— Literature review with in-text citations [1], [2], [3] ...
— Research goals and objectives

IMPORTANT: Format in-text citations ONLY as [1], [2], [3-5] etc.
Do NOT use (Author, Year), asterisks, footnotes, or other formats.

At the end, provide a bibliography in BibTeX format (Better BibTeX for Zotero).
Each entry must include: author, title, year, journal/booktitle, doi (if available).
Key format: AuthorYYYY (e.g. Smith2023)`,

    s3_tag:'Features', s3_h:'Everything included — free',
    b1_h:'9000+ styles. Switch — everything updates itself.', b1_p:'GOST, APA, Vancouver, IEEE — pick a style in Word, the reference list reformats instantly. Works because citations are live fields, not text.',
    b1_more:'+ 9,000 styles',
    b2_h:'Live fields, not text', b2_p:'Real Zotero fields are embedded in .docx — same as manual insertion via plugin. Word sees them and manages them. Click "Add Bibliography" — list appears.',
    b3_h:'Validates sources via Crossref', b3_p:'Before processing, checks DOI for every source and fills in missing metadata. Your reference list — accurate.',
    b4_h:'[5][6][7][8] → [5–8] automatically', b4_p:'Citation groups are built automatically per GOST and other standards. No manual edits needed.',
    b5_num:'FREE', b5_h:'Completely free', b5_p:'No subscription. No registration. Upload — download.',
    b6_h:'Thesis, article, coursework — same process', b6_p:'One workflow for any academic paper. Works with any AI.',

    ticker_lbl:'Supported citation styles',
    cta_free_badge:'FREE OPEN TOOL',
    cta_h:'Try it — intro and bibliography in 10 minutes.',
    cta_p:'AI writes the text with [1][2][3]. Zotero Inject makes citations live. You just click "Add Bibliography".',
    cta_btn:'Open the tool →',
    donate_eyebrow:'support the project',
    donate_h:'Found this useful?',
    donate_p:'This is a free open-source tool. If it saved you time on your thesis or paper — consider supporting development with a small USDT donation.',
    donate_photo_main:'This takes hours to build.<br>Your donation <em>keeps it alive</em>.',
    donate_card_t:'USDT Cryptocurrency',
    donate_card_s:'TRON network (TRC-20). USDT only — other assets will be permanently lost.',
    donate_warn:'<strong>Warning:</strong> send only TRON network assets to this address.',
    footer:'© 2026 Zotero Inject — open source, free forever',
    meta_title:'Zotero Inject — AI intro + bibliography in 10 minutes, free',
    meta_desc:'Free. AI writes intro with [1][2][3] — Zotero Inject makes citations live in Word. Click "Add Bibliography" — reference list ready.',
  }
};
