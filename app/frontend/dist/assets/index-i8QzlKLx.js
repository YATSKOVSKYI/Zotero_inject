(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function i(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=i(r);fetch(r.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ht=globalThis,Dt=ht.ShadowRoot&&(ht.ShadyCSS===void 0||ht.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nt=Symbol(),Wt=new WeakMap;let ne=class{constructor(t,i,s){if(this._$cssResult$=!0,s!==Nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=i}get styleSheet(){let t=this.o;const i=this.t;if(Dt&&t===void 0){const s=i!==void 0&&i.length===1;s&&(t=Wt.get(i)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Wt.set(i,t))}return t}toString(){return this.cssText}};const Ie=e=>new ne(typeof e=="string"?e:e+"",void 0,Nt),ae=(e,...t)=>{const i=e.length===1?e[0]:t.reduce((s,r,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+e[o+1],e[0]);return new ne(i,e,Nt)},Te=(e,t)=>{if(Dt)e.adoptedStyleSheets=t.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of t){const s=document.createElement("style"),r=ht.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)}},Vt=Dt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let i="";for(const s of t.cssRules)i+=s.cssText;return Ie(i)})(e):e;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Me,defineProperty:ze,getOwnPropertyDescriptor:Pe,getOwnPropertyNames:Be,getOwnPropertySymbols:De,getPrototypeOf:Ne}=Object,_t=globalThis,Zt=_t.trustedTypes,Re=Zt?Zt.emptyScript:"",Ue=_t.reactiveElementPolyfillSupport,X=(e,t)=>e,ut={toAttribute(e,t){switch(t){case Boolean:e=e?Re:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=e!==null;break;case Number:i=e===null?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch{i=null}}return i}},Rt=(e,t)=>!Me(e,t),Kt={attribute:!0,type:String,converter:ut,reflect:!1,useDefault:!1,hasChanged:Rt};Symbol.metadata??=Symbol("metadata"),_t.litPropertyMetadata??=new WeakMap;let H=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,i=Kt){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(t,i),!i.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(t,s,i);r!==void 0&&ze(this.prototype,t,r)}}static getPropertyDescriptor(t,i,s){const{get:r,set:o}=Pe(this.prototype,t)??{get(){return this[i]},set(n){this[i]=n}};return{get:r,set(n){const l=r?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Kt}static _$Ei(){if(this.hasOwnProperty(X("elementProperties")))return;const t=Ne(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(X("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(X("properties"))){const i=this.properties,s=[...Be(i),...De(i)];for(const r of s)this.createProperty(r,i[r])}const t=this[Symbol.metadata];if(t!==null){const i=litPropertyMetadata.get(t);if(i!==void 0)for(const[s,r]of i)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[i,s]of this.elementProperties){const r=this._$Eu(i,s);r!==void 0&&this._$Eh.set(r,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const i=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const r of s)i.unshift(Vt(r))}else t!==void 0&&i.push(Vt(t));return i}static _$Eu(t,i){const s=i.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,i=this.constructor.elementProperties;for(const s of i.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Te(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,i,s){this._$AK(t,s)}_$ET(t,i){const s=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,s);if(r!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:ut).toAttribute(i,s.type);this._$Em=t,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(t,i){const s=this.constructor,r=s._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ut;this._$Em=r;const l=n.fromAttribute(i,o.type);this[r]=l??this._$Ej?.get(r)??l,this._$Em=null}}requestUpdate(t,i,s,r=!1,o){if(t!==void 0){const n=this.constructor;if(r===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??Rt)(o,i)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,i,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,i,{useDefault:s,reflect:r,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??i??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(i=void 0),this._$AL.set(t,i)),r===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:n}=o,l=this[r];n!==!0||this._$AL.has(r)||l===void 0||this.C(r,void 0,o,l)}}let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(i)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(i)}willUpdate(t){}_$AE(t){this._$EO?.forEach(i=>i.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(i=>this._$ET(i,this[i])),this._$EM()}updated(t){}firstUpdated(t){}};H.elementStyles=[],H.shadowRootOptions={mode:"open"},H[X("elementProperties")]=new Map,H[X("finalized")]=new Map,Ue?.({ReactiveElement:H}),(_t.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ut=globalThis,Gt=e=>e,gt=Ut.trustedTypes,Yt=gt?gt.createPolicy("lit-html",{createHTML:e=>e}):void 0,le="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+N,Le=`<${de}>`,F=document,et=()=>F.createComment(""),it=e=>e===null||typeof e!="object"&&typeof e!="function",Lt=Array.isArray,Oe=e=>Lt(e)||typeof e?.[Symbol.iterator]=="function",kt=`[ 	
\f\r]`,Q=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Qt=/-->/g,Xt=/>/g,L=RegExp(`>|${kt}(?:([^\\s"'>=/]+)(${kt}*=${kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),te=/'/g,ee=/"/g,ce=/^(?:script|style|textarea|title)$/i,Fe=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),p=Fe(1),q=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),ie=new WeakMap,O=F.createTreeWalker(F,129);function pe(e,t){if(!Lt(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Yt!==void 0?Yt.createHTML(t):t}const je=(e,t)=>{const i=e.length-1,s=[];let r,o=t===2?"<svg>":t===3?"<math>":"",n=Q;for(let l=0;l<i;l++){const a=e[l];let d,c,g=-1,u=0;for(;u<a.length&&(n.lastIndex=u,c=n.exec(a),c!==null);)u=n.lastIndex,n===Q?c[1]==="!--"?n=Qt:c[1]!==void 0?n=Xt:c[2]!==void 0?(ce.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=L):c[3]!==void 0&&(n=L):n===L?c[0]===">"?(n=r??Q,g=-1):c[1]===void 0?g=-2:(g=n.lastIndex-c[2].length,d=c[1],n=c[3]===void 0?L:c[3]==='"'?ee:te):n===ee||n===te?n=L:n===Qt||n===Xt?n=Q:(n=L,r=void 0);const h=n===L&&e[l+1].startsWith("/>")?" ":"";o+=n===Q?a+Le:g>=0?(s.push(d),a.slice(0,g)+le+a.slice(g)+N+h):a+N+(g===-2?l:h)}return[pe(e,o+(e[i]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class st{constructor({strings:t,_$litType$:i},s){let r;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[d,c]=je(t,i);if(this.el=st.createElement(d,s),O.currentNode=this.el.content,i===2||i===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(r=O.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes())for(const g of r.getAttributeNames())if(g.endsWith(le)){const u=c[n++],h=r.getAttribute(g).split(N),m=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:m[2],strings:h,ctor:m[1]==="."?Je:m[1]==="?"?qe:m[1]==="@"?We:mt}),r.removeAttribute(g)}else g.startsWith(N)&&(a.push({type:6,index:o}),r.removeAttribute(g));if(ce.test(r.tagName)){const g=r.textContent.split(N),u=g.length-1;if(u>0){r.textContent=gt?gt.emptyScript:"";for(let h=0;h<u;h++)r.append(g[h],et()),O.nextNode(),a.push({type:2,index:++o});r.append(g[u],et())}}}else if(r.nodeType===8)if(r.data===de)a.push({type:2,index:o});else{let g=-1;for(;(g=r.data.indexOf(N,g+1))!==-1;)a.push({type:7,index:o}),g+=N.length-1}o++}}static createElement(t,i){const s=F.createElement("template");return s.innerHTML=t,s}}function W(e,t,i=e,s){if(t===q)return t;let r=s!==void 0?i._$Co?.[s]:i._$Cl;const o=it(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(e),r._$AT(e,i,s)),s!==void 0?(i._$Co??=[])[s]=r:i._$Cl=r),r!==void 0&&(t=W(e,r._$AS(e,t.values),r,s)),t}class He{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,r=(t?.creationScope??F).importNode(i,!0);O.currentNode=r;let o=O.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new ot(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new Ve(o,this,t)),this._$AV.push(d),a=s[++l]}n!==a?.index&&(o=O.nextNode(),n++)}return O.currentNode=F,r}p(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class ot{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,r){this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&t?.nodeType===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=W(this,t,i),it(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==q&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Oe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==_&&it(this._$AH)?this._$AA.nextSibling.data=t:this.T(F.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=st.createElement(pe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(i);else{const o=new He(r,this),n=o.u(this.options);o.p(i),this.T(n),this._$AH=o}}_$AC(t){let i=ie.get(t.strings);return i===void 0&&ie.set(t.strings,i=new st(t)),i}k(t){Lt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const o of t)r===i.length?i.push(s=new ot(this.O(et()),this.O(et()),this,this.options)):s=i[r],s._$AI(o),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,i){for(this._$AP?.(!1,!0,i);t!==this._$AB;){const s=Gt(t).nextSibling;Gt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}}class mt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,r,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=i,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}_$AI(t,i=this,s,r){const o=this.strings;let n=!1;if(o===void 0)t=W(this,t,i,0),n=!it(t)||t!==this._$AH&&t!==q,n&&(this._$AH=t);else{const l=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=W(this,l[s+a],i,a),d===q&&(d=this._$AH[a]),n||=!it(d)||d!==this._$AH[a],d===_?t=_:t!==_&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!r&&this.j(t)}j(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Je extends mt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===_?void 0:t}}class qe extends mt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==_)}}class We extends mt{constructor(t,i,s,r,o){super(t,i,s,r,o),this.type=5}_$AI(t,i=this){if((t=W(this,t,i,0)??_)===q)return;const s=this._$AH,r=t===_&&s!==_||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==_&&(s===_||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Ve{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){W(this,t)}}const Ze=Ut.litHtmlPolyfillSupport;Ze?.(st,ot),(Ut.litHtmlVersions??=[]).push("3.3.2");const Ke=(e,t,i)=>{const s=i?.renderBefore??t;let r=s._$litPart$;if(r===void 0){const o=i?.renderBefore??null;s._$litPart$=r=new ot(t.insertBefore(et(),o),o,void 0,i??{})}return r._$AI(e),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ot=globalThis;class J extends H{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ke(i,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}J._$litElement$=!0,J.finalized=!0,Ot.litElementHydrateSupport?.({LitElement:J});const Ge=Ot.litElementPolyfillSupport;Ge?.({LitElement:J});(Ot.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=e=>(t,i)=>{i!==void 0?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ye={attribute:!0,type:String,converter:ut,reflect:!1,hasChanged:Rt},Qe=(e=Ye,t,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),s==="accessor"){const{name:n}=i;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(n,a,e,!0,l)},init(l){return l!==void 0&&this.C(n,void 0,e,l),l}}}if(s==="setter"){const{name:n}=i;return function(l){const a=this[n];t.call(this,l),this.requestUpdate(n,a,e,!0,l)}}throw Error("Unsupported decorator location: "+s)};function nt(e){return(t,i)=>typeof i=="object"?Qe(e,t,i):((s,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),n?Object.getOwnPropertyDescriptor(r,o):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function $(e){return nt({...e,state:!0,attribute:!1})}var at={},Xe=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},ue={},I={};let Ft;const ti=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];I.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17};I.getSymbolTotalCodewords=function(t){return ti[t]};I.getBCHDigit=function(e){let t=0;for(;e!==0;)t++,e>>>=1;return t};I.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');Ft=t};I.isKanjiModeEnabled=function(){return typeof Ft<"u"};I.toSJIS=function(t){return Ft(t)};var xt={};(function(e){e.L={bit:1},e.M={bit:0},e.Q={bit:3},e.H={bit:2};function t(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return e.L;case"m":case"medium":return e.M;case"q":case"quartile":return e.Q;case"h":case"high":return e.H;default:throw new Error("Unknown EC Level: "+i)}}e.isValid=function(s){return s&&typeof s.bit<"u"&&s.bit>=0&&s.bit<4},e.from=function(s,r){if(e.isValid(s))return s;try{return t(s)}catch{return r}}})(xt);function ge(){this.buffer=[],this.length=0}ge.prototype={get:function(e){const t=Math.floor(e/8);return(this.buffer[t]>>>7-e%8&1)===1},put:function(e,t){for(let i=0;i<t;i++)this.putBit((e>>>t-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const t=Math.floor(this.length/8);this.buffer.length<=t&&this.buffer.push(0),e&&(this.buffer[t]|=128>>>this.length%8),this.length++}};var ei=ge;function lt(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}lt.prototype.set=function(e,t,i,s){const r=e*this.size+t;this.data[r]=i,s&&(this.reservedBit[r]=!0)};lt.prototype.get=function(e,t){return this.data[e*this.size+t]};lt.prototype.xor=function(e,t,i){this.data[e*this.size+t]^=i};lt.prototype.isReserved=function(e,t){return this.reservedBit[e*this.size+t]};var ii=lt,fe={};(function(e){const t=I.getSymbolSize;e.getRowColCoords=function(s){if(s===1)return[];const r=Math.floor(s/7)+2,o=t(s),n=o===145?26:Math.ceil((o-13)/(2*r-2))*2,l=[o-7];for(let a=1;a<r-1;a++)l[a]=l[a-1]-n;return l.push(6),l.reverse()},e.getPositions=function(s){const r=[],o=e.getRowColCoords(s),n=o.length;for(let l=0;l<n;l++)for(let a=0;a<n;a++)l===0&&a===0||l===0&&a===n-1||l===n-1&&a===0||r.push([o[l],o[a]]);return r}})(fe);var be={};const si=I.getSymbolSize,se=7;be.getPositions=function(t){const i=si(t);return[[0,0],[i-se,0],[0,i-se]]};var _e={};(function(e){e.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};e.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},e.from=function(r){return e.isValid(r)?parseInt(r,10):void 0},e.getPenaltyN1=function(r){const o=r.size;let n=0,l=0,a=0,d=null,c=null;for(let g=0;g<o;g++){l=a=0,d=c=null;for(let u=0;u<o;u++){let h=r.get(g,u);h===d?l++:(l>=5&&(n+=t.N1+(l-5)),d=h,l=1),h=r.get(u,g),h===c?a++:(a>=5&&(n+=t.N1+(a-5)),c=h,a=1)}l>=5&&(n+=t.N1+(l-5)),a>=5&&(n+=t.N1+(a-5))}return n},e.getPenaltyN2=function(r){const o=r.size;let n=0;for(let l=0;l<o-1;l++)for(let a=0;a<o-1;a++){const d=r.get(l,a)+r.get(l,a+1)+r.get(l+1,a)+r.get(l+1,a+1);(d===4||d===0)&&n++}return n*t.N2},e.getPenaltyN3=function(r){const o=r.size;let n=0,l=0,a=0;for(let d=0;d<o;d++){l=a=0;for(let c=0;c<o;c++)l=l<<1&2047|r.get(d,c),c>=10&&(l===1488||l===93)&&n++,a=a<<1&2047|r.get(c,d),c>=10&&(a===1488||a===93)&&n++}return n*t.N3},e.getPenaltyN4=function(r){let o=0;const n=r.data.length;for(let a=0;a<n;a++)o+=r.data[a];return Math.abs(Math.ceil(o*100/n/5)-10)*t.N4};function i(s,r,o){switch(s){case e.Patterns.PATTERN000:return(r+o)%2===0;case e.Patterns.PATTERN001:return r%2===0;case e.Patterns.PATTERN010:return o%3===0;case e.Patterns.PATTERN011:return(r+o)%3===0;case e.Patterns.PATTERN100:return(Math.floor(r/2)+Math.floor(o/3))%2===0;case e.Patterns.PATTERN101:return r*o%2+r*o%3===0;case e.Patterns.PATTERN110:return(r*o%2+r*o%3)%2===0;case e.Patterns.PATTERN111:return(r*o%3+(r+o)%2)%2===0;default:throw new Error("bad maskPattern:"+s)}}e.applyMask=function(r,o){const n=o.size;for(let l=0;l<n;l++)for(let a=0;a<n;a++)o.isReserved(a,l)||o.xor(a,l,i(r,a,l))},e.getBestMask=function(r,o){const n=Object.keys(e.Patterns).length;let l=0,a=1/0;for(let d=0;d<n;d++){o(d),e.applyMask(d,r);const c=e.getPenaltyN1(r)+e.getPenaltyN2(r)+e.getPenaltyN3(r)+e.getPenaltyN4(r);e.applyMask(d,r),c<a&&(a=c,l=d)}return l}})(_e);var vt={};const R=xt,dt=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],ct=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];vt.getBlocksCount=function(t,i){switch(i){case R.L:return dt[(t-1)*4+0];case R.M:return dt[(t-1)*4+1];case R.Q:return dt[(t-1)*4+2];case R.H:return dt[(t-1)*4+3];default:return}};vt.getTotalCodewordsCount=function(t,i){switch(i){case R.L:return ct[(t-1)*4+0];case R.M:return ct[(t-1)*4+1];case R.Q:return ct[(t-1)*4+2];case R.H:return ct[(t-1)*4+3];default:return}};var me={},yt={};const tt=new Uint8Array(512),ft=new Uint8Array(256);(function(){let t=1;for(let i=0;i<255;i++)tt[i]=t,ft[t]=i,t<<=1,t&256&&(t^=285);for(let i=255;i<512;i++)tt[i]=tt[i-255]})();yt.log=function(t){if(t<1)throw new Error("log("+t+")");return ft[t]};yt.exp=function(t){return tt[t]};yt.mul=function(t,i){return t===0||i===0?0:tt[ft[t]+ft[i]]};(function(e){const t=yt;e.mul=function(s,r){const o=new Uint8Array(s.length+r.length-1);for(let n=0;n<s.length;n++)for(let l=0;l<r.length;l++)o[n+l]^=t.mul(s[n],r[l]);return o},e.mod=function(s,r){let o=new Uint8Array(s);for(;o.length-r.length>=0;){const n=o[0];for(let a=0;a<r.length;a++)o[a]^=t.mul(r[a],n);let l=0;for(;l<o.length&&o[l]===0;)l++;o=o.slice(l)}return o},e.generateECPolynomial=function(s){let r=new Uint8Array([1]);for(let o=0;o<s;o++)r=e.mul(r,new Uint8Array([1,t.exp(o)]));return r}})(me);const xe=me;function jt(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}jt.prototype.initialize=function(t){this.degree=t,this.genPoly=xe.generateECPolynomial(this.degree)};jt.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(t.length+this.degree);i.set(t);const s=xe.mod(i,this.genPoly),r=this.degree-s.length;if(r>0){const o=new Uint8Array(this.degree);return o.set(s,r),o}return s};var ri=jt,ve={},U={},Ht={};Ht.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var z={};const ye="[0-9]+",oi="[A-Z $%*+\\-./:]+";let rt="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";rt=rt.replace(/u/g,"\\u");const ni="(?:(?![A-Z0-9 $%*+\\-./:]|"+rt+`)(?:.|[\r
]))+`;z.KANJI=new RegExp(rt,"g");z.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");z.BYTE=new RegExp(ni,"g");z.NUMERIC=new RegExp(ye,"g");z.ALPHANUMERIC=new RegExp(oi,"g");const ai=new RegExp("^"+rt+"$"),li=new RegExp("^"+ye+"$"),di=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");z.testKanji=function(t){return ai.test(t)};z.testNumeric=function(t){return li.test(t)};z.testAlphanumeric=function(t){return di.test(t)};(function(e){const t=Ht,i=z;e.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},e.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},e.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},e.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},e.MIXED={bit:-1},e.getCharCountIndicator=function(o,n){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(n))throw new Error("Invalid version: "+n);return n>=1&&n<10?o.ccBits[0]:n<27?o.ccBits[1]:o.ccBits[2]},e.getBestModeForData=function(o){return i.testNumeric(o)?e.NUMERIC:i.testAlphanumeric(o)?e.ALPHANUMERIC:i.testKanji(o)?e.KANJI:e.BYTE},e.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},e.isValid=function(o){return o&&o.bit&&o.ccBits};function s(r){if(typeof r!="string")throw new Error("Param is not a string");switch(r.toLowerCase()){case"numeric":return e.NUMERIC;case"alphanumeric":return e.ALPHANUMERIC;case"kanji":return e.KANJI;case"byte":return e.BYTE;default:throw new Error("Unknown mode: "+r)}}e.from=function(o,n){if(e.isValid(o))return o;try{return s(o)}catch{return n}}})(U);(function(e){const t=I,i=vt,s=xt,r=U,o=Ht,n=7973,l=t.getBCHDigit(n);function a(u,h,m){for(let v=1;v<=40;v++)if(h<=e.getCapacity(v,m,u))return v}function d(u,h){return r.getCharCountIndicator(u,h)+4}function c(u,h){let m=0;return u.forEach(function(v){const S=d(v.mode,h);m+=S+v.getBitsLength()}),m}function g(u,h){for(let m=1;m<=40;m++)if(c(u,m)<=e.getCapacity(m,h,r.MIXED))return m}e.from=function(h,m){return o.isValid(h)?parseInt(h,10):m},e.getCapacity=function(h,m,v){if(!o.isValid(h))throw new Error("Invalid QR Code version");typeof v>"u"&&(v=r.BYTE);const S=t.getSymbolTotalCodewords(h),x=i.getTotalCodewordsCount(h,m),y=(S-x)*8;if(v===r.MIXED)return y;const b=y-d(v,h);switch(v){case r.NUMERIC:return Math.floor(b/10*3);case r.ALPHANUMERIC:return Math.floor(b/11*2);case r.KANJI:return Math.floor(b/13);case r.BYTE:default:return Math.floor(b/8)}},e.getBestVersionForData=function(h,m){let v;const S=s.from(m,s.M);if(Array.isArray(h)){if(h.length>1)return g(h,S);if(h.length===0)return 1;v=h[0]}else v=h;return a(v.mode,v.getLength(),S)},e.getEncodedBits=function(h){if(!o.isValid(h)||h<7)throw new Error("Invalid QR Code version");let m=h<<12;for(;t.getBCHDigit(m)-l>=0;)m^=n<<t.getBCHDigit(m)-l;return h<<12|m}})(ve);var we={};const Mt=I,$e=1335,ci=21522,re=Mt.getBCHDigit($e);we.getEncodedBits=function(t,i){const s=t.bit<<3|i;let r=s<<10;for(;Mt.getBCHDigit(r)-re>=0;)r^=$e<<Mt.getBCHDigit(r)-re;return(s<<10|r)^ci};var ke={};const pi=U;function V(e){this.mode=pi.NUMERIC,this.data=e.toString()}V.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)};V.prototype.getLength=function(){return this.data.length};V.prototype.getBitsLength=function(){return V.getBitsLength(this.data.length)};V.prototype.write=function(t){let i,s,r;for(i=0;i+3<=this.data.length;i+=3)s=this.data.substr(i,3),r=parseInt(s,10),t.put(r,10);const o=this.data.length-i;o>0&&(s=this.data.substr(i),r=parseInt(s,10),t.put(r,o*3+1))};var hi=V;const ui=U,Et=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function Z(e){this.mode=ui.ALPHANUMERIC,this.data=e}Z.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)};Z.prototype.getLength=function(){return this.data.length};Z.prototype.getBitsLength=function(){return Z.getBitsLength(this.data.length)};Z.prototype.write=function(t){let i;for(i=0;i+2<=this.data.length;i+=2){let s=Et.indexOf(this.data[i])*45;s+=Et.indexOf(this.data[i+1]),t.put(s,11)}this.data.length%2&&t.put(Et.indexOf(this.data[i]),6)};var gi=Z;const fi=U;function K(e){this.mode=fi.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}K.getBitsLength=function(t){return t*8};K.prototype.getLength=function(){return this.data.length};K.prototype.getBitsLength=function(){return K.getBitsLength(this.data.length)};K.prototype.write=function(e){for(let t=0,i=this.data.length;t<i;t++)e.put(this.data[t],8)};var bi=K;const _i=U,mi=I;function G(e){this.mode=_i.KANJI,this.data=e}G.getBitsLength=function(t){return t*13};G.prototype.getLength=function(){return this.data.length};G.prototype.getBitsLength=function(){return G.getBitsLength(this.data.length)};G.prototype.write=function(e){let t;for(t=0;t<this.data.length;t++){let i=mi.toSJIS(this.data[t]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),e.put(i,13)}};var xi=G,Ee={exports:{}};(function(e){var t={single_source_shortest_paths:function(i,s,r){var o={},n={};n[s]=0;var l=t.PriorityQueue.make();l.push(s,0);for(var a,d,c,g,u,h,m,v,S;!l.empty();){a=l.pop(),d=a.value,g=a.cost,u=i[d]||{};for(c in u)u.hasOwnProperty(c)&&(h=u[c],m=g+h,v=n[c],S=typeof n[c]>"u",(S||v>m)&&(n[c]=m,l.push(c,m),o[c]=d))}if(typeof r<"u"&&typeof n[r]>"u"){var x=["Could not find a path from ",s," to ",r,"."].join("");throw new Error(x)}return o},extract_shortest_path_from_predecessor_list:function(i,s){for(var r=[],o=s;o;)r.push(o),i[o],o=i[o];return r.reverse(),r},find_path:function(i,s,r){var o=t.single_source_shortest_paths(i,s,r);return t.extract_shortest_path_from_predecessor_list(o,r)},PriorityQueue:{make:function(i){var s=t.PriorityQueue,r={},o;i=i||{};for(o in s)s.hasOwnProperty(o)&&(r[o]=s[o]);return r.queue=[],r.sorter=i.sorter||s.default_sorter,r},default_sorter:function(i,s){return i.cost-s.cost},push:function(i,s){var r={value:i,cost:s};this.queue.push(r),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};e.exports=t})(Ee);var vi=Ee.exports;(function(e){const t=U,i=hi,s=gi,r=bi,o=xi,n=z,l=I,a=vi;function d(x){return unescape(encodeURIComponent(x)).length}function c(x,y,b){const f=[];let E;for(;(E=x.exec(b))!==null;)f.push({data:E[0],index:E.index,mode:y,length:E[0].length});return f}function g(x){const y=c(n.NUMERIC,t.NUMERIC,x),b=c(n.ALPHANUMERIC,t.ALPHANUMERIC,x);let f,E;return l.isKanjiModeEnabled()?(f=c(n.BYTE,t.BYTE,x),E=c(n.KANJI,t.KANJI,x)):(f=c(n.BYTE_KANJI,t.BYTE,x),E=[]),y.concat(b,f,E).sort(function(A,T){return A.index-T.index}).map(function(A){return{data:A.data,mode:A.mode,length:A.length}})}function u(x,y){switch(y){case t.NUMERIC:return i.getBitsLength(x);case t.ALPHANUMERIC:return s.getBitsLength(x);case t.KANJI:return o.getBitsLength(x);case t.BYTE:return r.getBitsLength(x)}}function h(x){return x.reduce(function(y,b){const f=y.length-1>=0?y[y.length-1]:null;return f&&f.mode===b.mode?(y[y.length-1].data+=b.data,y):(y.push(b),y)},[])}function m(x){const y=[];for(let b=0;b<x.length;b++){const f=x[b];switch(f.mode){case t.NUMERIC:y.push([f,{data:f.data,mode:t.ALPHANUMERIC,length:f.length},{data:f.data,mode:t.BYTE,length:f.length}]);break;case t.ALPHANUMERIC:y.push([f,{data:f.data,mode:t.BYTE,length:f.length}]);break;case t.KANJI:y.push([f,{data:f.data,mode:t.BYTE,length:d(f.data)}]);break;case t.BYTE:y.push([{data:f.data,mode:t.BYTE,length:d(f.data)}])}}return y}function v(x,y){const b={},f={start:{}};let E=["start"];for(let C=0;C<x.length;C++){const A=x[C],T=[];for(let D=0;D<A.length;D++){const M=A[D],Y=""+C+D;T.push(Y),b[Y]={node:M,lastCount:0},f[Y]={};for(let $t=0;$t<E.length;$t++){const P=E[$t];b[P]&&b[P].node.mode===M.mode?(f[P][Y]=u(b[P].lastCount+M.length,M.mode)-u(b[P].lastCount,M.mode),b[P].lastCount+=M.length):(b[P]&&(b[P].lastCount=M.length),f[P][Y]=u(M.length,M.mode)+4+t.getCharCountIndicator(M.mode,y))}}E=T}for(let C=0;C<E.length;C++)f[E[C]].end=0;return{map:f,table:b}}function S(x,y){let b;const f=t.getBestModeForData(x);if(b=t.from(y,f),b!==t.BYTE&&b.bit<f.bit)throw new Error('"'+x+'" cannot be encoded with mode '+t.toString(b)+`.
 Suggested mode is: `+t.toString(f));switch(b===t.KANJI&&!l.isKanjiModeEnabled()&&(b=t.BYTE),b){case t.NUMERIC:return new i(x);case t.ALPHANUMERIC:return new s(x);case t.KANJI:return new o(x);case t.BYTE:return new r(x)}}e.fromArray=function(y){return y.reduce(function(b,f){return typeof f=="string"?b.push(S(f,null)):f.data&&b.push(S(f.data,f.mode)),b},[])},e.fromString=function(y,b){const f=g(y,l.isKanjiModeEnabled()),E=m(f),C=v(E,b),A=a.find_path(C.map,"start","end"),T=[];for(let D=1;D<A.length-1;D++)T.push(C.table[A[D]].node);return e.fromArray(h(T))},e.rawSplit=function(y){return e.fromArray(g(y,l.isKanjiModeEnabled()))}})(ke);const wt=I,Ct=xt,yi=ei,wi=ii,$i=fe,ki=be,zt=_e,Pt=vt,Ei=ri,bt=ve,Ci=we,Ai=U,At=ke;function Si(e,t){const i=e.size,s=ki.getPositions(t);for(let r=0;r<s.length;r++){const o=s[r][0],n=s[r][1];for(let l=-1;l<=7;l++)if(!(o+l<=-1||i<=o+l))for(let a=-1;a<=7;a++)n+a<=-1||i<=n+a||(l>=0&&l<=6&&(a===0||a===6)||a>=0&&a<=6&&(l===0||l===6)||l>=2&&l<=4&&a>=2&&a<=4?e.set(o+l,n+a,!0,!0):e.set(o+l,n+a,!1,!0))}}function Ii(e){const t=e.size;for(let i=8;i<t-8;i++){const s=i%2===0;e.set(i,6,s,!0),e.set(6,i,s,!0)}}function Ti(e,t){const i=$i.getPositions(t);for(let s=0;s<i.length;s++){const r=i[s][0],o=i[s][1];for(let n=-2;n<=2;n++)for(let l=-2;l<=2;l++)n===-2||n===2||l===-2||l===2||n===0&&l===0?e.set(r+n,o+l,!0,!0):e.set(r+n,o+l,!1,!0)}}function Mi(e,t){const i=e.size,s=bt.getEncodedBits(t);let r,o,n;for(let l=0;l<18;l++)r=Math.floor(l/3),o=l%3+i-8-3,n=(s>>l&1)===1,e.set(r,o,n,!0),e.set(o,r,n,!0)}function St(e,t,i){const s=e.size,r=Ci.getEncodedBits(t,i);let o,n;for(o=0;o<15;o++)n=(r>>o&1)===1,o<6?e.set(o,8,n,!0):o<8?e.set(o+1,8,n,!0):e.set(s-15+o,8,n,!0),o<8?e.set(8,s-o-1,n,!0):o<9?e.set(8,15-o-1+1,n,!0):e.set(8,15-o-1,n,!0);e.set(s-8,8,1,!0)}function zi(e,t){const i=e.size;let s=-1,r=i-1,o=7,n=0;for(let l=i-1;l>0;l-=2)for(l===6&&l--;;){for(let a=0;a<2;a++)if(!e.isReserved(r,l-a)){let d=!1;n<t.length&&(d=(t[n]>>>o&1)===1),e.set(r,l-a,d),o--,o===-1&&(n++,o=7)}if(r+=s,r<0||i<=r){r-=s,s=-s;break}}}function Pi(e,t,i){const s=new yi;i.forEach(function(a){s.put(a.mode.bit,4),s.put(a.getLength(),Ai.getCharCountIndicator(a.mode,e)),a.write(s)});const r=wt.getSymbolTotalCodewords(e),o=Pt.getTotalCodewordsCount(e,t),n=(r-o)*8;for(s.getLengthInBits()+4<=n&&s.put(0,4);s.getLengthInBits()%8!==0;)s.putBit(0);const l=(n-s.getLengthInBits())/8;for(let a=0;a<l;a++)s.put(a%2?17:236,8);return Bi(s,e,t)}function Bi(e,t,i){const s=wt.getSymbolTotalCodewords(t),r=Pt.getTotalCodewordsCount(t,i),o=s-r,n=Pt.getBlocksCount(t,i),l=s%n,a=n-l,d=Math.floor(s/n),c=Math.floor(o/n),g=c+1,u=d-c,h=new Ei(u);let m=0;const v=new Array(n),S=new Array(n);let x=0;const y=new Uint8Array(e.buffer);for(let A=0;A<n;A++){const T=A<a?c:g;v[A]=y.slice(m,m+T),S[A]=h.encode(v[A]),m+=T,x=Math.max(x,T)}const b=new Uint8Array(s);let f=0,E,C;for(E=0;E<x;E++)for(C=0;C<n;C++)E<v[C].length&&(b[f++]=v[C][E]);for(E=0;E<u;E++)for(C=0;C<n;C++)b[f++]=S[C][E];return b}function Di(e,t,i,s){let r;if(Array.isArray(e))r=At.fromArray(e);else if(typeof e=="string"){let d=t;if(!d){const c=At.rawSplit(e);d=bt.getBestVersionForData(c,i)}r=At.fromString(e,d||40)}else throw new Error("Invalid data");const o=bt.getBestVersionForData(r,i);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!t)t=o;else if(t<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);const n=Pi(t,i,r),l=wt.getSymbolSize(t),a=new wi(l);return Si(a,t),Ii(a),Ti(a,t),St(a,i,0),t>=7&&Mi(a,t),zi(a,n),isNaN(s)&&(s=zt.getBestMask(a,St.bind(null,a,i))),zt.applyMask(s,a),St(a,i,s),{modules:a,version:t,errorCorrectionLevel:i,maskPattern:s,segments:r}}ue.create=function(t,i){if(typeof t>"u"||t==="")throw new Error("No input text");let s=Ct.M,r,o;return typeof i<"u"&&(s=Ct.from(i.errorCorrectionLevel,Ct.M),r=bt.from(i.version),o=zt.from(i.maskPattern),i.toSJISFunc&&wt.setToSJISFunction(i.toSJISFunc)),Di(t,r,s,o)};var Ce={},Jt={};(function(e){function t(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let s=i.slice().replace("#","").split("");if(s.length<3||s.length===5||s.length>8)throw new Error("Invalid hex color: "+i);(s.length===3||s.length===4)&&(s=Array.prototype.concat.apply([],s.map(function(o){return[o,o]}))),s.length===6&&s.push("F","F");const r=parseInt(s.join(""),16);return{r:r>>24&255,g:r>>16&255,b:r>>8&255,a:r&255,hex:"#"+s.slice(0,6).join("")}}e.getOptions=function(s){s||(s={}),s.color||(s.color={});const r=typeof s.margin>"u"||s.margin===null||s.margin<0?4:s.margin,o=s.width&&s.width>=21?s.width:void 0,n=s.scale||4;return{width:o,scale:o?4:n,margin:r,color:{dark:t(s.color.dark||"#000000ff"),light:t(s.color.light||"#ffffffff")},type:s.type,rendererOpts:s.rendererOpts||{}}},e.getScale=function(s,r){return r.width&&r.width>=s+r.margin*2?r.width/(s+r.margin*2):r.scale},e.getImageWidth=function(s,r){const o=e.getScale(s,r);return Math.floor((s+r.margin*2)*o)},e.qrToImageData=function(s,r,o){const n=r.modules.size,l=r.modules.data,a=e.getScale(n,o),d=Math.floor((n+o.margin*2)*a),c=o.margin*a,g=[o.color.light,o.color.dark];for(let u=0;u<d;u++)for(let h=0;h<d;h++){let m=(u*d+h)*4,v=o.color.light;if(u>=c&&h>=c&&u<d-c&&h<d-c){const S=Math.floor((u-c)/a),x=Math.floor((h-c)/a);v=g[l[S*n+x]?1:0]}s[m++]=v.r,s[m++]=v.g,s[m++]=v.b,s[m]=v.a}}})(Jt);(function(e){const t=Jt;function i(r,o,n){r.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=n,o.width=n,o.style.height=n+"px",o.style.width=n+"px"}function s(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}e.render=function(o,n,l){let a=l,d=n;typeof a>"u"&&(!n||!n.getContext)&&(a=n,n=void 0),n||(d=s()),a=t.getOptions(a);const c=t.getImageWidth(o.modules.size,a),g=d.getContext("2d"),u=g.createImageData(c,c);return t.qrToImageData(u.data,o,a),i(g,d,c),g.putImageData(u,0,0),d},e.renderToDataURL=function(o,n,l){let a=l;typeof a>"u"&&(!n||!n.getContext)&&(a=n,n=void 0),a||(a={});const d=e.render(o,n,a),c=a.type||"image/png",g=a.rendererOpts||{};return d.toDataURL(c,g.quality)}})(Ce);var Ae={};const Ni=Jt;function oe(e,t){const i=e.a/255,s=t+'="'+e.hex+'"';return i<1?s+" "+t+'-opacity="'+i.toFixed(2).slice(1)+'"':s}function It(e,t,i){let s=e+t;return typeof i<"u"&&(s+=" "+i),s}function Ri(e,t,i){let s="",r=0,o=!1,n=0;for(let l=0;l<e.length;l++){const a=Math.floor(l%t),d=Math.floor(l/t);!a&&!o&&(o=!0),e[l]?(n++,l>0&&a>0&&e[l-1]||(s+=o?It("M",a+i,.5+d+i):It("m",r,0),r=0,o=!1),a+1<t&&e[l+1]||(s+=It("h",n),n=0)):r++}return s}Ae.render=function(t,i,s){const r=Ni.getOptions(i),o=t.modules.size,n=t.modules.data,l=o+r.margin*2,a=r.color.light.a?"<path "+oe(r.color.light,"fill")+' d="M0 0h'+l+"v"+l+'H0z"/>':"",d="<path "+oe(r.color.dark,"stroke")+' d="'+Ri(n,o,r.margin)+'"/>',c='viewBox="0 0 '+l+" "+l+'"',u='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+c+' shape-rendering="crispEdges">'+a+d+`</svg>
`;return typeof s=="function"&&s(null,u),u};const Ui=Xe,Bt=ue,Se=Ce,Li=Ae;function qt(e,t,i,s,r){const o=[].slice.call(arguments,1),n=o.length,l=typeof o[n-1]=="function";if(!l&&!Ui())throw new Error("Callback required as last argument");if(l){if(n<2)throw new Error("Too few arguments provided");n===2?(r=i,i=t,t=s=void 0):n===3&&(t.getContext&&typeof r>"u"?(r=s,s=void 0):(r=s,s=i,i=t,t=void 0))}else{if(n<1)throw new Error("Too few arguments provided");return n===1?(i=t,t=s=void 0):n===2&&!t.getContext&&(s=i,i=t,t=void 0),new Promise(function(a,d){try{const c=Bt.create(i,s);a(e(c,t,s))}catch(c){d(c)}})}try{const a=Bt.create(i,s);r(null,e(a,t,s))}catch(a){r(a)}}at.create=Bt.create;at.toCanvas=qt.bind(null,Se.render);at.toDataURL=qt.bind(null,Se.renderToDataURL);at.toString=qt.bind(null,function(e,t,i){return Li.render(e,i)});var Oi=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,j=(e,t,i,s)=>{for(var r=s>1?void 0:s?Fi(t,i):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(r=(s?n(t,i,r):n(r))||r);return s&&r&&Oi(t,i,r),r};let B=class extends J{constructor(){super(...arguments),this.label="Drop file here",this.accept="*",this.hint="",this.ext="",this.dragging=!1,this.fileName=""}render(){return p`
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
          ${this.fileName?p`
                <div class="label">Загружено</div>
                <div class="filename">${this.fileName}</div>
              `:p`
                <div class="label">${this.label}</div>
                ${this.ext?p`<div class="ext">${this.ext}</div>`:""}
              `}
        </div>
      </div>
    `}_onDragOver(e){e.preventDefault(),this.dragging=!0}_onDrop(e){e.preventDefault(),this.dragging=!1;const t=e.dataTransfer?.files[0];t&&this._emit(t)}_onChange(e){const t=e.target.files?.[0];t&&this._emit(t)}_emit(e){this.fileName=e.name,this.dispatchEvent(new CustomEvent("file-selected",{detail:e,bubbles:!0,composed:!0}))}reset(){this.fileName=""}};B.styles=ae`
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
  `;j([nt()],B.prototype,"label",2);j([nt()],B.prototype,"accept",2);j([nt()],B.prototype,"hint",2);j([nt()],B.prototype,"ext",2);j([$()],B.prototype,"dragging",2);j([$()],B.prototype,"fileName",2);B=j([he("file-drop")],B);var ji=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,k=(e,t,i,s)=>{for(var r=s>1?void 0:s?Hi(t,i):t,o=e.length-1,n;o>=0;o--)(n=e[o])&&(r=(s?n(t,i,r):n(r))||r);return s&&r&&ji(t,i,r),r};const Tt="TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3",pt={ru:{step_badge:e=>`Шаг ${e} из 4`,step1:"Библиография",step2:"URI карта",step3:"Обработка",step4:"Готово",log_label:"Лог выполнения",s1_title:"Загрузи файл библиографии",s1_desc:"BibTeX-файл (.bib) со списком источников. Убедись, что перед каждой записью стоит номерной комментарий — смотри пример ниже.",s1_format_hd:"Как должен выглядеть .bib файл",s1_file_sec:"Выбери файл",s1_drop_lbl:"Перетащи .bib файл или кликни для выбора",s1_file_ready:"Файл загружен · готов к использованию",s1_email_lbl:"Email для Crossref API",s1_email_opt:"необязательно",s1_email_hint:"Ускоряет и стабилизирует запросы к Crossref (полезно при большом списке)",s1_btn_check:"Проверить DOI через Crossref",s1_btn_check_sub:"Найдёт недостающие DOI, исправит метаданные. Займёт ~1 мин на 50 источников.",s1_btn_skip:"Пропустить проверку",s1_btn_skip_sub:"Перейти к следующему шагу без проверки. DOI в документе останутся как есть.",s1_checking:"Проверяю...",v_checking:"Проверка источников через Crossref...",v_results:"Результаты проверки",v_dl_enriched:"↓ Скачать обогащённый .bib",v_dl_original:"↓ Скачать оригинальный .bib",v_edit_hint:"Отредактированные поля сохранятся в скачанном файле.",v_generate_bib:"⟳ Сгенерировать .bib",v_generating:"Генерирую...",v_next:"Далее →",v_recheck:"↺ Перепроверить",th_num:"#",th_key:"Ключ",th_title:"Название",th_author:"Авторы",th_year:"Год",th_journal:"Журнал / Источник",th_doi:"DOI",th_status:"Статус",st_ok:"OK",st_warn:"Предупреждение",st_err:"Ошибка",st_checking:"Проверяю...",badge_ok:"✓ OK",badge_warn:"⚠ Предупреждение",badge_err:"✕ Ошибка",s2_title:"Создай URI карту",s2_desc:"Нужна для привязки ссылок из .bib к элементам Zotero. Сохрани коллекцию из Zotero как HTML и загрузи сюда.",s2_upload_sec:"Загрузи файл",s2_html_col:"HTML экспорт из Zotero",s2_tsv_col:"Готовый uri-map.tsv",s2_or:"или",s2_html_drop:"Перетащи или кликни",s2_tsv_drop:"Уже есть готовый файл?",s2_result_title:"URI карта успешно создана",s2_match_ok:"Количество источников совпадает с .bib файлом",s2_match_warn:"Количество не совпадает с .bib — проверь предупреждение ниже",s2_file_ready:"Файл готов к использованию",s2_count_label:"источников",s2_back:"← Назад",s2_dl_tsv:"↓ Скачать uri-map.tsv",s2_recreate:"↺ Пересоздать",s2_next:"Далее →",s2_create_btn:"⚙ Создать uri-map.tsv",s2_creating:"Создаю карту…",s2_err_title:"Ошибка при обработке файла",s2_p1_t:"Открой Zotero",s2_p2_t:"Экспортируй коллекцию",s2_p3_t:"Загрузи HTML",s2_p4_t:"URI карта готова",s2_p1_b:"с нужной коллекцией",s2_p2_b:"Файл → Экспорт → HTML",s2_p3_b:"сюда в поле ниже",s2_p4_b:"для следующего шага",s3_title:"Вшить живые поля Zotero в документ",s3_desc:"Загрузи Word-файл — скрипт заменит [1], [5][6][7] на живые поля Zotero. После этого в Word: одна кнопка «Add Bibliography» — список литературы готов и сам обновляется.",s3_prereq_sec:"Что нужно для обработки",s3_map_title:"URI карта (Шаг 2)",s3_map_ok:e=>e?`${e} источников привязано`:"Карта загружена",s3_map_miss:"Вернись на Шаг 2 →",s3_bib_title:"Библиография (Шаг 1)",s3_bib_miss:"Вернись на Шаг 1 →",s3_transform_sec:"Что произойдёт с документом",s3_before_lbl:"Сейчас в .docx",s3_after_lbl:"После обработки — поля Zotero",s3_docx_sec:"Загрузи статью",s3_docx_drop:"Перетащи .docx файл или кликни",s3_result_title:"Документ успешно обработан!",s3_result_sub:"ADDIN-поля Zotero вшиты · скачай → открой Word → нажми «Add/Edit Bibliography»",s3_stat_replaced:"Ссылок заменено",s3_stat_groups:"Групп цитирований",s3_err_title:"Ошибка при обработке",s3_back:"← Назад",s3_run:"▶ Запустить обработку",s3_rerun:"↺ Обработать снова",s3_running:"Обрабатываю...",s3_dl:"↓ Скачать результат",s3_next:"Далее → Инструкция Word",s4_title:"Готово — осталось одно нажатие.",s4_sub:"Скачай файл, открой в Word с плагином Zotero, нажми «Add/Edit Bibliography» — список литературы появится сам. Меняй стиль, удаляй ссылки — библиография обновится автоматически.",s4_dl_main:"Скачать output_zotero.docx",s4_dl_sub:"Нажми, затем открой в Microsoft Word",s4_word_hd:"Что делать дальше — в Word с плагином Zotero",s4_ws1_t:"Открой скачанный файл в Microsoft Word",s4_ws1_s:"Двойной клик по output_zotero.docx — ссылки в тексте уже выглядят как живые поля Zotero",s4_ws2_t:"Нажми «Add/Edit Bibliography» — список литературы готов",s4_ws2_s:"Zotero панель → Add/Edit Bibliography → список источников появляется автоматически",s4_ws3_t:"Меняй стиль — всё обновится само",s4_ws3_s:"Zotero → Document Preferences → выбери стиль (ГОСТ, APA, IEEE...) — ссылки переформатируются мгновенно. Удаляешь цитату — она пропадает из библиографии.",s4_ws3_badge:"Готово",s4_tip_title:"💡 Как это работает:",s4_tip:"В документ вшиты те же ADDIN-поля, что плагин Zotero создаёт при ручной вставке ссылок. Word их «знает» и передаёт управление Zotero: библиография управляется динамически.",s4_back:"← Назад",s4_restart:"↺ Обработать другой документ",s4_refs_replaced:"Ссылок заменено",s4_cit_groups:"Групп цитирований",issue:{crossref_unresolved:"Не найдено в Crossref",doi_not_found:"DOI не найден",doi_invalid_format:"Неверный формат DOI",doi_title_mismatch:"DOI не совпадает с названием",doi_duplicate:"Дублирующийся DOI",metadata_not_corrected:"Метаданные расходятся",mismatch_title:"Название расходится",mismatch_author:"Авторы расходятся",mismatch_year:"Год расходится",mismatch_journal:"Журнал расходится",mismatch_doi:"DOI расходится",crossref_error:"Ошибка API"},stat:{processed:"Проверено",doi_valid:"DOI валиден",doi_added:"DOI добавлено",doi_corrected:"DOI исправлено",unresolved:"Не найдено",problem_entries:"С проблемами",entries_changed:"Изменено записей",fields_changed:"Изменено полей"}},en:{step_badge:e=>`Step ${e} of 4`,step1:"Bibliography",step2:"URI Map",step3:"Processing",step4:"Done",log_label:"Execution log",s1_title:"Upload bibliography file",s1_desc:"A BibTeX file (.bib) with your references. Make sure each entry has a numbered comment before it — see the example below.",s1_format_hd:"How your .bib file should look",s1_file_sec:"Select file",s1_drop_lbl:"Drop .bib file here or click to select",s1_file_ready:"File loaded · ready to use",s1_email_lbl:"Email for Crossref API",s1_email_opt:"optional",s1_email_hint:"Speeds up and stabilises Crossref requests (useful for large reference lists)",s1_btn_check:"Validate DOIs via Crossref",s1_btn_check_sub:"Finds missing DOIs, corrects metadata. Takes ~1 min per 50 sources.",s1_btn_skip:"Skip validation",s1_btn_skip_sub:"Go to the next step without checking. DOIs will remain as is.",s1_checking:"Checking...",v_checking:"Validating sources via Crossref...",v_results:"Validation results",v_dl_enriched:"↓ Download enriched .bib",v_dl_original:"↓ Download original .bib",v_edit_hint:"Edited fields will be saved in the downloaded file.",v_generate_bib:"⟳ Generate .bib",v_generating:"Generating...",v_next:"Next →",v_recheck:"↺ Re-validate",th_num:"#",th_key:"Key",th_title:"Title",th_author:"Authors",th_year:"Year",th_journal:"Journal / Source",th_doi:"DOI",th_status:"Status",st_ok:"OK",st_warn:"Warning",st_err:"Error",st_checking:"Checking...",badge_ok:"✓ OK",badge_warn:"⚠ Warning",badge_err:"✕ Error",s2_title:"Create URI map",s2_desc:"Needed to link references from .bib to Zotero items. Export your Zotero collection as HTML and upload it here.",s2_upload_sec:"Upload file",s2_html_col:"HTML export from Zotero",s2_tsv_col:"Ready-made uri-map.tsv",s2_or:"or",s2_html_drop:"Drop or click",s2_tsv_drop:"Already have a file?",s2_result_title:"URI map created successfully",s2_match_ok:"Source count matches the .bib file",s2_match_warn:"Count does not match .bib — check the warning below",s2_file_ready:"File ready to use",s2_count_label:"sources",s2_back:"← Back",s2_dl_tsv:"↓ Download uri-map.tsv",s2_recreate:"↺ Recreate",s2_next:"Next →",s2_create_btn:"⚙ Create uri-map.tsv",s2_creating:"Creating map…",s2_err_title:"Error processing file",s2_p1_t:"Open Zotero",s2_p2_t:"Export collection",s2_p3_t:"Upload HTML",s2_p4_t:"URI map ready",s2_p1_b:"with the needed collection",s2_p2_b:"File → Export → HTML",s2_p3_b:"into the field below",s2_p4_b:"for the next step",s3_title:"Inject live Zotero fields into document",s3_desc:'Upload a Word file — the script replaces [1], [5][6][7] with live Zotero ADDIN fields. Then in Word: click "Add Bibliography" — reference list is ready and updates automatically.',s3_prereq_sec:"Required for processing",s3_map_title:"URI Map (Step 2)",s3_map_ok:e=>e?`${e} sources linked`:"Map loaded",s3_map_miss:"Go back to Step 2 →",s3_bib_title:"Bibliography (Step 1)",s3_bib_miss:"Go back to Step 1 →",s3_transform_sec:"What happens to the document",s3_before_lbl:"Current .docx",s3_after_lbl:"After processing — Zotero fields",s3_docx_sec:"Upload your paper",s3_docx_drop:"Drop .docx file here or click",s3_result_title:"Document processed successfully!",s3_result_sub:'Zotero ADDIN fields injected · download → open Word → click "Add/Edit Bibliography"',s3_stat_replaced:"Citations replaced",s3_stat_groups:"Citation groups",s3_err_title:"Processing error",s3_back:"← Back",s3_run:"▶ Start processing",s3_rerun:"↺ Process again",s3_running:"Processing...",s3_dl:"↓ Download result",s3_next:"Next → Word instructions",s4_title:"Done — one click left.",s4_sub:'Download the file, open it in Word with the Zotero plugin, click "Add/Edit Bibliography" — reference list appears automatically. Switch styles, delete citations — bibliography updates on its own.',s4_dl_main:"Download output_zotero.docx",s4_dl_sub:"Click, then open in Microsoft Word",s4_word_hd:"What to do next — in Word with the Zotero plugin",s4_ws1_t:"Open the downloaded file in Microsoft Word",s4_ws1_s:"Double-click output_zotero.docx — citations already look like live Zotero fields",s4_ws2_t:'Click "Add/Edit Bibliography" — reference list is ready',s4_ws2_s:"Zotero panel → Add/Edit Bibliography → reference list appears automatically",s4_ws3_t:"Switch styles — everything updates automatically",s4_ws3_s:"Zotero → Document Preferences → choose style (APA, IEEE, ГОСТ...) — citations reformat instantly.",s4_ws3_badge:"Done",s4_tip_title:"💡 How it works:",s4_tip:"The document contains the same ADDIN fields that the Zotero plugin creates when inserting citations manually. Word recognises them and hands control to Zotero: bibliography is managed dynamically.",s4_back:"← Back",s4_restart:"↺ Process another document",s4_refs_replaced:"Citations replaced",s4_cit_groups:"Citation groups",issue:{crossref_unresolved:"Not found in Crossref",doi_not_found:"DOI not found",doi_invalid_format:"Invalid DOI format",doi_title_mismatch:"DOI/title mismatch",doi_duplicate:"Duplicate DOI",metadata_not_corrected:"Metadata mismatch",mismatch_title:"Title mismatch",mismatch_author:"Author mismatch",mismatch_year:"Year mismatch",mismatch_journal:"Journal mismatch",mismatch_doi:"DOI mismatch",crossref_error:"API error"},stat:{processed:"Processed",doi_valid:"DOI valid",doi_added:"DOI added",doi_corrected:"DOI corrected",unresolved:"Unresolved",problem_entries:"Problem entries",entries_changed:"Entries changed",fields_changed:"Fields changed"}}};let w=class extends J{constructor(){super(...arguments),this.step=1,this.status="idle",this.log="",this._bibFile=null,this._bibJobId="",this._mailto="",this._mailtoError="",this._qrDataUrl="",this._walletCopied=!1,this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._editingCell=null,this._editedFields={},this._generatingBib=!1,this._lang=localStorage.getItem("lang")||"ru"}_t(e){return pt[this._lang][e]??pt.ru[e]??e}_setLang(e){this._lang=e,localStorage.setItem("lang",e)}connectedCallback(){super.connectedCallback(),at.toDataURL(Tt,{width:200,margin:2,color:{dark:"#a3e635",light:"#060e06"},errorCorrectionLevel:"H"}).then(e=>{this._qrDataUrl=e})}updated(e){if(e.has("_editingCell")&&this._editingCell&&requestAnimationFrame(()=>{const t=this.shadowRoot?.querySelector(".cell-input");t&&(t.focus(),t.select())}),e.has("_entries")&&this.status==="processing"){const t=this.shadowRoot?.querySelector(".entry-list");t&&(t.scrollTop=t.scrollHeight)}}_ss(e){return e<this.step?"done":e===this.step?"active":"pending"}_goStep(e){this.step=e,this.status="idle",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation()}_clearValidation(){this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._editedFields={},this._editingCell=null,this._bibJobId=""}_getField(e,t){return this._editedFields[e.key]?.[t]??e.fields[t]??""}_clean(e){return e.replace(/[{}]/g,"")}async _copyWallet(){await navigator.clipboard.writeText(Tt),this._walletCopied=!0,setTimeout(()=>{this._walletCopied=!1},2e3)}_onMailtoInput(e){const t=e.target,i=t.value.replace(/[^a-zA-Z0-9._%+\-@]/g,"").slice(0,254);i!==t.value&&(t.value=i),this._mailto=i,i?/^[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,253}\.[a-zA-Z]{2,}$/.test(i)?this._mailtoError="":this._mailtoError=this._lang==="ru"?"Неверный формат email":"Invalid email format":this._mailtoError=""}_isEdited(e,t){const i=this._editedFields[e.key]?.[t];return i!==void 0&&i!==(e.fields[t]??"")}_hasAnyEdits(){return Object.values(this._editedFields).some(e=>Object.keys(e).length>0)}_countByStatus(e){return this._entries.filter(t=>t.status===e).length}_handleStreamEvent(e){switch(e.type){case"start":this._totalEntries=e.total;break;case"entry_start":{const t=this._entries.find(i=>i.key===e.key);t?(t.status="checking",this._entries=[...this._entries]):this._entries=[...this._entries,{key:e.key,entry_type:"",status:"checking",issues:[],fields:{title:e.title||""},idx:e.idx}],this._currentKey=e.key;break}case"entry_done":{const t=this._entries.findIndex(i=>i.key===e.key);if(t>=0){const i=[...this._entries];i[t]={...i[t],status:e.status,issues:e.issues,...e.fields?{fields:e.fields}:{}},this._entries=i}e.idx>=0&&(this._checkedCount=e.idx);break}case"done":this._validationStats=e.stats??{},Array.isArray(e.entries)&&(this._entries=e.entries.map((t,i)=>({key:t.key,entry_type:t.entry_type,status:t.status,issues:t.issues,fields:t.fields,idx:i+1})));break;case"end":this._bibJobId=e.job_id,this._validationDone=!0,this.status=e.code===0?"done":"error",this._currentKey="",e.log&&(this.log=e.log);break;case"stream_error":this.status="error",this.log=e.message;break}}async _runValidate(){if(!this._bibFile)return;this.status="processing",this.log="",this._entries=[],this._totalEntries=0,this._checkedCount=0,this._validationDone=!1,this._validationStats={},this._bibJobId="",this._editedFields={};const e=new FormData;e.append("bib",this._bibFile),e.append("mailto",this._mailtoError?"":this._mailto);try{const t=await fetch("/api/validate-stream",{method:"POST",body:e});if(!t.ok||!t.body){const o=await t.json().catch(()=>({detail:"Server error"}));this.status="error",this.log=o.detail;return}const i=t.body.getReader(),s=new TextDecoder("utf-8");let r="";for(;;){const{done:o,value:n}=await i.read();if(o)break;r+=s.decode(n,{stream:!0});const l=r.split(`

`);r=l.pop()??"";for(const a of l){const d=a.trim();if(d.startsWith("data: "))try{this._handleStreamEvent(JSON.parse(d.slice(6)))}catch{}}}}catch(t){this.status="error",this.log=String(t)}}async _runParseHtml(){if(!this._htmlFile||!this._bibFile)return;this.status="processing",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="";const e=new FormData;e.append("html",this._htmlFile),e.append("bib",this._bibFile);try{const t=await fetch("/api/parse-html",{method:"POST",body:e}),i=await t.json();t.ok?(this.status="done",this._uriMapJobId=i.job_id,this._parseCount=i.count??0,this._parseMatch=i.match??null,this._parseWarning=i.warning??"",this.log=i.log):(this.status="error",this.log=i.detail)}catch(t){this.status="error",this.log=String(t)}}async _runInject(){if(!this._docxFile||!this._bibFile)return;this.status="processing",this.log="";const e=new FormData;if(e.append("docx",this._docxFile),this._bibJobId){const t=await fetch(`/api/download/${this._bibJobId}/references_enriched.bib`);e.append("bib",new File([await t.blob()],"references.bib"))}else e.append("bib",this._bibFile);if(this._uriMapJobId){const t=await fetch(`/api/download/${this._uriMapJobId}/uri-map.tsv`);e.append("uri_map",new File([await t.blob()],"uri-map.tsv"))}else this._uriMapDirect&&e.append("uri_map",this._uriMapDirect);e.append("library_type","users");try{const t=await fetch("/api/inject",{method:"POST",body:e}),i=await t.json();t.ok?(this.status="done",this._injectJobId=i.job_id,this._injectGroups=i.groups??0,this._injectReplaced=i.replaced??0,this.log=i.log):(this.status="error",this.log=i.detail)}catch(t){this.status="error",this.log=String(t)}}async _generateBib(){this._generatingBib=!0;const e=this._entries.map(t=>({key:t.key,entry_type:t.entry_type,fields:{...t.fields,...this._editedFields[t.key]??{}}}));try{const i=await(await fetch("/api/generate-bib",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entries:e})})).blob(),s=URL.createObjectURL(i),r=document.createElement("a");r.href=s,r.download="references_edited.bib",r.click(),URL.revokeObjectURL(s)}catch(t){this.log=String(t)}finally{this._generatingBib=!1}}_updateField(e,t,i){const s=this._editedFields[e]??{};this._editedFields={...this._editedFields,[e]:{...s,[t]:i}}}_saveCell(e,t,i){this._updateField(e,t,i),this._editingCell=null}_reset(){this.step=1,this.status="idle",this.log="",this._bibFile=null,this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation(),this.shadowRoot?.querySelectorAll("file-drop").forEach(e=>e.reset?.())}_renderLog(){return this.log?p`
      <div class="log-wrap">
        <div class="log-label">${this._t("log_label")}</div>
        <div class="log-box">${this.log}</div>
      </div>`:_}_statusIcon(e){switch(e){case"checking":return p`<span class="spinner-sm"></span>`;case"ok":return p`<span class="status-icon">✓</span>`;case"warn":return p`<span class="status-icon">⚠</span>`;case"error":return p`<span class="status-icon">✕</span>`;default:return p`<span class="status-icon">·</span>`}}_statusLabel(e){const t=pt[this._lang].issue;return e.status==="checking"?this._t("st_checking"):e.status==="ok"?this._t("st_ok"):e.status==="warn"?e.issues.length?t[e.issues[0]]??this._t("st_warn"):this._t("st_warn"):e.status==="error"?e.issues.length?t[e.issues[0]]??this._t("st_err"):this._t("st_err"):""}_statusBadge(e){return e==="ok"?p`<span class="badge badge-ok">${this._t("badge_ok")}</span>`:e==="warn"?p`<span class="badge badge-warn">${this._t("badge_warn")}</span>`:e==="error"?p`<span class="badge badge-error">${this._t("badge_err")}</span>`:_}_issueTag(e,t){const s=pt[this._lang].issue[e]??e;return p`<span class="issue-tag ${t==="error"?"error":"warn"}">${s}</span>`}_renderCell(e,t,i="—"){const s=this._getField(e,t),r=this._editingCell?.key===e.key&&this._editingCell?.field===t,o=this._isEdited(e,t);if(r)return p`
        <div class="cell-wrap">
          <input class="cell-input" type="text" .value=${s}
            @blur=${l=>this._saveCell(e.key,t,l.target.value)}
            @keydown=${l=>{l.key==="Enter"&&this._saveCell(e.key,t,l.target.value),l.key==="Escape"&&(this._editingCell=null)}}
          />
        </div>`;const n=s?this._clean(s):i;return p`
      <div class="cell-wrap">
        <div class="cell-text ${o?"edited":""} ${s?"":"empty"}"
          title="${n}"
          @click=${()=>{this._editingCell={key:e.key,field:t}}}>
          ${n}
        </div>
      </div>`}_renderValidationProgress(){const e=this._totalEntries>0?Math.round(this._checkedCount/this._totalEntries*100):0;return p`
      <div class="progress-wrap">
        <div class="progress-header">
          <div class="progress-icon">
            <span class="spinner" style="color:#a3e635"></span>
          </div>
          <div class="progress-title">${this._t("v_checking")}</div>
          <div class="progress-fraction">${this._checkedCount}&thinsp;/&thinsp;${this._totalEntries||"?"}</div>
        </div>

        <div class="progress-bar-wrap" style="padding:8px 24px 12px">
          <div class="progress-track">
            <div class="progress-fill" style="width:${e}%"></div>
          </div>
        </div>

        <div class="entry-list">
          ${this._entries.map(t=>p`
            <div class="entry-row ${t.status}">
              <div class="entry-idx">${t.idx}</div>
              <div class="entry-key">${t.key}</div>
              <div class="entry-title">${this._clean(this._getField(t,"title")||t.fields.title||"")}</div>
              <div class="entry-status ${t.status}">
                ${this._statusIcon(t.status)}
                ${this._statusLabel(t)}
              </div>
            </div>
          `)}
        </div>
      </div>

      ${this._renderLog()}
    `}_renderResultsTable(){const e=this._countByStatus("ok"),t=this._countByStatus("warn"),i=this._countByStatus("error"),s=this._entries.length,r=this._hasAnyEdits();return p`
      <!-- Summary stats -->
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-val">${s}</div>
          <div class="stat-label">${this._lang==="en"?"Total":"Всего записей"}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val ok">${e}</div>
          <div class="stat-label">${this._t("st_ok")}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val warn">${t}</div>
          <div class="stat-label">${this._lang==="en"?"Warnings":"Предупреждения"}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val error">${i}</div>
          <div class="stat-label">${this._lang==="en"?"Errors":"Ошибки"}</div>
        </div>
      </div>

      <!-- Action row -->
      <div class="results-actions">
        <div class="results-title">${this._t("v_results")}</div>

        ${this._bibJobId?p`
          <a class="btn btn-ghost" style="font-size:12px"
             href="/api/download/${this._bibJobId}/references_enriched.bib"
             download="references_enriched.bib">
            ${this._t("v_dl_enriched")}
          </a>`:_}

        <button class="btn btn-blue" style="font-size:12px"
          ?disabled=${this._generatingBib}
          @click=${this._generateBib}>
          ${this._generatingBib?p`<span class="spinner"></span> ${this._t("v_generating")}`:p`↓ ${this._lang==="en"?"Save":"Сохранить"}${r?this._lang==="en"?" (with edits)":" (с правками)":""} .bib`}
        </button>

        <button class="btn btn-next" style="font-size:12px"
          @click=${()=>this._goStep(2)}>
          ${this._t("v_next")}
        </button>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <div class="table-toolbar-title">${this._lang==="en"?"Sources — click a cell to edit":"Источники — кликните ячейку чтобы отредактировать"}</div>
          <div class="table-hint">${this._lang==="en"?"Fields: title, authors, year, journal, DOI":"Поля: название, авторы, год, журнал, DOI"}</div>
        </div>

        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>${this._t("th_num")}</th>
                <th>${this._t("th_key")} / ${this._t("th_status")}</th>
                <th>${this._t("th_title")}</th>
                <th>${this._t("th_author")}</th>
                <th class="col-year">${this._t("th_year")}</th>
                <th>${this._t("th_journal")}</th>
                <th class="col-doi">${this._t("th_doi")}</th>
              </tr>
            </thead>
            <tbody>
              ${this._entries.map((o,n)=>p`
                <tr class="row-${o.status}">
                  <td class="td-num">${n+1}</td>

                  <td class="td-key">
                    <span class="key-text">${o.key}</span>
                    ${this._statusBadge(o.status)}
                    ${o.issues.length?p`
                      <div class="issue-tags">
                        ${o.issues.map(l=>this._issueTag(l,o.status))}
                      </div>`:_}
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

        ${r?p`
          <div class="table-footer">
            <div class="changed-hint">${this._lang==="en"?'Unsaved edits — click "Save .bib"':"Есть несохранённые правки — нажмите «Сохранить .bib»"}</div>
            <button class="btn btn-blue" style="font-size:12px"
              ?disabled=${this._generatingBib}
              @click=${this._generateBib}>
              ${this._generatingBib?p`<span class="spinner"></span> ${this._t("v_generating")}`:this._lang==="en"?"↓ Save with edits .bib":"↓ Сохранить с правками .bib"}
            </button>
          </div>`:_}
      </div>

      ${this._renderLog()}
    `}_step1(){return this.status==="processing"&&this._entries.length>0?this._renderValidationProgress():this._validationDone?this._renderResultsTable():this._renderStep1Form()}_renderStep1Form(){const e=!!this._bibFile,t=this.status==="processing",i=!this._mailto||!this._mailtoError;return p`
      <div class="card">
        <div class="card-header">
          <div class="card-icon red">📚</div>
          <div>
            <div class="card-title">${this._t("s1_title")}</div>
            <div class="card-desc">${this._t("s1_desc")}</div>
          </div>
        </div>

        <!-- Format example -->
        <div class="format-hint">
          <div class="format-hint-header">
            <div class="dot"></div>
            ${this._t("s1_format_hd")}
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

        <div class="section-label" style="margin-top:20px">${this._t("s1_file_sec")}</div>
        <file-drop
          label="${this._t("s1_drop_lbl")}"
          ext=".bib" accept=".bib"
          @file-selected=${s=>{this._bibFile=s.detail,this._clearValidation()}}
        ></file-drop>

        ${e?p`
          <div class="bib-file-info">
            <div class="bfi-icon">📄</div>
            <div>
              <div class="bfi-name">${this._bibFile.name}</div>
              <div class="bfi-sub">${this._t("s1_file_ready")}</div>
            </div>
          </div>`:_}

        <!-- Email input -->
        <div class="input-wrap" style="margin-top:16px">
          <label class="input-label">
            ${this._t("s1_email_lbl")}
            <span class="optional-tag">${this._t("s1_email_opt")}</span>
          </label>
          <input
            class="text-input ${this._mailtoError?"input-err":this._mailto?"input-ok":""}"
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
          ${this._mailtoError?p`<div class="field-msg err">✕ ${this._mailtoError}</div>`:this._mailto?p`<div class="field-msg ok">✓ ${this._lang==="ru"?"Email принят":"Email accepted"}</div>`:p`<div class="field-msg" style="color:#3a4d42">${this._t("s1_email_hint")}</div>`}
        </div>

        ${this._renderLog()}

        <!-- Action cards -->
        <div class="action-row">
          <button class="action-card primary" ?disabled=${!e||t||!i}
            @click=${this._runValidate}>
            <div class="ac-icon">🔍</div>
            <div class="ac-title ac-primary">
              ${t?p`<span class="spinner" style="display:inline-block;width:13px;height:13px;vertical-align:middle;margin-right:6px;color:#a3e635"></span>`:_}
              ${t?this._t("s1_checking"):this._t("s1_btn_check")}
            </div>
            <div class="ac-sub">${this._t("s1_btn_check_sub")}</div>
          </button>

          <button class="action-card" ?disabled=${!e||t}
            @click=${()=>this._goStep(2)}>
            <div class="ac-icon">⏭</div>
            <div class="ac-title">${this._t("s1_btn_skip")}</div>
            <div class="ac-sub">${this._t("s1_btn_skip_sub")}</div>
          </button>
        </div>
      </div>
    `}_step2(){const e=!!this._uriMapJobId||!!this._uriMapDirect,t=!!this._htmlFile,i=!!this._uriMapJobId,s=this.status==="processing",r=this.status==="error",o="ps-info",n="ps-info",l=i||t?"ps-done":"ps-active",a=i?"ps-done":t?"ps-active":"ps-muted",d=p`
      <svg viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 6H20M15 1.5L20.5 6L15 10.5" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;return p`
      <div class="card">
        <div class="card-header">
          <div class="card-icon blue">🔗</div>
          <div>
            <div class="card-title">${this._t("s2_title")}</div>
            <div class="card-desc">${this._t("s2_desc")}</div>
          </div>
        </div>

        <!-- Visual pipeline -->
        <div class="pipeline">
          <div class="ps ${o}">
            <div class="ps-icon">📚</div>
            <div class="ps-title">${this._t("s2_p1_t")}</div>
            <div class="ps-sub">${this._lang==="en"?"Select all Ctrl+A":"Выдели все источники Ctrl+A"}</div>
          </div>

          <div class="pa">${d}</div>

          <div class="ps ${n}">
            <div class="ps-icon">📋</div>
            <div class="ps-title">${this._t("s2_p2_t")}</div>
            <div class="ps-sub">Scannable Cite → Save as HTML</div>
          </div>

          <div class="pa ${t||i?"pa-done":"pa-active"}">${d}</div>

          <div class="ps ${l}">
            ${i||t?p`<div class="ps-badge">✓</div>`:_}
            <div class="ps-icon">${t||i?"📄":"⬆"}</div>
            <div class="ps-title">${t||i?this._lang==="en"?"HTML uploaded":"HTML загружен":this._t("s2_p3_t")}</div>
            <div class="ps-sub">${t?this._htmlFile.name.slice(0,22)+(this._htmlFile.name.length>22?"…":""):this._lang==="en"?"file from Zotero":"файл из Zotero"}</div>
          </div>

          <div class="pa ${i?"pa-done":t?"pa-active":""}">${d}</div>

          <div class="ps ${a}">
            ${i?p`<div class="ps-badge">✓</div>`:_}
            <div class="ps-icon">
              ${s?p`<span class="spinner" style="color:#a3e635;width:20px;height:20px;border-width:2.5px"></span>`:i?"✅":"⚙"}
            </div>
            <div class="ps-title">${i?this._t("s2_p4_t"):s?this._t("s2_creating"):this._lang==="en"?"Create URI map":"Создай URI карту"}</div>
            <div class="ps-sub">${i?`${this._parseCount} ${this._t("s2_count_label")}`:s?this._lang==="en"?"Processing…":"Обрабатываю файл":this._lang==="en"?"Click the button below":"Нажми кнопку ниже"}</div>
          </div>
        </div>

        <!-- Upload options -->
        <div class="section-label">${this._t("s2_upload_sec")}</div>
        <div class="upload-options">
          <div class="upload-col">
            <div class="upload-col-label">${this._t("s2_html_col")}</div>
            <file-drop label="${this._t("s2_html_drop")}" ext=".html" accept=".html,.htm"
              @file-selected=${c=>{this._htmlFile=c.detail,this._uriMapDirect=null,this._uriMapJobId="",this._parseCount=0,this._parseMatch=null,this.status="idle",this.log=""}}>
            </file-drop>
          </div>

          <div class="upload-divider">
            <div class="upload-divider-line"></div>
            <div class="upload-divider-text">${this._t("s2_or")}</div>
            <div class="upload-divider-line"></div>
          </div>

          <div class="upload-col">
            <div class="upload-col-label">${this._t("s2_tsv_col")}</div>
            <file-drop label="${this._t("s2_tsv_drop")}" ext=".tsv" accept=".tsv,.txt"
              @file-selected=${c=>{this._uriMapDirect=c.detail,this._htmlFile=null,this._uriMapJobId="",this._parseCount=0,this.status="idle",this.log=""}}>
            </file-drop>
          </div>
        </div>

        <!-- Result panel -->
        ${i&&!r?p`
          <div class="parse-result">
            <div class="parse-result-ico">✅</div>
            <div class="parse-result-body">
              <div class="parse-result-title">${this._t("s2_result_title")}</div>
              <div class="parse-result-sub">
                ${this._parseMatch===!0?this._t("s2_match_ok"):this._parseMatch===!1?this._t("s2_match_warn"):this._t("s2_file_ready")}
              </div>
            </div>
            <div class="parse-count">
              <div class="parse-count-num">${this._parseCount}</div>
              <div class="parse-count-label">${this._t("s2_count_label")}</div>
            </div>
          </div>

          ${this._parseWarning?p`
            <div class="parse-warning">
              <span style="font-size:16px;flex-shrink:0">⚠</span>
              <span>${this._parseWarning}</span>
            </div>`:_}
        `:_}

        ${r?p`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t("s2_err_title")}</div>
              <div style="font-size:11px;opacity:0.8">${this.log}</div>
            </div>
          </div>`:_}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(1)}>${this._t("s2_back")}</button>

          ${t&&!i?p`
            <button class="btn btn-blue"
              ?disabled=${s}
              @click=${this._runParseHtml}>
              ${s?p`<span class="spinner"></span> ${this._t("s2_creating")}`:this._t("s2_create_btn")}
            </button>`:_}

          ${i?p`
            <a class="btn btn-ghost" style="font-size:12px"
               href="/api/download/${this._uriMapJobId}/uri-map.tsv"
               download="uri-map.tsv">${this._t("s2_dl_tsv")}</a>
            <button class="btn btn-ghost" style="font-size:12px"
              @click=${()=>{this._uriMapJobId="",this._htmlFile=null,this._parseCount=0,this._parseMatch=null,this.status="idle",this.log="",this.shadowRoot?.querySelectorAll("file-drop").forEach(c=>c.reset?.())}}>${this._t("s2_recreate")}</button>`:_}

          <div class="spacer"></div>
          <button class="btn btn-next" ?disabled=${!e}
            @click=${()=>this._goStep(3)}>
            ${this._t("s2_next")}
          </button>
        </div>
      </div>
    `}_step3(){const e=!!this._uriMapJobId||!!this._uriMapDirect,t=!!this._docxFile,i=!!this._injectJobId,s=this.status==="processing",r=this.status==="error",o=this._parseCount,n=p`
      <svg class="tv-arrow-svg" viewBox="0 0 20 10" fill="none">
        <path d="M1 5H18M13.5 1L18 5L13.5 9" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;return p`
      <div class="card">
        <div class="card-header">
          <div class="card-icon purple">⚡</div>
          <div>
            <div class="card-title">${this._t("s3_title")}</div>
            <div class="card-desc">${this._t("s3_desc")}</div>
          </div>
        </div>

        <!-- Prerequisites -->
        <div class="section-label">${this._t("s3_prereq_sec")}</div>
        <div class="prereq-panel">
          <div class="prereq-item ${e?"ok":"missing"}">
            <div class="prereq-ico">${e?"✓":"!"}</div>
            <div>
              <div class="prereq-title">${this._t("s3_map_title")}</div>
              <div class="prereq-sub">
                ${e?this._t("s3_map_ok")(o):this._t("s3_map_miss")}
              </div>
            </div>
          </div>
          <div class="prereq-item ${this._bibFile?"ok":"missing"}">
            <div class="prereq-ico">${this._bibFile?"✓":"!"}</div>
            <div>
              <div class="prereq-title">${this._t("s3_bib_title")}</div>
              <div class="prereq-sub">
                ${this._bibFile?this._bibFile.name.slice(0,28)+(this._bibFile.name.length>28?"…":""):this._t("s3_bib_miss")}
              </div>
            </div>
          </div>
        </div>

        <!-- Transform preview -->
        <div class="section-label">${this._t("s3_transform_sec")}</div>
        <div class="transform-vis">
          <div class="tv-side">
            <div class="tv-label">${this._t("s3_before_lbl")}</div>
            <div class="tv-doc">
              ...результаты показали<br>
              значительный эффект
              <span class="tv-cite">[1]</span>,<br>
              <span class="tv-cite">[5][6][7][8]</span><br>
              на прочность керамики...
            </div>
          </div>
          <div class="tv-arrow-col">${n}</div>
          <div class="tv-side after">
            <div class="tv-label">${this._t("s3_after_lbl")}</div>
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
        <div class="section-label" style="margin-top:20px">${this._t("s3_docx_sec")}</div>
        <file-drop label="${this._t("s3_docx_drop")}" ext=".docx" accept=".docx"
          @file-selected=${l=>{this._docxFile=l.detail,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this.status="idle",this.log=""}}>
        </file-drop>

        <!-- Result panel -->
        ${i&&!r?p`
          <div class="inject-result">
            <div class="ir-icon">✅</div>
            <div class="ir-body">
              <div class="ir-title">${this._t("s3_result_title")}</div>
              <div class="ir-sub">${this._t("s3_result_sub")}</div>
            </div>
            <div class="ir-stats">
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectReplaced}</div>
                <div class="ir-stat-label">${this._t("s3_stat_replaced")}</div>
              </div>
              <div class="ir-stat">
                <div class="ir-stat-num">${this._injectGroups}</div>
                <div class="ir-stat-label">${this._t("s3_stat_groups")}</div>
              </div>
            </div>
          </div>`:_}

        ${r?p`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t("s3_err_title")}</div>
              <div style="font-size:11px;opacity:0.8;white-space:pre-wrap">${this.log}</div>
            </div>
          </div>`:_}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(2)}>${this._t("s3_back")}</button>

          <button class="btn btn-red"
            ?disabled=${!t||!e||s}
            @click=${this._runInject}>
            ${s?p`<span class="spinner"></span> ${this._t("s3_running")}`:i?this._t("s3_rerun"):this._t("s3_run")}
          </button>

          ${i?p`
            <a class="btn btn-green"
               href="/api/download/${this._injectJobId}/output_zotero.docx"
               download="output_zotero.docx">${this._t("s3_dl")}</a>
            <div class="spacer"></div>
            <button class="btn btn-next" @click=${()=>this._goStep(4)}>
              ${this._t("s3_next")}
            </button>`:_}
        </div>
      </div>
    `}_step4(){return p`
      <!-- Success hero -->
      <div class="success-hero">
        <div class="sh-ring">🎉</div>
        <div class="sh-title">${this._t("s4_title")}</div>
        <div class="sh-sub">${this._t("s4_sub")}</div>
        ${this._injectReplaced||this._injectGroups?p`
          <div class="sh-stats">
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectReplaced}</div>
              <div class="sh-stat-l">${this._t("s4_refs_replaced")}</div>
            </div>
            <div class="sh-stat">
              <div class="sh-stat-n">${this._injectGroups}</div>
              <div class="sh-stat-l">${this._t("s4_cit_groups")}</div>
            </div>
          </div>`:_}
      </div>

      <!-- Big download button -->
      ${this._injectJobId?p`
        <div class="download-cta">
          <a class="btn-download"
             href="/api/download/${this._injectJobId}/output_zotero.docx"
             download="output_zotero.docx">
            <span class="btn-dl-icon">↓</span>
            <span class="btn-dl-text">
              <span class="btn-dl-main">${this._t("s4_dl_main")}</span>
              <span class="btn-dl-sub">${this._t("s4_dl_sub")}</span>
            </span>
          </a>
        </div>`:_}

      <!-- Steps in Word -->
      <div class="word-steps">
        <div class="ws-header">${this._t("s4_word_hd")}</div>

        <div class="ws-step">
          <div class="ws-num">1</div>
          <div class="ws-icon-wrap">📂</div>
          <div class="ws-body">
            <div class="ws-title">${this._t("s4_ws1_t")}</div>
            <div class="ws-sub">${this._t("s4_ws1_s")}</div>
          </div>
          <span class="ws-badge blue">Word</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">2</div>
          <div class="ws-icon-wrap">📋</div>
          <div class="ws-body">
            <div class="ws-title">${this._t("s4_ws2_t")}</div>
            <div class="ws-sub">${this._t("s4_ws2_s")}</div>
          </div>
          <span class="ws-badge blue">Zotero</span>
        </div>

        <div class="ws-step">
          <div class="ws-num">3</div>
          <div class="ws-icon-wrap">🎨</div>
          <div class="ws-body">
            <div class="ws-title">${this._t("s4_ws3_t")}</div>
            <div class="ws-sub">${this._t("s4_ws3_s")}</div>
          </div>
          <span class="ws-badge green">${this._t("s4_ws3_badge")}</span>
        </div>
      </div>

      <!-- Tip -->
      <div style="padding:14px 18px;background:#101414;border:1px solid #1c2a2a;border-radius:12px;font-size:12px;color:#748f80;line-height:1.7;margin-bottom:16px">
        <strong style="color:#edf7ed">${this._t("s4_tip_title")}</strong>
        ${this._t("s4_tip")}
      </div>

      <!-- Donate card -->
      <div class="donate-card">
        <div class="donate-photo-wrap">
          <img class="donate-photo" src="/app/donate-photo.webp" alt="Please donate"/>
          <div class="donate-photo-text">
            <div class="donate-photo-title">
              ${this._lang==="ru"?p`Понравился? Ваш донат — <em>топливо</em>.`:p`Found it useful? Your donation <em>fuels</em> this.`}
            </div>
            <div class="donate-photo-sub">USDT · TRC-20 · TRON</div>
          </div>
        </div>
        <div class="donate-body">
          <div class="donate-net">
            <svg width="11" height="11" viewBox="0 0 32 32" style="flex-shrink:0"><circle cx="16" cy="16" r="16" fill="#ef0027"/><path d="M16 4l12 7v10l-12 7L4 21V11z" fill="none" stroke="#fff" stroke-width="2"/><circle cx="16" cy="16" r="4" fill="#fff"/></svg>
            USDT · TRC-20
          </div>
          ${this._qrDataUrl?p`
            <div class="donate-qr-wrap">
              <img class="donate-qr" src="${this._qrDataUrl}" alt="USDT TRC-20 QR code"/>
            </div>`:_}
          <div class="donate-addr-row">
            <code class="donate-addr-text">${Tt}</code>
            <button class="donate-copy-btn ${this._walletCopied?"copied":""}"
              @click=${this._copyWallet}>
              ${this._walletCopied?"✓ OK":this._lang==="ru"?"Копировать":"Copy"}
            </button>
          </div>
          <div class="donate-hint">
            ${this._lang==="ru"?p`<strong>Только USDT (TRC-20) на сеть TRON.</strong> Другие активы будут утеряны безвозвратно.`:p`<strong>USDT (TRC-20) on TRON network only.</strong> Sending other assets will result in permanent loss.`}
          </div>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-ghost" @click=${()=>this._goStep(3)}>${this._t("s4_back")}</button>
        <div class="spacer"></div>
        <button class="btn btn-ghost" @click=${this._reset}>${this._t("s4_restart")}</button>
      </div>
    `}render(){const e=[{n:1,name:this._t("step1")},{n:2,name:this._t("step2")},{n:3,name:this._t("step3")},{n:4,name:this._t("step4")}],t=this._validationDone&&this.step===1;return p`
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
          <button class="lang-btn ${this._lang==="ru"?"active":""}"
            @click=${()=>this._setLang("ru")}>RU</button>
          <button class="lang-btn ${this._lang==="en"?"active":""}"
            @click=${()=>this._setLang("en")}>EN</button>
        </div>
        <div class="header-badge">${this._t("step_badge")(this.step)}</div>
      </header>

      <div class="stepper">
        ${e.map((i,s)=>p`
          ${s>0?p`<div class="step-connector ${this._ss(e[s-1].n)==="done"?"done":""}"></div>`:_}
          <div class="step-pill ${this._ss(i.n)}">
            <div class="step-dot ${this._ss(i.n)}">
              ${this._ss(i.n)==="done"?"✓":i.n}
            </div>
            <span class="step-name ${this._ss(i.n)}">${i.name}</span>
          </div>
        `)}
      </div>

      <main style=${t?"max-width:1140px":""}>
        ${this.step===1?this._step1():_}
        ${this.step===2?this._step2():_}
        ${this.step===3?this._step3():_}
        ${this.step===4?this._step4():_}
      </main>
    `}};w.styles=ae`
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
      overflow-y: auto;
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
  `;k([$()],w.prototype,"step",2);k([$()],w.prototype,"status",2);k([$()],w.prototype,"log",2);k([$()],w.prototype,"_bibFile",2);k([$()],w.prototype,"_bibJobId",2);k([$()],w.prototype,"_mailto",2);k([$()],w.prototype,"_mailtoError",2);k([$()],w.prototype,"_qrDataUrl",2);k([$()],w.prototype,"_walletCopied",2);k([$()],w.prototype,"_htmlFile",2);k([$()],w.prototype,"_uriMapJobId",2);k([$()],w.prototype,"_uriMapDirect",2);k([$()],w.prototype,"_docxFile",2);k([$()],w.prototype,"_injectJobId",2);k([$()],w.prototype,"_injectGroups",2);k([$()],w.prototype,"_injectReplaced",2);k([$()],w.prototype,"_entries",2);k([$()],w.prototype,"_totalEntries",2);k([$()],w.prototype,"_checkedCount",2);k([$()],w.prototype,"_currentKey",2);k([$()],w.prototype,"_validationStats",2);k([$()],w.prototype,"_validationDone",2);k([$()],w.prototype,"_parseCount",2);k([$()],w.prototype,"_parseMatch",2);k([$()],w.prototype,"_parseWarning",2);k([$()],w.prototype,"_editingCell",2);k([$()],w.prototype,"_editedFields",2);k([$()],w.prototype,"_generatingBib",2);k([$()],w.prototype,"_lang",2);w=k([he("app-root")],w);
