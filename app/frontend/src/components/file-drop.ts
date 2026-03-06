import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('file-drop')
export class FileDrop extends LitElement {
  @property() label = 'Drop file here'
  @property() accept = '*'
  @property() hint = ''
  @property() ext = ''
  @state() private dragging = false
  @state() private fileName = ''

  static styles = css`
    :host { display: block; }

    .zone {
      position: relative;
      border: 2px dashed #2a2d3e;
      border-radius: 12px;
      padding: 22px 16px;
      text-align: center;
      cursor: pointer;
      background: #13161f;
      transition: all 0.2s ease;
      overflow: hidden;
    }
    .zone::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at center, rgba(79,142,247,0.06) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .zone:hover, .zone.dragging {
      border-color: #4f8ef7;
      background: #161922;
    }
    .zone:hover::before, .zone.dragging::before { opacity: 1; }

    .zone.has-file {
      border-color: #22c55e;
      border-style: solid;
      background: rgba(34,197,94,0.06);
    }
    .zone.has-file::before {
      background: radial-gradient(ellipse at center, rgba(34,197,94,0.08) 0%, transparent 70%);
      opacity: 1;
    }

    input {
      position: absolute; inset: 0;
      opacity: 0; cursor: pointer;
      width: 100%; height: 100%;
      z-index: 2;
    }

    .content { position: relative; z-index: 1; }

    .icon-wrap {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: #1a1d2a;
      border: 1px solid #2a2d3e;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 10px;
      font-size: 18px;
      transition: all 0.2s;
    }
    .zone.has-file .icon-wrap {
      background: rgba(34,197,94,0.15);
      border-color: rgba(34,197,94,0.4);
    }
    .zone:hover .icon-wrap, .zone.dragging .icon-wrap {
      background: rgba(79,142,247,0.15);
      border-color: rgba(79,142,247,0.4);
    }

    .label {
      font-size: 12px; font-weight: 600;
      color: #9396a8;
      margin-bottom: 3px;
    }
    .zone.has-file .label { color: #22c55e; font-size: 11px; }

    .filename {
      font-size: 12px; font-weight: 600;
      color: #eef0f6;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      max-width: 100%;
    }
    .ext {
      display: inline-block;
      background: #1a1d2a;
      border: 1px solid #333650;
      border-radius: 4px;
      padding: 1px 6px;
      font-size: 10px;
      font-family: monospace;
      color: #4f8ef7;
      margin-top: 5px;
    }
  `

  render() {
    return html`
      <div
        class="zone ${this.dragging ? 'dragging' : ''} ${this.fileName ? 'has-file' : ''}"
        @dragover=${this._onDragOver}
        @dragleave=${() => (this.dragging = false)}
        @drop=${this._onDrop}
      >
        <input type="file" accept=${this.accept} @change=${this._onChange} />
        <div class="content">
          <div class="icon-wrap">
            ${this.fileName ? '✓' : '↑'}
          </div>
          ${this.fileName
            ? html`
                <div class="label">Загружено</div>
                <div class="filename">${this.fileName}</div>
              `
            : html`
                <div class="label">${this.label}</div>
                ${this.ext ? html`<div class="ext">${this.ext}</div>` : ''}
              `}
        </div>
      </div>
    `
  }

  private _onDragOver(e: DragEvent) { e.preventDefault(); this.dragging = true }
  private _onDrop(e: DragEvent) {
    e.preventDefault(); this.dragging = false
    const f = e.dataTransfer?.files[0]
    if (f) this._emit(f)
  }
  private _onChange(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0]
    if (f) this._emit(f)
  }
  private _emit(file: File) {
    this.fileName = file.name
    this.dispatchEvent(new CustomEvent('file-selected', { detail: file, bubbles: true, composed: true }))
  }
  reset() { this.fileName = '' }
}
