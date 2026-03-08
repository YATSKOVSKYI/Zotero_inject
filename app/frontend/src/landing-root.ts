import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import landingStyles from './landing/landing-styles.css?raw'
import { I18N, STYLES } from './landing/i18n'
import { landingTemplate } from './landing/landing-template'

type Lang = 'ru' | 'en'

type TranslationMap = Record<string, string>

type QRCodeCtor = new (el: HTMLElement, opts: Record<string, unknown>) => unknown

const DONATE_WALLET = 'TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3'

const DONATE_I18N: Record<Lang, TranslationMap> = {
  ru: {
    donate_eyebrow: 'поддержать проект',
    donate_h: 'Инструмент понравился?',
    donate_p: 'Это бесплатный open-source проект. Если он сэкономил вам время на диплом или статью — поддержите разработку парой USDT.',
    donate_card_t: 'Криптовалюта USDT',
    donate_card_s: 'Сеть TRON (TRC-20). Только USDT — другие активы будут потеряны.',
    donate_warn: '<strong>Внимание:</strong> отправляйте только активы сети TRON на этот адрес.',
    donate_photo_main: 'На это уходят часы.<br>Ваш донат — <em>топливо</em>.',
  },
  en: {
    donate_eyebrow: 'support the project',
    donate_h: 'Found this useful?',
    donate_p: 'This is a free open-source tool. If it saved you time on your thesis or paper — consider supporting development with a small USDT donation.',
    donate_card_t: 'USDT Cryptocurrency',
    donate_card_s: 'TRON network (TRC-20). USDT only — other assets will be permanently lost.',
    donate_warn: '<strong>Warning:</strong> send only TRON network assets to this address.',
    donate_photo_main: 'This takes hours to build.<br>Your donation <em>keeps it alive</em>.',
  },
}

const HTML_I18N_KEYS = new Set(['donate_warn', 'donate_photo_main'])

declare global {
  interface Window {
    setLang?: (lang: string) => void
    copyPrompt?: () => void
    copyDonateAddr?: (btn: HTMLButtonElement) => void
    QRCode?: QRCodeCtor
  }
}

@customElement('landing-root')
export class LandingRoot extends LitElement {
  private lang: Lang = 'ru'
  private transitioning = false
  private revealObserver: IntersectionObserver | null = null
  private anchorHandlers = new Map<HTMLAnchorElement, EventListener>()

  private readonly onScroll = () => {
    const nav = this.querySelector<HTMLElement>('#nav')
    const btt = this.querySelector<HTMLElement>('#btt')
    nav?.classList.toggle('scrolled', window.scrollY > 60)
    btt?.classList.toggle('visible', window.scrollY > 400)
  }

  private readonly globalSetLang = (lang: string) => {
    this.setLang(lang === 'en' ? 'en' : 'ru')
  }

  private readonly globalCopyPrompt = () => {
    void this.copyPrompt()
  }

  private readonly globalCopyDonate = (btn: HTMLButtonElement) => {
    void this.copyDonateAddress(btn)
  }

  createRenderRoot() {
    return this
  }

  render() {
    return html`<style>${landingStyles}</style>${landingTemplate}`
  }

  firstUpdated() {
    this.attachGlobals()
    this.initializeTicker()
    this.initializeAnchors()
    this.initializeReveals()
    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.onScroll()
    this.initializeLanguage()
    this.initializeDonateQr()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('scroll', this.onScroll)
    this.revealObserver?.disconnect()
    this.revealObserver = null
    this.anchorHandlers.forEach((handler, anchor) => anchor.removeEventListener('click', handler))
    this.anchorHandlers.clear()

    if (window.setLang === this.globalSetLang) delete window.setLang
    if (window.copyPrompt === this.globalCopyPrompt) delete window.copyPrompt
    if (window.copyDonateAddr === this.globalCopyDonate) delete window.copyDonateAddr
  }

  private attachGlobals() {
    window.setLang = this.globalSetLang
    window.copyPrompt = this.globalCopyPrompt
    window.copyDonateAddr = this.globalCopyDonate
  }

  private initializeLanguage() {
    const qp = new URLSearchParams(window.location.search).get('lang')
    const saved = localStorage.getItem('lang')
    const browserLang = navigator.language.startsWith('ru') ? 'ru' : 'en'
    const next = qp === 'en' || qp === 'ru'
      ? qp
      : (saved === 'en' || saved === 'ru' ? saved : browserLang)
    this.setLang(next)
  }

  private setLang(next: Lang) {
    if (this.transitioning) return
    this.transitioning = true
    this.lang = next
    localStorage.setItem('lang', next)

    this.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn, index) => {
      btn.classList.toggle('active', (index === 0 && next === 'ru') || (index === 1 && next === 'en'))
    })

    const dict = I18N[next] as TranslationMap
    const donateDict = DONATE_I18N[next]
    const body = document.body
    body.style.transition = 'opacity 200ms ease-in'
    body.style.opacity = '0'

    window.setTimeout(() => {
      this.querySelectorAll<HTMLElement>('[data-i]').forEach((el) => {
        const key = el.dataset.i
        if (!key) return
        const value = dict[key] ?? donateDict[key]
        if (value === undefined) return
        if (HTML_I18N_KEYS.has(key)) {
          el.innerHTML = value
        } else {
          el.textContent = value
        }
      })

      const prompt = this.querySelector<HTMLElement>('#prompt-body')
      if (prompt && dict.prompt_text) prompt.textContent = dict.prompt_text

      const copyLabel = this.querySelector<HTMLElement>('#copy-lbl')
      if (copyLabel && dict.copy_lbl) copyLabel.textContent = dict.copy_lbl

      const title = document.getElementById('meta-title')
      if (title && dict.meta_title) title.textContent = dict.meta_title

      const desc = document.getElementById('meta-desc')
      if (desc && dict.meta_desc) desc.setAttribute('content', dict.meta_desc)

      const donateCopyBtn = this.querySelector<HTMLButtonElement>('#donate-copy-btn')
      if (donateCopyBtn && !donateCopyBtn.classList.contains('ok')) {
        donateCopyBtn.textContent = next === 'ru' ? 'Копировать' : 'Copy'
      }

      body.style.transition = 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)'
      body.style.opacity = '1'

      window.setTimeout(() => {
        body.style.transition = ''
        body.style.opacity = ''
        this.transitioning = false
      }, 520)
    }, 210)
  }

  private async copyPrompt() {
    const dict = I18N[this.lang] as TranslationMap
    const prompt = dict.prompt_text
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    const btn = this.querySelector<HTMLButtonElement>('#copy-btn')
    const lbl = this.querySelector<HTMLElement>('#copy-lbl')
    if (!btn || !lbl) return
    btn.classList.add('ok')
    lbl.textContent = dict.copy_ok || 'Copied!'
    window.setTimeout(() => {
      btn.classList.remove('ok')
      lbl.textContent = dict.copy_lbl || 'Copy'
    }, 2200)
  }

  private async copyDonateAddress(btn: HTMLButtonElement) {
    await navigator.clipboard.writeText(DONATE_WALLET)
    btn.textContent = '✓ OK'
    btn.classList.add('ok')
    window.setTimeout(() => {
      btn.textContent = this.lang === 'ru' ? 'Копировать' : 'Copy'
      btn.classList.remove('ok')
    }, 2000)
  }

  private initializeTicker() {
    const ticker = this.querySelector<HTMLElement>('#ticker')
    if (!ticker) return
    const items = [...STYLES, ...STYLES]
    ticker.innerHTML = items.map((item) => `<div class="titem"><div class="tdot"></div>${item}</div>`).join('')
  }

  private initializeAnchors() {
    this.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
      const handler: EventListener = (evt) => {
        const href = anchor.getAttribute('href')
        if (!href) return
        const id = href.slice(1)
        if (!id) return
        const target = this.querySelector<HTMLElement>(`#${id}`)
        if (!target) return
        evt.preventDefault()
        target.scrollIntoView({ behavior: 'smooth' })
      }
      anchor.addEventListener('click', handler)
      this.anchorHandlers.set(anchor, handler)
    })
  }

  private initializeReveals() {
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('vis')
        this.revealObserver?.unobserve(entry.target)
      })
    }, { threshold: 0.08 })
    this.querySelectorAll('.reveal').forEach((el) => this.revealObserver?.observe(el))
  }

  private initializeDonateQr() {
    if (window.QRCode) {
      this.renderDonateQr()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-qrcode-lib="qrcodejs"]')
    if (existing) {
      existing.addEventListener('load', () => this.renderDonateQr(), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js'
    script.dataset.qrcodeLib = 'qrcodejs'
    script.onload = () => this.renderDonateQr()
    document.head.appendChild(script)
  }

  private renderDonateQr() {
    const QRCode = window.QRCode
    const canvas = this.querySelector<HTMLElement>('#donate-qr-canvas')
    if (!QRCode || !canvas) return
    canvas.innerHTML = ''
    new QRCode(canvas, {
      text: DONATE_WALLET,
      width: 160,
      height: 160,
      colorDark: '#a3e635',
      colorLight: '#060e06',
      correctLevel: 3,
    })
  }
}
