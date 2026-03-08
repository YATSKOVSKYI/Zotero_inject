import { html } from 'lit'

export const landingTemplate = html`


<!-- NAV -->
<nav id="nav">
  <a class="nav-logo" href="/">
    <svg width="34" height="34" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0;overflow:visible">
      <rect width="36" height="36" rx="10" fill="#060e06"/>
      <circle cx="18" cy="18" r="13.5" fill="none" stroke="#a3e635" stroke-width="0.7" stroke-dasharray="3.8 6.7" opacity="0.2">
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="16s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="7.5" fill="none" stroke="#a3e635" stroke-width="0.5" stroke-dasharray="2.5 6.2" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="-360 18 18" dur="10s" repeatCount="indefinite"/>
      </circle>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="11s" repeatCount="indefinite"/>
        <polygon points="31.5,18 11.25,29.69 11.25,6.31" fill="none" stroke="#a3e635" stroke-width="0.8" opacity="0.18" stroke-linejoin="round"/>
        <circle cx="31.5" cy="18"     r="2.5" fill="#a3e635"/>
        <circle cx="11.25" cy="29.69" r="2.5" fill="#a3e635"/>
        <circle cx="11.25" cy="6.31"  r="2.5" fill="#a3e635"/>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="60 18 18" to="-300 18 18" dur="6.5s" repeatCount="indefinite"/>
        <circle cx="21.75" cy="24.5" r="1.6" fill="#c8f564" opacity="0.85"/>
        <circle cx="10.5"  cy="18"   r="1.6" fill="#c8f564" opacity="0.85"/>
        <circle cx="21.75" cy="11.5" r="1.6" fill="#c8f564" opacity="0.85"/>
      </g>
      <circle cx="18" cy="18" r="3" fill="none" stroke="#a3e635" stroke-width="1.2" opacity="0">
        <animate attributeName="r"       values="3;10;3"    dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="18" cy="18" r="3.4" fill="#a3e635">
        <animate attributeName="r"    values="3;3.8;3"               dur="3s" repeatCount="indefinite"/>
        <animate attributeName="fill" values="#a3e635;#ddf77e;#a3e635" dur="3s" repeatCount="indefinite"/>
      </circle>
    </svg>
    <span class="nav-logo-text">zotero_inject</span>
  </a>
  <ul class="nav-links">
    <li><a href="#what" data-i="nav_what">Что это</a></li>
    <li><a href="#how" data-i="nav_how">Как работает</a></li>
    <li><a href="#prompt" data-i="nav_prompt">Промпт</a></li>
  </ul>
  <div class="nav-right">
    <div class="nav-free" data-i="nav_free">FREE</div>
    <div class="lang-toggle">
      <button class="lang-btn active" onclick="setLang('ru')">RU</button>
      <button class="lang-btn" onclick="setLang('en')">EN</button>
    </div>
    <a href="/app" class="nav-cta" data-i="nav_cta">Открыть</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-grid"></div>
  <div class="orb orb1"></div><div class="orb orb2"></div>

  <div class="hero-shell">
    <div class="hero-copy">
      <div class="hero-label">
        <span class="hl-rule"></span>
        <span class="hl-text" data-i="hero_label">CITATION AUTOMATION · ZOTERO NATIVE</span>
      </div>

      <h1 class="hero-h1">
        <span data-i="h1a"></span><br>
        <span class="grad-text" data-i="h1b"></span>
      </h1>

      <p class="hero-sub" data-i="hero_sub"></p>

      <div class="hero-points">
        <div class="hero-point">
          <div class="hp-k" data-i="hero_point_1_k"></div>
          <div class="hp-v" data-i="hero_point_1_v"></div>
        </div>
        <div class="hero-point">
          <div class="hp-k" data-i="hero_point_2_k"></div>
          <div class="hp-v" data-i="hero_point_2_v"></div>
        </div>
        <div class="hero-point">
          <div class="hp-k" data-i="hero_point_3_k"></div>
          <div class="hp-v" data-i="hero_point_3_v"></div>
        </div>
      </div>

      <div class="hero-actions">
        <a href="/app" class="btn-primary" data-i="cta_main"></a>
        <a href="#what" class="btn-ghost" data-i="cta_how"></a>
      </div>

      <div class="hero-proof">
        <span class="proof-pill">9000+ styles</span>
        <span class="proof-pill">Word + Zotero</span>
        <span class="proof-pill" data-i="hm_free"></span>
      </div>
    </div>

    <div class="hero-demo">
      <div class="hero-demo-head">
        <span class="hd-tag" data-i="hero_demo_tag"></span>
        <span class="hd-file">intro.docx</span>
      </div>
      <div class="hero-demo-grid">
        <div class="hero-demo-col">
          <div class="hd-col-title" data-i="hero_demo_before"></div>
          <p><span class="hd-mark">[1]</span> <span class="hd-mark">[2]</span> <span class="hd-mark">[3]</span></p>
          <p class="hd-muted" data-i="hero_demo_before_note"></p>
        </div>
        <div class="hero-demo-arrow">→</div>
        <div class="hero-demo-col hero-demo-col-ok">
          <div class="hd-col-title" data-i="hero_demo_after"></div>
          <p><span class="hd-zotero">⚡ (Smith, 2023)</span></p>
          <p class="hd-muted" data-i="hero_demo_after_note"></p>
        </div>
      </div>
      <div class="hero-demo-foot" data-i="hero_demo_foot"></div>
    </div>
  </div>

  <!-- Scroll hint -->
  <a href="#what" class="scroll-hint" aria-label="Прокрутить вниз">
    <span class="sh-label" data-i="scroll_hint">прокрутите</span>
    <div class="sh-mouse">
      <div class="sh-wheel"></div>
    </div>
    <div class="sh-arrows">
      <svg class="sh-arrow" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#a3e635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg class="sh-arrow" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#a3e635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <svg class="sh-arrow" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#a3e635" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
  </a>
</section>

<!-- WHAT IT DOES -->
<div class="sec reveal" id="what">
  <div class="stag" data-i="s0_tag"></div>
  <h2 class="sec-h" data-i="s0_h"></h2>
  <p class="sec-sub" data-i="s0_sub"></p>

  <div class="ba-grid">
    <div class="ba-card">
      <div class="ba-head before"><div class="ba-dot" style="background:#f87171"></div><span data-i="ba_before_lbl"></span></div>
      <div class="ba-body">
        <div style="color:var(--text3);margin-bottom:12px" data-i="ba_before_ctx"></div>
        <div style="color:var(--text2)" data-i="ba_before_1"></div>
        <div style="color:var(--text2)" data-i="ba_before_2"></div>
        <div style="color:var(--text2);margin-top:12px;padding-top:12px;border-top:1px solid var(--border)">
          <span style="color:#f87171" data-i="ba_before_note"></span>
        </div>
      </div>
    </div>

    <div class="ba-arrow">
      <div class="ba-arrow-icon">⚡</div>
      <span data-i="ba_arrow"></span>
    </div>

    <div class="ba-card">
      <div class="ba-head after"><div class="ba-dot" style="background:var(--lime)"></div><span data-i="ba_after_lbl"></span></div>
      <div class="ba-body">
        <div style="color:var(--text3);margin-bottom:12px" data-i="ba_after_ctx"></div>
        <div style="color:var(--lime3)" data-i="ba_after_1"></div>
        <div style="color:var(--lime3)" data-i="ba_after_2"></div>
        <div style="color:var(--text2);margin-top:12px;padding-top:12px;border-top:1px solid rgba(163,230,53,.12)">
          <span style="color:var(--emerald)" data-i="ba_after_note"></span>
        </div>
      </div>
    </div>
  </div>

  <div class="why-box">
    <span class="why-icon">💡</span>
    <span data-i="why_text"></span>
  </div>
</div>

<!-- HOW IT WORKS -->
<div class="sec reveal" id="how">
  <div class="stag" data-i="s1_tag"></div>
  <h2 class="sec-h" data-i="s1_h"></h2>
  <p class="sec-sub" data-i="s1_sub"></p>

  <div class="steps-list">
    <!-- Step 0: Prerequisite -->
    <div class="step-row">
      <div class="step-num-col">
        <div class="step-circle" style="border-color:rgba(14,165,233,.3);color:#7dd3fc;font-size:11px">PRE</div>
        <div class="step-line" style="background:linear-gradient(180deg,rgba(14,165,233,.2),rgba(163,230,53,.1))"></div>
      </div>
      <div class="step-content">
        <div class="step-tag" data-i="pre_tag"></div>
        <h3 data-i="pre_h"></h3>
        <p data-i="pre_p"></p>
        <div class="step-prereq">
          <span>🔌</span>
          <span data-i="pre_note"></span>
        </div>
      </div>
    </div>

    <!-- Step 1 -->
    <div class="step-row">
      <div class="step-num-col">
        <div class="step-circle">01</div>
        <div class="step-line"></div>
      </div>
      <div class="step-content">
        <div class="step-tag" data-i="st1_tag"></div>
        <h3 data-i="st1_h"></h3>
        <p data-i="st1_p"></p>
        <div class="step-chips">
          <span class="sch">ChatGPT</span><span class="sch">Claude</span><span class="sch">Gemini</span><span class="sch">DeepSeek</span><span class="sch" data-i="any_ai">+ любой</span>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-row">
      <div class="step-num-col">
        <div class="step-circle">02</div>
        <div class="step-line"></div>
      </div>
      <div class="step-content">
        <div class="step-tag" data-i="st2_tag"></div>
        <h3 data-i="st2_h"></h3>
        <p data-i="st2_p"></p>
        <div class="step-code">
          <span style="color:var(--text3)" data-i="st2_ex_l"></span><br>
          <span style="color:var(--lime3)">@article{Smith2023,</span><br>
          <span style="color:var(--text2)">  author = {Smith, John},</span><br>
          <span style="color:var(--text2)">  title  = {Neural Networks in...},</span><br>
          <span style="color:var(--emerald)">  doi    = {10.1000/xyz123}</span><br>
          <span style="color:var(--lime3)">}</span>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-row">
      <div class="step-num-col">
        <div class="step-circle">03</div>
        <div class="step-line"></div>
      </div>
      <div class="step-content">
        <div class="step-tag" data-i="st3_tag"></div>
        <h3 data-i="st3_h"></h3>
        <p data-i="st3_p"></p>
      </div>
    </div>

    <!-- Step 4 -->
    <div class="step-row">
      <div class="step-num-col">
        <div class="step-circle" style="background:rgba(163,230,53,.1);border-color:var(--lime);box-shadow:0 0 20px rgba(163,230,53,.2)">04</div>
      </div>
      <div class="step-content" style="padding-bottom:0">
        <div class="step-tag" data-i="st4_tag"></div>
        <h3 data-i="st4_h"></h3>
        <p data-i="st4_p"></p>
        <div class="step-code">
          <span style="color:var(--text3)" data-i="st4_ex_l"></span><br>
          <span style="color:var(--lime3)" data-i="st4_ex_v1"></span><span style="color:var(--emerald)" data-i="st4_ex_v2"></span><span style="color:var(--lime3)" data-i="st4_ex_v3"></span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PROMPT -->
<div class="sec reveal" id="prompt">
  <div class="stag" data-i="s2_tag"></div>
  <h2 class="sec-h" data-i="s2_h"></h2>
  <p class="sec-sub" data-i="s2_sub"></p>
  <div style="margin-top:40px">
    <div class="code-block">
      <div class="code-head">
        <div class="mac-dots"><div class="mac-dot"></div><div class="mac-dot"></div><div class="mac-dot"></div></div>
        <span class="code-type" data-i="prompt_type"></span>
        <button class="copy-btn" id="copy-btn" onclick="copyPrompt()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <span id="copy-lbl" data-i="copy_lbl"></span>
        </button>
      </div>
      <div class="code-body" id="prompt-body"></div>
    </div>
  </div>
</div>

<!-- FEATURES -->
<div class="sec reveal" id="features">
  <div class="stag" data-i="s3_tag"></div>
  <h2 class="sec-h" data-i="s3_h"></h2>
  <div class="bento">
    <div class="bcard wide">
      <div class="bglow" style="background:var(--lime)"></div>
      <div class="bicon">🎨</div>
      <h3 data-i="b1_h"></h3><p data-i="b1_p"></p>
      <div class="btags">
        <span class="btag">ГОСТ 7.0.5</span><span class="btag">APA 7th</span><span class="btag">MLA 9th</span>
        <span class="btag">Vancouver</span><span class="btag">Chicago</span><span class="btag">IEEE</span>
        <span class="btag" data-i="b1_more" style="color:var(--emerald);border-color:rgba(52,211,153,.2)"></span>
      </div>
    </div>
    <div class="bcard">
      <div class="bglow" style="background:var(--lime)"></div>
      <div class="bicon">🔗</div>
      <h3 data-i="b2_h"></h3><p data-i="b2_p"></p>
    </div>
    <div class="bcard">
      <div class="bglow" style="background:var(--teal)"></div>
      <div class="bicon">🔍</div>
      <h3 data-i="b3_h"></h3><p data-i="b3_p"></p>
    </div>
    <div class="bcard">
      <div class="bglow" style="background:var(--emerald)"></div>
      <div class="bicon">📦</div>
      <div class="big-metric">[5–8]</div>
      <h3 data-i="b4_h"></h3><p data-i="b4_p"></p>
    </div>
    <div class="bcard">
      <div class="bglow" style="background:var(--lime)"></div>
      <div class="bicon">🆓</div>
      <div class="big-metric" data-i="b5_num">FREE</div>
      <h3 data-i="b5_h"></h3><p data-i="b5_p"></p>
    </div>
    <div class="bcard">
      <div class="bglow" style="background:var(--sky)"></div>
      <div class="bicon">🎓</div>
      <h3 data-i="b6_h"></h3><p data-i="b6_p"></p>
    </div>
  </div>
</div>

<!-- TICKER -->
<div class="ticker-wrap">
  <div class="ticker-lbl" data-i="ticker_lbl"></div>
  <div style="overflow:hidden"><div class="ticker-track" id="ticker"></div></div>
</div>

<!-- CTA -->
<div class="cta-wrap reveal">
  <div class="cta-box">
    <div class="cta-free" data-i="cta_free_badge"></div>
    <h2 data-i="cta_h"></h2>
    <p data-i="cta_p"></p>
    <a href="/app" class="btn-primary" data-i="cta_btn"></a>
  </div>
</div>

<!-- BACK TO TOP -->
<button class="btt" id="btt" aria-label="Наверх" onclick="window.scrollTo({top:0,behavior:'smooth'})">
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 11L9 6L14 11" stroke="#a3e635" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
</button>

<!-- DONATE -->
<div class="donate-wrap" id="donate-section">
  <div class="donate-hero">
    <img src="/app/donate-photo.webp" alt="Please donate" loading="lazy" decoding="async" fetchpriority="low" width="1095" height="1643"/>
    <div class="donate-hero-txt">
      <div class="donate-hero-h" data-i="donate_photo_main">На это уходят часы.<br>Ваш донат — <em>топливо</em>.</div>
      <div class="donate-hero-s">USDT · TRC-20 · TRON</div>
    </div>
  </div>
  <div class="donate-body">
    <div class="donate-tag" data-i="donate_eyebrow">поддержать проект</div>
    <h2 class="donate-hl" data-i="donate_h">Инструмент понравился?</h2>
    <p class="donate-desc" data-i="donate_p">Это бесплатный open-source проект. Если он сэкономил вам время на диплом или статью — поддержите разработку парой USDT.</p>
    <div class="donate-panel">
      <div class="donate-qr-col">
        <div class="donate-qr-frame">
          <div id="donate-qr-canvas"></div>
        </div>
        <div class="donate-qr-lbl">Scan to donate</div>
      </div>
      <div class="donate-info-col">
        <div class="donate-net">
          <svg width="12" height="12" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#ef0027"/><path d="M16 4l12 7v10l-12 7L4 21V11z" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#fff"/></svg>
          USDT · TRC-20
        </div>
        <div class="donate-info-t" data-i="donate_card_t">Криптовалюта USDT</div>
        <div class="donate-info-s" data-i="donate_card_s">Сеть TRON (TRC-20). Только USDT — другие активы будут потеряны.</div>
        <div class="donate-addr-row">
          <code class="donate-addr-code" id="donate-addr">TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3</code>
          <button class="donate-copy" id="donate-copy-btn" onclick="copyDonateAddr(this)">Copy</button>
        </div>
        <div class="donate-caution" data-i="donate_warn"><strong>Внимание:</strong> отправляйте только активы сети TRON на этот адрес.</div>
      </div>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="foot-in">
    <div class="foot-logo">
      <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="display:block;flex-shrink:0;overflow:visible">
        <rect width="36" height="36" rx="10" fill="#060e06"/>
        <circle cx="18" cy="18" r="13.5" fill="none" stroke="#a3e635" stroke-width="0.7" stroke-dasharray="3.8 6.7" opacity="0.2">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="16s" repeatCount="indefinite"/>
        </circle>
        <circle cx="18" cy="18" r="7.5" fill="none" stroke="#a3e635" stroke-width="0.5" stroke-dasharray="2.5 6.2" opacity="0.15">
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="-360 18 18" dur="10s" repeatCount="indefinite"/>
        </circle>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="11s" repeatCount="indefinite"/>
          <polygon points="31.5,18 11.25,29.69 11.25,6.31" fill="none" stroke="#a3e635" stroke-width="0.8" opacity="0.18" stroke-linejoin="round"/>
          <circle cx="31.5" cy="18"     r="2.5" fill="#a3e635"/>
          <circle cx="11.25" cy="29.69" r="2.5" fill="#a3e635"/>
          <circle cx="11.25" cy="6.31"  r="2.5" fill="#a3e635"/>
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="60 18 18" to="-300 18 18" dur="6.5s" repeatCount="indefinite"/>
          <circle cx="21.75" cy="24.5" r="1.6" fill="#c8f564" opacity="0.85"/>
          <circle cx="10.5"  cy="18"   r="1.6" fill="#c8f564" opacity="0.85"/>
          <circle cx="21.75" cy="11.5" r="1.6" fill="#c8f564" opacity="0.85"/>
        </g>
        <circle cx="18" cy="18" r="3" fill="none" stroke="#a3e635" stroke-width="1.2" opacity="0">
          <animate attributeName="r"       values="3;10;3"    dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="18" cy="18" r="3.4" fill="#a3e635">
          <animate attributeName="r"    values="3;3.8;3"               dur="3s" repeatCount="indefinite"/>
          <animate attributeName="fill" values="#a3e635;#ddf77e;#a3e635" dur="3s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <span class="foot-logo-text">zotero_inject</span>
    </div>
    <a class="foot-gh" href="https://github.com/YATSKOVSKYI/Zotero_inject" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#748f80" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
      GitHub
    </a>
    <div class="foot-copy" data-i="footer"></div>
  </div>
</footer>



`
