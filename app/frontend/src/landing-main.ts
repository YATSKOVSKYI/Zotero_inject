import globalCss from './styles/global.css?inline'
import landingCss from './landing/landing-styles.css?inline'
import './landing-root'

const STYLE_ID = 'landing-inline-styles'

if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `${globalCss}\n${landingCss}`
  document.head.appendChild(style)
}
