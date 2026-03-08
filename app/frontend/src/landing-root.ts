import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { I18N, STYLES } from './landing/i18n'
import { landingTemplate } from './landing/landing-template'

type Lang = 'ru' | 'en'
type TranslationMap = Record<string, string>
type QRCodeCtor = new (el: HTMLElement, opts: Record<string, unknown>) => unknown

const DONATE_WALLET = 'TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3'
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
  private donateQrObserver: IntersectionObserver | null = null
  private anchorHandlers = new Map<HTMLAnchorElement, EventListener>()

  private navEl: HTMLElement | null = null
  private bttEl: HTMLElement | null = null
  private donateQrInitialized = false

  private scrollTicking = false
  private latestScrollY = 0
  private navScrolled = false
  private bttVisible = false

  private readonly onScroll = () => {
    this.latestScrollY = window.scrollY
    if (this.scrollTicking) return
    this.scrollTicking = true

    window.requestAnimationFrame(() => {
      this.scrollTicking = false
      const shouldNavScroll = this.latestScrollY > 60
      const shouldShowBtt = this.latestScrollY > 400

      if (shouldNavScroll !== this.navScrolled) {
        this.navScrolled = shouldNavScroll
        this.navEl?.classList.toggle('scrolled', shouldNavScroll)
      }
      if (shouldShowBtt !== this.bttVisible) {
        this.bttVisible = shouldShowBtt
        this.bttEl?.classList.toggle('visible', shouldShowBtt)
      }
    })
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
    return html`${landingTemplate}`
  }

  firstUpdated() {
    this.attachGlobals()
    this.deferTickerInit()
    this.initializeAnchors()
    this.initializeReveals()

    this.navEl = this.querySelector<HTMLElement>('#nav')
    this.bttEl = this.querySelector<HTMLElement>('#btt')

    window.addEventListener('scroll', this.onScroll, { passive: true })
    this.onScroll()

    this.initializeLanguage()
    this.observeDonateSectionForQr()
  }

  private deferTickerInit() {
    const win = window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, options?: IdleRequestOptions) => number
    }
    if (typeof win.requestIdleCallback === 'function') {
      win.requestIdleCallback(() => this.initializeTicker(), { timeout: 1200 })
      return
    }
    window.setTimeout(() => this.initializeTicker(), 320)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('scroll', this.onScroll)
    this.revealObserver?.disconnect()
    this.revealObserver = null
    this.donateQrObserver?.disconnect()
    this.donateQrObserver = null

    this.anchorHandlers.forEach((handler, anchor) => anchor.removeEventListener('click', handler))
    this.anchorHandlers.clear()

    if (window.setLang === this.globalSetLang) delete window.setLang
    if (window.copyPrompt === this.globalCopyPrompt) delete window.copyPrompt
    if (window.copyDonateAddr === this.globalCopyDonate) delete window.copyDonateAddr
  }

  private getDict(lang: Lang = this.lang): TranslationMap {
    return I18N[lang] as TranslationMap
  }

  private getCopyLabel(lang: Lang = this.lang): string {
    const dict = this.getDict(lang)
    return dict.copy_lbl || 'Copy'
  }

  private attachGlobals() {
    window.setLang = this.globalSetLang
    window.copyPrompt = this.globalCopyPrompt
    window.copyDonateAddr = this.globalCopyDonate
  }

  private initializeLanguage() {
    const qp = new URLSearchParams(window.location.search).get('lang')
    const saved = localStorage.getItem('lang')
    const browserLang: Lang = navigator.language.startsWith('ru') ? 'ru' : 'en'
    const next: Lang = qp === 'en' || qp === 'ru'
      ? qp
      : (saved === 'en' || saved === 'ru' ? saved : browserLang)

    this.setLang(next, false)
  }

  private setLang(next: Lang, animate = true) {
    if (this.transitioning) return
    this.transitioning = true
    this.lang = next
    localStorage.setItem('lang', next)

    this.querySelectorAll<HTMLButtonElement>('.lang-btn').forEach((btn, index) => {
      btn.classList.toggle('active', (index === 0 && next === 'ru') || (index === 1 && next === 'en'))
    })

    if (!animate) {
      this.applyTranslations(next)
      this.transitioning = false
      return
    }

    const body = document.body
    body.style.transition = 'opacity 120ms ease'
    body.style.opacity = '0.82'

    window.setTimeout(() => {
      this.applyTranslations(next)
      body.style.opacity = '1'
      window.setTimeout(() => {
        body.style.transition = ''
        body.style.opacity = ''
        this.transitioning = false
      }, 140)
    }, 80)
  }

  private applyTranslations(lang: Lang) {
    const dict = this.getDict(lang)

    this.querySelectorAll<HTMLElement>('[data-i]').forEach((el) => {
      const key = el.dataset.i
      if (!key) return
      const value = dict[key]
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
      donateCopyBtn.textContent = this.getCopyLabel(lang)
    }

    document.documentElement.lang = lang
  }

  private async copyPrompt() {
    const dict = this.getDict()
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
    btn.textContent = '? OK'
    btn.classList.add('ok')
    window.setTimeout(() => {
      btn.textContent = this.getCopyLabel(this.lang)
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

  private observeDonateSectionForQr() {
    const donateSection = this.querySelector<HTMLElement>('#donate-section')
    if (!donateSection) return

    if (!('IntersectionObserver' in window)) {
      this.initializeDonateQr()
      return
    }

    this.donateQrObserver = new IntersectionObserver((entries) => {
      const hasVisible = entries.some((entry) => entry.isIntersecting)
      if (!hasVisible) return
      this.donateQrObserver?.disconnect()
      this.donateQrObserver = null
      this.initializeDonateQr()
    }, { rootMargin: '280px 0px' })

    this.donateQrObserver.observe(donateSection)
  }

  private initializeDonateQr() {
    if (this.donateQrInitialized) return
    this.donateQrInitialized = true

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
    script.async = true
    script.defer = true
    script.dataset.qrcodeLib = 'qrcodejs'
    script.onload = () => this.renderDonateQr()
    script.onerror = () => { this.donateQrInitialized = false }
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
