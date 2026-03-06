import { LitElement, html, css, nothing, PropertyValues } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import './components/file-drop'

type Status = 'idle' | 'processing' | 'done' | 'error'

interface EntryState {
  key: string
  entry_type: string
  status: 'pending' | 'checking' | 'ok' | 'warn' | 'error'
  issues: string[]
  fields: Record<string, string>
  idx: number
}

const ISSUE_LABELS: Record<string, string> = {
  crossref_unresolved:     'Не найдено в Crossref',
  doi_not_found:           'DOI не найден',
  doi_invalid_format:      'Неверный формат DOI',
  doi_title_mismatch:      'DOI не совпадает с названием',
  doi_duplicate:           'Дублирующийся DOI',
  metadata_not_corrected:  'Метаданные расходятся',
  mismatch_title:          'Название расходится',
  mismatch_author:         'Авторы расходятся',
  mismatch_year:           'Год расходится',
  mismatch_journal:        'Журнал расходится',
  mismatch_doi:            'DOI расходится',
  crossref_error:          'Ошибка API',
}

const STAT_LABELS: Record<string, string> = {
  processed:        'Проверено',
  doi_valid:        'DOI валиден',
  doi_added:        'DOI добавлено',
  doi_corrected:    'DOI исправлено',
  unresolved:       'Не найдено',
  problem_entries:  'С проблемами',
  entries_changed:  'Изменено записей',
  fields_changed:   'Изменено полей',
}

@customElement('app-root')
export class AppRoot extends LitElement {
  @state() step = 1
  @state() status: Status = 'idle'
  @state() log = ''

  @state() private _bibFile: File | null = null
  @state() private _bibJobId = ''
  private _mailto = ''

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

  // ── CSS ───────────────────────────────────────────────────────────────────

  static styles = css`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #0d0f14;
      font-family: 'Inter', system-ui, sans-serif;
      color: #eef0f6;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Header ── */
    header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 0 32px;
      height: 58px;
      background: #13161f;
      border-bottom: 1px solid #2a2d3e;
      flex-shrink: 0;
    }
    .logo-dot {
      width: 28px; height: 28px;
      border-radius: 8px;
      background: linear-gradient(135deg, #e5484d, #b5252a);
      display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 700; color: #fff;
      box-shadow: 0 0 16px rgba(229,72,77,0.35);
    }
    .logo-name { font-size: 15px; font-weight: 700; color: #eef0f6; }
    .logo-tag  { font-size: 11px; color: #5c5f72; margin-left: 6px; }
    .header-spacer { flex: 1; }
    .header-badge {
      font-size: 11px; font-weight: 500;
      background: #1a1d2a;
      border: 1px solid #2a2d3e;
      border-radius: 6px;
      padding: 4px 10px;
      color: #9396a8;
    }

    /* ── Stepper ── */
    .stepper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      padding: 20px 32px;
      background: #13161f;
      border-bottom: 1px solid #2a2d3e;
    }
    .step-pill {
      display: flex; align-items: center; gap: 8px;
      padding: 6px 14px;
      border-radius: 100px;
      transition: all 0.2s;
      cursor: default;
    }
    .step-pill.active  { background: rgba(229,72,77,0.15); }
    .step-pill.done    { background: rgba(34,197,94,0.1); }
    .step-dot {
      width: 24px; height: 24px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 11px; font-weight: 700;
      flex-shrink: 0;
    }
    .step-dot.active  { background: #e5484d; color: #fff; box-shadow: 0 0 12px rgba(229,72,77,0.4); }
    .step-dot.done    { background: #22c55e; color: #fff; }
    .step-dot.pending { background: #1a1d2a; border: 1px solid #2a2d3e; color: #5c5f72; }
    .step-name { font-size: 12px; font-weight: 600; transition: color 0.2s; }
    .step-name.active  { color: #e5484d; }
    .step-name.done    { color: #22c55e; }
    .step-name.pending { color: #5c5f72; }
    .step-connector { width: 40px; height: 1px; background: #2a2d3e; flex-shrink: 0; }
    .step-connector.done { background: #22c55e; opacity: 0.4; }

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
      background: #13161f;
      border: 1px solid #2a2d3e;
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
      background: #1a1d2a; border: 1px solid #2a2d3e;
    }
    .card-icon.red    { background: rgba(229,72,77,0.15);  border-color: rgba(229,72,77,0.3); }
    .card-icon.blue   { background: rgba(79,142,247,0.15); border-color: rgba(79,142,247,0.3); }
    .card-icon.green  { background: rgba(34,197,94,0.15);  border-color: rgba(34,197,94,0.3); }
    .card-icon.purple { background: rgba(168,85,247,0.15); border-color: rgba(168,85,247,0.3); }
    .card-title { font-size: 17px; font-weight: 700; color: #eef0f6; margin-bottom: 5px; }
    .card-desc  { font-size: 13px; color: #9396a8; line-height: 1.65; }

    /* ── Instructions ── */
    .instr-list { display: flex; flex-direction: column; gap: 8px; margin: 20px 0; }
    .instr-item {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 14px;
      background: #1a1d2a; border: 1px solid #2a2d3e; border-radius: 10px;
    }
    .instr-num {
      width: 22px; height: 22px; border-radius: 50%;
      background: #222536; border: 1px solid #333650;
      font-size: 11px; font-weight: 700; color: #9396a8;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 1px;
    }
    .instr-body { font-size: 13px; color: #c0c3d6; line-height: 1.6; }
    .instr-body strong { color: #eef0f6; font-weight: 600; }
    .instr-body code {
      background: #222536; border: 1px solid #333650; border-radius: 4px;
      padding: 1px 6px; font-size: 11px;
      font-family: 'Consolas', monospace; color: #4f8ef7;
    }

    /* ── Section label ── */
    .section-label {
      font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .08em;
      color: #5c5f72; margin-bottom: 10px;
    }

    /* ── File grids ── */
    .file-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }
    .file-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }

    /* ── Input ── */
    .input-wrap { margin-top: 16px; }
    .input-label { font-size: 12px; color: #5c5f72; margin-bottom: 6px; display: block; }
    .text-input {
      width: 100%; padding: 9px 14px;
      background: #1a1d2a; border: 1px solid #2a2d3e; border-radius: 8px;
      color: #eef0f6; font-size: 13px; font-family: inherit;
      outline: none; transition: border-color 0.2s;
    }
    .text-input:focus { border-color: #4f8ef7; }
    .text-input::placeholder { color: #5c5f72; }

    /* ── Divider ── */
    .or-divider {
      display: flex; align-items: center; gap: 12px; margin: 18px 0;
    }
    .or-divider::before, .or-divider::after {
      content: ''; flex: 1; height: 1px; background: #2a2d3e;
    }
    .or-divider span {
      font-size: 11px; font-weight: 600;
      color: #5c5f72; text-transform: uppercase; letter-spacing: .06em;
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
      background: #1a1d2a; border: 1px solid #2a2d3e; color: #9396a8;
    }
    .btn-ghost:hover { border-color: #333650; color: #eef0f6; }
    .btn-red   { background: linear-gradient(135deg,#e5484d,#c5282d); color:#fff; box-shadow:0 0 16px rgba(229,72,77,0.25); }
    .btn-blue  { background: linear-gradient(135deg,#4f8ef7,#2563eb); color:#fff; box-shadow:0 0 16px rgba(79,142,247,0.25); }
    .btn-green { background: linear-gradient(135deg,#22c55e,#16a34a); color:#fff; box-shadow:0 0 16px rgba(34,197,94,0.2); }
    .btn-next  { background: #1a1d2a; border: 1px solid #4f8ef7; color: #4f8ef7; }
    .btn-next:hover { background: rgba(79,142,247,0.15); }

    /* ── Alert ── */
    .alert {
      display: flex; align-items: flex-start; gap: 10px;
      padding: 12px 14px; border-radius: 10px;
      font-size: 13px; margin-top: 14px; border: 1px solid;
    }
    .alert.warn { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.25); color: #f59e0b; }
    .alert.ok   { background: rgba(34,197,94,0.08);  border-color: rgba(34,197,94,0.2);   color: #22c55e; }

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
      text-transform: uppercase; letter-spacing: .08em; color: #5c5f72; margin-bottom: 6px;
    }
    .log-box {
      background: #0d0f14; border: 1px solid #2a2d3e; border-radius: 8px;
      padding: 12px 14px; font-family: 'Consolas', monospace;
      font-size: 11.5px; color: #9396a8;
      white-space: pre-wrap; max-height: 150px; overflow-y: auto; line-height: 1.65;
    }

    /* ── Finish steps ── */
    .finish-list { display: flex; flex-direction: column; gap: 10px; margin: 20px 0; }
    .finish-item {
      display: flex; gap: 14px; align-items: center;
      padding: 14px 18px; background: #1a1d2a; border: 1px solid #2a2d3e; border-radius: 12px;
    }
    .finish-icon {
      width: 38px; height: 38px; border-radius: 10px;
      background: #222536; border: 1px solid #333650;
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .finish-text { font-size: 13px; color: #c0c3d6; line-height: 1.55; }
    .finish-text strong { color: #eef0f6; font-weight: 600; }

    /* ═══════════════════════════════════════════════════
       STEP 1 — FORMAT HINT & BIB CARD
       ═══════════════════════════════════════════════════ */

    .format-hint {
      margin: 20px 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #2a2d3e;
    }
    .format-hint-header {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 14px;
      background: #1a1d2a;
      border-bottom: 1px solid #2a2d3e;
      font-size: 11px; font-weight: 700; color: #5c5f72;
      text-transform: uppercase; letter-spacing: .07em;
    }
    .format-hint-header .dot {
      width: 8px; height: 8px; border-radius: 50%; background: #e5484d; flex-shrink: 0;
    }
    .code-block {
      background: #0d0f14;
      padding: 14px 16px;
      font-family: 'Consolas', monospace;
      font-size: 12px;
      line-height: 1.8;
      color: #9396a8;
    }
    .cc { color: #5c5f72; }
    .ck { color: #e5484d; font-weight: 600; }
    .cv { color: #4f8ef7; }
    .cs { color: #22c55e; }

    .bib-file-info {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 16px; border-radius: 10px; margin-top: 12px;
      background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.2);
    }
    .bfi-icon {
      width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
      background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
      display: flex; align-items: center; justify-content: center; font-size: 16px;
    }
    .bfi-name { font-size: 13px; font-weight: 600; color: #eef0f6; }
    .bfi-sub  { font-size: 11px; color: rgba(34,197,94,0.7); margin-top: 2px; }

    .optional-tag {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 2px 8px; border-radius: 100px;
      font-size: 10px; font-weight: 700;
      background: #1a1d2a; border: 1px solid #2a2d3e; color: #5c5f72;
      text-transform: uppercase; letter-spacing: .05em; margin-left: 8px;
    }

    .action-row {
      display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px;
    }
    .action-card {
      display: flex; flex-direction: column; gap: 6px; align-items: flex-start;
      padding: 16px 18px; border-radius: 12px; border: 1px solid #2a2d3e;
      background: #1a1d2a; cursor: pointer; transition: all 0.18s;
      text-decoration: none; font-family: inherit;
    }
    .action-card:hover { border-color: #333650; background: #222536; }
    .action-card.primary {
      border-color: rgba(79,142,247,0.35);
      background: rgba(79,142,247,0.07);
    }
    .action-card.primary:hover { background: rgba(79,142,247,0.12); }
    .action-card:disabled { opacity: 0.35; pointer-events: none; }
    .ac-icon { font-size: 22px; margin-bottom: 2px; }
    .ac-title { font-size: 13px; font-weight: 700; color: #eef0f6; }
    .ac-primary { color: #4f8ef7; }
    .ac-sub { font-size: 11px; color: #5c5f72; line-height: 1.45; }
    .action-card.primary .ac-sub { color: #9396a8; }

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
      border: 1px solid #2a2d3e; background: #1a1d2a;
      transition: all 0.2s;
    }
    .prereq-item.ok {
      border-color: rgba(34,197,94,0.3);
      background: rgba(34,197,94,0.06);
    }
    .prereq-item.missing {
      border-color: rgba(245,158,11,0.3);
      background: rgba(245,158,11,0.05);
    }
    .prereq-ico {
      width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      font-size: 17px; font-weight: 700;
      background: #222536; border: 1px solid #2a2d3e;
    }
    .prereq-item.ok .prereq-ico {
      background: rgba(34,197,94,0.15); border-color: rgba(34,197,94,0.3);
      color: #22c55e;
    }
    .prereq-item.missing .prereq-ico {
      background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.25);
      color: #f59e0b;
    }
    .prereq-title { font-size: 12px; font-weight: 700; color: #eef0f6; }
    .prereq-sub   { font-size: 10px; color: #5c5f72; margin-top: 2px; }
    .prereq-item.ok .prereq-sub { color: rgba(34,197,94,0.6); }
    .prereq-item.missing .prereq-sub { color: #f59e0b; }

    .transform-vis {
      display: grid; grid-template-columns: 1fr 48px 1fr; align-items: center;
      gap: 0; margin: 20px 0; border-radius: 12px; overflow: hidden;
      border: 1px solid #2a2d3e;
    }
    .tv-side {
      padding: 16px; background: #1a1d2a;
    }
    .tv-side.after { background: rgba(79,142,247,0.05); }
    .tv-label { font-size: 10px; font-weight: 700; color: #5c5f72; text-transform: uppercase; letter-spacing: .07em; margin-bottom: 10px; }
    .tv-side.after .tv-label { color: rgba(79,142,247,0.7); }
    .tv-doc {
      background: #0d0f14; border: 1px solid #2a2d3e; border-radius: 8px;
      padding: 10px 12px; font-size: 11.5px; color: #9396a8; line-height: 1.8;
      font-family: 'Consolas', monospace;
    }
    .tv-cite { color: #e5484d; font-weight: 700; }
    .tv-cite-z { color: #4f8ef7; font-weight: 600; font-size: 10px; }
    .tv-arrow-col {
      background: #13161f; display: flex; align-items: center; justify-content: center;
      align-self: stretch;
      border-left: 1px solid #2a2d3e; border-right: 1px solid #2a2d3e;
    }
    .tv-arrow-svg { width: 20px; color: #4f8ef7; opacity: 0.6; }

    .inject-result {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 20px; border-radius: 14px; margin-top: 16px;
      background: rgba(34,197,94,0.07); border: 1px solid rgba(34,197,94,0.25);
    }
    .ir-icon {
      width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
      background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
      display: flex; align-items: center; justify-content: center; font-size: 24px;
    }
    .ir-body { flex: 1; }
    .ir-title { font-size: 14px; font-weight: 700; color: #22c55e; margin-bottom: 4px; }
    .ir-sub   { font-size: 12px; color: rgba(34,197,94,0.65); }
    .ir-stats { display: flex; gap: 20px; padding-left: 16px; border-left: 1px solid rgba(34,197,94,0.2); }
    .ir-stat { display: flex; flex-direction: column; align-items: center; }
    .ir-stat-num { font-size: 28px; font-weight: 800; color: #22c55e; font-variant-numeric: tabular-nums; line-height: 1; }
    .ir-stat-label { font-size: 9px; font-weight: 600; color: rgba(34,197,94,0.5); text-transform: uppercase; letter-spacing: .05em; margin-top: 3px; text-align: center; }

    /* ═══════════════════════════════════════════════════
       STEP 4 — SUCCESS
       ═══════════════════════════════════════════════════ */

    .success-hero {
      text-align: center;
      padding: 36px 24px 28px;
      background: #13161f;
      border: 1px solid rgba(34,197,94,0.2);
      border-radius: 20px;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
    }
    .success-hero::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 65%);
      pointer-events: none;
    }
    .sh-ring {
      width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px;
      background: rgba(34,197,94,0.12);
      border: 2px solid rgba(34,197,94,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 38px;
      box-shadow: 0 0 40px rgba(34,197,94,0.15);
    }
    .sh-title { font-size: 24px; font-weight: 800; color: #eef0f6; margin-bottom: 8px; }
    .sh-sub   { font-size: 14px; color: #9396a8; }
    .sh-stats {
      display: flex; justify-content: center; gap: 24px; margin-top: 20px;
      padding-top: 20px; border-top: 1px solid #2a2d3e;
    }
    .sh-stat { text-align: center; }
    .sh-stat-n { font-size: 26px; font-weight: 800; color: #22c55e; font-variant-numeric: tabular-nums; line-height: 1; }
    .sh-stat-l { font-size: 10px; font-weight: 600; color: #5c5f72; text-transform: uppercase; letter-spacing: .06em; margin-top: 4px; }

    .download-cta {
      display: flex; flex-direction: column; align-items: stretch;
      gap: 10px; margin-bottom: 16px;
    }
    .btn-download {
      display: flex; align-items: center; justify-content: center; gap: 10px;
      padding: 16px 24px; border-radius: 14px; border: none; cursor: pointer;
      font-size: 15px; font-weight: 700; font-family: inherit;
      text-decoration: none; transition: all 0.18s;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      color: #fff; box-shadow: 0 0 30px rgba(34,197,94,0.25);
    }
    .btn-download:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 40px rgba(34,197,94,0.35); }
    .btn-download:active { transform: scale(0.98); }
    .btn-dl-icon { font-size: 20px; }
    .btn-dl-text { display: flex; flex-direction: column; align-items: flex-start; }
    .btn-dl-main { font-size: 15px; font-weight: 700; }
    .btn-dl-sub  { font-size: 11px; font-weight: 500; opacity: 0.75; }

    .word-steps {
      background: #13161f; border: 1px solid #2a2d3e; border-radius: 16px;
      overflow: hidden; margin-bottom: 16px;
    }
    .ws-header {
      padding: 14px 20px; border-bottom: 1px solid #2a2d3e;
      font-size: 11px; font-weight: 700; color: #5c5f72;
      text-transform: uppercase; letter-spacing: .08em;
    }
    .ws-step {
      display: flex; align-items: center; gap: 16px;
      padding: 16px 20px; border-bottom: 1px solid #1a1d2a;
      transition: background 0.15s;
    }
    .ws-step:last-child { border-bottom: none; }
    .ws-step:hover { background: #1a1d2a; }
    .ws-num {
      width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
      background: #1a1d2a; border: 1px solid #2a2d3e;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 800; color: #5c5f72;
    }
    .ws-icon-wrap {
      width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
      background: #1a1d2a; border: 1px solid #2a2d3e;
      display: flex; align-items: center; justify-content: center; font-size: 20px;
    }
    .ws-body { flex: 1; }
    .ws-title { font-size: 13px; font-weight: 700; color: #eef0f6; margin-bottom: 3px; }
    .ws-sub   { font-size: 11px; color: #5c5f72; line-height: 1.5; }
    .ws-sub strong { color: #9396a8; font-weight: 600; }
    .ws-badge {
      padding: 3px 10px; border-radius: 100px;
      font-size: 10px; font-weight: 700; flex-shrink: 0;
    }
    .ws-badge.blue { background: rgba(79,142,247,0.12); color: #4f8ef7; }
    .ws-badge.green { background: rgba(34,197,94,0.12); color: #22c55e; }

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
      border: 1px solid #2a2d3e;
      background: #1a1d2a;
      text-align: center;
      transition: all 0.3s ease;
      position: relative;
    }
    .ps.ps-info   { opacity: 0.55; }
    .ps.ps-active {
      border-color: rgba(79,142,247,0.45);
      background: rgba(79,142,247,0.07);
      box-shadow: 0 0 24px rgba(79,142,247,0.12), 0 0 0 1px rgba(79,142,247,0.15) inset;
      opacity: 1;
    }
    .ps.ps-done {
      border-color: rgba(34,197,94,0.35);
      background: rgba(34,197,94,0.06);
      opacity: 1;
    }
    .ps.ps-muted { opacity: 0.3; }

    .ps-badge {
      position: absolute; top: -8px; right: -8px;
      width: 18px; height: 18px; border-radius: 50%;
      background: #22c55e; border: 2px solid #0d0f14;
      display: flex; align-items: center; justify-content: center;
      font-size: 9px; font-weight: 700; color: #fff;
    }

    .ps-icon {
      width: 44px; height: 44px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      background: #222536; border: 1px solid #2a2d3e;
      transition: all 0.3s;
    }
    .ps.ps-active .ps-icon {
      background: rgba(79,142,247,0.15);
      border-color: rgba(79,142,247,0.35);
    }
    .ps.ps-done .ps-icon {
      background: rgba(34,197,94,0.15);
      border-color: rgba(34,197,94,0.35);
    }

    .ps-title {
      font-size: 11.5px; font-weight: 700; color: #eef0f6; line-height: 1.3;
    }
    .ps.ps-info .ps-title  { color: #9396a8; }
    .ps.ps-muted .ps-title { color: #5c5f72; }
    .ps.ps-active .ps-title { color: #eef0f6; }
    .ps.ps-done .ps-title  { color: #22c55e; }

    .ps-sub {
      font-size: 10px; color: #5c5f72; line-height: 1.45; max-width: 90px;
    }
    .ps.ps-active .ps-sub { color: #9396a8; }
    .ps.ps-done .ps-sub   { color: rgba(34,197,94,0.6); }

    /* Pipeline arrow */
    .pa {
      display: flex; align-items: center; justify-content: center;
    }
    .pa svg {
      width: 22px; height: 14px;
      color: #2a2d3e;
      transition: color 0.3s;
      overflow: visible;
    }
    .pa.pa-done svg { color: rgba(34,197,94,0.5); }
    .pa.pa-active svg { color: rgba(79,142,247,0.5); }

    /* Parse result panel */
    .parse-result {
      display: flex; align-items: center; gap: 16px;
      padding: 18px 20px;
      background: rgba(34,197,94,0.07);
      border: 1px solid rgba(34,197,94,0.25);
      border-radius: 14px;
      margin-top: 16px;
    }
    .parse-result-ico {
      width: 52px; height: 52px; border-radius: 14px; flex-shrink: 0;
      background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    }
    .parse-result-body { flex: 1; }
    .parse-result-title { font-size: 14px; font-weight: 700; color: #22c55e; margin-bottom: 3px; }
    .parse-result-sub   { font-size: 12px; color: rgba(34,197,94,0.65); }
    .parse-count {
      display: flex; flex-direction: column; align-items: center;
      padding: 0 16px; border-left: 1px solid rgba(34,197,94,0.2);
    }
    .parse-count-num {
      font-size: 34px; font-weight: 800; color: #22c55e;
      font-variant-numeric: tabular-nums; line-height: 1;
    }
    .parse-count-label { font-size: 10px; font-weight: 600; color: rgba(34,197,94,0.5); text-transform: uppercase; letter-spacing: .06em; margin-top: 3px; }

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
      letter-spacing: .08em; color: #5c5f72; text-align: center; margin-bottom: 4px;
    }
    .upload-divider {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 8px; padding: 0 18px;
    }
    .upload-divider-line { flex: 1; width: 1px; background: #2a2d3e; }
    .upload-divider-text {
      font-size: 10px; font-weight: 700; color: #5c5f72;
      text-transform: uppercase; letter-spacing: .06em;
    }

    /* ═══════════════════════════════════════════════════
       VALIDATION — PROGRESS VIEW
       ═══════════════════════════════════════════════════ */

    .progress-wrap {
      background: #13161f;
      border: 1px solid #2a2d3e;
      border-radius: 16px;
      overflow: hidden;
    }

    /* Header bar */
    .progress-header {
      display: flex; align-items: center; gap: 14px;
      padding: 20px 24px 16px;
      border-bottom: 1px solid #2a2d3e;
    }
    .progress-icon {
      width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
      background: rgba(79,142,247,0.12); border: 1px solid rgba(79,142,247,0.25);
      display: flex; align-items: center; justify-content: center;
    }
    .progress-title {
      flex: 1; font-size: 15px; font-weight: 700; color: #eef0f6;
    }
    .progress-fraction {
      font-size: 13px; font-weight: 600; color: #4f8ef7;
      background: rgba(79,142,247,0.1); border: 1px solid rgba(79,142,247,0.2);
      border-radius: 8px; padding: 4px 12px;
      font-variant-numeric: tabular-nums;
    }

    /* Progress bar */
    .progress-bar-wrap {
      padding: 0 24px 4px;
    }
    .progress-track {
      height: 3px; background: #1a1d2a; border-radius: 2px; overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #4f8ef7, #7fb3ff);
      border-radius: 2px;
      transition: width 0.4s ease;
    }

    /* Entry list container */
    .entry-list {
      max-height: 420px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #2a2d3e transparent;
    }
    .entry-list::-webkit-scrollbar { width: 5px; }
    .entry-list::-webkit-scrollbar-thumb { background: #2a2d3e; border-radius: 3px; }

    /* Individual entry row */
    .entry-row {
      display: grid;
      grid-template-columns: 36px 140px 1fr 160px;
      align-items: center;
      gap: 10px;
      padding: 9px 24px;
      border-bottom: 1px solid #0d0f14;
      transition: background 0.15s;
      min-height: 44px;
    }
    .entry-row:last-child { border-bottom: none; }
    .entry-row.checking { background: rgba(79,142,247,0.06); }
    .entry-row.ok       { background: transparent; }
    .entry-row.warn     { background: rgba(245,158,11,0.04); }
    .entry-row.error    { background: rgba(229,72,77,0.04); }
    .entry-row.pending  { background: transparent; opacity: 0.45; }

    .entry-idx {
      font-size: 11px; font-weight: 700;
      color: #5c5f72; text-align: right;
      font-variant-numeric: tabular-nums;
    }
    .entry-key {
      font-size: 11.5px; font-weight: 600; color: #9396a8;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-family: 'Consolas', monospace;
    }
    .entry-row.checking .entry-key { color: #4f8ef7; }
    .entry-title {
      font-size: 11.5px; color: #c0c3d6;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .entry-status {
      display: flex; align-items: center; gap: 6px;
      font-size: 11px; font-weight: 600;
      justify-content: flex-end;
    }
    .entry-status.checking { color: #4f8ef7; }
    .entry-status.ok       { color: #22c55e; }
    .entry-status.warn     { color: #f59e0b; }
    .entry-status.error    { color: #e5484d; }
    .entry-status.pending  { color: #5c5f72; }

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
      background: #13161f;
      border: 1px solid #2a2d3e;
      border-radius: 12px;
      padding: 14px 16px;
      text-align: center;
    }
    .stat-val {
      font-size: 22px; font-weight: 800;
      color: #eef0f6; line-height: 1;
      margin-bottom: 5px;
      font-variant-numeric: tabular-nums;
    }
    .stat-val.warn  { color: #f59e0b; }
    .stat-val.error { color: #e5484d; }
    .stat-val.ok    { color: #22c55e; }
    .stat-label { font-size: 10px; font-weight: 600; color: #5c5f72; text-transform: uppercase; letter-spacing: .06em; }

    /* Table card */
    .table-card {
      background: #13161f;
      border: 1px solid #2a2d3e;
      border-radius: 16px;
      overflow: hidden;
    }
    .table-toolbar {
      display: flex; align-items: center; gap: 10px;
      padding: 16px 20px;
      border-bottom: 1px solid #2a2d3e;
    }
    .table-toolbar-title {
      font-size: 13px; font-weight: 700; color: #eef0f6; flex: 1;
    }
    .table-hint {
      font-size: 11px; color: #5c5f72;
    }

    .table-scroll {
      overflow-x: auto;
      overflow-y: auto;
      max-height: 520px;
      scrollbar-width: thin;
      scrollbar-color: #2a2d3e transparent;
    }
    .table-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
    .table-scroll::-webkit-scrollbar-thumb { background: #2a2d3e; border-radius: 3px; }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 980px;
      font-size: 12px;
    }
    thead { position: sticky; top: 0; z-index: 2; }
    th {
      background: #0d0f14;
      padding: 10px 14px;
      text-align: left;
      font-size: 10px; font-weight: 700;
      text-transform: uppercase; letter-spacing: .07em;
      color: #5c5f72;
      border-bottom: 1px solid #2a2d3e;
      white-space: nowrap;
      user-select: none;
    }
    th:first-child { width: 44px; text-align: center; }
    td {
      padding: 0;
      border-bottom: 1px solid #13161f;
      vertical-align: middle;
    }
    td:first-child { text-align: center; width: 44px; }
    tbody tr { transition: background 0.1s; }
    tbody tr.row-ok    { background: #13161f; }
    tbody tr.row-warn  { background: rgba(245,158,11,0.03); }
    tbody tr.row-error { background: rgba(229,72,77,0.03); }
    tbody tr.row-ok:hover    { background: #1a1d2a; }
    tbody tr.row-warn:hover  { background: rgba(245,158,11,0.07); }
    tbody tr.row-error:hover { background: rgba(229,72,77,0.07); }

    .td-num {
      font-size: 11px; font-weight: 600; color: #5c5f72;
      font-variant-numeric: tabular-nums;
      padding: 10px 0;
    }
    .td-key {
      padding: 6px 14px;
    }
    .key-text {
      font-size: 11px; font-weight: 600; font-family: 'Consolas', monospace;
      color: #9396a8; white-space: nowrap;
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
    .badge-ok    { background: rgba(34,197,94,0.12);  color: #22c55e; }
    .badge-warn  { background: rgba(245,158,11,0.12); color: #f59e0b; }
    .badge-error { background: rgba(229,72,77,0.12);  color: #e5484d; }

    /* Issue tags */
    .issue-tags { display: flex; flex-wrap: wrap; gap: 3px; margin-top: 3px; }
    .issue-tag {
      display: inline-block; padding: 1px 5px; border-radius: 3px;
      font-size: 9px; font-weight: 600; letter-spacing: .02em;
      background: #1a1d2a; color: #9396a8; border: 1px solid #2a2d3e;
      white-space: nowrap;
    }
    .issue-tag.error { background: rgba(229,72,77,0.08); color: #e5484d; border-color: rgba(229,72,77,0.2); }
    .issue-tag.warn  { background: rgba(245,158,11,0.08); color: #f59e0b; border-color: rgba(245,158,11,0.2); }

    /* Editable cells */
    .cell-wrap {
      padding: 6px 14px;
      height: 100%;
    }
    .cell-text {
      font-size: 12px; color: #c0c3d6;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      max-width: 220px;
      padding: 4px 6px;
      border-radius: 5px;
      border: 1px solid transparent;
      cursor: text;
      transition: border-color 0.15s, background 0.15s;
    }
    .cell-text:hover {
      border-color: #2a2d3e;
      background: #1a1d2a;
    }
    .cell-text.empty { color: #5c5f72; font-style: italic; }
    .cell-text.edited {
      color: #4f8ef7;
      border-color: rgba(79,142,247,0.25);
      background: rgba(79,142,247,0.05);
    }
    .cell-input {
      width: 100%; min-width: 120px;
      background: #222536; border: 1px solid #4f8ef7;
      border-radius: 5px; color: #eef0f6;
      font-size: 12px; font-family: inherit;
      padding: 4px 8px; outline: none;
      box-shadow: 0 0 0 2px rgba(79,142,247,0.15);
    }
    /* DOI column */
    .col-doi  { min-width: 180px; }
    .col-year { width: 70px; }
    .col-badge { width: 100px; padding: 10px 14px; }

    /* Table footer actions */
    .table-footer {
      display: flex; align-items: center; gap: 10px;
      padding: 14px 20px;
      border-top: 1px solid #2a2d3e;
      background: #0d0f14;
    }
    .changed-hint {
      font-size: 11px; color: #4f8ef7; flex: 1;
    }

    /* Results top actions */
    .results-actions {
      display: flex; align-items: center; gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    .results-title {
      font-size: 17px; font-weight: 700; color: #eef0f6;
      flex: 1;
    }
  `

  // ── Lifecycle ─────────────────────────────────────────────────────────────

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
          updated[i] = { ...updated[i], status: ev.status, issues: ev.issues }
          this._entries = updated
        }
        this._checkedCount = ev.idx
        break
      }

      case 'done':
        this._validationStats = ev.stats ?? {}
        if (ev.entries?.length) {
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
    form.append('mailto', this._mailto)

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
        <div class="log-label">Лог выполнения</div>
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
    if (e.status === 'checking') return 'Проверяю...'
    if (e.status === 'ok')       return 'OK'
    if (e.status === 'warn')     return e.issues.length ? ISSUE_LABELS[e.issues[0]] ?? 'Предупреждение' : 'Предупреждение'
    if (e.status === 'error')    return e.issues.length ? ISSUE_LABELS[e.issues[0]] ?? 'Ошибка' : 'Ошибка'
    return ''
  }

  private _statusBadge(status: EntryState['status']) {
    if (status === 'ok')    return html`<span class="badge badge-ok">✓ OK</span>`
    if (status === 'warn')  return html`<span class="badge badge-warn">⚠ Предупреждение</span>`
    if (status === 'error') return html`<span class="badge badge-error">✕ Ошибка</span>`
    return nothing
  }

  private _issueTag(issue: string, entryStatus: EntryState['status']) {
    const label = ISSUE_LABELS[issue] ?? issue
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

    return html`
      <div class="cell-wrap">
        <div class="cell-text ${edited ? 'edited' : ''} ${!value ? 'empty' : ''}"
          title="${value || placeholder}"
          @click=${() => { this._editingCell = { key: entry.key, field } }}>
          ${value || placeholder}
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
            <span class="spinner" style="color:#4f8ef7"></span>
          </div>
          <div class="progress-title">Проверка источников через Crossref...</div>
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
              <div class="entry-title">${this._getField(e, 'title') || e.fields.title || ''}</div>
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
          <div class="stat-label">Всего записей</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val ok">${nOk}</div>
          <div class="stat-label">OK</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val warn">${nWarn}</div>
          <div class="stat-label">Предупреждения</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val error">${nError}</div>
          <div class="stat-label">Ошибки</div>
        </div>
      </div>

      <!-- Action row -->
      <div class="results-actions">
        <div class="results-title">Результаты проверки</div>

        ${this._bibJobId ? html`
          <a class="btn btn-ghost" style="font-size:12px"
             href="/api/download/${this._bibJobId}/references_enriched.bib"
             download="references_enriched.bib">
            ↓ Скачать обогащённый .bib
          </a>` : nothing}

        <button class="btn btn-blue" style="font-size:12px"
          ?disabled=${this._generatingBib}
          @click=${this._generateBib}>
          ${this._generatingBib
            ? html`<span class="spinner"></span> Генерирую...`
            : html`↓ Сохранить${edits ? ' (с правками)' : ''} .bib`}
        </button>

        <button class="btn btn-next" style="font-size:12px"
          @click=${() => this._goStep(2)}>
          Далее →
        </button>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <div class="table-toolbar-title">Источники — кликните ячейку чтобы отредактировать</div>
          <div class="table-hint">Поля: название, авторы, год, журнал, DOI</div>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ключ / Статус</th>
                <th>Название</th>
                <th>Авторы</th>
                <th class="col-year">Год</th>
                <th>Журнал</th>
                <th class="col-doi">DOI</th>
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
            <div class="changed-hint">Есть несохранённые правки — нажмите «Сохранить .bib»</div>
            <button class="btn btn-blue" style="font-size:12px"
              ?disabled=${this._generatingBib}
              @click=${this._generateBib}>
              ${this._generatingBib
                ? html`<span class="spinner"></span> Генерирую...`
                : '↓ Сохранить с правками .bib'}
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
    const hasFile = !!this._bibFile
    const isProc  = this.status === 'processing'

    return html`
      <div class="card">
        <div class="card-header">
          <div class="card-icon red">📚</div>
          <div>
            <div class="card-title">Загрузи файл библиографии</div>
            <div class="card-desc">
              BibTeX-файл <strong style="color:#eef0f6">(.bib)</strong> со списком источников.
              Убедись, что перед каждой записью стоит номерной комментарий — смотри пример ниже.
            </div>
          </div>
        </div>

        <!-- Format example -->
        <div class="format-hint">
          <div class="format-hint-header">
            <div class="dot"></div>
            Как должен выглядеть .bib файл
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

        <div class="section-label" style="margin-top:20px">Выбери файл</div>
        <file-drop
          label="Перетащи .bib файл или кликни для выбора"
          ext=".bib" accept=".bib"
          @file-selected=${(e: CustomEvent) => { this._bibFile = e.detail; this._clearValidation() }}
        ></file-drop>

        ${hasFile ? html`
          <div class="bib-file-info">
            <div class="bfi-icon">📄</div>
            <div>
              <div class="bfi-name">${this._bibFile!.name}</div>
              <div class="bfi-sub">Файл загружен · готов к использованию</div>
            </div>
          </div>` : nothing}

        <!-- Email input -->
        <div class="input-wrap" style="margin-top:16px">
          <label class="input-label">
            Email для Crossref API
            <span class="optional-tag">необязательно</span>
          </label>
          <input class="text-input" type="email" placeholder="you@university.edu"
            @input=${(e: Event) => this._mailto = (e.target as HTMLInputElement).value} />
          <div style="font-size:11px;color:#5c5f72;margin-top:5px">
            Ускоряет и стабилизирует запросы к Crossref (полезно при большом списке)
          </div>
        </div>

        ${this._renderLog()}

        <!-- Action cards -->
        <div class="action-row">
          <button class="action-card primary" ?disabled=${!hasFile || isProc}
            @click=${this._runValidate}>
            <div class="ac-icon">🔍</div>
            <div class="ac-title ac-primary">
              ${isProc ? html`<span class="spinner" style="display:inline-block;width:13px;height:13px;vertical-align:middle;margin-right:6px;color:#4f8ef7"></span>` : nothing}
              ${isProc ? 'Проверяю...' : 'Проверить DOI через Crossref'}
            </div>
            <div class="ac-sub">Найдёт недостающие DOI, исправит метаданные. Займёт ~1 мин на 50 источников.</div>
          </button>

          <button class="action-card" ?disabled=${!hasFile || isProc}
            @click=${() => this._goStep(2)}>
            <div class="ac-icon">⏭</div>
            <div class="ac-title">Пропустить проверку</div>
            <div class="ac-sub">Перейти к следующему шагу без проверки. DOI в документе останутся как есть.</div>
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
            <div class="card-title">URI карта источников</div>
            <div class="card-desc">
              Привязывает номера ссылок <strong style="color:#eef0f6">[1], [2]…</strong>
              к внутренним идентификаторам Zotero. Следуй шагам ниже — это занимает меньше минуты.
            </div>
          </div>
        </div>

        <!-- Visual pipeline -->
        <div class="pipeline">
          <div class="ps ${s1}">
            <div class="ps-icon">📚</div>
            <div class="ps-title">Открой Zotero</div>
            <div class="ps-sub">Выдели все источники Ctrl+A</div>
          </div>

          <div class="pa">${arrowSvg}</div>

          <div class="ps ${s2}">
            <div class="ps-icon">📋</div>
            <div class="ps-title">Создай библиографию</div>
            <div class="ps-sub">Scannable Cite → Save as HTML</div>
          </div>

          <div class="pa ${hasHtml || isDone ? 'pa-done' : 'pa-active'}">${arrowSvg}</div>

          <div class="ps ${s3}">
            ${isDone || hasHtml ? html`<div class="ps-badge">✓</div>` : nothing}
            <div class="ps-icon">${hasHtml || isDone ? '📄' : '⬆'}</div>
            <div class="ps-title">${hasHtml || isDone ? 'HTML загружен' : 'Загрузи HTML'}</div>
            <div class="ps-sub">${hasHtml ? this._htmlFile!.name.slice(0,22) + (this._htmlFile!.name.length > 22 ? '…' : '') : 'файл из Zotero'}</div>
          </div>

          <div class="pa ${isDone ? 'pa-done' : hasHtml ? 'pa-active' : ''}">${arrowSvg}</div>

          <div class="ps ${s4}">
            ${isDone ? html`<div class="ps-badge">✓</div>` : nothing}
            <div class="ps-icon">
              ${isProc ? html`<span class="spinner" style="color:#4f8ef7;width:20px;height:20px;border-width:2.5px"></span>`
                       : isDone ? '✅' : '⚙'}
            </div>
            <div class="ps-title">${isDone ? 'URI карта готова' : isProc ? 'Создаю карту…' : 'Создай URI карту'}</div>
            <div class="ps-sub">${isDone ? `${this._parseCount} источников` : isProc ? 'Обрабатываю файл' : 'Нажми кнопку ниже'}</div>
          </div>
        </div>

        <!-- Upload options -->
        <div class="section-label">Загрузи файл</div>
        <div class="upload-options">
          <div class="upload-col">
            <div class="upload-col-label">HTML экспорт из Zotero</div>
            <file-drop label="Перетащи или кликни" ext=".html" accept=".html,.htm"
              @file-selected=${(e: CustomEvent) => {
                this._htmlFile = e.detail; this._uriMapDirect = null
                this._uriMapJobId = ''; this._parseCount = 0; this._parseMatch = null
                this.status = 'idle'; this.log = ''
              }}>
            </file-drop>
          </div>

          <div class="upload-divider">
            <div class="upload-divider-line"></div>
            <div class="upload-divider-text">или</div>
            <div class="upload-divider-line"></div>
          </div>

          <div class="upload-col">
            <div class="upload-col-label">Готовый uri-map.tsv</div>
            <file-drop label="Уже есть готовый файл?" ext=".tsv" accept=".tsv,.txt"
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
              <div class="parse-result-title">URI карта успешно создана</div>
              <div class="parse-result-sub">
                ${this._parseMatch === true
                  ? 'Количество источников совпадает с .bib файлом'
                  : this._parseMatch === false
                    ? 'Количество не совпадает с .bib — проверь предупреждение ниже'
                    : 'Файл готов к использованию'}
              </div>
            </div>
            <div class="parse-count">
              <div class="parse-count-num">${this._parseCount}</div>
              <div class="parse-count-label">источников</div>
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
              <div style="font-weight:700;margin-bottom:4px">Ошибка при обработке файла</div>
              <div style="font-size:11px;opacity:0.8">${this.log}</div>
            </div>
          </div>` : nothing}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${() => this._goStep(1)}>← Назад</button>

          ${hasHtml && !isDone ? html`
            <button class="btn btn-blue"
              ?disabled=${isProc}
              @click=${this._runParseHtml}>
              ${isProc
                ? html`<span class="spinner"></span> Создаю карту…`
                : '⚙ Создать uri-map.tsv'}
            </button>` : nothing}

          ${isDone ? html`
            <a class="btn btn-ghost" style="font-size:12px"
               href="/api/download/${this._uriMapJobId}/uri-map.tsv"
               download="uri-map.tsv">↓ Скачать uri-map.tsv</a>
            <button class="btn btn-ghost" style="font-size:12px"
              @click=${() => {
                this._uriMapJobId = ''; this._htmlFile = null; this._parseCount = 0
                this._parseMatch = null; this.status = 'idle'; this.log = ''
                this.shadowRoot?.querySelectorAll('file-drop').forEach((el: any) => el.reset?.())
              }}>↺ Пересоздать</button>` : nothing}

          <div class="spacer"></div>
          <button class="btn btn-next" ?disabled=${!hasMap}
            @click=${() => this._goStep(3)}>
            Далее →
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
            <div class="card-title">Заменить ссылки в документе</div>
            <div class="card-desc">
              Загрузи Word-файл с числовыми ссылками — скрипт заменит
              <strong style="color:#eef0f6">[1], [5][6][7]</strong> на нативные поля Zotero,
              после чего плагин автоматически отформатирует список литературы.
            </div>
          </div>
        </div>

        <!-- Prerequisites -->
        <div class="section-label">Что нужно для обработки</div>
        <div class="prereq-panel">
          <div class="prereq-item ${hasMap ? 'ok' : 'missing'}">
            <div class="prereq-ico">${hasMap ? '✓' : '!'}</div>
            <div>
              <div class="prereq-title">URI карта (Шаг 2)</div>
              <div class="prereq-sub">
                ${hasMap
                  ? mapCount ? `${mapCount} источников привязано` : 'Карта загружена'
                  : 'Вернись на Шаг 2 →'}
              </div>
            </div>
          </div>
          <div class="prereq-item ${this._bibFile ? 'ok' : 'missing'}">
            <div class="prereq-ico">${this._bibFile ? '✓' : '!'}</div>
            <div>
              <div class="prereq-title">Библиография (Шаг 1)</div>
              <div class="prereq-sub">
                ${this._bibFile
                  ? this._bibFile.name.slice(0, 28) + (this._bibFile.name.length > 28 ? '…' : '')
                  : 'Вернись на Шаг 1 →'}
              </div>
            </div>
          </div>
        </div>

        <!-- Transform preview -->
        <div class="section-label">Что произойдёт с документом</div>
        <div class="transform-vis">
          <div class="tv-side">
            <div class="tv-label">Сейчас в .docx</div>
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
            <div class="tv-label">После обработки</div>
            <div class="tv-doc">
              ...результаты показали<br>
              значительный эффект
              <span class="tv-cite-z">ZOTERO [1]</span>,<br>
              <span class="tv-cite-z">ZOTERO [5–8]</span><br>
              на прочность керамики...
            </div>
          </div>
        </div>

        <!-- Docx upload -->
        <div class="section-label" style="margin-top:20px">Загрузи статью</div>
        <file-drop label="Перетащи .docx файл или кликни" ext=".docx" accept=".docx"
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
              <div class="ir-title">Документ успешно обработан!</div>
              <div class="ir-sub">Поля Zotero вставлены · скачай и открой в Word</div>
            </div>
            <div class="ir-stats">
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectReplaced}</div>
                <div class="ir-stat-label">Ссылок<br>заменено</div>
              </div>
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectGroups}</div>
                <div class="ir-stat-label">Групп<br>цитирований</div>
              </div>
            </div>
          </div>` : nothing}

        ${isError ? html`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">Ошибка при обработке</div>
              <div style="font-size:11px;opacity:0.8;white-space:pre-wrap">${this.log}</div>
            </div>
          </div>` : nothing}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${() => this._goStep(2)}>← Назад</button>

          <button class="btn btn-red"
            ?disabled=${!hasDocx || !hasMap || isProc}
            @click=${this._runInject}>
            ${isProc
              ? html`<span class="spinner"></span> Обрабатываю...`
              : isDone ? '↺ Обработать снова' : '▶ Запустить обработку'}
          </button>

          ${isDone ? html`
            <a class="btn btn-green"
               href="/api/download/${this._injectJobId}/output_zotero.docx"
               download="output_zotero.docx">↓ Скачать результат</a>
            <div class="spacer"></div>
            <button class="btn btn-next" @click=${() => this._goStep(4)}>
              Далее → Инструкция Word
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
        <div class="sh-title">Всё готово!</div>
        <div class="sh-sub">Документ с нативными полями Zotero создан и готов к скачиванию</div>
        ${this._injectReplaced || this._injectGroups ? html`
          <div class="sh-stats">
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectReplaced}</div>
              <div class="sh-stat-l">Ссылок заменено</div>
            </div>
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectGroups}</div>
              <div class="sh-stat-l">Групп цитирований</div>
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
              <span class="btn-dl-main">Скачать output_zotero.docx</span>
              <span class="btn-dl-sub">Нажми, затем открой в Microsoft Word</span>
            </span>
          </a>
        </div>` : nothing}

      <!-- Steps in Word -->
      <div class="word-steps">
        <div class="ws-header">Что делать дальше — 3 простых шага в Word</div>

        <div class="ws-step">
          <div class="ws-num">1</div>
          <div class="ws-icon-wrap">📂</div>
          <div class="ws-body">
            <div class="ws-title">Открой скачанный файл в Microsoft Word</div>
            <div class="ws-sub">Двойной клик по <strong>output_zotero.docx</strong></div>
          </div>
          <span class="ws-badge blue">Word</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">2</div>
          <div class="ws-icon-wrap">🔄</div>
          <div class="ws-body">
            <div class="ws-title">Нажми Refresh в панели Zotero</div>
            <div class="ws-sub">Zotero → <strong>Refresh</strong> (или кнопка обновления в панели инструментов)</div>
          </div>
          <span class="ws-badge blue">Zotero</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">3</div>
          <div class="ws-icon-wrap">🎨</div>
          <div class="ws-body">
            <div class="ws-title">Выбери стиль цитирования</div>
            <div class="ws-sub">Например <strong>Ceramic International</strong>, IEEE, APA и др.</div>
          </div>
          <span class="ws-badge green">Готово</span>
        </div>
      </div>

      <!-- Tip -->
      <div style="padding:12px 16px;background:#1a1d2a;border:1px solid #2a2d3e;border-radius:12px;font-size:12px;color:#9396a8;line-height:1.6;margin-bottom:16px">
        <strong style="color:#eef0f6">💡 Подсказка:</strong>
        После Refresh группы вида <strong style="color:#eef0f6">[5][6][7][8]</strong> автоматически
        сожмутся в <strong style="color:#22c55e">[5–8]</strong> согласно выбранному стилю.
      </div>

      <div class="btn-row">
        <button class="btn btn-ghost" @click=${() => this._goStep(3)}>← Назад</button>
        <div class="spacer"></div>
        <button class="btn btn-ghost" @click=${this._reset}>↺ Обработать другой документ</button>
      </div>
    `
  }

  // ── Main render ────────────────────────────────────────────────────────────

  render() {
    const steps = [
      { n: 1, name: 'Библиография' },
      { n: 2, name: 'URI карта' },
      { n: 3, name: 'Обработка' },
      { n: 4, name: 'Готово' },
    ]
    const wide = this._validationDone && this.step === 1

    return html`
      <header>
        <div class="logo-dot">Z</div>
        <span class="logo-name">Zotero Inject</span>
        <span class="logo-tag">Citation processor</span>
        <div class="header-spacer"></div>
        <div class="header-badge">Шаг ${this.step} из 4</div>
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
