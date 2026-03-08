import { LitElement, html, css, nothing, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import QRCode from 'qrcode'
import './components/file-drop'

const DONATE_WALLET = 'TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3'

type Status = 'idle' | 'processing' | 'done' | 'error'

interface EntryState {
  key: string
  entry_type: string
  status: 'pending' | 'checking' | 'ok' | 'warn' | 'error'
  issues: string[]
  fields: Record<string, string>
  idx: number
}

type Lang = 'ru' | 'en'

const APP_I18N = {
  ru: {
    step_badge: (n: number) => `Шаг ${n} из 4`,
    step1: 'Библиография', step2: 'URI-карта', step3: 'Обработка', step4: 'Готово',
    log_label: 'Журнал выполнения',
    // Step 1
    s1_title: 'Загрузите файл библиографии',
    s1_desc: 'BibTeX-файл (.bib) со списком источников. Убедитесь, что перед каждой записью указан номерной комментарий — см. пример ниже.',
    s1_format_hd: 'Как должен выглядеть .bib-файл',
    s1_file_sec: 'Выберите файл', s1_drop_lbl: 'Перетащите .bib-файл или нажмите, чтобы выбрать',
    s1_file_ready: 'Файл загружен · готов к использованию',
    s1_email_lbl: 'Email для Crossref API', s1_email_opt: 'необязательно',
    s1_email_hint: 'Ускоряет и стабилизирует запросы к Crossref (полезно при большом списке источников)',
    s1_btn_check: 'Проверить DOI через Crossref',
    s1_btn_check_sub: 'Найдёт недостающие DOI и исправит метаданные. Около 1 минуты на 50 источников.',
    s1_btn_skip: 'Пропустить проверку',
    s1_btn_skip_sub: 'Перейти к следующему шагу без проверки. DOI в документе останутся как есть.',
    s1_checking: 'Проверяю...',
    // Validation
    v_checking: 'Проверка источников через Crossref...',
    v_results: 'Результаты проверки',
    v_dl_enriched: '↓ Скачать обогащённый .bib', v_dl_original: '↓ Скачать оригинальный .bib',
    v_edit_hint: 'Отредактированные поля сохранятся в скачанном файле.',
    v_generate_bib: '⟳ Сгенерировать .bib', v_generating: 'Генерирую...',
    v_next: 'Далее →', v_recheck: '↺ Перепроверить',
    th_num: '#', th_key: 'Ключ', th_title: 'Название', th_author: 'Авторы',
    th_year: 'Год', th_journal: 'Журнал / Источник', th_doi: 'DOI', th_status: 'Статус',
    st_ok: 'OK', st_warn: 'Предупреждение', st_err: 'Ошибка', st_checking: 'Проверяю...',
    badge_ok: '✓ OK', badge_warn: '⚠ Предупреждение', badge_err: '✕ Ошибка',
    // Step 2
    s2_title: 'Создайте URI-карту',
    s2_desc: 'Нужна для привязки ссылок из .bib к элементам Zotero. Сохраните коллекцию Zotero в формате HTML и загрузите её сюда.',
    s2_upload_sec: 'Загрузите файл', s2_html_col: 'HTML-экспорт из Zotero',
    s2_tsv_col: 'Готовый uri-map.tsv', s2_or: 'или',
    s2_html_drop: 'Перетащите файл или нажмите', s2_tsv_drop: 'Уже есть готовый файл?',
    s2_result_title: 'URI-карта успешно создана',
    s2_match_ok: 'Количество источников совпадает с .bib-файлом',
    s2_match_warn: 'Количество не совпадает с .bib-файлом — проверьте предупреждение ниже',
    s2_file_ready: 'Файл готов к использованию', s2_count_label: 'источников',
    s2_back: '← Назад', s2_dl_tsv: '↓ Скачать uri-map.tsv', s2_recreate: '↺ Пересоздать',
    s2_next: 'Далее →', s2_create_btn: '⚙ Создать uri-map.tsv', s2_creating: 'Создаю карту…',
    s2_err_title: 'Ошибка при обработке файла',
    s2_p1_t: 'Откройте Zotero', s2_p2_t: 'Экспортируйте коллекцию',
    s2_p3_t: 'Загрузите HTML', s2_p4_t: 'URI-карта готова',
    s2_p1_b: 'с нужной коллекцией', s2_p2_b: 'Файл → Экспорт → HTML',
    s2_p3_b: 'в поле ниже', s2_p4_b: 'для следующего шага',
    // Step 3
    s3_title: 'Добавьте живые поля Zotero в документ',
    s3_desc: 'Загрузите Word-файл — скрипт заменит [1], [5][6][7] на живые поля Zotero. После этого в Word достаточно нажать «Add Bibliography»: список литературы будет создан и обновляться автоматически.',
    s3_prereq_sec: 'Что нужно для обработки',
    s3_map_title: 'URI-карта (шаг 2)',
    s3_map_ok: (n: number) => n ? `${n} источников привязано` : 'Карта загружена',
    s3_map_miss: 'Вернитесь к шагу 2 →', s3_bib_title: 'Библиография (шаг 1)',
    s3_bib_miss: 'Вернитесь к шагу 1 →',
    s3_transform_sec: 'Что произойдёт с документом',
    s3_before_lbl: 'Сейчас в .docx', s3_after_lbl: 'После обработки — поля Zotero',
    s3_docx_sec: 'Загрузите документ', s3_docx_drop: 'Перетащите .docx-файл или нажмите',
    s3_result_title: 'Документ успешно обработан!',
    s3_result_sub: 'ADDIN-поля Zotero вшиты · скачайте → откройте Word → нажмите «Add/Edit Bibliography»',
    s3_stat_replaced: 'Ссылок заменено', s3_stat_groups: 'Групп цитирований',
    s3_err_title: 'Ошибка при обработке',
    s3_back: '← Назад', s3_run: '▶ Запустить обработку', s3_rerun: '↺ Обработать снова',
    s3_running: 'Обрабатываю...', s3_dl: '↓ Скачать результат',
    s3_next: 'Далее → Инструкция для Word',
    // Step 4
    s4_title: 'Готово — осталось одно нажатие.',
    s4_sub: 'Скачайте файл, откройте его в Word с плагином Zotero и нажмите «Add/Edit Bibliography» — список литературы появится автоматически. Меняйте стиль и удаляйте ссылки — библиография обновится сама.',
    s4_dl_main: 'Скачать output_zotero.docx', s4_dl_sub: 'Нажмите и откройте в Microsoft Word',
    s4_word_hd: 'Что делать дальше — в Word с плагином Zotero',
    s4_ws1_t: 'Откройте скачанный файл в Microsoft Word',
    s4_ws1_s: 'Дважды нажмите на output_zotero.docx — ссылки в тексте уже отображаются как живые поля Zotero',
    s4_ws2_t: 'Нажмите «Add/Edit Bibliography» — список литературы готов',
    s4_ws2_s: 'Панель Zotero → Add/Edit Bibliography → список источников формируется автоматически',
    s4_ws3_t: 'Меняйте стиль — всё обновится автоматически',
    s4_ws3_s: 'Zotero → Document Preferences → выберите стиль (ГОСТ, APA, IEEE...) — ссылки переформатируются мгновенно. При удалении цитаты она исчезает из библиографии.',
    s4_ws3_badge: 'Готово',
    s4_tip_title: '💡 Как это работает:',
    s4_tip: 'В документ вшиты те же ADDIN-поля, которые плагин Zotero создаёт при ручной вставке ссылок. Word распознаёт их и передаёт управление Zotero: библиография управляется динамически.',
    s4_back: '← Назад', s4_restart: '↺ Обработать другой документ',
    s4_refs_replaced: 'Ссылок заменено', s4_cit_groups: 'Групп цитирований',
    // Issue / stat labels
    issue: {
      crossref_unresolved: 'Не найдено в Crossref', doi_not_found: 'DOI не найден',
      doi_invalid_format: 'Неверный формат DOI', doi_title_mismatch: 'DOI не совпадает с названием',
      doi_duplicate: 'Дублирующийся DOI', metadata_not_corrected: 'Метаданные не совпадают',
      mismatch_title: 'Название не совпадает', mismatch_author: 'Авторы не совпадают',
      mismatch_year: 'Год не совпадает', mismatch_journal: 'Журнал не совпадает',
      mismatch_doi: 'DOI не совпадает', crossref_error: 'Ошибка API',
    } as Record<string, string>,
    stat: {
      processed: 'Проверено', doi_valid: 'DOI валиден', doi_added: 'Добавлено DOI',
      doi_corrected: 'Исправлено DOI', unresolved: 'Не найдено',
      problem_entries: 'Проблемные записи', entries_changed: 'Изменено записей', fields_changed: 'Изменено полей',
    } as Record<string, string>,
  },
  en: {
    step_badge: (n: number) => `Step ${n} of 4`,
    step1: 'Bibliography', step2: 'URI Map', step3: 'Processing', step4: 'Done',
    log_label: 'Execution log',
    s1_title: 'Upload bibliography file',
    s1_desc: 'A BibTeX file (.bib) with your references. Make sure each entry has a numbered comment before it — see the example below.',
    s1_format_hd: 'How your .bib file should look',
    s1_file_sec: 'Select file', s1_drop_lbl: 'Drop .bib file here or click to select',
    s1_file_ready: 'File loaded · ready to use',
    s1_email_lbl: 'Email for Crossref API', s1_email_opt: 'optional',
    s1_email_hint: 'Speeds up and stabilises Crossref requests (useful for large reference lists)',
    s1_btn_check: 'Validate DOIs via Crossref',
    s1_btn_check_sub: 'Finds missing DOIs, corrects metadata. Takes ~1 min per 50 sources.',
    s1_btn_skip: 'Skip validation',
    s1_btn_skip_sub: 'Go to the next step without checking. DOIs will remain as is.',
    s1_checking: 'Checking...',
    v_checking: 'Validating sources via Crossref...',
    v_results: 'Validation results',
    v_dl_enriched: '↓ Download enriched .bib', v_dl_original: '↓ Download original .bib',
    v_edit_hint: 'Edited fields will be saved in the downloaded file.',
    v_generate_bib: '⟳ Generate .bib', v_generating: 'Generating...',
    v_next: 'Next →', v_recheck: '↺ Re-validate',
    th_num: '#', th_key: 'Key', th_title: 'Title', th_author: 'Authors',
    th_year: 'Year', th_journal: 'Journal / Source', th_doi: 'DOI', th_status: 'Status',
    st_ok: 'OK', st_warn: 'Warning', st_err: 'Error', st_checking: 'Checking...',
    badge_ok: '✓ OK', badge_warn: '⚠ Warning', badge_err: '✕ Error',
    s2_title: 'Create URI map',
    s2_desc: 'Needed to link references from .bib to Zotero items. Export your Zotero collection as HTML and upload it here.',
    s2_upload_sec: 'Upload file', s2_html_col: 'HTML export from Zotero',
    s2_tsv_col: 'Ready-made uri-map.tsv', s2_or: 'or',
    s2_html_drop: 'Drop or click', s2_tsv_drop: 'Already have a file?',
    s2_result_title: 'URI map created successfully',
    s2_match_ok: 'Source count matches the .bib file',
    s2_match_warn: 'Count does not match .bib — check the warning below',
    s2_file_ready: 'File ready to use', s2_count_label: 'sources',
    s2_back: '← Back', s2_dl_tsv: '↓ Download uri-map.tsv', s2_recreate: '↺ Recreate',
    s2_next: 'Next →', s2_create_btn: '⚙ Create uri-map.tsv', s2_creating: 'Creating map…',
    s2_err_title: 'Error processing file',
    s2_p1_t: 'Open Zotero', s2_p2_t: 'Export collection',
    s2_p3_t: 'Upload HTML', s2_p4_t: 'URI map ready',
    s2_p1_b: 'with the needed collection', s2_p2_b: 'File → Export → HTML',
    s2_p3_b: 'into the field below', s2_p4_b: 'for the next step',
    s3_title: 'Inject live Zotero fields into document',
    s3_desc: 'Upload a Word file — the script replaces [1], [5][6][7] with live Zotero ADDIN fields. Then in Word: click "Add Bibliography" — reference list is ready and updates automatically.',
    s3_prereq_sec: 'Required for processing',
    s3_map_title: 'URI Map (Step 2)',
    s3_map_ok: (n: number) => n ? `${n} sources linked` : 'Map loaded',
    s3_map_miss: 'Go back to Step 2 →', s3_bib_title: 'Bibliography (Step 1)',
    s3_bib_miss: 'Go back to Step 1 →',
    s3_transform_sec: 'What happens to the document',
    s3_before_lbl: 'Current .docx', s3_after_lbl: 'After processing — Zotero fields',
    s3_docx_sec: 'Upload your paper', s3_docx_drop: 'Drop .docx file here or click',
    s3_result_title: 'Document processed successfully!',
    s3_result_sub: 'Zotero ADDIN fields injected · download → open Word → click "Add/Edit Bibliography"',
    s3_stat_replaced: 'Citations replaced', s3_stat_groups: 'Citation groups',
    s3_err_title: 'Processing error',
    s3_back: '← Back', s3_run: '▶ Start processing', s3_rerun: '↺ Process again',
    s3_running: 'Processing...', s3_dl: '↓ Download result',
    s3_next: 'Next → Word instructions',
    s4_title: 'Done — one click left.',
    s4_sub: 'Download the file, open it in Word with the Zotero plugin, click "Add/Edit Bibliography" — reference list appears automatically. Switch styles, delete citations — bibliography updates on its own.',
    s4_dl_main: 'Download output_zotero.docx', s4_dl_sub: 'Click, then open in Microsoft Word',
    s4_word_hd: 'What to do next — in Word with the Zotero plugin',
    s4_ws1_t: 'Open the downloaded file in Microsoft Word',
    s4_ws1_s: 'Double-click output_zotero.docx — citations already look like live Zotero fields',
    s4_ws2_t: 'Click "Add/Edit Bibliography" — reference list is ready',
    s4_ws2_s: 'Zotero panel → Add/Edit Bibliography → reference list appears automatically',
    s4_ws3_t: 'Switch styles — everything updates automatically',
    s4_ws3_s: 'Zotero → Document Preferences → choose style (APA, IEEE, ГОСТ...) — citations reformat instantly.',
    s4_ws3_badge: 'Done',
    s4_tip_title: '💡 How it works:',
    s4_tip: 'The document contains the same ADDIN fields that the Zotero plugin creates when inserting citations manually. Word recognises them and hands control to Zotero: bibliography is managed dynamically.',
    s4_back: '← Back', s4_restart: '↺ Process another document',
    s4_refs_replaced: 'Citations replaced', s4_cit_groups: 'Citation groups',
    issue: {
      crossref_unresolved: 'Not found in Crossref', doi_not_found: 'DOI not found',
      doi_invalid_format: 'Invalid DOI format', doi_title_mismatch: 'DOI/title mismatch',
      doi_duplicate: 'Duplicate DOI', metadata_not_corrected: 'Metadata mismatch',
      mismatch_title: 'Title mismatch', mismatch_author: 'Author mismatch',
      mismatch_year: 'Year mismatch', mismatch_journal: 'Journal mismatch',
      mismatch_doi: 'DOI mismatch', crossref_error: 'API error',
    } as Record<string, string>,
    stat: {
      processed: 'Processed', doi_valid: 'DOI valid', doi_added: 'DOI added',
      doi_corrected: 'DOI corrected', unresolved: 'Unresolved',
      problem_entries: 'Problem entries', entries_changed: 'Entries changed', fields_changed: 'Fields changed',
    } as Record<string, string>,
  },
} as const

const ISSUE_LABELS: Record<string, string> = APP_I18N.ru.issue
const STAT_LABELS: Record<string, string> = APP_I18N.ru.stat

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() step = 1
  @state() status: Status = 'idle'
  @state() log = ''

  @state() private _bibFile: File | null = null
  @state() private _bibJobId = ''
  @state() private _mailto = ''
  @state() private _mailtoError = ''
  @state() private _qrDataUrl = ''
  @state() private _walletCopied = false

  @state() private _htmlFile: File | null = null
  @state() private _uriMapJobId = ''
  @state() private _uriMapDirect: File | null = null

  @state() private _docxFile: File | null = null
  @state() private _injectJobId = ''
  @state() private _injectGroups = 0
  @state() private _injectReplaced = 0

  // --- Validation streaming state ---
  @state() private _entries: EntryState[] = []
  @state() private _totalEntries = 0
  @state() private _checkedCount = 0
  @state() private _currentKey = ''
  @state() private _validationStats: Record<string, string> = {}
  @state() private _validationDone = false

  // --- Parse-html result ---
  @state() private _parseCount = 0
  @state() private _parseMatch: boolean | null = null
  @state() private _parseWarning = ''

  // --- Table editing state ---
  @state() private _editingCell: { key: string; field: string } | null = null
  @state() private _editedFields: Record<string, Record<string, string>> = {}
  @state() private _generatingBib = false

  // --- Language ---
  @state() private _lang: Lang = (localStorage.getItem('lang') as Lang) || 'ru'

  private _t(key: string): any {
    return (APP_I18N[this._lang] as any)[key] ?? (APP_I18N['ru'] as any)[key] ?? key
  }

  private _setLang(l: Lang) {
    this._lang = l
    localStorage.setItem('lang', l)
  }

  // ── CSS ───────────────────────────────────────────────────────────────────

  static styles = css`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #030404;
      font-family: 'Inter', system-ui, sans-serif;
      color: #edf7ed;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Header ── */
    header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 32px;
      height: 58px;
      background: #0b0e0e;
      border-bottom: 1px solid #1c2a2a;
      flex-shrink: 0;
    }
    .logo-link {
      display: flex; align-items: center; gap: 9px;
      text-decoration: none; cursor: pointer;
      border-radius: 10px;
      padding: 4px 6px 4px 2px;
      margin-left: -2px;
      transition: background 0.2s;
    }
    .logo-link:hover { background: rgba(163,230,53,0.07); }
    .logo-link:hover .logo-name { color: #a3e635; }
    .logo-name { font-size: 15px; font-weight: 700; color: #edf7ed; transition: color 0.2s; }
    .logo-tag  { font-size: 11px; color: #3a4d42; margin-left: 6px; }
    .header-spacer { flex: 1; }
    .header-badge {
      font-size: 11px; font-weight: 500;
      background: #101414;
      border: 1px solid #1c2a2a;
      border-radius: 6px;
      padding: 4px 10px;
      color: #748f80;
    }
    .lang-toggle {
      display: flex; align-items: center; gap: 2px;
      background: #101414;
      border: 1px solid #1c2a2a;
      border-radius: 6px;
      padding: 3px;
    }
    .lang-btn {
      font-size: 11px; font-weight: 600;
      background: none; border: none; cursor: pointer;
      border-radius: 4px;
      padding: 3px 8px;
      color: #748f80;
      transition: all 0.15s;
    }
    .lang-btn.active {
      background: #a3e635;
      color: #091200;
    }
    .lang-btn:not(.active):hover { color: #edf7ed; }

    /* ── Stepper ── */
    .stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      padding: 20px 32px;
      background: #0b0e0e;
      border-bottom: 1px solid #1c2a2a;
    }
    .step-pill {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 14px;
      border-radius: 100px;
      transition: all 0.2s;
      cursor: default;
    }
    .step-pill.active  { background: rgba(163,230,53,0.15); }
    .step-pill.done    { background: rgba(52,211,153,0.1); }
    .step-dot {
      width: 24px; height: 24px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700;
      flex-shrink: 0;
    }
    .step-dot.active  { background: #a3e635; color: #091200; box-shadow: 0 0 12px rgba(163,230,53,0.4); }
    .step-dot.done    { background: #34d399; color: #fff; }
    .step-dot.pending { background: #101414; border: 1px solid #1c2a2a; color: #3a4d42; }
    .step-name { font-size: 12px; font-weight: 600; transition: color 0.2s; }
    .step-name.active  { color: #a3e635; }
    .step-name.done    { color: #34d399; }
    .step-name.pending { color: #3a4d42; }
    .step-connector { width: 40px; height: 1px; background: #1c2a2a; flex-shrink: 0; }
    .step-connector.done { background: #34d399; opacity: 0.4; }

    /* ── Main ── */
    main {
      flex: 1;
      max-width: 740px;
      width: 100%;
      margin: 0 auto;
      padding: 36px 24px 80px;
      transition: max-width 0.3s ease;
    }
    main.wide { max-width: 1140px; }

    /* ── Cards ── */
    .card {
      background: #0b0e0e;
      border: 1px solid #1c2a2a;
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 16px;
    }
    .card-header {
      display: flex; align-items: flex-start; gap: 16px;
      margin-bottom: 24px;
    }
    .card-icon {
      width: 44px; height: 44px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
      background: #101414; border: 1px solid #1c2a2a;
    }
    .card-icon.red    { background: rgba(163,230,53,0.15);  border-color: rgba(163,230,53,0.3); }
    .card-icon.blue   { background: rgba(163,230,53,0.15); border-color: rgba(163,230,53,0.3); }
    .card-icon.green  { background: rgba(52,211,153,0.15);  border-color: rgba(52,211,153,0.3); }
    .card-icon.purple { background: rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.3); }
    .card-title { font-size: 17px; font-weight: 700; color: #edf7ed; margin-bottom: 5px; }
    .card-desc  { font-size: 13px; color: #748f80; line-height: 1.65; }

    /* ── Instructions ── */
    .instr-list { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
    .instr-item {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 14px;
      background: #101414; border: 1px solid #1c2a2a; border-radius: 10px;
    }
    .instr-num {
      width: 22px; height: 22px; border-radius: 50%;
      background: #131818; border: 1px solid #243535;
      font-size: 11px; font-weight: 700; color: #748f80;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .instr-body { font-size: 13px; color: #9db8a6; line-height: 1.6; }
    .instr-body strong { color: #edf7ed; font-weight: 600; }
    .instr-body code {
      background: #131818; border: 1px solid #243535; border-radius: 4px;
      padding: 1px 6px; font-size: 11px;
      font-family: 'JetBrains Mono', 'Consolas', monospace; color: #a3e635;
    }

    /* ── Section label ── */
    .section-label {
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em;
      color: #3a4d42; margin-bottom: 10px;
    }

    /* ── File grids ── */
    .file-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
    .file-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }

    /* ── Input ── */
    .input-wrap { margin-top: 16px; }
    .input-label { font-size: 12px; color: #3a4d42; margin-bottom: 6px; display: block; }
    .text-input {
      width: 100%; padding: 9px 14px;
      background: #101414; border: 1px solid #1c2a2a; border-radius: 8px;
      color: #edf7ed; font-size: 13px; font-family: inherit;
      outline: none; transition: border-color 0.2s;
    }
    .text-input:focus { border-color: #a3e635; }
    .text-input::placeholder { color: #3a4d42; }
    .text-input.input-err  { border-color: #ef4444; }
    .text-input.input-ok   { border-color: #34d399; }
    .field-msg { font-size: 11px; margin-top: 5px; display: flex; align-items: center; gap: 5px; }
    .field-msg.err  { color: #ef4444; }
    .field-msg.ok   { color: #34d399; }

    /* ── Divider ── */
    .or-divider {
      display: flex; align-items: center; gap: 12px; margin: 18px 0;
    }
    .or-divider::before, .or-divider::after {
      content: ''; flex: 1; height: 1px; background: #1c2a2a;
    }
    .or-divider span {
      font-size: 11px; font-weight: 600;
      color: #3a4d42; text-transform: uppercase; letter-spacing: .06em;
    }

    /* ── Buttons ── */
    .btn-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
    .spacer  { flex: 1; }
    .btn {
      display: inline-flex; align-items: center; gap: 7px;
      padding: 9px 18px; border-radius: 9px; border: none; cursor: pointer;
      font-size: 13px; font-weight: 600; font-family: inherit;
      transition: all 0.15s; text-decoration: none; white-space: nowrap;
    }
    .btn:hover   { filter: brightness(1.12); }
    .btn:active  { transform: scale(0.97); }
    .btn:disabled { opacity: 0.35; cursor: not-allowed; filter: none; transform: none; }
    .btn-ghost {
      background: #101414; border: 1px solid #1c2a2a; color: #748f80;
    }
    .btn-ghost:hover { border-color: #243535; color: #edf7ed; }
    .btn-red   { background: linear-gradient(135deg,#a3e635,#84cc16); color:#091200; box-shadow:0 0 16px rgba(163,230,53,0.25); }
    .btn-blue  { background: linear-gradient(135deg,#a3e635,#84cc16); color:#091200; box-shadow:0 0 16px rgba(163,230,53,0.25); }
    .btn-green { background: linear-gradient(135deg,#34d399,#10b981); color:#002018; box-shadow:0 0 16px rgba(52,211,153,0.2); }
    .btn-next  { background: #101414; border: 1px solid #a3e635; color: #a3e635; }
    .btn-next:hover { background: rgba(163,230,53,0.15); }

    /* ── Alert ── */
    .alert {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 14px; border-radius: 10px;
      font-size: 13px; margin-top: 14px; border: 1px solid;
    }
    .alert.warn { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.25); color: #f59e0b; }
    .alert.ok   { background: rgba(52,211,153,0.08);  border-color: rgba(52,211,153,0.2);   color: #34d399; }

    /* ── Spinner ── */
    .spinner {
      width: 13px; height: 13px;
      border: 2px solid currentColor; border-top-color: transparent;
      border-radius: 50%; animation: spin .65s linear infinite; flex-shrink: 0;
    }
    .spinner-sm {
      width: 11px; height: 11px;
      border: 1.5px solid currentColor; border-top-color: transparent;
      border-radius: 50%; animation: spin .65s linear infinite; flex-shrink: 0;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Log ── */
    .log-wrap { margin-top: 16px; }
    .log-label {
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em; color: #3a4d42; margin-bottom: 6px;
    }
    .log-box {
      background: #030404; border: 1px solid #1c2a2a; border-radius: 8px;
      padding: 12px 14px; font-family: 'JetBrains Mono', 'Consolas', monospace;
      font-size: 11.5px; color: #748f80;
      white-space: pre-wrap; max-height: 150px; overflow-y: auto; line-height: 1.65;
    }

    /* ── Finish steps ── */
    .finish-list { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
    .finish-item {
      display: flex; gap: 14px; align-items: center;
      padding: 14px 18px; background: #101414; border: 1px solid #1c2a2a; border-radius: 12px;
    }
    .finish-icon {
      width: 38px; height: 38px; border-radius: 10px;
      background: #131818; border: 1px solid #243535;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .finish-text { font-size: 13px; color: #9db8a6; line-height: 1.55; }
    .finish-text strong { color: #edf7ed; font-weight: 600; }

    /* ═══════════════════════════════════════════════════
       STEP 1 — FORMAT HINT & BIB CARD
       ═══════════════════════════════════════════════════ */

    .format-hint {
      margin: 20px 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #1c2a2a;
    }
    .format-hint-header {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px;
      background: #101414;
      border-bottom: 1px solid #1c2a2a;
      font-size: 11px; font-weight: 700; color: #3a4d42;
      text-transform: uppercase; letter-spacing: .07em;
    }
    .format-hint-header .dot {
      width: 8px; height: 8px; border-radius: 50%; background: #a3e635; flex-shrink: 0;
    }
    .code-block {
      background: #030404;
      padding: 14px 16px;
      font-family: 'JetBrains Mono', 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.8;
      color: #748f80;
    }
    .cc { color: #3a4d42; }
    .ck { color: #a3e635; font-weight: 600; }
    .cv { color: #2dd4bf; }
    .cs { color: #34d399; }

    .bib-file-info {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 10px; margin-top: 12px;
      background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.2);
    }
    .bfi-icon {
      width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
      background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3);
      display: flex; align-items: center; justify-content: center; font-size: 16px;
    }
    .bfi-name { font-size: 13px; font-weight: 600; color: #edf7ed; }
    .bfi-sub  { font-size: 11px; color: rgba(52,211,153,0.7); margin-top: 2px; }

    .optional-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 8px; border-radius: 100px;
      font-size: 10px; font-weight: 700;
      background: #101414; border: 1px solid #1c2a2a; color: #3a4d42;
      text-transform: uppercase; letter-spacing: .05em; margin-left: 8px;
    }

    .action-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;
    }
    .action-card {
      display: flex; flex-direction: column; gap: 6px; align-items: flex-start;
      padding: 16px 18px; border-radius: 12px; border: 1px solid #1c2a2a;
      background: #101414; cursor: pointer; transition: all 0.18s;
      text-decoration: none; font-family: inherit;
    }
    .action-card:hover { border-color: #243535; background: #131818; }
    .action-card.primary {
      border-color: rgba(163,230,53,0.35);
      background: rgba(163,230,53,0.07);
    }
    .action-card.primary:hover { background: rgba(163,230,53,0.12); }
    .action-card:disabled { opacity: 0.35; pointer-events: none; }
    .ac-icon { font-size: 22px; margin-bottom: 2px; }
    .ac-title { font-size: 13px; font-weight: 700; color: #edf7ed; }
    .ac-primary { color: #a3e635; }
    .ac-sub { font-size: 11px; color: #3a4d42; line-height: 1.45; }
    .action-card.primary .ac-sub { color: #748f80; }

    /* ═══════════════════════════════════════════════════
       STEP 3 — PREREQUISITES + TRANSFORM
       ═══════════════════════════════════════════════════ */

    .prereq-panel {
      display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
      margin: 16px 0 20px;
    }
    .prereq-item {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 16px; border-radius: 12px;
      border: 1px solid #1c2a2a; background: #101414;
      transition: all 0.2s;
    }
    .prereq-item.ok {
      border-color: rgba(52,211,153,0.3);
      background: rgba(52,211,153,0.06);
    }
    .prereq-item.missing {
      border-color: rgba(245,158,11,0.3);
      background: rgba(245,158,11,0.05);
    }
    .prereq-ico {
      width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px; font-weight: 700;
      background: #131818; border: 1px solid #1c2a2a;
    }
    .prereq-item.ok .prereq-ico {
      background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.3);
      color: #34d399;
    }
    .prereq-item.missing .prereq-ico {
      background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.25);
      color: #f59e0b;
    }
    .prereq-title { font-size: 12px; font-weight: 700; color: #edf7ed; }
    .prereq-sub   { font-size: 10px; color: #3a4d42; margin-top: 2px; }
    .prereq-item.ok .prereq-sub { color: rgba(52,211,153,0.6); }
    .prereq-item.missing .prereq-sub { color: #f59e0b; }

    .transform-vis {
      display: grid; grid-template-columns: 1fr 48px 1fr; align-items: center;
      gap: 0; margin: 20px 0; border-radius: 12px; overflow: hidden;
      border: 1px solid #1c2a2a;
    }
    .tv-side {
      padding: 16px; background: #101414;
    }
    .tv-side.after { background: rgba(163,230,53,0.05); }
    .tv-label { font-size: 10px; font-weight: 700; color: #3a4d42; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 10px; }
    .tv-side.after .tv-label { color: rgba(163,230,53,0.7); }
    .tv-doc {
      background: #030404; border: 1px solid #1c2a2a; border-radius: 8px;
      padding: 10px 12px; font-size: 11.5px; color: #748f80; line-height: 1.8;
      font-family: 'JetBrains Mono', 'Consolas', monospace;
    }
    .tv-cite { color: #a3e635; font-weight: 700; }
    .tv-cite-z { color: #34d399; font-weight: 600; font-size: 10px; }
    .tv-arrow-col {
      background: #0b0e0e; display: flex; align-items: center; justify-content: center;
      align-self: stretch;
      border-left: 1px solid #1c2a2a; border-right: 1px solid #1c2a2a;
    }
    .tv-arrow-svg { width: 20px; color: #34d399; opacity: 0.6; }

    .inject-result {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 20px; border-radius: 14px; margin-top: 16px;
      background: rgba(52,211,153,0.07); border: 1px solid rgba(52,211,153,0.25);
    }
    .ir-icon {
      width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
      background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3);
      display: flex; align-items: center; justify-content: center; font-size: 24px;
    }
    .ir-body { flex: 1; }
    .ir-title { font-size: 14px; font-weight: 700; color: #34d399; margin-bottom: 4px; }
    .ir-sub   { font-size: 12px; color: rgba(52,211,153,0.65); }
    .ir-stats { display: flex; gap: 20px; padding-left: 16px; border-left: 1px solid rgba(52,211,153,0.2); }
    .ir-stat { display: flex; flex-direction: column; align-items: center; }
    .ir-stat-num { font-size: 28px; font-weight: 800; color: #34d399; font-variant-numeric: tabular-nums; line-height: 1; }
    .ir-stat-label { font-size: 9px; font-weight: 600; color: rgba(52,211,153,0.5); text-transform: uppercase; letter-spacing: .05em; margin-top: 3px; text-align: center; }

    /* ═══════════════════════════════════════════════════
       STEP 4 — SUCCESS
       ═══════════════════════════════════════════════════ */

    .success-hero {
      text-align: center;
      padding: 36px 24px 28px;
      background: #0b0e0e;
      border: 1px solid rgba(52,211,153,0.2);
      border-radius: 20px;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
    }
    .success-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.08) 0%, transparent 65%);
      pointer-events: none;
    }
    .sh-ring {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
      background: rgba(52,211,153,0.12);
      border: 2px solid rgba(52,211,153,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 38px;
      box-shadow: 0 0 40px rgba(52,211,153,0.15);
    }
    .sh-title { font-size: 24px; font-weight: 800; color: #edf7ed; margin-bottom: 8px; }
    .sh-sub   { font-size: 14px; color: #748f80; }
    .sh-stats {
      display: flex; justify-content: center; gap: 24px; margin-top: 20px;
      padding-top: 20px; border-top: 1px solid #1c2a2a;
    }
    .sh-stat { text-align: center; }
    .sh-stat-n { font-size: 26px; font-weight: 800; color: #34d399; font-variant-numeric: tabular-nums; line-height: 1; }
    .sh-stat-l { font-size: 10px; font-weight: 600; color: #3a4d42; text-transform: uppercase; letter-spacing: .06em; margin-top: 4px; }

    .download-cta {
      display: flex; flex-direction: column; align-items: stretch;
      gap: 10px; margin-bottom: 16px;
    }
    .btn-download {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 16px 24px; border-radius: 14px; border: none; cursor: pointer;
      font-size: 15px; font-weight: 700; font-family: inherit;
      text-decoration: none; transition: all 0.18s;
      background: linear-gradient(135deg, #34d399, #10b981);
      color: #002018; box-shadow: 0 0 30px rgba(52,211,153,0.25);
    }
    .btn-download:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 40px rgba(52,211,153,0.35); }
    .btn-download:active { transform: scale(0.98); }
    .btn-dl-icon { font-size: 20px; }
    .btn-dl-text { display: flex; flex-direction: column; align-items: flex-start; }
    .btn-dl-main { font-size: 15px; font-weight: 700; }
    .btn-dl-sub  { font-size: 11px; font-weight: 500; opacity: 0.75; }

    /* ── Donate card ─────────────────────────────────────────────────── */
    .donate-card {
      position: relative; overflow: hidden;
      background: #080f08;
      border: 1px solid rgba(163,230,53,0.18);
      border-radius: 20px;
      margin-bottom: 16px;
    }
    .donate-card::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(163,230,53,0.06) 0%, transparent 60%);
      pointer-events: none;
    }
    .donate-photo-wrap { position: relative; overflow: hidden; }
    .donate-photo {
      width: 100%; display: block;
      height: 165px; object-fit: contain; object-position: center center; background: #030404;
      filter: grayscale(20%) contrast(1.08) brightness(0.8);
    }
    .donate-photo-wrap::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(to bottom, rgba(8,15,8,0) 20%, rgba(8,15,8,1) 100%);
    }
    .donate-photo-text {
      position: absolute; bottom: 14px; left: 0; right: 0;
      z-index: 2; text-align: center; padding: 0 20px;
    }
    .donate-photo-title {
      font-size: 17px; font-weight: 900; color: #fff;
      text-shadow: 0 2px 16px rgba(0,0,0,.9); line-height: 1.15; margin-bottom: 3px;
    }
    .donate-photo-title em { color: #a3e635; font-style: normal; }
    .donate-photo-sub {
      font-size: 10px; color: rgba(255,255,255,.4);
      letter-spacing: .12em; text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
    }
    .donate-body {
      padding: 18px 20px 22px;
      display: flex; flex-direction: column; align-items: center; text-align: center;
    }
    .donate-net {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(239,0,39,0.08); border: 1px solid rgba(239,0,39,0.18);
      border-radius: 6px; padding: 3px 9px;
      font-size: 10px; font-weight: 700; letter-spacing: .1em;
      text-transform: uppercase; color: rgba(255,100,100,0.7);
      margin-bottom: 14px;
    }
    .donate-qr-wrap {
      display: inline-block;
      padding: 10px; border-radius: 14px;
      background: #060e06;
      border: 1px solid rgba(163,230,53,0.22);
      box-shadow: 0 0 40px rgba(163,230,53,0.12);
      margin-bottom: 16px;
    }
    .donate-qr { display: block; border-radius: 6px; width: 150px; height: 150px; }
    .donate-addr-row {
      display: flex; align-items: center; gap: 8px;
      background: #0d1a0d; border: 1px solid rgba(163,230,53,0.15);
      border-radius: 10px; padding: 9px 12px;
      width: 100%; max-width: 340px; margin-bottom: 12px;
    }
    .donate-addr-text {
      flex: 1; font-family: 'JetBrains Mono', monospace;
      font-size: 10px; color: #a3e635; word-break: break-all; text-align: left;
      line-height: 1.5;
    }
    .donate-copy-btn {
      flex-shrink: 0;
      background: rgba(163,230,53,0.1); border: 1px solid rgba(163,230,53,0.25);
      border-radius: 6px; color: #a3e635; font-size: 11px; font-weight: 700;
      padding: 4px 10px; cursor: pointer; transition: all 0.15s; white-space: nowrap;
    }
    .donate-copy-btn:hover { background: rgba(163,230,53,0.2); }
    .donate-copy-btn.copied { background: rgba(52,211,153,0.15); border-color: rgba(52,211,153,0.3); color: #34d399; }
    .donate-hint {
      font-size: 11px; color: #3a4d42; line-height: 1.5; max-width: 320px;
    }
    .donate-hint strong { color: #748f80; }

    .word-steps {
      background: #0b0e0e; border: 1px solid #1c2a2a; border-radius: 16px;
      overflow: hidden; margin-bottom: 16px;
    }
    .ws-header {
      padding: 14px 20px; border-bottom: 1px solid #1c2a2a;
      font-size: 11px; font-weight: 700; color: #3a4d42;
      text-transform: uppercase; letter-spacing: .08em;
    }
    .ws-step {
      display: flex; align-items: center; gap: 16px;
      padding: 16px 20px; border-bottom: 1px solid #101414;
      transition: background 0.15s;
    }
    .ws-step:last-child { border-bottom: none; }
    .ws-step:hover { background: #101414; }
    .ws-num {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      background: #101414; border: 1px solid #1c2a2a;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 800; color: #3a4d42;
    }
    .ws-icon-wrap {
      width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
      background: #101414; border: 1px solid #1c2a2a;
      display: flex; align-items: center; justify-content: center; font-size: 20px;
    }
    .ws-body { flex: 1; }
    .ws-title { font-size: 13px; font-weight: 700; color: #edf7ed; margin-bottom: 3px; }
    .ws-sub   { font-size: 11px; color: #3a4d42; line-height: 1.5; }
    .ws-sub strong { color: #748f80; font-weight: 600; }
    .ws-badge {
      padding: 3px 10px; border-radius: 100px;
      font-size: 10px; font-weight: 700; flex-shrink: 0;
    }
    .ws-badge.blue { background: rgba(163,230,53,0.12); color: #a3e635; }
    .ws-badge.green { background: rgba(52,211,153,0.12); color: #34d399; }

    /* ═══════════════════════════════════════════════════
       STEP 2 — PIPELINE
       ═══════════════════════════════════════════════════ */

    .pipeline {
      display: grid;
      grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr;
      align-items: center;
      gap: 0;
      margin: 24px 0 28px;
    }

    .ps {
      display: flex; flex-direction: column; align-items: center; gap: 8px;
      padding: 16px 10px;
      border-radius: 14px;
      border: 1px solid #1c2a2a;
      background: #101414;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
    }
    .ps.ps-info   { opacity: 0.55; }
    .ps.ps-active {
      border-color: rgba(163,230,53,0.45);
      background: rgba(163,230,53,0.07);
      box-shadow: 0 0 24px rgba(163,230,53,0.12), 0 0 0 1px rgba(163,230,53,0.15) inset;
      opacity: 1;
    }
    .ps.ps-done {
      border-color: rgba(52,211,153,0.35);
      background: rgba(52,211,153,0.06);
      opacity: 1;
    }
    .ps.ps-muted { opacity: 0.3; }

    .ps-badge {
      position: absolute; top: -8px; right: -8px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #34d399; border: 2px solid #030404;
      display: flex; align-items: center; justify-content: center;
      font-size: 9px; font-weight: 700; color: #fff;
    }

    .ps-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      background: #131818; border: 1px solid #1c2a2a;
      transition: all 0.3s;
    }
    .ps.ps-active .ps-icon {
      background: rgba(163,230,53,0.15);
      border-color: rgba(163,230,53,0.35);
    }
    .ps.ps-done .ps-icon {
      background: rgba(52,211,153,0.15);
      border-color: rgba(52,211,153,0.35);
    }

    .ps-title {
      font-size: 11.5px; font-weight: 700; color: #edf7ed; line-height: 1.3;
    }
    .ps.ps-info .ps-title  { color: #748f80; }
    .ps.ps-muted .ps-title { color: #3a4d42; }
    .ps.ps-active .ps-title { color: #edf7ed; }
    .ps.ps-done .ps-title  { color: #34d399; }

    .ps-sub {
      font-size: 10px; color: #3a4d42; line-height: 1.45; max-width: 90px;
    }
    .ps.ps-active .ps-sub { color: #748f80; }
    .ps.ps-done .ps-sub   { color: rgba(52,211,153,0.6); }

    /* Pipeline arrow */
    .pa {
      display: flex; align-items: center; justify-content: center;
    }
    .pa svg {
      width: 22px; height: 14px;
      color: #1c2a2a;
      transition: color 0.3s;
      overflow: visible;
    }
    .pa.pa-done svg { color: rgba(52,211,153,0.5); }
    .pa.pa-active svg { color: rgba(163,230,53,0.5); }

    /* Parse result panel */
    .parse-result {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 20px;
      background: rgba(52,211,153,0.07);
      border: 1px solid rgba(52,211,153,0.25);
      border-radius: 14px;
      margin-top: 16px;
    }
    .parse-result-ico {
      width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
      background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    }
    .parse-result-body { flex: 1; }
    .parse-result-title { font-size: 14px; font-weight: 700; color: #34d399; margin-bottom: 3px; }
    .parse-result-sub   { font-size: 12px; color: rgba(52,211,153,0.65); }
    .parse-count {
      display: flex; flex-direction: column; align-items: center;
      padding: 0 16px; border-left: 1px solid rgba(52,211,153,0.2);
    }
    .parse-count-num {
      font-size: 34px; font-weight: 800; color: #34d399;
      font-variant-numeric: tabular-nums; line-height: 1;
    }
    .parse-count-label { font-size: 10px; font-weight: 600; color: rgba(52,211,153,0.5); text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }

    .parse-warning {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 16px; border-radius: 12px; margin-top: 12px;
      background: rgba(245,158,11,0.07); border: 1px solid rgba(245,158,11,0.25);
      font-size: 12px; color: #f59e0b;
    }

    /* Upload area redesign for step 2 */
    .upload-options {
      display: grid; grid-template-columns: 1fr auto 1fr; gap: 0; align-items: stretch;
      margin: 16px 0;
    }
    .upload-col { display: flex; flex-direction: column; gap: 8px; }
    .upload-col-label {
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: .08em; color: #3a4d42; text-align: center; margin-bottom: 4px;
    }
    .upload-divider {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 8px; padding: 0 18px;
    }
    .upload-divider-line { flex: 1; width: 1px; background: #1c2a2a; }
    .upload-divider-text {
      font-size: 10px; font-weight: 700; color: #3a4d42;
      text-transform: uppercase; letter-spacing: .06em;
    }

    /* ═══════════════════════════════════════════════════
       VALIDATION — PROGRESS VIEW
       ═══════════════════════════════════════════════════ */

    .progress-wrap {
      background: #0b0e0e;
      border: 1px solid #1c2a2a;
      border-radius: 16px;
      overflow: hidden;
    }

    /* Header bar */
    .progress-header {
      display: flex; align-items: center; gap: 14px;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #1c2a2a;
    }
    .progress-icon {
      width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
      background: rgba(163,230,53,0.12); border: 1px solid rgba(163,230,53,0.25);
      display: flex; align-items: center; justify-content: center;
    }
    .progress-title {
      flex: 1; font-size: 15px; font-weight: 700; color: #edf7ed;
    }
    .progress-fraction {
      font-size: 13px; font-weight: 600; color: #a3e635;
      background: rgba(163,230,53,0.1); border: 1px solid rgba(163,230,53,0.2);
      border-radius: 8px; padding: 4px 12px;
      font-variant-numeric: tabular-nums;
    }

    /* Progress bar */
    .progress-bar-wrap {
      padding: 0 24px 4px;
    }
    .progress-track {
      height: 3px; background: #101414; border-radius: 2px; overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #a3e635, #c7f279);
      border-radius: 2px;
      transition: width 0.4s ease;
    }

    /* Entry list container */
    .entry-list {
      max-height: 420px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #1c2a2a transparent;
    }
    .entry-list::-webkit-scrollbar { width: 5px; }
    .entry-list::-webkit-scrollbar-thumb { background: #1c2a2a; border-radius: 3px; }

    /* Individual entry row */
    .entry-row {
      display: grid;
      grid-template-columns: 36px 140px 1fr 160px;
      align-items: center;
      gap: 10px;
      padding: 9px 24px;
      border-bottom: 1px solid #030404;
      transition: background 0.15s;
      min-height: 44px;
    }
    .entry-row:last-child { border-bottom: none; }
    .entry-row.checking { background: rgba(163,230,53,0.06); }
    .entry-row.ok       { background: transparent; }
    .entry-row.warn     { background: rgba(245,158,11,0.04); }
    .entry-row.error    { background: rgba(163,230,53,0.04); }
    .entry-row.pending  { background: transparent; opacity: 0.45; }

    .entry-idx {
      font-size: 11px; font-weight: 700;
      color: #3a4d42; text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .entry-key {
      font-size: 11.5px; font-weight: 600; color: #748f80;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-family: 'JetBrains Mono', 'Consolas', monospace;
    }
    .entry-row.checking .entry-key { color: #a3e635; }
    .entry-title {
      font-size: 11.5px; color: #9db8a6;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .entry-status {
      display: flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600;
      justify-content: flex-end;
    }
    .entry-status.checking { color: #a3e635; }
    .entry-status.ok       { color: #34d399; }
    .entry-status.warn     { color: #f59e0b; }
    .entry-status.error    { color: #a3e635; }
    .entry-status.pending  { color: #3a4d42; }

    /* Status icon */
    .status-icon { font-size: 13px; flex-shrink: 0; }

    /* ═══════════════════════════════════════════════════
       VALIDATION — RESULTS TABLE
       ═══════════════════════════════════════════════════ */

    /* Summary stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 20px;
    }
    .stat-cell {
      background: #0b0e0e;
      border: 1px solid #1c2a2a;
      border-radius: 12px;
      padding: 14px 16px;
      text-align: center;
    }
    .stat-val {
      font-size: 22px; font-weight: 800;
      color: #edf7ed; line-height: 1;
      margin-bottom: 5px;
      font-variant-numeric: tabular-nums;
    }
    .stat-val.warn  { color: #f59e0b; }
    .stat-val.error { color: #a3e635; }
    .stat-val.ok    { color: #34d399; }
    .stat-label { font-size: 10px; font-weight: 600; color: #3a4d42; text-transform: uppercase; letter-spacing: .06em; }

    /* Table card */
    .table-card {
      background: #0b0e0e;
      border: 1px solid #1c2a2a;
      border-radius: 16px;
      overflow: hidden;
    }
    .table-toolbar {
      display: flex; align-items: center; gap: 10px;
      padding: 16px 20px;
      border-bottom: 1px solid #1c2a2a;
    }
    .table-toolbar-title {
      font-size: 13px; font-weight: 700; color: #edf7ed; flex: 1;
    }
    .table-hint {
      font-size: 11px; color: #3a4d42;
    }

    .table-scroll {
      overflow-x: auto;
      overflow-x: auto;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      max-height: 520px;
      scrollbar-width: thin;
      scrollbar-color: #1c2a2a transparent;
    }
    .table-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
    .table-scroll::-webkit-scrollbar-thumb { background: #1c2a2a; border-radius: 3px; }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 980px;
      font-size: 12px;
    }
    thead { position: sticky; top: 0; z-index: 2; }
    th {
      background: #030404;
      padding: 10px 14px;
      text-align: left;
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .07em;
      color: #3a4d42;
      border-bottom: 1px solid #1c2a2a;
      white-space: nowrap;
      user-select: none;
    }
    th:first-child { width: 44px; text-align: center; }
    td {
      padding: 0;
      border-bottom: 1px solid #0b0e0e;
      vertical-align: middle;
    }
    td:first-child { text-align: center; width: 44px; }
    tbody tr { transition: background 0.1s; }
    tbody tr.row-ok    { background: #0b0e0e; }
    tbody tr.row-warn  { background: rgba(245,158,11,0.03); }
    tbody tr.row-error { background: rgba(163,230,53,0.03); }
    tbody tr.row-ok:hover    { background: #101414; }
    tbody tr.row-warn:hover  { background: rgba(245,158,11,0.07); }
    tbody tr.row-error:hover { background: rgba(163,230,53,0.07); }

    .td-num {
      font-size: 11px; font-weight: 600; color: #3a4d42;
      font-variant-numeric: tabular-nums;
      padding: 10px 0;
    }
    .td-key {
      padding: 6px 14px;
    }
    .key-text {
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', 'Consolas', monospace;
      color: #748f80; white-space: nowrap;
      display: block; margin-bottom: 3px;
    }

    /* Badge */
    .badge {
      display: inline-flex; align-items: center; gap: 3px;
      padding: 2px 8px; border-radius: 100px;
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .04em;
      white-space: nowrap;
    }
    .badge-ok    { background: rgba(52,211,153,0.12);  color: #34d399; }
    .badge-warn  { background: rgba(245,158,11,0.12); color: #f59e0b; }
    .badge-error { background: rgba(163,230,53,0.12);  color: #a3e635; }

    /* Issue tags */
    .issue-tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 3px; }
    .issue-tag {
      display: inline-block; padding: 1px 5px; border-radius: 3px;
      font-size: 9px; font-weight: 600; letter-spacing: .02em;
      background: #101414; color: #748f80; border: 1px solid #1c2a2a;
      white-space: nowrap;
    }
    .issue-tag.error { background: rgba(163,230,53,0.08); color: #a3e635; border-color: rgba(163,230,53,0.2); }
    .issue-tag.warn  { background: rgba(245,158,11,0.08); color: #f59e0b; border-color: rgba(245,158,11,0.2); }

    /* Editable cells */
    .cell-wrap {
      padding: 6px 14px;
      height: 100%;
    }
    .cell-text {
      font-size: 12px; color: #9db8a6;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      max-width: 220px;
      padding: 4px 6px;
      border-radius: 5px;
      border: 1px solid transparent;
      cursor: text;
      transition: border-color 0.15s, background 0.15s;
    }
    .cell-text:hover {
      border-color: #1c2a2a;
      background: #101414;
    }
    .cell-text.empty { color: #3a4d42; font-style: italic; }
    .cell-text.edited {
      color: #a3e635;
      border-color: rgba(163,230,53,0.25);
      background: rgba(163,230,53,0.05);
    }
    .cell-input {
      width: 100%; min-width: 120px;
      background: #131818; border: 1px solid #a3e635;
      border-radius: 5px; color: #edf7ed;
      font-size: 12px; font-family: inherit;
      padding: 4px 8px; outline: none;
      box-shadow: 0 0 0 2px rgba(163,230,53,0.15);
    }
    /* DOI column */
    .col-doi  { min-width: 180px; }
    .col-year { width: 70px; }
    .col-badge { width: 100px; padding: 10px 14px; }

    /* Table footer actions */
    .table-footer {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid #1c2a2a;
      background: #030404;
    }
    .changed-hint {
      font-size: 11px; color: #a3e635; flex: 1;
    }

    /* Results top actions */
    .results-actions {
      display: flex; align-items: center; gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .results-title {
      font-size: 17px; font-weight: 700; color: #edf7ed;
      flex: 1;
    }

    /* ─── Mobile ──────────────────────────────────────────────────────────── */

    @media (max-width: 640px) {
      /* Header */
      header { padding: 0 16px; gap: 8px; }
      .logo-tag { display: none; }
      .header-badge { display: none; }

      /* Stepper */
      .stepper { padding: 12px 8px; }
      .step-pill { padding: 5px 8px; gap: 5px; }
      .step-name { font-size: 10px; }
      .step-connector { width: 20px; }

      /* Main */
      main { padding: 20px 14px 80px; }

      /* Cards */
      .card { padding: 18px 16px; margin-bottom: 12px; }
      .card-header { gap: 10px; margin-bottom: 14px; }

      /* File grids — collapse to 1 column */
      .file-grid-3 { grid-template-columns: 1fr; }
      .file-grid-2 { grid-template-columns: 1fr; }

      /* Inputs — 16px prevents iOS from zooming on focus */
      .text-input { font-size: 16px; }
      .cell-input  { font-size: 16px; }

      /* Table */
      .table-scroll { max-height: 360px; }
      .table-footer { flex-wrap: wrap; gap: 8px; }

      /* Results */
      .results-actions { gap: 8px; }
      .results-title { font-size: 14px; }

      /* Donate */
      .donate-qr { width: 130px; height: 130px; }
      .donate-addr-row { flex-direction: column; align-items: stretch; gap: 8px; }
      .donate-copy-btn { width: 100%; justify-content: center; padding: 10px; }
    }

    @media (max-width: 400px) {
      /* Stepper — dots only, no labels */
      .step-name { display: none; }
      .step-connector { width: 10px; }
      .step-pill { padding: 5px; }

      /* Extra compact */
      main { padding: 14px 10px 80px; }
      .card { padding: 14px 12px; }
      .card-header { gap: 8px; }
      .btn { padding: 8px 14px; font-size: 12px; }
    }

    /* Touch devices — no sticky hover states */
    @media (hover: none) {
      .card:hover { border-color: #1c2a2a; box-shadow: none; }
      .btn:hover  { filter: none; }
    }
  `

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  connectedCallback() {
    super.connectedCallback()
    QRCode.toDataURL(DONATE_WALLET, {
      width: 200, margin: 2,
      color: { dark: '#a3e635', light: '#060e06' },
      errorCorrectionLevel: 'H',
    }).then(url => { this._qrDataUrl = url })
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('_editingCell') && this._editingCell) {
      requestAnimationFrame(() => {
        const input = this.shadowRoot?.querySelector('.cell-input') as HTMLInputElement | null
        if (input) { input.focus(); input.select() }
      })
    }
    if (changed.has('_entries') && this.status === 'processing') {
      const list = this.shadowRoot?.querySelector('.entry-list')
      if (list) list.scrollTop = list.scrollHeight
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private _ss(n: number): 'done' | 'active' | 'pending' {
    return n < this.step ? 'done' : n === this.step ? 'active' : 'pending'
  }

  private _goStep(n: number) {
    this.step = n; this.status = 'idle'; this.log = ''
    this._parseCount = 0; this._parseMatch = null; this._parseWarning = ''
    this._clearValidation()
  }

  private _clearValidation() {
    this._entries = []; this._totalEntries = 0; this._checkedCount = 0
    this._currentKey = ''; this._validationStats = {}; this._validationDone = false
    this._editedFields = {}; this._editingCell = null; this._bibJobId = ''
  }

  private _getField(entry: EntryState, field: string): string {
    return this._editedFields[entry.key]?.[field] ?? entry.fields[field] ?? ''
  }

  private _clean(val: string): string {
    return val.replace(/[{}]/g, '')
  }

  private async _copyWallet() {
    await navigator.clipboard.writeText(DONATE_WALLET)
    this._walletCopied = true
    setTimeout(() => { this._walletCopied = false }, 2000)
  }

  private _onMailtoInput(e: Event) {
    const input = e.target as HTMLInputElement
    // Strip any character that can't appear in a valid email address
    const sanitized = input.value
      .replace(/[^a-zA-Z0-9._%+\-@]/g, '')
      .slice(0, 254)
    // Reflect sanitized value back into the input if it changed
    if (sanitized !== input.value) input.value = sanitized
    this._mailto = sanitized
    if (!sanitized) {
      this._mailtoError = ''
    } else if (!/^[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,253}\.[a-zA-Z]{2,}$/.test(sanitized)) {
      this._mailtoError = this._lang === 'ru' ? 'Неверный формат email' : 'Invalid email format'
    } else {
      this._mailtoError = ''
    }
  }

  private _isEdited(entry: EntryState, field: string): boolean {
    const edited = this._editedFields[entry.key]?.[field]
    return edited !== undefined && edited !== (entry.fields[field] ?? '')
  }

  private _hasAnyEdits(): boolean {
    return Object.values(this._editedFields).some(f => Object.keys(f).length > 0)
  }

  private _countByStatus(s: EntryState['status']) {
    return this._entries.filter(e => e.status === s).length
  }

  // ── Stream handling ────────────────────────────────────────────────────────

  private _handleStreamEvent(ev: any) {
    switch (ev.type) {
      case 'start':
        this._totalEntries = ev.total
        break

      case 'entry_start': {
        const existing = this._entries.find(e => e.key === ev.key)
        if (existing) {
          existing.status = 'checking'
          this._entries = [...this._entries]
        } else {
          this._entries = [...this._entries, {
            key: ev.key, entry_type: '',
            status: 'checking',
            issues: [],
            fields: { title: ev.title || '' },
            idx: ev.idx,
          }]
        }
        this._currentKey = ev.key
        break
      }

      case 'entry_done': {
        const i = this._entries.findIndex(e => e.key === ev.key)
        if (i >= 0) {
          const updated = [...this._entries]
          updated[i] = {
            ...updated[i],
            status: ev.status,
            issues: ev.issues,
            ...(ev.fields ? { fields: ev.fields } : {}),
          }
          this._entries = updated
        }
        if (ev.idx >= 0) this._checkedCount = ev.idx
        break
      }

      case 'done':
        this._validationStats = ev.stats ?? {}
        if (Array.isArray(ev.entries)) {
          this._entries = (ev.entries as any[]).map((e, i) => ({
            key: e.key, entry_type: e.entry_type,
            status: e.status, issues: e.issues,
            fields: e.fields, idx: i + 1,
          }))
        }
        break

      case 'end':
        this._bibJobId = ev.job_id
        this._validationDone = true
        this.status = ev.code === 0 ? 'done' : 'error'
        this._currentKey = ''
        if (ev.log) this.log = ev.log
        break

      case 'stream_error':
        this.status = 'error'; this.log = ev.message
        break
    }
  }

  // ── API calls ─────────────────────────────────────────────────────────────

  private async _runValidate() {
    if (!this._bibFile) return
    this.status = 'processing'; this.log = ''
    this._entries = []; this._totalEntries = 0; this._checkedCount = 0
    this._validationDone = false; this._validationStats = {}
    this._bibJobId = ''; this._editedFields = {}

    const form = new FormData()
    form.append('bib', this._bibFile)
    // Only send email if it passed client-side validation
    form.append('mailto', this._mailtoError ? '' : this._mailto)

    try {
      const response = await fetch('/api/validate-stream', { method: 'POST', body: form })
      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => ({ detail: 'Server error' }))
        this.status = 'error'; this.log = data.detail; return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''
        for (const part of parts) {
          const line = part.trim()
          if (line.startsWith('data: ')) {
            try { this._handleStreamEvent(JSON.parse(line.slice(6))) } catch { /* skip */ }
          }
        }
      }
    } catch (e) {
      this.status = 'error'; this.log = String(e)
    }
  }

  private async _runParseHtml() {
    if (!this._htmlFile || !this._bibFile) return
    this.status = 'processing'; this.log = ''
    this._parseCount = 0; this._parseMatch = null; this._parseWarning = ''
    const form = new FormData()
    form.append('html', this._htmlFile)
    form.append('bib', this._bibFile)
    try {
      const res = await fetch('/api/parse-html', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) { this.status = 'error'; this.log = data.detail }
      else {
        this.status = 'done'
        this._uriMapJobId = data.job_id
        this._parseCount = data.count ?? 0
        this._parseMatch = data.match ?? null
        this._parseWarning = data.warning ?? ''
        this.log = data.log
      }
    } catch (e) { this.status = 'error'; this.log = String(e) }
  }

  private async _runInject() {
    if (!this._docxFile || !this._bibFile) return
    this.status = 'processing'; this.log = ''
    const form = new FormData()
    form.append('docx', this._docxFile)

    if (this._bibJobId) {
      const r = await fetch(`/api/download/${this._bibJobId}/references_enriched.bib`)
      form.append('bib', new File([await r.blob()], 'references.bib'))
    } else {
      form.append('bib', this._bibFile)
    }

    if (this._uriMapJobId) {
      const r = await fetch(`/api/download/${this._uriMapJobId}/uri-map.tsv`)
      form.append('uri_map', new File([await r.blob()], 'uri-map.tsv'))
    } else if (this._uriMapDirect) {
      form.append('uri_map', this._uriMapDirect)
    }

    form.append('library_type', 'users')
    try {
      const res = await fetch('/api/inject', { method: 'POST', body: form })
      const data = await res.json()
      if (!res.ok) { this.status = 'error'; this.log = data.detail }
      else {
        this.status = 'done'
        this._injectJobId = data.job_id
        this._injectGroups = data.groups ?? 0
        this._injectReplaced = data.replaced ?? 0
        this.log = data.log
      }
    } catch (e) { this.status = 'error'; this.log = String(e) }
  }

  private async _generateBib() {
    this._generatingBib = true
    const entries = this._entries.map(entry => ({
      key: entry.key,
      entry_type: entry.entry_type,
      fields: { ...entry.fields, ...(this._editedFields[entry.key] ?? {}) },
    }))
    try {
      const res = await fetch('/api/generate-bib', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries }),
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = 'references_edited.bib'; a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      this.log = String(e)
    } finally {
      this._generatingBib = false
    }
  }

  private _updateField(key: string, field: string, value: string) {
    const prev = this._editedFields[key] ?? {}
    this._editedFields = { ...this._editedFields, [key]: { ...prev, [field]: value } }
  }

  private _saveCell(key: string, field: string, value: string) {
    this._updateField(key, field, value)
    this._editingCell = null
  }

  private _reset() {
    this.step = 1; this.status = 'idle'; this.log = ''
    this._bibFile = null; this._htmlFile = null
    this._uriMapJobId = ''; this._uriMapDirect = null
    this._docxFile = null; this._injectJobId = ''; this._injectGroups = 0; this._injectReplaced = 0
    this._parseCount = 0; this._parseMatch = null; this._parseWarning = ''
    this._clearValidation()
    this.shadowRoot?.querySelectorAll('file-drop').forEach((el: any) => el.reset?.())
  }

  // ── Render helpers ─────────────────────────────────────────────────────────

  private _renderLog() {
    if (!this.log) return nothing
    return html`
      <div class="log-wrap">
        <div class="log-label">${this._t('log_label')}</div>
        <div class="log-box">${this.log}</div>
      </div>`
  }

  private _statusIcon(s: EntryState['status']) {
    switch (s) {
      case 'checking': return html`<span class="spinner-sm"></span>`
      case 'ok':       return html`<span class="status-icon">✓</span>`
      case 'warn':     return html`<span class="status-icon">⚠</span>`
      case 'error':    return html`<span class="status-icon">✕</span>`
      default:         return html`<span class="status-icon">·</span>`
    }
  }

  private _statusLabel(e: EntryState): string {
    const i = APP_I18N[this._lang].issue as Record<string, string>
    if (e.status === 'checking') return this._t('st_checking')
    if (e.status === 'ok')       return this._t('st_ok')
    if (e.status === 'warn')     return e.issues.length ? i[e.issues[0]] ?? this._t('st_warn') : this._t('st_warn')
    if (e.status === 'error')    return e.issues.length ? i[e.issues[0]] ?? this._t('st_err') : this._t('st_err')
    return ''
  }

  private _statusBadge(status: EntryState['status']) {
    if (status === 'ok')    return html`<span class="badge badge-ok">${this._t('badge_ok')}</span>`
    if (status === 'warn')  return html`<span class="badge badge-warn">${this._t('badge_warn')}</span>`
    if (status === 'error') return html`<span class="badge badge-error">${this._t('badge_err')}</span>`
    return nothing
  }

  private _issueTag(issue: string, entryStatus: EntryState['status']) {
    const i = APP_I18N[this._lang].issue as Record<string, string>
    const label = i[issue] ?? issue
    const cls = entryStatus === 'error' ? 'error' : 'warn'
    return html`<span class="issue-tag ${cls}">${label}</span>`
  }

  private _renderCell(entry: EntryState, field: string, placeholder = '—') {
    const value = this._getField(entry, field)
    const editing = this._editingCell?.key === entry.key && this._editingCell?.field === field
    const edited = this._isEdited(entry, field)

    if (editing) {
      return html`
        <div class="cell-wrap">
          <input class="cell-input" type="text" .value=${value}
            @blur=${(e: FocusEvent) => this._saveCell(entry.key, field, (e.target as HTMLInputElement).value)}
            @keydown=${(e: KeyboardEvent) => {
              if (e.key === 'Enter')  this._saveCell(entry.key, field, (e.target as HTMLInputElement).value)
              if (e.key === 'Escape') this._editingCell = null
            }}
          />
        </div>`
    }

    const display = value ? this._clean(value) : placeholder
    return html`
      <div class="cell-wrap">
        <div class="cell-text ${edited ? 'edited' : ''} ${!value ? 'empty' : ''}"
          title="${display}"
          @click=${() => { this._editingCell = { key: entry.key, field } }}>
          ${display}
        </div>
      </div>`
  }

  // ── Validation: Progress view ──────────────────────────────────────────────

  private _renderValidationProgress() {
    const pct = this._totalEntries > 0
      ? Math.round((this._checkedCount / this._totalEntries) * 100) : 0

    return html`
      <div class="progress-wrap">
        <div class="progress-header">
          <div class="progress-icon">
            <span class="spinner" style="color:#a3e635"></span>
          </div>
          <div class="progress-title">${this._t('v_checking')}</div>
          <div class="progress-fraction">${this._checkedCount}&thinsp;/&thinsp;${this._totalEntries || '?'}</div>
        </div>

        <div class="progress-bar-wrap" style="padding:8px 24px 12px">
          <div class="progress-track">
            <div class="progress-fill" style="width:${pct}%"></div>
          </div>
        </div>

        <div class="entry-list">
          ${this._entries.map(e => html`
            <div class="entry-row ${e.status}">
              <div class="entry-idx">${e.idx}</div>
              <div class="entry-key">${e.key}</div>
              <div class="entry-title">${this._clean(this._getField(e, 'title') || e.fields.title || '')}</div>
              <div class="entry-status ${e.status}">
                ${this._statusIcon(e.status)}
                ${this._statusLabel(e)}
              </div>
            </div>
          `)}
        </div>
      </div>

      ${this._renderLog()}
    `
  }

  // ── Validation: Results table ──────────────────────────────────────────────

  private _renderResultsTable() {
    const nOk    = this._countByStatus('ok')
    const nWarn  = this._countByStatus('warn')
    const nError = this._countByStatus('error')
    const total  = this._entries.length
    const edits  = this._hasAnyEdits()

    const STAT_KEYS = ['processed','doi_valid','doi_added','unresolved','problem_entries','entries_changed']

    return html`
      <!-- Summary stats -->
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-val">${total}</div>
          <div class="stat-label">${this._lang === 'en' ? 'Total' : 'Всего записей'}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val ok">${nOk}</div>
          <div class="stat-label">${this._t('st_ok')}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val warn">${nWarn}</div>
          <div class="stat-label">${this._lang === 'en' ? 'Warnings' : 'Предупреждения'}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val error">${nError}</div>
          <div class="stat-label">${this._lang === 'en' ? 'Errors' : 'Ошибки'}</div>
        </div>
      </div>

      <!-- Action row -->
      <div class="results-actions">
        <div class="results-title">${this._t('v_results')}</div>

        ${this._bibJobId ? html`
          <a class="btn btn-ghost" style="font-size:12px"
             href="/api/download/${this._bibJobId}/references_enriched.bib"
             download="references_enriched.bib">
            ${this._t('v_dl_enriched')}
          </a>` : nothing}

        <button class="btn btn-blue" style="font-size:12px"
          ?disabled=${this._generatingBib}
          @click=${this._generateBib}>
          ${this._generatingBib
            ? html`<span class="spinner"></span> ${this._t('v_generating')}`
            : html`↓ ${this._lang === 'en' ? 'Save' : 'Сохранить'}${edits ? (this._lang === 'en' ? ' (with edits)' : ' (с правками)') : ''} .bib`}
        </button>

        <button class="btn btn-next" style="font-size:12px"
          @click=${() => this._goStep(2)}>
          ${this._t('v_next')}
        </button>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <div class="table-toolbar-title">${this._lang === 'en' ? 'Sources — click a cell to edit' : 'Источники — нажмите на ячейку, чтобы отредактировать'}</div>
          <div class="table-hint">${this._lang === 'en' ? 'Fields: title, authors, year, journal, DOI' : 'Поля: название, авторы, год, журнал, DOI'}</div>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>${this._t('th_num')}</th>
                <th>${this._t('th_key')} / ${this._t('th_status')}</th>
                <th>${this._t('th_title')}</th>
                <th>${this._t('th_author')}</th>
                <th class="col-year">${this._t('th_year')}</th>
                <th>${this._t('th_journal')}</th>
                <th class="col-doi">${this._t('th_doi')}</th>
              </tr>
            </thead>
            <tbody>
              ${this._entries.map((entry, i) => html`
                <tr class="row-${entry.status}">
                  <td class="td-num">${i + 1}</td>

                  <td class="td-key">
                    <span class="key-text">${entry.key}</span>
                    ${this._statusBadge(entry.status)}
                    ${entry.issues.length ? html`
                      <div class="issue-tags">
                        ${entry.issues.map(iss => this._issueTag(iss, entry.status))}
                      </div>` : nothing}
                  </td>

                  <td style="max-width:240px">${this._renderCell(entry, 'title', '—')}</td>
                  <td style="max-width:180px">${this._renderCell(entry, 'author', '—')}</td>
                  <td class="col-year">${this._renderCell(entry, 'year', '—')}</td>
                  <td style="max-width:180px">${this._renderCell(entry, 'journal', '—')}</td>
                  <td class="col-doi">${this._renderCell(entry, 'doi', '—')}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>

        ${edits ? html`
          <div class="table-footer">
            <div class="changed-hint">${this._lang === 'en' ? 'Unsaved edits — click "Save .bib"' : 'Есть несохранённые правки — нажмите «Сохранить .bib»'}</div>
            <button class="btn btn-blue" style="font-size:12px"
              ?disabled=${this._generatingBib}
              @click=${this._generateBib}>
              ${this._generatingBib
                ? html`<span class="spinner"></span> ${this._t('v_generating')}`
                : (this._lang === 'en' ? '↓ Save with edits .bib' : '↓ Сохранить с правками .bib')}
            </button>
          </div>` : nothing}
      </div>

      ${this._renderLog()}
    `
  }

  // ── Step 1 ────────────────────────────────────────────────────────────────

  private _step1() {
    if (this.status === 'processing' && this._entries.length > 0) {
      return this._renderValidationProgress()
    }
    if (this._validationDone) {
      return this._renderResultsTable()
    }
    return this._renderStep1Form()
  }

  private _renderStep1Form() {
    const hasFile   = !!this._bibFile
    const isProc    = this.status === 'processing'
    const emailOk   = !this._mailto || !this._mailtoError

    return html`
      <div class="card">
        <div class="card-header">
          <div class="card-icon red">📚</div>
          <div>
            <div class="card-title">${this._t('s1_title')}</div>
            <div class="card-desc">${this._t('s1_desc')}</div>
          </div>
        </div>

        <!-- Format example -->
        <div class="format-hint">
          <div class="format-hint-header">
            <div class="dot"></div>
            ${this._t('s1_format_hd')}
          </div>
          <div class="code-block">
            <span class="cc">% [1]</span><br>
            <span class="ck">@article</span>{<span class="cv">Smith2020</span>,<br>
            &nbsp;&nbsp;title&nbsp;&nbsp;&nbsp;= {<span class="cs">Effect of temperature on ceramics</span>},<br>
            &nbsp;&nbsp;author&nbsp;&nbsp;= {Smith, John},<br>
            &nbsp;&nbsp;journal = {Ceramics Int.}, year = {2020}<br>
            }<br>
            <span class="cc">% [2]</span><br>
            <span class="ck">@article</span>{<span class="cv">Jones2019</span>, ...}
          </div>
        </div>

        <div class="section-label" style="margin-top:20px">${this._t('s1_file_sec')}</div>
        <file-drop
          label="${this._t('s1_drop_lbl')}"
          ext=".bib" accept=".bib"
          @file-selected=${(e: CustomEvent) => { this._bibFile = e.detail; this._clearValidation() }}
        ></file-drop>

        ${hasFile ? html`
          <div class="bib-file-info">
            <div class="bfi-icon">📄</div>
            <div>
              <div class="bfi-name">${this._bibFile!.name}</div>
              <div class="bfi-sub">${this._t('s1_file_ready')}</div>
            </div>
          </div>` : nothing}

        <!-- Email input -->
        <div class="input-wrap" style="margin-top:16px">
          <label class="input-label">
            ${this._t('s1_email_lbl')}
            <span class="optional-tag">${this._t('s1_email_opt')}</span>
          </label>
          <input
            class="text-input ${this._mailtoError ? 'input-err' : this._mailto ? 'input-ok' : ''}"
            type="text"
            inputmode="email"
            autocomplete="email"
            placeholder="you@university.edu"
            maxlength="254"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
            @input=${this._onMailtoInput}
          />
          ${this._mailtoError
            ? html`<div class="field-msg err">✕ ${this._mailtoError}</div>`
            : this._mailto
              ? html`<div class="field-msg ok">✓ ${this._lang === 'ru' ? 'Email подтверждён' : 'Email accepted'}</div>`
              : html`<div class="field-msg" style="color:#3a4d42">${this._t('s1_email_hint')}</div>`
          }
        </div>

        ${this._renderLog()}

        <!-- Action cards -->
        <div class="action-row">
          <button class="action-card primary" ?disabled=${!hasFile || isProc || !emailOk}
            @click=${this._runValidate}>
            <div class="ac-icon">🔍</div>
            <div class="ac-title ac-primary">
              ${isProc ? html`<span class="spinner" style="display:inline-block;width:13px;height:13px;vertical-align:middle;margin-right:6px;color:#a3e635"></span>` : nothing}
              ${isProc ? this._t('s1_checking') : this._t('s1_btn_check')}
            </div>
            <div class="ac-sub">${this._t('s1_btn_check_sub')}</div>
          </button>

          <button class="action-card" ?disabled=${!hasFile || isProc}
            @click=${() => this._goStep(2)}>
            <div class="ac-icon">⏭</div>
            <div class="ac-title">${this._t('s1_btn_skip')}</div>
            <div class="ac-sub">${this._t('s1_btn_skip_sub')}</div>
          </button>
        </div>
      </div>
    `
  }

  // ── Step 2 ────────────────────────────────────────────────────────────────

  private _step2() {
    const hasMap   = !!this._uriMapJobId || !!this._uriMapDirect
    const hasHtml  = !!this._htmlFile
    const isDone   = !!this._uriMapJobId
    const isProc   = this.status === 'processing'
    const isError  = this.status === 'error'

    // Pipeline step states
    const s1 = 'ps-info'
    const s2 = 'ps-info'
    const s3 = isDone ? 'ps-done' : hasHtml ? 'ps-done' : 'ps-active'
    const s4 = isDone ? 'ps-done' : hasHtml ? 'ps-active' : 'ps-muted'

    const arrowSvg = html`
      <svg viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6H20M15 1.5L20.5 6L15 10.5" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`

    return html`
      <div class="card">
        <div class="card-header">
          <div class="card-icon blue">🔗</div>
          <div>
            <div class="card-title">${this._t('s2_title')}</div>
            <div class="card-desc">${this._t('s2_desc')}</div>
          </div>
        </div>

        <!-- Visual pipeline -->
        <div class="pipeline">
          <div class="ps ${s1}">
            <div class="ps-icon">📚</div>
            <div class="ps-title">${this._t('s2_p1_t')}</div>
            <div class="ps-sub">${this._lang === 'en' ? 'Select all Ctrl+A' : 'Выделите все источники: Ctrl+A'}</div>
          </div>

          <div class="pa">${arrowSvg}</div>

          <div class="ps ${s2}">
            <div class="ps-icon">📋</div>
            <div class="ps-title">${this._t('s2_p2_t')}</div>
            <div class="ps-sub">Scannable Cite → Save as HTML</div>
          </div>

          <div class="pa ${hasHtml || isDone ? 'pa-done' : 'pa-active'}">${arrowSvg}</div>

          <div class="ps ${s3}">
            ${isDone || hasHtml ? html`<div class="ps-badge">✓</div>` : nothing}
            <div class="ps-icon">${hasHtml || isDone ? '📄' : '⬆'}</div>
            <div class="ps-title">${hasHtml || isDone ? (this._lang === 'en' ? 'HTML uploaded' : 'HTML загружен') : this._t('s2_p3_t')}</div>
            <div class="ps-sub">${hasHtml ? this._htmlFile!.name.slice(0,22) + (this._htmlFile!.name.length > 22 ? '…' : '') : (this._lang === 'en' ? 'file from Zotero' : 'файл из Zotero')}</div>
          </div>

          <div class="pa ${isDone ? 'pa-done' : hasHtml ? 'pa-active' : ''}">${arrowSvg}</div>

          <div class="ps ${s4}">
            ${isDone ? html`<div class="ps-badge">✓</div>` : nothing}
            <div class="ps-icon">
              ${isProc ? html`<span class="spinner" style="color:#a3e635;width:20px;height:20px;border-width:2.5px"></span>`
                       : isDone ? '✅' : '⚙'}
            </div>
            <div class="ps-title">${isDone ? this._t('s2_p4_t') : isProc ? this._t('s2_creating') : (this._lang === 'en' ? 'Create URI map' : 'Создайте URI-карту')}</div>
            <div class="ps-sub">${isDone ? `${this._parseCount} ${this._t('s2_count_label')}` : isProc ? (this._lang === 'en' ? 'Processing…' : 'Обрабатываю файл') : (this._lang === 'en' ? 'Click the button below' : 'Нажмите кнопку ниже')}</div>
          </div>
        </div>

        <!-- Upload options -->
        <div class="section-label">${this._t('s2_upload_sec')}</div>
        <div class="upload-options">
          <div class="upload-col">
            <div class="upload-col-label">${this._t('s2_html_col')}</div>
            <file-drop label="${this._t('s2_html_drop')}" ext=".html" accept=".html,.htm"
              @file-selected=${(e: CustomEvent) => {
                this._htmlFile = e.detail; this._uriMapDirect = null
                this._uriMapJobId = ''; this._parseCount = 0; this._parseMatch = null
                this.status = 'idle'; this.log = ''
              }}>
            </file-drop>
          </div>

          <div class="upload-divider">
            <div class="upload-divider-line"></div>
            <div class="upload-divider-text">${this._t('s2_or')}</div>
            <div class="upload-divider-line"></div>
          </div>

          <div class="upload-col">
            <div class="upload-col-label">${this._t('s2_tsv_col')}</div>
            <file-drop label="${this._t('s2_tsv_drop')}" ext=".tsv" accept=".tsv,.txt"
              @file-selected=${(e: CustomEvent) => {
                this._uriMapDirect = e.detail; this._htmlFile = null
                this._uriMapJobId = ''; this._parseCount = 0
                this.status = 'idle'; this.log = ''
              }}>
            </file-drop>
          </div>
        </div>

        <!-- Result panel -->
        ${isDone && !isError ? html`
          <div class="parse-result">
            <div class="parse-result-ico">✅</div>
            <div class="parse-result-body">
              <div class="parse-result-title">${this._t('s2_result_title')}</div>
              <div class="parse-result-sub">
                ${this._parseMatch === true
                  ? this._t('s2_match_ok')
                  : this._parseMatch === false
                    ? this._t('s2_match_warn')
                    : this._t('s2_file_ready')}
              </div>
            </div>
            <div class="parse-count">
              <div class="parse-count-num">${this._parseCount}</div>
              <div class="parse-count-label">${this._t('s2_count_label')}</div>
            </div>
          </div>

          ${this._parseWarning ? html`
            <div class="parse-warning">
              <span style="font-size:16px;flex-shrink:0">⚠</span>
              <span>${this._parseWarning}</span>
            </div>` : nothing}
        ` : nothing}

        ${isError ? html`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t('s2_err_title')}</div>
              <div style="font-size:11px;opacity:0.8">${this.log}</div>
            </div>
          </div>` : nothing}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${() => this._goStep(1)}>${this._t('s2_back')}</button>

          ${hasHtml && !isDone ? html`
            <button class="btn btn-blue"
              ?disabled=${isProc}
              @click=${this._runParseHtml}>
              ${isProc
                ? html`<span class="spinner"></span> ${this._t('s2_creating')}`
                : this._t('s2_create_btn')}
            </button>` : nothing}

          ${isDone ? html`
            <a class="btn btn-ghost" style="font-size:12px"
               href="/api/download/${this._uriMapJobId}/uri-map.tsv"
               download="uri-map.tsv">${this._t('s2_dl_tsv')}</a>
            <button class="btn btn-ghost" style="font-size:12px"
              @click=${() => {
                this._uriMapJobId = ''; this._htmlFile = null; this._parseCount = 0
                this._parseMatch = null; this.status = 'idle'; this.log = ''
                this.shadowRoot?.querySelectorAll('file-drop').forEach((el: any) => el.reset?.())
              }}>${this._t('s2_recreate')}</button>` : nothing}

          <div class="spacer"></div>
          <button class="btn btn-next" ?disabled=${!hasMap}
            @click=${() => this._goStep(3)}>
            ${this._t('s2_next')}
          </button>
        </div>
      </div>
    `
  }

  // ── Step 3 ────────────────────────────────────────────────────────────────

  private _step3() {
    const hasMap   = !!this._uriMapJobId || !!this._uriMapDirect
    const hasDocx  = !!this._docxFile
    const isDone   = !!this._injectJobId
    const isProc   = this.status === 'processing'
    const isError  = this.status === 'error'
    const mapCount = this._parseCount

    const arrowSvg = html`
      <svg class="tv-arrow-svg" viewBox="0 0 20 10" fill="none">
        <path d="M1 5H18M13.5 1L18 5L13.5 9" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`

    return html`
      <div class="card">
        <div class="card-header">
          <div class="card-icon purple">⚡</div>
          <div>
            <div class="card-title">${this._t('s3_title')}</div>
            <div class="card-desc">${this._t('s3_desc')}</div>
          </div>
        </div>

        <!-- Prerequisites -->
        <div class="section-label">${this._t('s3_prereq_sec')}</div>
        <div class="prereq-panel">
          <div class="prereq-item ${hasMap ? 'ok' : 'missing'}">
            <div class="prereq-ico">${hasMap ? '✓' : '!'}</div>
            <div>
              <div class="prereq-title">${this._t('s3_map_title')}</div>
              <div class="prereq-sub">
                ${hasMap
                  ? this._t('s3_map_ok')(mapCount)
                  : this._t('s3_map_miss')}
              </div>
            </div>
          </div>
          <div class="prereq-item ${this._bibFile ? 'ok' : 'missing'}">
            <div class="prereq-ico">${this._bibFile ? '✓' : '!'}</div>
            <div>
              <div class="prereq-title">${this._t('s3_bib_title')}</div>
              <div class="prereq-sub">
                ${this._bibFile
                  ? this._bibFile.name.slice(0, 28) + (this._bibFile.name.length > 28 ? '…' : '')
                  : this._t('s3_bib_miss')}
              </div>
            </div>
          </div>
        </div>

        <!-- Transform preview -->
        <div class="section-label">${this._t('s3_transform_sec')}</div>
        <div class="transform-vis">
          <div class="tv-side">
            <div class="tv-label">${this._t('s3_before_lbl')}</div>
            <div class="tv-doc">
              ...результаты показали<br>
              значительный эффект
              <span class="tv-cite">[1]</span>,<br>
              <span class="tv-cite">[5][6][7][8]</span><br>
              на прочность керамики...
            </div>
          </div>
          <div class="tv-arrow-col">${arrowSvg}</div>
          <div class="tv-side after">
            <div class="tv-label">${this._t('s3_after_lbl')}</div>
            <div class="tv-doc">
              ...результаты показали<br>
              значительный эффект
              <span class="tv-cite-z">⦿ ADDIN Zotero [1]</span>,<br>
              <span class="tv-cite-z">⦿ ADDIN Zotero [5–8]</span><br>
              на прочность керамики...
            </div>
          </div>
        </div>

        <!-- Docx upload -->
        <div class="section-label" style="margin-top:20px">${this._t('s3_docx_sec')}</div>
        <file-drop label="${this._t('s3_docx_drop')}" ext=".docx" accept=".docx"
          @file-selected=${(e: CustomEvent) => {
            this._docxFile = e.detail; this._injectJobId = ''
            this._injectGroups = 0; this._injectReplaced = 0
            this.status = 'idle'; this.log = ''
          }}>
        </file-drop>

        <!-- Result panel -->
        ${isDone && !isError ? html`
          <div class="inject-result">
            <div class="ir-icon">✅</div>
            <div class="ir-body">
              <div class="ir-title">${this._t('s3_result_title')}</div>
              <div class="ir-sub">${this._t('s3_result_sub')}</div>
            </div>
            <div class="ir-stats">
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectReplaced}</div>
                <div class="ir-stat-label">${this._t('s3_stat_replaced')}</div>
              </div>
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectGroups}</div>
                <div class="ir-stat-label">${this._t('s3_stat_groups')}</div>
              </div>
            </div>
          </div>` : nothing}

        ${isError ? html`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t('s3_err_title')}</div>
              <div style="font-size:11px;opacity:0.8;white-space:pre-wrap">${this.log}</div>
            </div>
          </div>` : nothing}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${() => this._goStep(2)}>${this._t('s3_back')}</button>

          <button class="btn btn-red"
            ?disabled=${!hasDocx || !hasMap || isProc}
            @click=${this._runInject}>
            ${isProc
              ? html`<span class="spinner"></span> ${this._t('s3_running')}`
              : isDone ? this._t('s3_rerun') : this._t('s3_run')}
          </button>

          ${isDone ? html`
            <a class="btn btn-green"
               href="/api/download/${this._injectJobId}/output_zotero.docx"
               download="output_zotero.docx">${this._t('s3_dl')}</a>
            <div class="spacer"></div>
            <button class="btn btn-next" @click=${() => this._goStep(4)}>
              ${this._t('s3_next')}
            </button>` : nothing}
        </div>
      </div>
    `
  }

  // ── Step 4 ────────────────────────────────────────────────────────────────

  private _step4() {
    return html`
      <!-- Success hero -->
      <div class="success-hero">
        <div class="sh-ring">🎉</div>
        <div class="sh-title">${this._t('s4_title')}</div>
        <div class="sh-sub">${this._t('s4_sub')}</div>
        ${this._injectReplaced || this._injectGroups ? html`
          <div class="sh-stats">
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectReplaced}</div>
              <div class="sh-stat-l">${this._t('s4_refs_replaced')}</div>
            </div>
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectGroups}</div>
              <div class="sh-stat-l">${this._t('s4_cit_groups')}</div>
            </div>
          </div>` : nothing}
      </div>

      <!-- Big download button -->
      ${this._injectJobId ? html`
        <div class="download-cta">
          <a class="btn-download"
             href="/api/download/${this._injectJobId}/output_zotero.docx"
             download="output_zotero.docx">
            <span class="btn-dl-icon">↓</span>
            <span class="btn-dl-text">
              <span class="btn-dl-main">${this._t('s4_dl_main')}</span>
              <span class="btn-dl-sub">${this._t('s4_dl_sub')}</span>
            </span>
          </a>
        </div>` : nothing}

      <!-- Steps in Word -->
      <div class="word-steps">
        <div class="ws-header">${this._t('s4_word_hd')}</div>

        <div class="ws-step">
          <div class="ws-num">1</div>
          <div class="ws-icon-wrap">📂</div>
          <div class="ws-body">
            <div class="ws-title">${this._t('s4_ws1_t')}</div>
            <div class="ws-sub">${this._t('s4_ws1_s')}</div>
          </div>
          <span class="ws-badge blue">Word</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">2</div>
          <div class="ws-icon-wrap">📋</div>
          <div class="ws-body">
            <div class="ws-title">${this._t('s4_ws2_t')}</div>
            <div class="ws-sub">${this._t('s4_ws2_s')}</div>
          </div>
          <span class="ws-badge blue">Zotero</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">3</div>
          <div class="ws-icon-wrap">🎨</div>
          <div class="ws-body">
            <div class="ws-title">${this._t('s4_ws3_t')}</div>
            <div class="ws-sub">${this._t('s4_ws3_s')}</div>
          </div>
          <span class="ws-badge green">${this._t('s4_ws3_badge')}</span>
        </div>
      </div>

      <!-- Tip -->
      <div style="padding:14px 18px;background:#101414;border:1px solid #1c2a2a;border-radius:12px;font-size:12px;color:#748f80;line-height:1.7;margin-bottom:16px">
        <strong style="color:#edf7ed">${this._t('s4_tip_title')}</strong>
        ${this._t('s4_tip')}
      </div>

      <!-- Donate card -->
      <div class="donate-card">
        <div class="donate-photo-wrap">
          <img class="donate-photo" src="/app/donate-photo.webp" alt="Please donate"/>
          <div class="donate-photo-text">
            <div class="donate-photo-title">
              ${this._lang === 'ru'
                ? html`Понравилось? Ваш донат — <em>топливо</em>.`
                : html`Found it useful? Your donation <em>fuels</em> this.`}
            </div>
            <div class="donate-photo-sub">USDT · TRC-20 · TRON</div>
          </div>
        </div>
        <div class="donate-body">
          <div class="donate-net">
            <svg width="11" height="11" viewBox="0 0 32 32" style="flex-shrink:0"><circle cx="16" cy="16" r="16" fill="#ef0027"/><path d="M16 4l12 7v10l-12 7L4 21V11z" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#fff"/></svg>
            USDT · TRC-20
          </div>
          ${this._qrDataUrl ? html`
            <div class="donate-qr-wrap">
              <img class="donate-qr" src="${this._qrDataUrl}" alt="USDT TRC-20 QR code"/>
            </div>` : nothing}
          <div class="donate-addr-row">
            <code class="donate-addr-text">${DONATE_WALLET}</code>
            <button class="donate-copy-btn ${this._walletCopied ? 'copied' : ''}"
              @click=${this._copyWallet}>
              ${this._walletCopied ? '✓ OK' : (this._lang === 'ru' ? 'Копировать' : 'Copy')}
            </button>
          </div>
          <div class="donate-hint">
            ${this._lang === 'ru'
              ? html`<strong>Отправляйте только USDT (TRC-20) в сети TRON.</strong> Другие активы будут безвозвратно утеряны.`
              : html`<strong>USDT (TRC-20) on TRON network only.</strong> Sending other assets will result in permanent loss.`}
          </div>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-ghost" @click=${() => this._goStep(3)}>${this._t('s4_back')}</button>
        <div class="spacer"></div>
        <button class="btn btn-ghost" @click=${this._reset}>${this._t('s4_restart')}</button>
      </div>
    `
  }

  // ── Main render ────────────────────────────────────────────────────────────

  render() {
    const steps = [
      { n: 1, name: this._t('step1') },
      { n: 2, name: this._t('step2') },
      { n: 3, name: this._t('step3') },
      { n: 4, name: this._t('step4') },
    ]
    const wide = this._validationDone && this.step === 1

    return html`
      <header>
        <a class="logo-link" href="/" title="Back to home">
          <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0;overflow:visible">
            <!-- background -->
            <rect width="36" height="36" rx="10" fill="#060e06"/>

            <!-- outer dashed orbit ring, spinning CW -->
            <circle cx="18" cy="18" r="13.5" fill="none" stroke="#a3e635"
              stroke-width="0.7" stroke-dasharray="3.8 6.7" opacity="0.2">
              <animateTransform attributeName="transform" type="rotate"
                from="0 18 18" to="360 18 18" dur="16s" repeatCount="indefinite"/>
            </circle>

            <!-- inner dashed orbit ring, spinning CCW -->
            <circle cx="18" cy="18" r="7.5" fill="none" stroke="#a3e635"
              stroke-width="0.5" stroke-dasharray="2.5 6.2" opacity="0.15">
              <animateTransform attributeName="transform" type="rotate"
                from="0 18 18" to="-360 18 18" dur="10s" repeatCount="indefinite"/>
            </circle>

            <!-- outer equilateral triangle + 3 nodes rotating CW (slow) -->
            <!-- r=13.5: 0°=(31.5,18) 120°=(11.25,29.69) 240°=(11.25,6.31) -->
            <g>
              <animateTransform attributeName="transform" type="rotate"
                from="0 18 18" to="360 18 18" dur="11s" repeatCount="indefinite"/>
              <polygon points="31.5,18 11.25,29.69 11.25,6.31"
                fill="none" stroke="#a3e635" stroke-width="0.8" opacity="0.18"
                stroke-linejoin="round"/>
              <circle cx="31.5" cy="18"    r="2.5" fill="#a3e635"/>
              <circle cx="11.25" cy="29.69" r="2.5" fill="#a3e635"/>
              <circle cx="11.25" cy="6.31"  r="2.5" fill="#a3e635"/>
            </g>

            <!-- 3 inner nodes, CCW, 60° phase offset, faster -->
            <!-- r=7.5: 60°=(21.75,24.5) 180°=(10.5,18) 300°=(21.75,11.5) -->
            <g>
              <animateTransform attributeName="transform" type="rotate"
                from="60 18 18" to="-300 18 18" dur="6.5s" repeatCount="indefinite"/>
              <circle cx="21.75" cy="24.5"  r="1.6" fill="#c8f564" opacity="0.85"/>
              <circle cx="10.5"  cy="18"    r="1.6" fill="#c8f564" opacity="0.85"/>
              <circle cx="21.75" cy="11.5"  r="1.6" fill="#c8f564" opacity="0.85"/>
            </g>

            <!-- center glow pulse (expanding ring) -->
            <circle cx="18" cy="18" r="3" fill="none" stroke="#a3e635" stroke-width="1.2" opacity="0">
              <animate attributeName="r"       values="3;10;3"     dur="3s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.5;0;0.5"  dur="3s" repeatCount="indefinite"/>
            </circle>

            <!-- center nucleus -->
            <circle cx="18" cy="18" r="3.4" fill="#a3e635">
              <animate attributeName="r"    values="3;3.8;3"            dur="3s" repeatCount="indefinite"/>
              <animate attributeName="fill" values="#a3e635;#ddf77e;#a3e635" dur="3s" repeatCount="indefinite"/>
            </circle>
          </svg>
          <span class="logo-name">Zotero Inject</span>
        </a>
        <span class="logo-tag">Citation processor</span>
        <div class="header-spacer"></div>
        <div class="lang-toggle">
          <button class="lang-btn ${this._lang === 'ru' ? 'active' : ''}"
            @click=${() => this._setLang('ru')}>RU</button>
          <button class="lang-btn ${this._lang === 'en' ? 'active' : ''}"
            @click=${() => this._setLang('en')}>EN</button>
        </div>
        <div class="header-badge">${this._t('step_badge')(this.step)}</div>
      </header>

      <div class="stepper">
        ${steps.map((s, i) => html`
          ${i > 0 ? html`<div class="step-connector ${this._ss(steps[i-1].n) === 'done' ? 'done' : ''}"></div>` : nothing}
          <div class="step-pill ${this._ss(s.n)}">
            <div class="step-dot ${this._ss(s.n)}">
              ${this._ss(s.n) === 'done' ? '✓' : s.n}
            </div>
            <span class="step-name ${this._ss(s.n)}">${s.name}</span>
          </div>
        `)}
      </div>

      <main style=${wide ? 'max-width:1140px' : ''}>
        ${this.step === 1 ? this._step1() : nothing}
        ${this.step === 2 ? this._step2() : nothing}
        ${this.step === 3 ? this._step3() : nothing}
        ${this.step === 4 ? this._step4() : nothing}
      </main>
    `
  }
}
