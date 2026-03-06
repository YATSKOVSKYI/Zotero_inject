(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,q=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,J=Symbol(),G=new WeakMap;let nt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==J)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(q&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=G.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&G.set(e,t))}return t}toString(){return this.cssText}};const bt=s=>new nt(typeof s=="string"?s:s+"",void 0,J),dt=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new nt(e,s,J)},ut=(s,t)=>{if(q)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=D.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},Q=q?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return bt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ft,defineProperty:xt,getOwnPropertyDescriptor:vt,getOwnPropertyNames:mt,getOwnPropertySymbols:_t,getPrototypeOf:yt}=Object,N=globalThis,X=N.trustedTypes,wt=X?X.emptyScript:"",$t=N.reactiveElementPolyfillSupport,P=(s,t)=>s,F={toAttribute(s,t){switch(t){case Boolean:s=s?wt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},W=(s,t)=>!ft(s,t),Y={attribute:!0,type:String,converter:F,reflect:!1,useDefault:!1,hasChanged:W};Symbol.metadata??=Symbol("metadata"),N.litPropertyMetadata??=new WeakMap;let A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Y){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&xt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=vt(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const p=r?.call(this);o?.call(this,a),this.requestUpdate(t,p,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Y}static _$Ei(){if(this.hasOwnProperty(P("elementProperties")))return;const t=yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(P("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(P("properties"))){const e=this.properties,i=[...mt(e),..._t(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(Q(r))}else t!==void 0&&e.push(Q(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ut(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const o=(i.converter?.toAttribute!==void 0?i.converter:F).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=i.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:F;this._$Em=r;const p=a.fromAttribute(e,o.type);this[r]=p??this._$Ej?.get(r)??p,this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(t!==void 0){const a=this.constructor;if(r===!1&&(o=this[t]),i??=a.getPropertyOptions(t),!((i.hasChanged??W)(o,e)||i.useDefault&&i.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:o},a){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),o!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,o]of i){const{wrapped:a}=o,p=this[r];a!==!0||this._$AL.has(r)||p===void 0||this.C(r,void 0,o,p)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[P("elementProperties")]=new Map,A[P("finalized")]=new Map,$t?.({ReactiveElement:A}),(N.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=globalThis,tt=s=>s,U=V.trustedTypes,et=U?U.createPolicy("lit-html",{createHTML:s=>s}):void 0,lt="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,pt="?"+_,kt=`<${pt}>`,$=document,j=()=>$.createComment(""),I=s=>s===null||typeof s!="object"&&typeof s!="function",Z=Array.isArray,At=s=>Z(s)||typeof s?.[Symbol.iterator]=="function",L=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,it=/>/g,y=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,ot=/"/g,ct=/^(?:script|style|textarea|title)$/i,zt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),n=zt(1),S=Symbol.for("lit-noChange"),l=Symbol.for("lit-nothing"),at=new WeakMap,w=$.createTreeWalker($,129);function ht(s,t){if(!Z(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return et!==void 0?et.createHTML(t):t}const St=(s,t)=>{const e=s.length-1,i=[];let r,o=t===2?"<svg>":t===3?"<math>":"",a=C;for(let p=0;p<e;p++){const d=s[p];let g,f,u=-1,x=0;for(;x<d.length&&(a.lastIndex=x,f=a.exec(d),f!==null);)x=a.lastIndex,a===C?f[1]==="!--"?a=st:f[1]!==void 0?a=it:f[2]!==void 0?(ct.test(f[2])&&(r=RegExp("</"+f[2],"g")),a=y):f[3]!==void 0&&(a=y):a===y?f[0]===">"?(a=r??C,u=-1):f[1]===void 0?u=-2:(u=a.lastIndex-f[2].length,g=f[1],a=f[3]===void 0?y:f[3]==='"'?ot:rt):a===ot||a===rt?a=y:a===st||a===it?a=C:(a=y,r=void 0);const m=a===y&&s[p+1].startsWith("/>")?" ":"";o+=a===C?d+kt:u>=0?(i.push(g),d.slice(0,u)+lt+d.slice(u)+_+m):d+_+(u===-2?p:m)}return[ht(s,o+(s[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class O{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,a=0;const p=t.length-1,d=this.parts,[g,f]=St(t,e);if(this.el=O.createElement(g,i),w.currentNode=this.el.content,e===2||e===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(r=w.nextNode())!==null&&d.length<p;){if(r.nodeType===1){if(r.hasAttributes())for(const u of r.getAttributeNames())if(u.endsWith(lt)){const x=f[a++],m=r.getAttribute(u).split(_),T=/([.?@])?(.*)/.exec(x);d.push({type:1,index:o,name:T[2],strings:m,ctor:T[1]==="."?Ct:T[1]==="?"?Pt:T[1]==="@"?jt:H}),r.removeAttribute(u)}else u.startsWith(_)&&(d.push({type:6,index:o}),r.removeAttribute(u));if(ct.test(r.tagName)){const u=r.textContent.split(_),x=u.length-1;if(x>0){r.textContent=U?U.emptyScript:"";for(let m=0;m<x;m++)r.append(u[m],j()),w.nextNode(),d.push({type:2,index:++o});r.append(u[x],j())}}}else if(r.nodeType===8)if(r.data===pt)d.push({type:2,index:o});else{let u=-1;for(;(u=r.data.indexOf(_,u+1))!==-1;)d.push({type:7,index:o}),u+=_.length-1}o++}}static createElement(t,e){const i=$.createElement("template");return i.innerHTML=t,i}}function E(s,t,e=s,i){if(t===S)return t;let r=i!==void 0?e._$Co?.[i]:e._$Cl;const o=I(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??=[])[i]=r:e._$Cl=r),r!==void 0&&(t=E(s,r._$AS(s,t.values),r,i)),t}class Et{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??$).importNode(e,!0);w.currentNode=r;let o=w.nextNode(),a=0,p=0,d=i[0];for(;d!==void 0;){if(a===d.index){let g;d.type===2?g=new M(o,o.nextSibling,this,t):d.type===1?g=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(g=new It(o,this,t)),this._$AV.push(g),d=i[++p]}a!==d?.index&&(o=w.nextNode(),a++)}return w.currentNode=$,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class M{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=l,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),I(t)?t===l||t==null||t===""?(this._$AH!==l&&this._$AR(),this._$AH=l):t!==this._$AH&&t!==S&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):At(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==l&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T($.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=O.createElement(ht(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const o=new Et(r,this),a=o.u(this.options);o.p(e),this.T(a),this._$AH=o}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new O(t)),e}k(t){Z(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new M(this.O(j()),this.O(j()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const i=tt(t).nextSibling;tt(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=l,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=l}_$AI(t,e=this,i,r){const o=this.strings;let a=!1;if(o===void 0)t=E(this,t,e,0),a=!I(t)||t!==this._$AH&&t!==S,a&&(this._$AH=t);else{const p=t;let d,g;for(t=o[0],d=0;d<o.length-1;d++)g=E(this,p[i+d],e,d),g===S&&(g=this._$AH[d]),a||=!I(g)||g!==this._$AH[d],g===l?t=l:t!==l&&(t+=(g??"")+o[d+1]),this._$AH[d]=g}a&&!r&&this.j(t)}j(t){t===l?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ct extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===l?void 0:t}}class Pt extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==l)}}class jt extends H{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??l)===S)return;const i=this._$AH,r=t===l&&i!==l||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==l&&(i===l||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class It{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const Ot=V.litHtmlPolyfillSupport;Ot?.(O,M),(V.litHtmlVersions??=[]).push("3.3.2");const Mt=(s,t,e)=>{const i=e?.renderBefore??t;let r=i._$litPart$;if(r===void 0){const o=e?.renderBefore??null;i._$litPart$=r=new M(t.insertBefore(j(),o),o,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const K=globalThis;class z extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return S}}z._$litElement$=!0,z.finalized=!0,K.litElementHydrateSupport?.({LitElement:z});const Rt=K.litElementPolyfillSupport;Rt?.({LitElement:z});(K.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gt=s=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(s,t)}):customElements.define(s,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tt={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:W},Dt=(s=Tt,t,e)=>{const{kind:i,metadata:r}=e;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(e.name,s),i==="accessor"){const{name:a}=e;return{set(p){const d=t.get.call(this);t.set.call(this,p),this.requestUpdate(a,d,s,!0,p)},init(p){return p!==void 0&&this.C(a,void 0,s,p),p}}}if(i==="setter"){const{name:a}=e;return function(p){const d=this[a];t.call(this,p),this.requestUpdate(a,d,s,!0,p)}}throw Error("Unsupported decorator location: "+i)};function R(s){return(t,e)=>typeof e=="object"?Dt(s,t,e):((i,r,o)=>{const a=r.hasOwnProperty(o);return r.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function h(s){return R({...s,state:!0,attribute:!1})}var Ft=Object.defineProperty,Ut=Object.getOwnPropertyDescriptor,k=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ut(t,e):t,o=s.length-1,a;o>=0;o--)(a=s[o])&&(r=(i?a(t,e,r):a(r))||r);return i&&r&&Ft(t,e,r),r};let v=class extends z{constructor(){super(...arguments),this.label="Drop file here",this.accept="*",this.hint="",this.ext="",this.dragging=!1,this.fileName=""}render(){return n`
      <div
        class="zone ${this.dragging?"dragging":""} ${this.fileName?"has-file":""}"
        @dragover=${this._onDragOver}
        @dragleave=${()=>this.dragging=!1}
        @drop=${this._onDrop}
      >
        <input type="file" accept=${this.accept} @change=${this._onChange} />
        <div class="content">
          <div class="icon-wrap">
            ${this.fileName?"✓":"↑"}
          </div>
          ${this.fileName?n`
                <div class="label">Загружено</div>
                <div class="filename">${this.fileName}</div>
              `:n`
                <div class="label">${this.label}</div>
                ${this.ext?n`<div class="ext">${this.ext}</div>`:""}
              `}
        </div>
      </div>
    `}_onDragOver(s){s.preventDefault(),this.dragging=!0}_onDrop(s){s.preventDefault(),this.dragging=!1;const t=s.dataTransfer?.files[0];t&&this._emit(t)}_onChange(s){const t=s.target.files?.[0];t&&this._emit(t)}_emit(s){this.fileName=s.name,this.dispatchEvent(new CustomEvent("file-selected",{detail:s,bubbles:!0,composed:!0}))}reset(){this.fileName=""}};v.styles=dt`
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
  `;k([R()],v.prototype,"label",2);k([R()],v.prototype,"accept",2);k([R()],v.prototype,"hint",2);k([R()],v.prototype,"ext",2);k([h()],v.prototype,"dragging",2);k([h()],v.prototype,"fileName",2);v=k([gt("file-drop")],v);var Nt=Object.defineProperty,Ht=Object.getOwnPropertyDescriptor,b=(s,t,e,i)=>{for(var r=i>1?void 0:i?Ht(t,e):t,o=s.length-1,a;o>=0;o--)(a=s[o])&&(r=(i?a(t,e,r):a(r))||r);return i&&r&&Nt(t,e,r),r};const B={crossref_unresolved:"Не найдено в Crossref",doi_not_found:"DOI не найден",doi_invalid_format:"Неверный формат DOI",doi_title_mismatch:"DOI не совпадает с названием",doi_duplicate:"Дублирующийся DOI",metadata_not_corrected:"Метаданные расходятся",mismatch_title:"Название расходится",mismatch_author:"Авторы расходятся",mismatch_year:"Год расходится",mismatch_journal:"Журнал расходится",mismatch_doi:"DOI расходится",crossref_error:"Ошибка API"};let c=class extends z{constructor(){super(...arguments),this.step=1,this.status="idle",this.log="",this._bibFile=null,this._bibJobId="",this._mailto="",this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._editingCell=null,this._editedFields={},this._generatingBib=!1}updated(s){if(s.has("_editingCell")&&this._editingCell&&requestAnimationFrame(()=>{const t=this.shadowRoot?.querySelector(".cell-input");t&&(t.focus(),t.select())}),s.has("_entries")&&this.status==="processing"){const t=this.shadowRoot?.querySelector(".entry-list");t&&(t.scrollTop=t.scrollHeight)}}_ss(s){return s<this.step?"done":s===this.step?"active":"pending"}_goStep(s){this.step=s,this.status="idle",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation()}_clearValidation(){this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._editedFields={},this._editingCell=null,this._bibJobId=""}_getField(s,t){return this._editedFields[s.key]?.[t]??s.fields[t]??""}_isEdited(s,t){const e=this._editedFields[s.key]?.[t];return e!==void 0&&e!==(s.fields[t]??"")}_hasAnyEdits(){return Object.values(this._editedFields).some(s=>Object.keys(s).length>0)}_countByStatus(s){return this._entries.filter(t=>t.status===s).length}_handleStreamEvent(s){switch(s.type){case"start":this._totalEntries=s.total;break;case"entry_start":{const t=this._entries.find(e=>e.key===s.key);t?(t.status="checking",this._entries=[...this._entries]):this._entries=[...this._entries,{key:s.key,entry_type:"",status:"checking",issues:[],fields:{title:s.title||""},idx:s.idx}],this._currentKey=s.key;break}case"entry_done":{const t=this._entries.findIndex(e=>e.key===s.key);if(t>=0){const e=[...this._entries];e[t]={...e[t],status:s.status,issues:s.issues},this._entries=e}this._checkedCount=s.idx;break}case"done":this._validationStats=s.stats??{},s.entries?.length&&(this._entries=s.entries.map((t,e)=>({key:t.key,entry_type:t.entry_type,status:t.status,issues:t.issues,fields:t.fields,idx:e+1})));break;case"end":this._bibJobId=s.job_id,this._validationDone=!0,this.status=s.code===0?"done":"error",this._currentKey="";break;case"stream_error":this.status="error",this.log=s.message;break}}async _runValidate(){if(!this._bibFile)return;this.status="processing",this.log="",this._entries=[],this._totalEntries=0,this._checkedCount=0,this._validationDone=!1,this._validationStats={},this._bibJobId="",this._editedFields={};const s=new FormData;s.append("bib",this._bibFile),s.append("mailto",this._mailto);try{const t=await fetch("/api/validate-stream",{method:"POST",body:s});if(!t.ok||!t.body){const o=await t.json().catch(()=>({detail:"Server error"}));this.status="error",this.log=o.detail;return}const e=t.body.getReader(),i=new TextDecoder("utf-8");let r="";for(;;){const{done:o,value:a}=await e.read();if(o)break;r+=i.decode(a,{stream:!0});const p=r.split(`

`);r=p.pop()??"";for(const d of p){const g=d.trim();if(g.startsWith("data: "))try{this._handleStreamEvent(JSON.parse(g.slice(6)))}catch{}}}}catch(t){this.status="error",this.log=String(t)}}async _runParseHtml(){if(!this._htmlFile||!this._bibFile)return;this.status="processing",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="";const s=new FormData;s.append("html",this._htmlFile),s.append("bib",this._bibFile);try{const t=await fetch("/api/parse-html",{method:"POST",body:s}),e=await t.json();t.ok?(this.status="done",this._uriMapJobId=e.job_id,this._parseCount=e.count??0,this._parseMatch=e.match??null,this._parseWarning=e.warning??"",this.log=e.log):(this.status="error",this.log=e.detail)}catch(t){this.status="error",this.log=String(t)}}async _runInject(){if(!this._docxFile||!this._bibFile)return;this.status="processing",this.log="";const s=new FormData;if(s.append("docx",this._docxFile),this._bibJobId){const t=await fetch(`/api/download/${this._bibJobId}/references_enriched.bib`);s.append("bib",new File([await t.blob()],"references.bib"))}else s.append("bib",this._bibFile);if(this._uriMapJobId){const t=await fetch(`/api/download/${this._uriMapJobId}/uri-map.tsv`);s.append("uri_map",new File([await t.blob()],"uri-map.tsv"))}else this._uriMapDirect&&s.append("uri_map",this._uriMapDirect);s.append("library_type","users");try{const t=await fetch("/api/inject",{method:"POST",body:s}),e=await t.json();t.ok?(this.status="done",this._injectJobId=e.job_id,this._injectGroups=e.groups??0,this._injectReplaced=e.replaced??0,this.log=e.log):(this.status="error",this.log=e.detail)}catch(t){this.status="error",this.log=String(t)}}async _generateBib(){this._generatingBib=!0;const s=this._entries.map(t=>({key:t.key,entry_type:t.entry_type,fields:{...t.fields,...this._editedFields[t.key]??{}}}));try{const e=await(await fetch("/api/generate-bib",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entries:s})})).blob(),i=URL.createObjectURL(e),r=document.createElement("a");r.href=i,r.download="references_edited.bib",r.click(),URL.revokeObjectURL(i)}catch(t){this.log=String(t)}finally{this._generatingBib=!1}}_updateField(s,t,e){const i=this._editedFields[s]??{};this._editedFields={...this._editedFields,[s]:{...i,[t]:e}}}_saveCell(s,t,e){this._updateField(s,t,e),this._editingCell=null}_reset(){this.step=1,this.status="idle",this.log="",this._bibFile=null,this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation(),this.shadowRoot?.querySelectorAll("file-drop").forEach(s=>s.reset?.())}_renderLog(){return this.log?n`
      <div class="log-wrap">
        <div class="log-label">Лог выполнения</div>
        <div class="log-box">${this.log}</div>
      </div>`:l}_statusIcon(s){switch(s){case"checking":return n`<span class="spinner-sm"></span>`;case"ok":return n`<span class="status-icon">✓</span>`;case"warn":return n`<span class="status-icon">⚠</span>`;case"error":return n`<span class="status-icon">✕</span>`;default:return n`<span class="status-icon">·</span>`}}_statusLabel(s){return s.status==="checking"?"Проверяю...":s.status==="ok"?"OK":s.status==="warn"?s.issues.length?B[s.issues[0]]??"Предупреждение":"Предупреждение":s.status==="error"?s.issues.length?B[s.issues[0]]??"Ошибка":"Ошибка":""}_statusBadge(s){return s==="ok"?n`<span class="badge badge-ok">✓ OK</span>`:s==="warn"?n`<span class="badge badge-warn">⚠ Предупреждение</span>`:s==="error"?n`<span class="badge badge-error">✕ Ошибка</span>`:l}_issueTag(s,t){const e=B[s]??s;return n`<span class="issue-tag ${t==="error"?"error":"warn"}">${e}</span>`}_renderCell(s,t,e="—"){const i=this._getField(s,t),r=this._editingCell?.key===s.key&&this._editingCell?.field===t,o=this._isEdited(s,t);return r?n`
        <div class="cell-wrap">
          <input class="cell-input" type="text" .value=${i}
            @blur=${a=>this._saveCell(s.key,t,a.target.value)}
            @keydown=${a=>{a.key==="Enter"&&this._saveCell(s.key,t,a.target.value),a.key==="Escape"&&(this._editingCell=null)}}
          />
        </div>`:n`
      <div class="cell-wrap">
        <div class="cell-text ${o?"edited":""} ${i?"":"empty"}"
          title="${i||e}"
          @click=${()=>{this._editingCell={key:s.key,field:t}}}>
          ${i||e}
        </div>
      </div>`}_renderValidationProgress(){const s=this._totalEntries>0?Math.round(this._checkedCount/this._totalEntries*100):0;return n`
      <div class="progress-wrap">
        <div class="progress-header">
          <div class="progress-icon">
            <span class="spinner" style="color:#4f8ef7"></span>
          </div>
          <div class="progress-title">Проверка источников через Crossref...</div>
          <div class="progress-fraction">${this._checkedCount}&thinsp;/&thinsp;${this._totalEntries||"?"}</div>
        </div>

        <div class="progress-bar-wrap" style="padding:8px 24px 12px">
          <div class="progress-track">
            <div class="progress-fill" style="width:${s}%"></div>
          </div>
        </div>

        <div class="entry-list">
          ${this._entries.map(t=>n`
            <div class="entry-row ${t.status}">
              <div class="entry-idx">${t.idx}</div>
              <div class="entry-key">${t.key}</div>
              <div class="entry-title">${this._getField(t,"title")||t.fields.title||""}</div>
              <div class="entry-status ${t.status}">
                ${this._statusIcon(t.status)}
                ${this._statusLabel(t)}
              </div>
            </div>
          `)}
        </div>
      </div>

      ${this._renderLog()}
    `}_renderResultsTable(){const s=this._countByStatus("ok"),t=this._countByStatus("warn"),e=this._countByStatus("error"),i=this._entries.length,r=this._hasAnyEdits();return n`
      <!-- Summary stats -->
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-val">${i}</div>
          <div class="stat-label">Всего записей</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val ok">${s}</div>
          <div class="stat-label">OK</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val warn">${t}</div>
          <div class="stat-label">Предупреждения</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val error">${e}</div>
          <div class="stat-label">Ошибки</div>
        </div>
      </div>

      <!-- Action row -->
      <div class="results-actions">
        <div class="results-title">Результаты проверки</div>

        ${this._bibJobId?n`
          <a class="btn btn-ghost" style="font-size:12px"
             href="/api/download/${this._bibJobId}/references_enriched.bib"
             download="references_enriched.bib">
            ↓ Скачать обогащённый .bib
          </a>`:l}

        <button class="btn btn-blue" style="font-size:12px"
          ?disabled=${this._generatingBib}
          @click=${this._generateBib}>
          ${this._generatingBib?n`<span class="spinner"></span> Генерирую...`:n`↓ Сохранить${r?" (с правками)":""} .bib`}
        </button>

        <button class="btn btn-next" style="font-size:12px"
          @click=${()=>this._goStep(2)}>
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
              ${this._entries.map((o,a)=>n`
                <tr class="row-${o.status}">
                  <td class="td-num">${a+1}</td>

                  <td class="td-key">
                    <span class="key-text">${o.key}</span>
                    ${this._statusBadge(o.status)}
                    ${o.issues.length?n`
                      <div class="issue-tags">
                        ${o.issues.map(p=>this._issueTag(p,o.status))}
                      </div>`:l}
                  </td>

                  <td style="max-width:240px">${this._renderCell(o,"title","—")}</td>
                  <td style="max-width:180px">${this._renderCell(o,"author","—")}</td>
                  <td class="col-year">${this._renderCell(o,"year","—")}</td>
                  <td style="max-width:180px">${this._renderCell(o,"journal","—")}</td>
                  <td class="col-doi">${this._renderCell(o,"doi","—")}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>

        ${r?n`
          <div class="table-footer">
            <div class="changed-hint">Есть несохранённые правки — нажмите «Сохранить .bib»</div>
            <button class="btn btn-blue" style="font-size:12px"
              ?disabled=${this._generatingBib}
              @click=${this._generateBib}>
              ${this._generatingBib?n`<span class="spinner"></span> Генерирую...`:"↓ Сохранить с правками .bib"}
            </button>
          </div>`:l}
      </div>

      ${this._renderLog()}
    `}_step1(){return this.status==="processing"&&this._entries.length>0?this._renderValidationProgress():this._validationDone?this._renderResultsTable():this._renderStep1Form()}_renderStep1Form(){const s=!!this._bibFile,t=this.status==="processing";return n`
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
          @file-selected=${e=>{this._bibFile=e.detail,this._clearValidation()}}
        ></file-drop>

        ${s?n`
          <div class="bib-file-info">
            <div class="bfi-icon">📄</div>
            <div>
              <div class="bfi-name">${this._bibFile.name}</div>
              <div class="bfi-sub">Файл загружен · готов к использованию</div>
            </div>
          </div>`:l}

        <!-- Email input -->
        <div class="input-wrap" style="margin-top:16px">
          <label class="input-label">
            Email для Crossref API
            <span class="optional-tag">необязательно</span>
          </label>
          <input class="text-input" type="email" placeholder="you@university.edu"
            @input=${e=>this._mailto=e.target.value} />
          <div style="font-size:11px;color:#5c5f72;margin-top:5px">
            Ускоряет и стабилизирует запросы к Crossref (полезно при большом списке)
          </div>
        </div>

        ${this._renderLog()}

        <!-- Action cards -->
        <div class="action-row">
          <button class="action-card primary" ?disabled=${!s||t}
            @click=${this._runValidate}>
            <div class="ac-icon">🔍</div>
            <div class="ac-title ac-primary">
              ${t?n`<span class="spinner" style="display:inline-block;width:13px;height:13px;vertical-align:middle;margin-right:6px;color:#4f8ef7"></span>`:l}
              ${t?"Проверяю...":"Проверить DOI через Crossref"}
            </div>
            <div class="ac-sub">Найдёт недостающие DOI, исправит метаданные. Займёт ~1 мин на 50 источников.</div>
          </button>

          <button class="action-card" ?disabled=${!s||t}
            @click=${()=>this._goStep(2)}>
            <div class="ac-icon">⏭</div>
            <div class="ac-title">Пропустить проверку</div>
            <div class="ac-sub">Перейти к следующему шагу без проверки. DOI в документе останутся как есть.</div>
          </button>
        </div>
      </div>
    `}_step2(){const s=!!this._uriMapJobId||!!this._uriMapDirect,t=!!this._htmlFile,e=!!this._uriMapJobId,i=this.status==="processing",r=this.status==="error",o="ps-info",a="ps-info",p=e||t?"ps-done":"ps-active",d=e?"ps-done":t?"ps-active":"ps-muted",g=n`
      <svg viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6H20M15 1.5L20.5 6L15 10.5" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;return n`
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
          <div class="ps ${o}">
            <div class="ps-icon">📚</div>
            <div class="ps-title">Открой Zotero</div>
            <div class="ps-sub">Выдели все источники Ctrl+A</div>
          </div>

          <div class="pa">${g}</div>

          <div class="ps ${a}">
            <div class="ps-icon">📋</div>
            <div class="ps-title">Создай библиографию</div>
            <div class="ps-sub">Scannable Cite → Save as HTML</div>
          </div>

          <div class="pa ${t||e?"pa-done":"pa-active"}">${g}</div>

          <div class="ps ${p}">
            ${e||t?n`<div class="ps-badge">✓</div>`:l}
            <div class="ps-icon">${t||e?"📄":"⬆"}</div>
            <div class="ps-title">${t||e?"HTML загружен":"Загрузи HTML"}</div>
            <div class="ps-sub">${t?this._htmlFile.name.slice(0,22)+(this._htmlFile.name.length>22?"…":""):"файл из Zotero"}</div>
          </div>

          <div class="pa ${e?"pa-done":t?"pa-active":""}">${g}</div>

          <div class="ps ${d}">
            ${e?n`<div class="ps-badge">✓</div>`:l}
            <div class="ps-icon">
              ${i?n`<span class="spinner" style="color:#4f8ef7;width:20px;height:20px;border-width:2.5px"></span>`:e?"✅":"⚙"}
            </div>
            <div class="ps-title">${e?"URI карта готова":i?"Создаю карту…":"Создай URI карту"}</div>
            <div class="ps-sub">${e?`${this._parseCount} источников`:i?"Обрабатываю файл":"Нажми кнопку ниже"}</div>
          </div>
        </div>

        <!-- Upload options -->
        <div class="section-label">Загрузи файл</div>
        <div class="upload-options">
          <div class="upload-col">
            <div class="upload-col-label">HTML экспорт из Zotero</div>
            <file-drop label="Перетащи или кликни" ext=".html" accept=".html,.htm"
              @file-selected=${f=>{this._htmlFile=f.detail,this._uriMapDirect=null,this._uriMapJobId="",this._parseCount=0,this._parseMatch=null,this.status="idle",this.log=""}}>
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
              @file-selected=${f=>{this._uriMapDirect=f.detail,this._htmlFile=null,this._uriMapJobId="",this._parseCount=0,this.status="idle",this.log=""}}>
            </file-drop>
          </div>
        </div>

        <!-- Result panel -->
        ${e&&!r?n`
          <div class="parse-result">
            <div class="parse-result-ico">✅</div>
            <div class="parse-result-body">
              <div class="parse-result-title">URI карта успешно создана</div>
              <div class="parse-result-sub">
                ${this._parseMatch===!0?"Количество источников совпадает с .bib файлом":this._parseMatch===!1?"Количество не совпадает с .bib — проверь предупреждение ниже":"Файл готов к использованию"}
              </div>
            </div>
            <div class="parse-count">
              <div class="parse-count-num">${this._parseCount}</div>
              <div class="parse-count-label">источников</div>
            </div>
          </div>

          ${this._parseWarning?n`
            <div class="parse-warning">
              <span style="font-size:16px;flex-shrink:0">⚠</span>
              <span>${this._parseWarning}</span>
            </div>`:l}
        `:l}

        ${r?n`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">Ошибка при обработке файла</div>
              <div style="font-size:11px;opacity:0.8">${this.log}</div>
            </div>
          </div>`:l}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(1)}>← Назад</button>

          ${t&&!e?n`
            <button class="btn btn-blue"
              ?disabled=${i}
              @click=${this._runParseHtml}>
              ${i?n`<span class="spinner"></span> Создаю карту…`:"⚙ Создать uri-map.tsv"}
            </button>`:l}

          ${e?n`
            <a class="btn btn-ghost" style="font-size:12px"
               href="/api/download/${this._uriMapJobId}/uri-map.tsv"
               download="uri-map.tsv">↓ Скачать uri-map.tsv</a>
            <button class="btn btn-ghost" style="font-size:12px"
              @click=${()=>{this._uriMapJobId="",this._htmlFile=null,this._parseCount=0,this._parseMatch=null,this.status="idle",this.log="",this.shadowRoot?.querySelectorAll("file-drop").forEach(f=>f.reset?.())}}>↺ Пересоздать</button>`:l}

          <div class="spacer"></div>
          <button class="btn btn-next" ?disabled=${!s}
            @click=${()=>this._goStep(3)}>
            Далее →
          </button>
        </div>
      </div>
    `}_step3(){const s=!!this._uriMapJobId||!!this._uriMapDirect,t=!!this._docxFile,e=!!this._injectJobId,i=this.status==="processing",r=this.status==="error",o=this._parseCount,a=n`
      <svg class="tv-arrow-svg" viewBox="0 0 20 10" fill="none">
        <path d="M1 5H18M13.5 1L18 5L13.5 9" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;return n`
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
          <div class="prereq-item ${s?"ok":"missing"}">
            <div class="prereq-ico">${s?"✓":"!"}</div>
            <div>
              <div class="prereq-title">URI карта (Шаг 2)</div>
              <div class="prereq-sub">
                ${s?o?`${o} источников привязано`:"Карта загружена":"Вернись на Шаг 2 →"}
              </div>
            </div>
          </div>
          <div class="prereq-item ${this._bibFile?"ok":"missing"}">
            <div class="prereq-ico">${this._bibFile?"✓":"!"}</div>
            <div>
              <div class="prereq-title">Библиография (Шаг 1)</div>
              <div class="prereq-sub">
                ${this._bibFile?this._bibFile.name.slice(0,28)+(this._bibFile.name.length>28?"…":""):"Вернись на Шаг 1 →"}
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
          <div class="tv-arrow-col">${a}</div>
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
          @file-selected=${p=>{this._docxFile=p.detail,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this.status="idle",this.log=""}}>
        </file-drop>

        <!-- Result panel -->
        ${e&&!r?n`
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
          </div>`:l}

        ${r?n`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">Ошибка при обработке</div>
              <div style="font-size:11px;opacity:0.8;white-space:pre-wrap">${this.log}</div>
            </div>
          </div>`:l}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(2)}>← Назад</button>

          <button class="btn btn-red"
            ?disabled=${!t||!s||i}
            @click=${this._runInject}>
            ${i?n`<span class="spinner"></span> Обрабатываю...`:e?"↺ Обработать снова":"▶ Запустить обработку"}
          </button>

          ${e?n`
            <a class="btn btn-green"
               href="/api/download/${this._injectJobId}/output_zotero.docx"
               download="output_zotero.docx">↓ Скачать результат</a>
            <div class="spacer"></div>
            <button class="btn btn-next" @click=${()=>this._goStep(4)}>
              Далее → Инструкция Word
            </button>`:l}
        </div>
      </div>
    `}_step4(){return n`
      <!-- Success hero -->
      <div class="success-hero">
        <div class="sh-ring">🎉</div>
        <div class="sh-title">Всё готово!</div>
        <div class="sh-sub">Документ с нативными полями Zotero создан и готов к скачиванию</div>
        ${this._injectReplaced||this._injectGroups?n`
          <div class="sh-stats">
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectReplaced}</div>
              <div class="sh-stat-l">Ссылок заменено</div>
            </div>
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectGroups}</div>
              <div class="sh-stat-l">Групп цитирований</div>
            </div>
          </div>`:l}
      </div>

      <!-- Big download button -->
      ${this._injectJobId?n`
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
        </div>`:l}

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
        <button class="btn btn-ghost" @click=${()=>this._goStep(3)}>← Назад</button>
        <div class="spacer"></div>
        <button class="btn btn-ghost" @click=${this._reset}>↺ Обработать другой документ</button>
      </div>
    `}render(){const s=[{n:1,name:"Библиография"},{n:2,name:"URI карта"},{n:3,name:"Обработка"},{n:4,name:"Готово"}],t=this._validationDone&&this.step===1;return n`
      <header>
        <div class="logo-dot">Z</div>
        <span class="logo-name">Zotero Inject</span>
        <span class="logo-tag">Citation processor</span>
        <div class="header-spacer"></div>
        <div class="header-badge">Шаг ${this.step} из 4</div>
      </header>

      <div class="stepper">
        ${s.map((e,i)=>n`
          ${i>0?n`<div class="step-connector ${this._ss(s[i-1].n)==="done"?"done":""}"></div>`:l}
          <div class="step-pill ${this._ss(e.n)}">
            <div class="step-dot ${this._ss(e.n)}">
              ${this._ss(e.n)==="done"?"✓":e.n}
            </div>
            <span class="step-name ${this._ss(e.n)}">${e.name}</span>
          </div>
        `)}
      </div>

      <main style=${t?"max-width:1140px":""}>
        ${this.step===1?this._step1():l}
        ${this.step===2?this._step2():l}
        ${this.step===3?this._step3():l}
        ${this.step===4?this._step4():l}
      </main>
    `}};c.styles=dt`
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
  `;b([h()],c.prototype,"step",2);b([h()],c.prototype,"status",2);b([h()],c.prototype,"log",2);b([h()],c.prototype,"_bibFile",2);b([h()],c.prototype,"_bibJobId",2);b([h()],c.prototype,"_htmlFile",2);b([h()],c.prototype,"_uriMapJobId",2);b([h()],c.prototype,"_uriMapDirect",2);b([h()],c.prototype,"_docxFile",2);b([h()],c.prototype,"_injectJobId",2);b([h()],c.prototype,"_injectGroups",2);b([h()],c.prototype,"_injectReplaced",2);b([h()],c.prototype,"_entries",2);b([h()],c.prototype,"_totalEntries",2);b([h()],c.prototype,"_checkedCount",2);b([h()],c.prototype,"_currentKey",2);b([h()],c.prototype,"_validationStats",2);b([h()],c.prototype,"_validationDone",2);b([h()],c.prototype,"_parseCount",2);b([h()],c.prototype,"_parseMatch",2);b([h()],c.prototype,"_parseWarning",2);b([h()],c.prototype,"_editingCell",2);b([h()],c.prototype,"_editedFields",2);b([h()],c.prototype,"_generatingBib",2);c=b([gt("app-root")],c);
