import{f as Ot,u as Jt,i as kt,a as Ct,b as p,t as Et,A as C}from"./custom-element-D7xiZl9l.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt={attribute:!0,type:String,converter:Jt,reflect:!1,hasChanged:Ot},Ht=(t=qt,e,i)=>{const{kind:r,metadata:s}=i;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),r==="accessor"){const{name:n}=i;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,t,!0,a)},init(a){return a!==void 0&&this.C(n,void 0,t,a),a}}}if(r==="setter"){const{name:n}=i;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,t,!0,a)}}throw Error("Unsupported decorator location: "+r)};function W(t){return(e,i)=>typeof i=="object"?Ht(t,e,i):((r,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,r),n?Object.getOwnPropertyDescriptor(s,o):void 0})(t,e,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function w(t){return W({...t,state:!0,attribute:!1})}var V={},Wt=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},$t={},S={};let ft;const Vt=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];S.getSymbolSize=function(e){if(!e)throw new Error('"version" cannot be null or undefined');if(e<1||e>40)throw new Error('"version" should be in range from 1 to 40');return e*4+17};S.getSymbolTotalCodewords=function(e){return Vt[e]};S.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e};S.setToSJISFunction=function(e){if(typeof e!="function")throw new Error('"toSJISFunc" is not a valid function.');ft=e};S.isKanjiModeEnabled=function(){return typeof ft<"u"};S.toSJIS=function(e){return ft(e)};var tt={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+i)}}t.isValid=function(r){return r&&typeof r.bit<"u"&&r.bit>=0&&r.bit<4},t.from=function(r,s){if(t.isValid(r))return r;try{return e(r)}catch{return s}}})(tt);function It(){this.buffer=[],this.length=0}It.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var Zt=It;function Z(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}Z.prototype.set=function(t,e,i,r){const s=t*this.size+e;this.data[s]=i,r&&(this.reservedBit[s]=!0)};Z.prototype.get=function(t,e){return this.data[t*this.size+e]};Z.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i};Z.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var Kt=Z,zt={};(function(t){const e=S.getSymbolSize;t.getRowColCoords=function(r){if(r===1)return[];const s=Math.floor(r/7)+2,o=e(r),n=o===145?26:Math.ceil((o-13)/(2*s-2))*2,a=[o-7];for(let l=1;l<s-1;l++)a[l]=a[l-1]-n;return a.push(6),a.reverse()},t.getPositions=function(r){const s=[],o=t.getRowColCoords(r),n=o.length;for(let a=0;a<n;a++)for(let l=0;l<n;l++)a===0&&l===0||a===0&&l===n-1||a===n-1&&l===0||s.push([o[a],o[l]]);return s}})(zt);var St={};const Gt=S.getSymbolSize,vt=7;St.getPositions=function(e){const i=Gt(e);return[[0,0],[i-vt,0],[0,i-vt]]};var Bt={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},t.from=function(s){return t.isValid(s)?parseInt(s,10):void 0},t.getPenaltyN1=function(s){const o=s.size;let n=0,a=0,l=0,d=null,c=null;for(let E=0;E<o;E++){a=l=0,d=c=null;for(let b=0;b<o;b++){let h=s.get(E,b);h===d?a++:(a>=5&&(n+=e.N1+(a-5)),d=h,a=1),h=s.get(b,E),h===c?l++:(l>=5&&(n+=e.N1+(l-5)),c=h,l=1)}a>=5&&(n+=e.N1+(a-5)),l>=5&&(n+=e.N1+(l-5))}return n},t.getPenaltyN2=function(s){const o=s.size;let n=0;for(let a=0;a<o-1;a++)for(let l=0;l<o-1;l++){const d=s.get(a,l)+s.get(a,l+1)+s.get(a+1,l)+s.get(a+1,l+1);(d===4||d===0)&&n++}return n*e.N2},t.getPenaltyN3=function(s){const o=s.size;let n=0,a=0,l=0;for(let d=0;d<o;d++){a=l=0;for(let c=0;c<o;c++)a=a<<1&2047|s.get(d,c),c>=10&&(a===1488||a===93)&&n++,l=l<<1&2047|s.get(c,d),c>=10&&(l===1488||l===93)&&n++}return n*e.N3},t.getPenaltyN4=function(s){let o=0;const n=s.data.length;for(let l=0;l<n;l++)o+=s.data[l];return Math.abs(Math.ceil(o*100/n/5)-10)*e.N4};function i(r,s,o){switch(r){case t.Patterns.PATTERN000:return(s+o)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return o%3===0;case t.Patterns.PATTERN011:return(s+o)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(o/3))%2===0;case t.Patterns.PATTERN101:return s*o%2+s*o%3===0;case t.Patterns.PATTERN110:return(s*o%2+s*o%3)%2===0;case t.Patterns.PATTERN111:return(s*o%3+(s+o)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(s,o){const n=o.size;for(let a=0;a<n;a++)for(let l=0;l<n;l++)o.isReserved(l,a)||o.xor(l,a,i(s,l,a))},t.getBestMask=function(s,o){const n=Object.keys(t.Patterns).length;let a=0,l=1/0;for(let d=0;d<n;d++){o(d),t.applyMask(d,s);const c=t.getPenaltyN1(s)+t.getPenaltyN2(s)+t.getPenaltyN3(s)+t.getPenaltyN4(s);t.applyMask(d,s),c<l&&(l=c,a=d)}return a}})(Bt);var et={};const N=tt,K=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],G=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];et.getBlocksCount=function(e,i){switch(i){case N.L:return K[(e-1)*4+0];case N.M:return K[(e-1)*4+1];case N.Q:return K[(e-1)*4+2];case N.H:return K[(e-1)*4+3];default:return}};et.getTotalCodewordsCount=function(e,i){switch(i){case N.L:return G[(e-1)*4+0];case N.M:return G[(e-1)*4+1];case N.Q:return G[(e-1)*4+2];case N.H:return G[(e-1)*4+3];default:return}};var Tt={},it={};const q=new Uint8Array(512),Q=new Uint8Array(256);(function(){let e=1;for(let i=0;i<255;i++)q[i]=e,Q[e]=i,e<<=1,e&256&&(e^=285);for(let i=255;i<512;i++)q[i]=q[i-255]})();it.log=function(e){if(e<1)throw new Error("log("+e+")");return Q[e]};it.exp=function(e){return q[e]};it.mul=function(e,i){return e===0||i===0?0:q[Q[e]+Q[i]]};(function(t){const e=it;t.mul=function(r,s){const o=new Uint8Array(r.length+s.length-1);for(let n=0;n<r.length;n++)for(let a=0;a<s.length;a++)o[n+a]^=e.mul(r[n],s[a]);return o},t.mod=function(r,s){let o=new Uint8Array(r);for(;o.length-s.length>=0;){const n=o[0];for(let l=0;l<s.length;l++)o[l]^=e.mul(s[l],n);let a=0;for(;a<o.length&&o[a]===0;)a++;o=o.slice(a)}return o},t.generateECPolynomial=function(r){let s=new Uint8Array([1]);for(let o=0;o<r;o++)s=t.mul(s,new Uint8Array([1,e.exp(o)]));return s}})(Tt);const Mt=Tt;function bt(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}bt.prototype.initialize=function(e){this.degree=e,this.genPoly=Mt.generateECPolynomial(this.degree)};bt.prototype.encode=function(e){if(!this.genPoly)throw new Error("Encoder not initialized");const i=new Uint8Array(e.length+this.degree);i.set(e);const r=Mt.mod(i,this.genPoly),s=this.degree-r.length;if(s>0){const o=new Uint8Array(this.degree);return o.set(r,s),o}return r};var Yt=bt,At={},R={},_t={};_t.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40};var M={};const Dt="[0-9]+",Qt="[A-Z $%*+\\-./:]+";let H="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";H=H.replace(/u/g,"\\u");const Xt="(?:(?![A-Z0-9 $%*+\\-./:]|"+H+`)(?:.|[\r
]))+`;M.KANJI=new RegExp(H,"g");M.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g");M.BYTE=new RegExp(Xt,"g");M.NUMERIC=new RegExp(Dt,"g");M.ALPHANUMERIC=new RegExp(Qt,"g");const te=new RegExp("^"+H+"$"),ee=new RegExp("^"+Dt+"$"),ie=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");M.testKanji=function(e){return te.test(e)};M.testNumeric=function(e){return ee.test(e)};M.testAlphanumeric=function(e){return ie.test(e)};(function(t){const e=_t,i=M;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(o,n){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!e.isValid(n))throw new Error("Invalid version: "+n);return n>=1&&n<10?o.ccBits[0]:n<27?o.ccBits[1]:o.ccBits[2]},t.getBestModeForData=function(o){return i.testNumeric(o)?t.NUMERIC:i.testAlphanumeric(o)?t.ALPHANUMERIC:i.testKanji(o)?t.KANJI:t.BYTE},t.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},t.isValid=function(o){return o&&o.bit&&o.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(o,n){if(t.isValid(o))return o;try{return r(o)}catch{return n}}})(R);(function(t){const e=S,i=et,r=tt,s=R,o=_t,n=7973,a=e.getBCHDigit(n);function l(b,h,_){for(let x=1;x<=40;x++)if(h<=t.getCapacity(x,_,b))return x}function d(b,h){return s.getCharCountIndicator(b,h)+4}function c(b,h){let _=0;return b.forEach(function(x){const z=d(x.mode,h);_+=z+x.getBitsLength()}),_}function E(b,h){for(let _=1;_<=40;_++)if(c(b,_)<=t.getCapacity(_,h,s.MIXED))return _}t.from=function(h,_){return o.isValid(h)?parseInt(h,10):_},t.getCapacity=function(h,_,x){if(!o.isValid(h))throw new Error("Invalid QR Code version");typeof x>"u"&&(x=s.BYTE);const z=e.getSymbolTotalCodewords(h),f=i.getTotalCodewordsCount(h,_),m=(z-f)*8;if(x===s.MIXED)return m;const g=m-d(x,h);switch(x){case s.NUMERIC:return Math.floor(g/10*3);case s.ALPHANUMERIC:return Math.floor(g/11*2);case s.KANJI:return Math.floor(g/13);case s.BYTE:default:return Math.floor(g/8)}},t.getBestVersionForData=function(h,_){let x;const z=r.from(_,r.M);if(Array.isArray(h)){if(h.length>1)return E(h,z);if(h.length===0)return 1;x=h[0]}else x=h;return l(x.mode,x.getLength(),z)},t.getEncodedBits=function(h){if(!o.isValid(h)||h<7)throw new Error("Invalid QR Code version");let _=h<<12;for(;e.getBCHDigit(_)-a>=0;)_^=n<<e.getBCHDigit(_)-a;return h<<12|_}})(At);var Pt={};const pt=S,Nt=1335,se=21522,wt=pt.getBCHDigit(Nt);Pt.getEncodedBits=function(e,i){const r=e.bit<<3|i;let s=r<<10;for(;pt.getBCHDigit(s)-wt>=0;)s^=Nt<<pt.getBCHDigit(s)-wt;return(r<<10|s)^se};var Rt={};const re=R;function L(t){this.mode=re.NUMERIC,this.data=t.toString()}L.getBitsLength=function(e){return 10*Math.floor(e/3)+(e%3?e%3*3+1:0)};L.prototype.getLength=function(){return this.data.length};L.prototype.getBitsLength=function(){return L.getBitsLength(this.data.length)};L.prototype.write=function(e){let i,r,s;for(i=0;i+3<=this.data.length;i+=3)r=this.data.substr(i,3),s=parseInt(r,10),e.put(s,10);const o=this.data.length-i;o>0&&(r=this.data.substr(i),s=parseInt(r,10),e.put(s,o*3+1))};var oe=L;const ne=R,ot=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function j(t){this.mode=ne.ALPHANUMERIC,this.data=t}j.getBitsLength=function(e){return 11*Math.floor(e/2)+6*(e%2)};j.prototype.getLength=function(){return this.data.length};j.prototype.getBitsLength=function(){return j.getBitsLength(this.data.length)};j.prototype.write=function(e){let i;for(i=0;i+2<=this.data.length;i+=2){let r=ot.indexOf(this.data[i])*45;r+=ot.indexOf(this.data[i+1]),e.put(r,11)}this.data.length%2&&e.put(ot.indexOf(this.data[i]),6)};var ae=j;const le=R;function U(t){this.mode=le.BYTE,typeof t=="string"?this.data=new TextEncoder().encode(t):this.data=new Uint8Array(t)}U.getBitsLength=function(e){return e*8};U.prototype.getLength=function(){return this.data.length};U.prototype.getBitsLength=function(){return U.getBitsLength(this.data.length)};U.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)};var de=U;const ce=R,pe=S;function O(t){this.mode=ce.KANJI,this.data=t}O.getBitsLength=function(e){return e*13};O.prototype.getLength=function(){return this.data.length};O.prototype.getBitsLength=function(){return O.getBitsLength(this.data.length)};O.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=pe.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),t.put(i,13)}};var he=O,Ft={exports:{}};(function(t){var e={single_source_shortest_paths:function(i,r,s){var o={},n={};n[r]=0;var a=e.PriorityQueue.make();a.push(r,0);for(var l,d,c,E,b,h,_,x,z;!a.empty();){l=a.pop(),d=l.value,E=l.cost,b=i[d]||{};for(c in b)b.hasOwnProperty(c)&&(h=b[c],_=E+h,x=n[c],z=typeof n[c]>"u",(z||x>_)&&(n[c]=_,a.push(c,_),o[c]=d))}if(typeof s<"u"&&typeof n[s]>"u"){var f=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(f)}return o},extract_shortest_path_from_predecessor_list:function(i,r){for(var s=[],o=r;o;)s.push(o),i[o],o=i[o];return s.reverse(),s},find_path:function(i,r,s){var o=e.single_source_shortest_paths(i,r,s);return e.extract_shortest_path_from_predecessor_list(o,s)},PriorityQueue:{make:function(i){var r=e.PriorityQueue,s={},o;i=i||{};for(o in r)r.hasOwnProperty(o)&&(s[o]=r[o]);return s.queue=[],s.sorter=i.sorter||r.default_sorter,s},default_sorter:function(i,r){return i.cost-r.cost},push:function(i,r){var s={value:i,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(Ft);var ue=Ft.exports;(function(t){const e=R,i=oe,r=ae,s=de,o=he,n=M,a=S,l=ue;function d(f){return unescape(encodeURIComponent(f)).length}function c(f,m,g){const u=[];let k;for(;(k=f.exec(g))!==null;)u.push({data:k[0],index:k.index,mode:m,length:k[0].length});return u}function E(f){const m=c(n.NUMERIC,e.NUMERIC,f),g=c(n.ALPHANUMERIC,e.ALPHANUMERIC,f);let u,k;return a.isKanjiModeEnabled()?(u=c(n.BYTE,e.BYTE,f),k=c(n.KANJI,e.KANJI,f)):(u=c(n.BYTE_KANJI,e.BYTE,f),k=[]),m.concat(g,u,k).sort(function(I,B){return I.index-B.index}).map(function(I){return{data:I.data,mode:I.mode,length:I.length}})}function b(f,m){switch(m){case e.NUMERIC:return i.getBitsLength(f);case e.ALPHANUMERIC:return r.getBitsLength(f);case e.KANJI:return o.getBitsLength(f);case e.BYTE:return s.getBitsLength(f)}}function h(f){return f.reduce(function(m,g){const u=m.length-1>=0?m[m.length-1]:null;return u&&u.mode===g.mode?(m[m.length-1].data+=g.data,m):(m.push(g),m)},[])}function _(f){const m=[];for(let g=0;g<f.length;g++){const u=f[g];switch(u.mode){case e.NUMERIC:m.push([u,{data:u.data,mode:e.ALPHANUMERIC,length:u.length},{data:u.data,mode:e.BYTE,length:u.length}]);break;case e.ALPHANUMERIC:m.push([u,{data:u.data,mode:e.BYTE,length:u.length}]);break;case e.KANJI:m.push([u,{data:u.data,mode:e.BYTE,length:d(u.data)}]);break;case e.BYTE:m.push([{data:u.data,mode:e.BYTE,length:d(u.data)}])}}return m}function x(f,m){const g={},u={start:{}};let k=["start"];for(let $=0;$<f.length;$++){const I=f[$],B=[];for(let P=0;P<I.length;P++){const T=I[P],J=""+$+P;B.push(J),g[J]={node:T,lastCount:0},u[J]={};for(let rt=0;rt<k.length;rt++){const A=k[rt];g[A]&&g[A].node.mode===T.mode?(u[A][J]=b(g[A].lastCount+T.length,T.mode)-b(g[A].lastCount,T.mode),g[A].lastCount+=T.length):(g[A]&&(g[A].lastCount=T.length),u[A][J]=b(T.length,T.mode)+4+e.getCharCountIndicator(T.mode,m))}}k=B}for(let $=0;$<k.length;$++)u[k[$]].end=0;return{map:u,table:g}}function z(f,m){let g;const u=e.getBestModeForData(f);if(g=e.from(m,u),g!==e.BYTE&&g.bit<u.bit)throw new Error('"'+f+'" cannot be encoded with mode '+e.toString(g)+`.
 Suggested mode is: `+e.toString(u));switch(g===e.KANJI&&!a.isKanjiModeEnabled()&&(g=e.BYTE),g){case e.NUMERIC:return new i(f);case e.ALPHANUMERIC:return new r(f);case e.KANJI:return new o(f);case e.BYTE:return new s(f)}}t.fromArray=function(m){return m.reduce(function(g,u){return typeof u=="string"?g.push(z(u,null)):u.data&&g.push(z(u.data,u.mode)),g},[])},t.fromString=function(m,g){const u=E(m,a.isKanjiModeEnabled()),k=_(u),$=x(k,g),I=l.find_path($.map,"start","end"),B=[];for(let P=1;P<I.length-1;P++)B.push($.table[I[P]].node);return t.fromArray(h(B))},t.rawSplit=function(m){return t.fromArray(E(m,a.isKanjiModeEnabled()))}})(Rt);const st=S,nt=tt,ge=Zt,fe=Kt,be=zt,_e=St,ht=Bt,ut=et,xe=Yt,X=At,me=Pt,ve=R,at=Rt;function we(t,e){const i=t.size,r=_e.getPositions(e);for(let s=0;s<r.length;s++){const o=r[s][0],n=r[s][1];for(let a=-1;a<=7;a++)if(!(o+a<=-1||i<=o+a))for(let l=-1;l<=7;l++)n+l<=-1||i<=n+l||(a>=0&&a<=6&&(l===0||l===6)||l>=0&&l<=6&&(a===0||a===6)||a>=2&&a<=4&&l>=2&&l<=4?t.set(o+a,n+l,!0,!0):t.set(o+a,n+l,!1,!0))}}function ye(t){const e=t.size;for(let i=8;i<e-8;i++){const r=i%2===0;t.set(i,6,r,!0),t.set(6,i,r,!0)}}function ke(t,e){const i=be.getPositions(e);for(let r=0;r<i.length;r++){const s=i[r][0],o=i[r][1];for(let n=-2;n<=2;n++)for(let a=-2;a<=2;a++)n===-2||n===2||a===-2||a===2||n===0&&a===0?t.set(s+n,o+a,!0,!0):t.set(s+n,o+a,!1,!0)}}function Ce(t,e){const i=t.size,r=X.getEncodedBits(e);let s,o,n;for(let a=0;a<18;a++)s=Math.floor(a/3),o=a%3+i-8-3,n=(r>>a&1)===1,t.set(s,o,n,!0),t.set(o,s,n,!0)}function lt(t,e,i){const r=t.size,s=me.getEncodedBits(e,i);let o,n;for(o=0;o<15;o++)n=(s>>o&1)===1,o<6?t.set(o,8,n,!0):o<8?t.set(o+1,8,n,!0):t.set(r-15+o,8,n,!0),o<8?t.set(8,r-o-1,n,!0):o<9?t.set(8,15-o-1+1,n,!0):t.set(8,15-o-1,n,!0);t.set(r-8,8,1,!0)}function Ee(t,e){const i=t.size;let r=-1,s=i-1,o=7,n=0;for(let a=i-1;a>0;a-=2)for(a===6&&a--;;){for(let l=0;l<2;l++)if(!t.isReserved(s,a-l)){let d=!1;n<e.length&&(d=(e[n]>>>o&1)===1),t.set(s,a-l,d),o--,o===-1&&(n++,o=7)}if(s+=r,s<0||i<=s){s-=r,r=-r;break}}}function $e(t,e,i){const r=new ge;i.forEach(function(l){r.put(l.mode.bit,4),r.put(l.getLength(),ve.getCharCountIndicator(l.mode,t)),l.write(r)});const s=st.getSymbolTotalCodewords(t),o=ut.getTotalCodewordsCount(t,e),n=(s-o)*8;for(r.getLengthInBits()+4<=n&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(n-r.getLengthInBits())/8;for(let l=0;l<a;l++)r.put(l%2?17:236,8);return Ie(r,t,e)}function Ie(t,e,i){const r=st.getSymbolTotalCodewords(e),s=ut.getTotalCodewordsCount(e,i),o=r-s,n=ut.getBlocksCount(e,i),a=r%n,l=n-a,d=Math.floor(r/n),c=Math.floor(o/n),E=c+1,b=d-c,h=new xe(b);let _=0;const x=new Array(n),z=new Array(n);let f=0;const m=new Uint8Array(t.buffer);for(let I=0;I<n;I++){const B=I<l?c:E;x[I]=m.slice(_,_+B),z[I]=h.encode(x[I]),_+=B,f=Math.max(f,B)}const g=new Uint8Array(r);let u=0,k,$;for(k=0;k<f;k++)for($=0;$<n;$++)k<x[$].length&&(g[u++]=x[$][k]);for(k=0;k<b;k++)for($=0;$<n;$++)g[u++]=z[$][k];return g}function ze(t,e,i,r){let s;if(Array.isArray(t))s=at.fromArray(t);else if(typeof t=="string"){let d=e;if(!d){const c=at.rawSplit(t);d=X.getBestVersionForData(c,i)}s=at.fromString(t,d||40)}else throw new Error("Invalid data");const o=X.getBestVersionForData(s,i);if(!o)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=o;else if(e<o)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+o+`.
`);const n=$e(e,i,s),a=st.getSymbolSize(e),l=new fe(a);return we(l,e),ye(l),ke(l,e),lt(l,i,0),e>=7&&Ce(l,e),Ee(l,n),isNaN(r)&&(r=ht.getBestMask(l,lt.bind(null,l,i))),ht.applyMask(r,l),lt(l,i,r),{modules:l,version:e,errorCorrectionLevel:i,maskPattern:r,segments:s}}$t.create=function(e,i){if(typeof e>"u"||e==="")throw new Error("No input text");let r=nt.M,s,o;return typeof i<"u"&&(r=nt.from(i.errorCorrectionLevel,nt.M),s=X.from(i.version),o=ht.from(i.maskPattern),i.toSJISFunc&&st.setToSJISFunction(i.toSJISFunc)),ze(e,s,r,o)};var Lt={},xt={};(function(t){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(o){return[o,o]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(r){r||(r={}),r.color||(r.color={});const s=typeof r.margin>"u"||r.margin===null||r.margin<0?4:r.margin,o=r.width&&r.width>=21?r.width:void 0,n=r.scale||4;return{width:o,scale:o?4:n,margin:s,color:{dark:e(r.color.dark||"#000000ff"),light:e(r.color.light||"#ffffffff")},type:r.type,rendererOpts:r.rendererOpts||{}}},t.getScale=function(r,s){return s.width&&s.width>=r+s.margin*2?s.width/(r+s.margin*2):s.scale},t.getImageWidth=function(r,s){const o=t.getScale(r,s);return Math.floor((r+s.margin*2)*o)},t.qrToImageData=function(r,s,o){const n=s.modules.size,a=s.modules.data,l=t.getScale(n,o),d=Math.floor((n+o.margin*2)*l),c=o.margin*l,E=[o.color.light,o.color.dark];for(let b=0;b<d;b++)for(let h=0;h<d;h++){let _=(b*d+h)*4,x=o.color.light;if(b>=c&&h>=c&&b<d-c&&h<d-c){const z=Math.floor((b-c)/l),f=Math.floor((h-c)/l);x=E[a[z*n+f]?1:0]}r[_++]=x.r,r[_++]=x.g,r[_++]=x.b,r[_]=x.a}}})(xt);(function(t){const e=xt;function i(s,o,n){s.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=n,o.width=n,o.style.height=n+"px",o.style.width=n+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(o,n,a){let l=a,d=n;typeof l>"u"&&(!n||!n.getContext)&&(l=n,n=void 0),n||(d=r()),l=e.getOptions(l);const c=e.getImageWidth(o.modules.size,l),E=d.getContext("2d"),b=E.createImageData(c,c);return e.qrToImageData(b.data,o,l),i(E,d,c),E.putImageData(b,0,0),d},t.renderToDataURL=function(o,n,a){let l=a;typeof l>"u"&&(!n||!n.getContext)&&(l=n,n=void 0),l||(l={});const d=t.render(o,n,l),c=l.type||"image/png",E=l.rendererOpts||{};return d.toDataURL(c,E.quality)}})(Lt);var jt={};const Se=xt;function yt(t,e){const i=t.a/255,r=e+'="'+t.hex+'"';return i<1?r+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':r}function dt(t,e,i){let r=t+e;return typeof i<"u"&&(r+=" "+i),r}function Be(t,e,i){let r="",s=0,o=!1,n=0;for(let a=0;a<t.length;a++){const l=Math.floor(a%e),d=Math.floor(a/e);!l&&!o&&(o=!0),t[a]?(n++,a>0&&l>0&&t[a-1]||(r+=o?dt("M",l+i,.5+d+i):dt("m",s,0),s=0,o=!1),l+1<e&&t[a+1]||(r+=dt("h",n),n=0)):s++}return r}jt.render=function(e,i,r){const s=Se.getOptions(i),o=e.modules.size,n=e.modules.data,a=o+s.margin*2,l=s.color.light.a?"<path "+yt(s.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>':"",d="<path "+yt(s.color.dark,"stroke")+' d="'+Be(n,o,s.margin)+'"/>',c='viewBox="0 0 '+a+" "+a+'"',b='<svg xmlns="http://www.w3.org/2000/svg" '+(s.width?'width="'+s.width+'" height="'+s.width+'" ':"")+c+' shape-rendering="crispEdges">'+l+d+`</svg>
`;return typeof r=="function"&&r(null,b),b};const Te=Wt,gt=$t,Ut=Lt,Me=jt;function mt(t,e,i,r,s){const o=[].slice.call(arguments,1),n=o.length,a=typeof o[n-1]=="function";if(!a&&!Te())throw new Error("Callback required as last argument");if(a){if(n<2)throw new Error("Too few arguments provided");n===2?(s=i,i=e,e=r=void 0):n===3&&(e.getContext&&typeof s>"u"?(s=r,r=void 0):(s=r,r=i,i=e,e=void 0))}else{if(n<1)throw new Error("Too few arguments provided");return n===1?(i=e,e=r=void 0):n===2&&!e.getContext&&(r=i,i=e,e=void 0),new Promise(function(l,d){try{const c=gt.create(i,r);l(t(c,e,r))}catch(c){d(c)}})}try{const l=gt.create(i,r);s(null,t(l,e,r))}catch(l){s(l)}}V.create=gt.create;V.toCanvas=mt.bind(null,Ut.render);V.toDataURL=mt.bind(null,Ut.renderToDataURL);V.toString=mt.bind(null,function(t,e,i){return Me.render(t,i)});var Ae=Object.defineProperty,De=Object.getOwnPropertyDescriptor,F=(t,e,i,r)=>{for(var s=r>1?void 0:r?De(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(r?n(e,i,s):n(s))||s);return r&&s&&Ae(e,i,s),s};let D=class extends Ct{constructor(){super(...arguments),this.label="Drop file here",this.accept="*",this.hint="",this.ext="",this.dragging=!1,this.fileName=""}render(){return p`
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
    `}_onDragOver(t){t.preventDefault(),this.dragging=!0}_onDrop(t){t.preventDefault(),this.dragging=!1;const e=t.dataTransfer?.files[0];e&&this._emit(e)}_onChange(t){const e=t.target.files?.[0];e&&this._emit(e)}_emit(t){this.fileName=t.name,this.dispatchEvent(new CustomEvent("file-selected",{detail:t,bubbles:!0,composed:!0}))}reset(){this.fileName=""}};D.styles=kt`
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
  `;F([W()],D.prototype,"label",2);F([W()],D.prototype,"accept",2);F([W()],D.prototype,"hint",2);F([W()],D.prototype,"ext",2);F([w()],D.prototype,"dragging",2);F([w()],D.prototype,"fileName",2);D=F([Et("file-drop")],D);var Pe=Object.defineProperty,Ne=Object.getOwnPropertyDescriptor,y=(t,e,i,r)=>{for(var s=r>1?void 0:r?Ne(e,i):e,o=t.length-1,n;o>=0;o--)(n=t[o])&&(s=(r?n(e,i,s):n(s))||s);return r&&s&&Pe(e,i,s),s};const ct="TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3",Y={ru:{step_badge:t=>`Шаг ${t} из 4`,step1:"Библиография",step2:"URI-карта",step3:"Обработка",step4:"Готово",log_label:"Журнал выполнения",s1_title:"Загрузите файл библиографии",s1_desc:"BibTeX-файл (.bib) со списком источников. Убедитесь, что перед каждой записью указан номерной комментарий — см. пример ниже.",s1_format_hd:"Как должен выглядеть .bib-файл",s1_file_sec:"Выберите файл",s1_drop_lbl:"Перетащите .bib-файл или нажмите, чтобы выбрать",s1_file_ready:"Файл загружен · готов к использованию",s1_email_lbl:"Email для Crossref API",s1_email_opt:"необязательно",s1_email_hint:"Ускоряет и стабилизирует запросы к Crossref (полезно при большом списке источников)",s1_btn_check:"Проверить DOI через Crossref",s1_btn_check_sub:"Найдёт недостающие DOI и исправит метаданные. Около 1 минуты на 50 источников.",s1_btn_skip:"Пропустить проверку",s1_btn_skip_sub:"Перейти к следующему шагу без проверки. DOI в документе останутся как есть.",s1_checking:"Проверяю...",v_checking:"Проверка источников через Crossref...",v_results:"Результаты проверки",v_dl_enriched:"↓ Скачать обогащённый .bib",v_dl_original:"↓ Скачать оригинальный .bib",v_edit_hint:"Отредактированные поля сохранятся в скачанном файле.",v_generate_bib:"⟳ Сгенерировать .bib",v_generating:"Генерирую...",v_next:"Далее →",v_recheck:"↺ Перепроверить",th_num:"#",th_key:"Ключ",th_title:"Название",th_author:"Авторы",th_year:"Год",th_journal:"Журнал / Источник",th_doi:"DOI",th_status:"Статус",st_ok:"OK",st_warn:"Предупреждение",st_err:"Ошибка",st_checking:"Проверяю...",badge_ok:"✓ OK",badge_warn:"⚠ Предупреждение",badge_err:"✕ Ошибка",s2_title:"Создайте URI-карту",s2_desc:"Нужна для привязки ссылок из .bib к элементам Zotero. Сохраните коллекцию Zotero в формате HTML и загрузите её сюда.",s2_upload_sec:"Загрузите файл",s2_html_col:"HTML-экспорт из Zotero",s2_tsv_col:"Готовый uri-map.tsv",s2_or:"или",s2_html_drop:"Перетащите файл или нажмите",s2_tsv_drop:"Уже есть готовый файл?",s2_result_title:"URI-карта успешно создана",s2_match_ok:"Количество источников совпадает с .bib-файлом",s2_match_warn:"Количество не совпадает с .bib-файлом — проверьте предупреждение ниже",s2_file_ready:"Файл готов к использованию",s2_count_label:"источников",s2_back:"← Назад",s2_dl_tsv:"↓ Скачать uri-map.tsv",s2_recreate:"↺ Пересоздать",s2_next:"Далее →",s2_create_btn:"⚙ Создать uri-map.tsv",s2_creating:"Создаю карту…",s2_err_title:"Ошибка при обработке файла",s2_p1_t:"Откройте Zotero",s2_p2_t:"Экспортируйте коллекцию",s2_p3_t:"Загрузите HTML",s2_p4_t:"URI-карта готова",s2_p1_b:"с нужной коллекцией",s2_p2_b:"Файл → Экспорт → HTML",s2_p3_b:"в поле ниже",s2_p4_b:"для следующего шага",s3_title:"Добавьте живые поля Zotero в документ",s3_desc:"Загрузите Word-файл — скрипт заменит [1], [5][6][7] на живые поля Zotero. После этого в Word достаточно нажать «Add Bibliography»: список литературы будет создан и обновляться автоматически.",s3_prereq_sec:"Что нужно для обработки",s3_map_title:"URI-карта (шаг 2)",s3_map_ok:t=>t?`${t} источников привязано`:"Карта загружена",s3_map_miss:"Вернитесь к шагу 2 →",s3_bib_title:"Библиография (шаг 1)",s3_bib_miss:"Вернитесь к шагу 1 →",s3_transform_sec:"Что произойдёт с документом",s3_before_lbl:"Сейчас в .docx",s3_after_lbl:"После обработки — поля Zotero",s3_docx_sec:"Загрузите документ",s3_docx_drop:"Перетащите .docx-файл или нажмите",s3_result_title:"Документ успешно обработан!",s3_result_sub:"ADDIN-поля Zotero вшиты · скачайте → откройте Word → нажмите «Add/Edit Bibliography»",s3_stat_replaced:"Ссылок заменено",s3_stat_groups:"Групп цитирований",s3_err_title:"Ошибка при обработке",s3_back:"← Назад",s3_run:"▶ Запустить обработку",s3_rerun:"↺ Обработать снова",s3_running:"Обрабатываю...",s3_dl:"↓ Скачать результат",s3_next:"Далее → Инструкция для Word",s4_title:"Готово — осталось одно нажатие.",s4_sub:"Скачайте файл, откройте его в Word с плагином Zotero и нажмите «Add/Edit Bibliography» — список литературы появится автоматически. Меняйте стиль и удаляйте ссылки — библиография обновится сама.",s4_dl_main:"Скачать output_zotero.docx",s4_dl_sub:"Нажмите и откройте в Microsoft Word",s4_word_hd:"Что делать дальше — в Word с плагином Zotero",s4_ws1_t:"Откройте скачанный файл в Microsoft Word",s4_ws1_s:"Дважды нажмите на output_zotero.docx — ссылки в тексте уже отображаются как живые поля Zotero",s4_ws2_t:"Нажмите «Add/Edit Bibliography» — список литературы готов",s4_ws2_s:"Панель Zotero → Add/Edit Bibliography → список источников формируется автоматически",s4_ws3_t:"Меняйте стиль — всё обновится автоматически",s4_ws3_s:"Zotero → Document Preferences → выберите стиль (ГОСТ, APA, IEEE...) — ссылки переформатируются мгновенно. При удалении цитаты она исчезает из библиографии.",s4_ws3_badge:"Готово",s4_tip_title:"💡 Как это работает:",s4_tip:"В документ вшиты те же ADDIN-поля, которые плагин Zotero создаёт при ручной вставке ссылок. Word распознаёт их и передаёт управление Zotero: библиография управляется динамически.",s4_back:"← Назад",s4_restart:"↺ Обработать другой документ",s4_refs_replaced:"Ссылок заменено",s4_cit_groups:"Групп цитирований",issue:{crossref_unresolved:"Не найдено в Crossref",doi_not_found:"DOI не найден",doi_invalid_format:"Неверный формат DOI",doi_title_mismatch:"DOI не совпадает с названием",doi_duplicate:"Дублирующийся DOI",metadata_not_corrected:"Метаданные не совпадают",mismatch_title:"Название не совпадает",mismatch_author:"Авторы не совпадают",mismatch_year:"Год не совпадает",mismatch_journal:"Журнал не совпадает",mismatch_doi:"DOI не совпадает",crossref_error:"Ошибка API"},stat:{processed:"Проверено",doi_valid:"DOI валиден",doi_added:"Добавлено DOI",doi_corrected:"Исправлено DOI",unresolved:"Не найдено",problem_entries:"Проблемные записи",entries_changed:"Изменено записей",fields_changed:"Изменено полей"}},en:{step_badge:t=>`Step ${t} of 4`,step1:"Bibliography",step2:"URI Map",step3:"Processing",step4:"Done",log_label:"Execution log",s1_title:"Upload bibliography file",s1_desc:"A BibTeX file (.bib) with your references. Make sure each entry has a numbered comment before it — see the example below.",s1_format_hd:"How your .bib file should look",s1_file_sec:"Select file",s1_drop_lbl:"Drop .bib file here or click to select",s1_file_ready:"File loaded · ready to use",s1_email_lbl:"Email for Crossref API",s1_email_opt:"optional",s1_email_hint:"Speeds up and stabilises Crossref requests (useful for large reference lists)",s1_btn_check:"Validate DOIs via Crossref",s1_btn_check_sub:"Finds missing DOIs, corrects metadata. Takes ~1 min per 50 sources.",s1_btn_skip:"Skip validation",s1_btn_skip_sub:"Go to the next step without checking. DOIs will remain as is.",s1_checking:"Checking...",v_checking:"Validating sources via Crossref...",v_results:"Validation results",v_dl_enriched:"↓ Download enriched .bib",v_dl_original:"↓ Download original .bib",v_edit_hint:"Edited fields will be saved in the downloaded file.",v_generate_bib:"⟳ Generate .bib",v_generating:"Generating...",v_next:"Next →",v_recheck:"↺ Re-validate",th_num:"#",th_key:"Key",th_title:"Title",th_author:"Authors",th_year:"Year",th_journal:"Journal / Source",th_doi:"DOI",th_status:"Status",st_ok:"OK",st_warn:"Warning",st_err:"Error",st_checking:"Checking...",badge_ok:"✓ OK",badge_warn:"⚠ Warning",badge_err:"✕ Error",s2_title:"Create URI map",s2_desc:"Needed to link references from .bib to Zotero items. Export your Zotero collection as HTML and upload it here.",s2_upload_sec:"Upload file",s2_html_col:"HTML export from Zotero",s2_tsv_col:"Ready-made uri-map.tsv",s2_or:"or",s2_html_drop:"Drop or click",s2_tsv_drop:"Already have a file?",s2_result_title:"URI map created successfully",s2_match_ok:"Source count matches the .bib file",s2_match_warn:"Count does not match .bib — check the warning below",s2_file_ready:"File ready to use",s2_count_label:"sources",s2_back:"← Back",s2_dl_tsv:"↓ Download uri-map.tsv",s2_recreate:"↺ Recreate",s2_next:"Next →",s2_create_btn:"⚙ Create uri-map.tsv",s2_creating:"Creating map…",s2_err_title:"Error processing file",s2_p1_t:"Open Zotero",s2_p2_t:"Export collection",s2_p3_t:"Upload HTML",s2_p4_t:"URI map ready",s2_p1_b:"with the needed collection",s2_p2_b:"File → Export → HTML",s2_p3_b:"into the field below",s2_p4_b:"for the next step",s3_title:"Inject live Zotero fields into document",s3_desc:'Upload a Word file — the script replaces [1], [5][6][7] with live Zotero ADDIN fields. Then in Word: click "Add Bibliography" — reference list is ready and updates automatically.',s3_prereq_sec:"Required for processing",s3_map_title:"URI Map (Step 2)",s3_map_ok:t=>t?`${t} sources linked`:"Map loaded",s3_map_miss:"Go back to Step 2 →",s3_bib_title:"Bibliography (Step 1)",s3_bib_miss:"Go back to Step 1 →",s3_transform_sec:"What happens to the document",s3_before_lbl:"Current .docx",s3_after_lbl:"After processing — Zotero fields",s3_docx_sec:"Upload your paper",s3_docx_drop:"Drop .docx file here or click",s3_result_title:"Document processed successfully!",s3_result_sub:'Zotero ADDIN fields injected · download → open Word → click "Add/Edit Bibliography"',s3_stat_replaced:"Citations replaced",s3_stat_groups:"Citation groups",s3_err_title:"Processing error",s3_back:"← Back",s3_run:"▶ Start processing",s3_rerun:"↺ Process again",s3_running:"Processing...",s3_dl:"↓ Download result",s3_next:"Next → Word instructions",s4_title:"Done — one click left.",s4_sub:'Download the file, open it in Word with the Zotero plugin, click "Add/Edit Bibliography" — reference list appears automatically. Switch styles, delete citations — bibliography updates on its own.',s4_dl_main:"Download output_zotero.docx",s4_dl_sub:"Click, then open in Microsoft Word",s4_word_hd:"What to do next — in Word with the Zotero plugin",s4_ws1_t:"Open the downloaded file in Microsoft Word",s4_ws1_s:"Double-click output_zotero.docx — citations already look like live Zotero fields",s4_ws2_t:'Click "Add/Edit Bibliography" — reference list is ready',s4_ws2_s:"Zotero panel → Add/Edit Bibliography → reference list appears automatically",s4_ws3_t:"Switch styles — everything updates automatically",s4_ws3_s:"Zotero → Document Preferences → choose style (APA, IEEE, ГОСТ...) — citations reformat instantly.",s4_ws3_badge:"Done",s4_tip_title:"💡 How it works:",s4_tip:"The document contains the same ADDIN fields that the Zotero plugin creates when inserting citations manually. Word recognises them and hands control to Zotero: bibliography is managed dynamically.",s4_back:"← Back",s4_restart:"↺ Process another document",s4_refs_replaced:"Citations replaced",s4_cit_groups:"Citation groups",issue:{crossref_unresolved:"Not found in Crossref",doi_not_found:"DOI not found",doi_invalid_format:"Invalid DOI format",doi_title_mismatch:"DOI/title mismatch",doi_duplicate:"Duplicate DOI",metadata_not_corrected:"Metadata mismatch",mismatch_title:"Title mismatch",mismatch_author:"Author mismatch",mismatch_year:"Year mismatch",mismatch_journal:"Journal mismatch",mismatch_doi:"DOI mismatch",crossref_error:"API error"},stat:{processed:"Processed",doi_valid:"DOI valid",doi_added:"DOI added",doi_corrected:"DOI corrected",unresolved:"Unresolved",problem_entries:"Problem entries",entries_changed:"Entries changed",fields_changed:"Fields changed"}}};let v=class extends Ct{constructor(){super(...arguments),this.step=1,this.status="idle",this.log="",this._bibFile=null,this._bibJobId="",this._mailto="",this._mailtoError="",this._qrDataUrl="",this._walletCopied=!1,this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._editingCell=null,this._editedFields={},this._generatingBib=!1,this._lang=localStorage.getItem("lang")||"ru"}_t(t){return Y[this._lang][t]??Y.ru[t]??t}_setLang(t){this._lang=t,localStorage.setItem("lang",t)}connectedCallback(){super.connectedCallback(),V.toDataURL(ct,{width:200,margin:2,color:{dark:"#a3e635",light:"#060e06"},errorCorrectionLevel:"H"}).then(t=>{this._qrDataUrl=t})}updated(t){if(t.has("_editingCell")&&this._editingCell&&requestAnimationFrame(()=>{const e=this.shadowRoot?.querySelector(".cell-input");e&&(e.focus(),e.select())}),t.has("_entries")&&this.status==="processing"){const e=this.shadowRoot?.querySelector(".entry-list");e&&(e.scrollTop=e.scrollHeight)}}_ss(t){return t<this.step?"done":t===this.step?"active":"pending"}_goStep(t){this.step=t,this.status="idle",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation()}_clearValidation(){this._entries=[],this._totalEntries=0,this._checkedCount=0,this._currentKey="",this._validationStats={},this._validationDone=!1,this._editedFields={},this._editingCell=null,this._bibJobId=""}_getField(t,e){return this._editedFields[t.key]?.[e]??t.fields[e]??""}_clean(t){return t.replace(/[{}]/g,"")}async _copyWallet(){await navigator.clipboard.writeText(ct),this._walletCopied=!0,setTimeout(()=>{this._walletCopied=!1},2e3)}_onMailtoInput(t){const e=t.target,i=e.value.replace(/[^a-zA-Z0-9._%+\-@]/g,"").slice(0,254);i!==e.value&&(e.value=i),this._mailto=i,i?/^[a-zA-Z0-9._%+\-]{1,64}@[a-zA-Z0-9.\-]{1,253}\.[a-zA-Z]{2,}$/.test(i)?this._mailtoError="":this._mailtoError=this._lang==="ru"?"Неверный формат email":"Invalid email format":this._mailtoError=""}_isEdited(t,e){const i=this._editedFields[t.key]?.[e];return i!==void 0&&i!==(t.fields[e]??"")}_hasAnyEdits(){return Object.values(this._editedFields).some(t=>Object.keys(t).length>0)}_countByStatus(t){return this._entries.filter(e=>e.status===t).length}_handleStreamEvent(t){switch(t.type){case"start":this._totalEntries=t.total;break;case"entry_start":{const e=this._entries.find(i=>i.key===t.key);e?(e.status="checking",this._entries=[...this._entries]):this._entries=[...this._entries,{key:t.key,entry_type:"",status:"checking",issues:[],fields:{title:t.title||""},idx:t.idx}],this._currentKey=t.key;break}case"entry_done":{const e=this._entries.findIndex(i=>i.key===t.key);if(e>=0){const i=[...this._entries];i[e]={...i[e],status:t.status,issues:t.issues,...t.fields?{fields:t.fields}:{}},this._entries=i}t.idx>=0&&(this._checkedCount=t.idx);break}case"done":this._validationStats=t.stats??{},Array.isArray(t.entries)&&(this._entries=t.entries.map((e,i)=>({key:e.key,entry_type:e.entry_type,status:e.status,issues:e.issues,fields:e.fields,idx:i+1})));break;case"end":this._bibJobId=t.job_id,this._validationDone=!0,this.status=t.code===0?"done":"error",this._currentKey="",t.log&&(this.log=t.log);break;case"stream_error":this.status="error",this.log=t.message;break}}async _runValidate(){if(!this._bibFile)return;this.status="processing",this.log="",this._entries=[],this._totalEntries=0,this._checkedCount=0,this._validationDone=!1,this._validationStats={},this._bibJobId="",this._editedFields={};const t=new FormData;t.append("bib",this._bibFile),t.append("mailto",this._mailtoError?"":this._mailto);try{const e=await fetch("/api/validate-stream",{method:"POST",body:t});if(!e.ok||!e.body){const o=await e.json().catch(()=>({detail:"Server error"}));this.status="error",this.log=o.detail;return}const i=e.body.getReader(),r=new TextDecoder("utf-8");let s="";for(;;){const{done:o,value:n}=await i.read();if(o)break;s+=r.decode(n,{stream:!0});const a=s.split(`

`);s=a.pop()??"";for(const l of a){const d=l.trim();if(d.startsWith("data: "))try{this._handleStreamEvent(JSON.parse(d.slice(6)))}catch{}}}}catch(e){this.status="error",this.log=String(e)}}async _runParseHtml(){if(!this._htmlFile||!this._bibFile)return;this.status="processing",this.log="",this._parseCount=0,this._parseMatch=null,this._parseWarning="";const t=new FormData;t.append("html",this._htmlFile),t.append("bib",this._bibFile);try{const e=await fetch("/api/parse-html",{method:"POST",body:t}),i=await e.json();e.ok?(this.status="done",this._uriMapJobId=i.job_id,this._parseCount=i.count??0,this._parseMatch=i.match??null,this._parseWarning=i.warning??"",this.log=i.log):(this.status="error",this.log=i.detail)}catch(e){this.status="error",this.log=String(e)}}async _runInject(){if(!this._docxFile||!this._bibFile)return;this.status="processing",this.log="";const t=new FormData;if(t.append("docx",this._docxFile),this._bibJobId){const e=await fetch(`/api/download/${this._bibJobId}/references_enriched.bib`);t.append("bib",new File([await e.blob()],"references.bib"))}else t.append("bib",this._bibFile);if(this._uriMapJobId){const e=await fetch(`/api/download/${this._uriMapJobId}/uri-map.tsv`);t.append("uri_map",new File([await e.blob()],"uri-map.tsv"))}else this._uriMapDirect&&t.append("uri_map",this._uriMapDirect);t.append("library_type","users");try{const e=await fetch("/api/inject",{method:"POST",body:t}),i=await e.json();e.ok?(this.status="done",this._injectJobId=i.job_id,this._injectGroups=i.groups??0,this._injectReplaced=i.replaced??0,this.log=i.log):(this.status="error",this.log=i.detail)}catch(e){this.status="error",this.log=String(e)}}async _generateBib(){this._generatingBib=!0;const t=this._entries.map(e=>({key:e.key,entry_type:e.entry_type,fields:{...e.fields,...this._editedFields[e.key]??{}}}));try{const i=await(await fetch("/api/generate-bib",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({entries:t})})).blob(),r=URL.createObjectURL(i),s=document.createElement("a");s.href=r,s.download="references_edited.bib",s.click(),URL.revokeObjectURL(r)}catch(e){this.log=String(e)}finally{this._generatingBib=!1}}_updateField(t,e,i){const r=this._editedFields[t]??{};this._editedFields={...this._editedFields,[t]:{...r,[e]:i}}}_saveCell(t,e,i){this._updateField(t,e,i),this._editingCell=null}_reset(){this.step=1,this.status="idle",this.log="",this._bibFile=null,this._htmlFile=null,this._uriMapJobId="",this._uriMapDirect=null,this._docxFile=null,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this._parseCount=0,this._parseMatch=null,this._parseWarning="",this._clearValidation(),this.shadowRoot?.querySelectorAll("file-drop").forEach(t=>t.reset?.())}_renderLog(){return this.log?p`
      <div class="log-wrap">
        <div class="log-label">${this._t("log_label")}</div>
        <div class="log-box">${this.log}</div>
      </div>`:C}_statusIcon(t){switch(t){case"checking":return p`<span class="spinner-sm"></span>`;case"ok":return p`<span class="status-icon">✓</span>`;case"warn":return p`<span class="status-icon">⚠</span>`;case"error":return p`<span class="status-icon">✕</span>`;default:return p`<span class="status-icon">·</span>`}}_statusLabel(t){const e=Y[this._lang].issue;return t.status==="checking"?this._t("st_checking"):t.status==="ok"?this._t("st_ok"):t.status==="warn"?t.issues.length?e[t.issues[0]]??this._t("st_warn"):this._t("st_warn"):t.status==="error"?t.issues.length?e[t.issues[0]]??this._t("st_err"):this._t("st_err"):""}_statusBadge(t){return t==="ok"?p`<span class="badge badge-ok">${this._t("badge_ok")}</span>`:t==="warn"?p`<span class="badge badge-warn">${this._t("badge_warn")}</span>`:t==="error"?p`<span class="badge badge-error">${this._t("badge_err")}</span>`:C}_issueTag(t,e){const r=Y[this._lang].issue[t]??t;return p`<span class="issue-tag ${e==="error"?"error":"warn"}">${r}</span>`}_renderCell(t,e,i="—"){const r=this._getField(t,e),s=this._editingCell?.key===t.key&&this._editingCell?.field===e,o=this._isEdited(t,e);if(s)return p`
        <div class="cell-wrap">
          <input class="cell-input" type="text" .value=${r}
            @blur=${a=>this._saveCell(t.key,e,a.target.value)}
            @keydown=${a=>{a.key==="Enter"&&this._saveCell(t.key,e,a.target.value),a.key==="Escape"&&(this._editingCell=null)}}
          />
        </div>`;const n=r?this._clean(r):i;return p`
      <div class="cell-wrap">
        <div class="cell-text ${o?"edited":""} ${r?"":"empty"}"
          title="${n}"
          @click=${()=>{this._editingCell={key:t.key,field:e}}}>
          ${n}
        </div>
      </div>`}_renderValidationProgress(){const t=this._totalEntries>0?Math.round(this._checkedCount/this._totalEntries*100):0;return p`
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
            <div class="progress-fill" style="width:${t}%"></div>
          </div>
        </div>

        <div class="entry-list">
          ${this._entries.map(e=>p`
            <div class="entry-row ${e.status}">
              <div class="entry-idx">${e.idx}</div>
              <div class="entry-key">${e.key}</div>
              <div class="entry-title">${this._clean(this._getField(e,"title")||e.fields.title||"")}</div>
              <div class="entry-status ${e.status}">
                ${this._statusIcon(e.status)}
                ${this._statusLabel(e)}
              </div>
            </div>
          `)}
        </div>
      </div>

      ${this._renderLog()}
    `}_renderResultsTable(){const t=this._countByStatus("ok"),e=this._countByStatus("warn"),i=this._countByStatus("error"),r=this._entries.length,s=this._hasAnyEdits();return p`
      <!-- Summary stats -->
      <div class="stats-grid">
        <div class="stat-cell">
          <div class="stat-val">${r}</div>
          <div class="stat-label">${this._lang==="en"?"Total":"Всего записей"}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val ok">${t}</div>
          <div class="stat-label">${this._t("st_ok")}</div>
        </div>
        <div class="stat-cell">
          <div class="stat-val warn">${e}</div>
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
          </a>`:C}

        <button class="btn btn-blue" style="font-size:12px"
          ?disabled=${this._generatingBib}
          @click=${this._generateBib}>
          ${this._generatingBib?p`<span class="spinner"></span> ${this._t("v_generating")}`:p`↓ ${this._lang==="en"?"Save":"Сохранить"}${s?this._lang==="en"?" (with edits)":" (с правками)":""} .bib`}
        </button>

        <button class="btn btn-next" style="font-size:12px"
          @click=${()=>this._goStep(2)}>
          ${this._t("v_next")}
        </button>
      </div>

      <!-- Table -->
      <div class="table-card">
        <div class="table-toolbar">
          <div class="table-toolbar-title">${this._lang==="en"?"Sources — click a cell to edit":"Источники — нажмите на ячейку, чтобы отредактировать"}</div>
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
                        ${o.issues.map(a=>this._issueTag(a,o.status))}
                      </div>`:C}
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

        ${s?p`
          <div class="table-footer">
            <div class="changed-hint">${this._lang==="en"?'Unsaved edits — click "Save .bib"':"Есть несохранённые правки — нажмите «Сохранить .bib»"}</div>
            <button class="btn btn-blue" style="font-size:12px"
              ?disabled=${this._generatingBib}
              @click=${this._generateBib}>
              ${this._generatingBib?p`<span class="spinner"></span> ${this._t("v_generating")}`:this._lang==="en"?"↓ Save with edits .bib":"↓ Сохранить с правками .bib"}
            </button>
          </div>`:C}
      </div>

      ${this._renderLog()}
    `}_step1(){return this.status==="processing"&&this._entries.length>0?this._renderValidationProgress():this._validationDone?this._renderResultsTable():this._renderStep1Form()}_renderStep1Form(){const t=!!this._bibFile,e=this.status==="processing",i=!this._mailto||!this._mailtoError;return p`
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
          @file-selected=${r=>{this._bibFile=r.detail,this._clearValidation()}}
        ></file-drop>

        ${t?p`
          <div class="bib-file-info">
            <div class="bfi-icon">📄</div>
            <div>
              <div class="bfi-name">${this._bibFile.name}</div>
              <div class="bfi-sub">${this._t("s1_file_ready")}</div>
            </div>
          </div>`:C}

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
          ${this._mailtoError?p`<div class="field-msg err">✕ ${this._mailtoError}</div>`:this._mailto?p`<div class="field-msg ok">✓ ${this._lang==="ru"?"Email подтверждён":"Email accepted"}</div>`:p`<div class="field-msg" style="color:#3a4d42">${this._t("s1_email_hint")}</div>`}
        </div>

        ${this._renderLog()}

        <!-- Action cards -->
        <div class="action-row">
          <button class="action-card primary" ?disabled=${!t||e||!i}
            @click=${this._runValidate}>
            <div class="ac-icon">🔍</div>
            <div class="ac-title ac-primary">
              ${e?p`<span class="spinner" style="display:inline-block;width:13px;height:13px;vertical-align:middle;margin-right:6px;color:#a3e635"></span>`:C}
              ${e?this._t("s1_checking"):this._t("s1_btn_check")}
            </div>
            <div class="ac-sub">${this._t("s1_btn_check_sub")}</div>
          </button>

          <button class="action-card" ?disabled=${!t||e}
            @click=${()=>this._goStep(2)}>
            <div class="ac-icon">⏭</div>
            <div class="ac-title">${this._t("s1_btn_skip")}</div>
            <div class="ac-sub">${this._t("s1_btn_skip_sub")}</div>
          </button>
        </div>
      </div>
    `}_step2(){const t=!!this._uriMapJobId||!!this._uriMapDirect,e=!!this._htmlFile,i=!!this._uriMapJobId,r=this.status==="processing",s=this.status==="error",o="ps-info",n="ps-info",a=i||e?"ps-done":"ps-active",l=i?"ps-done":e?"ps-active":"ps-muted",d=p`
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
            <div class="ps-sub">${this._lang==="en"?"Select all Ctrl+A":"Выделите все источники: Ctrl+A"}</div>
          </div>

          <div class="pa">${d}</div>

          <div class="ps ${n}">
            <div class="ps-icon">📋</div>
            <div class="ps-title">${this._t("s2_p2_t")}</div>
            <div class="ps-sub">Scannable Cite → Save as HTML</div>
          </div>

          <div class="pa ${e||i?"pa-done":"pa-active"}">${d}</div>

          <div class="ps ${a}">
            ${i||e?p`<div class="ps-badge">✓</div>`:C}
            <div class="ps-icon">${e||i?"📄":"⬆"}</div>
            <div class="ps-title">${e||i?this._lang==="en"?"HTML uploaded":"HTML загружен":this._t("s2_p3_t")}</div>
            <div class="ps-sub">${e?this._htmlFile.name.slice(0,22)+(this._htmlFile.name.length>22?"…":""):this._lang==="en"?"file from Zotero":"файл из Zotero"}</div>
          </div>

          <div class="pa ${i?"pa-done":e?"pa-active":""}">${d}</div>

          <div class="ps ${l}">
            ${i?p`<div class="ps-badge">✓</div>`:C}
            <div class="ps-icon">
              ${r?p`<span class="spinner" style="color:#a3e635;width:20px;height:20px;border-width:2.5px"></span>`:i?"✅":"⚙"}
            </div>
            <div class="ps-title">${i?this._t("s2_p4_t"):r?this._t("s2_creating"):this._lang==="en"?"Create URI map":"Создайте URI-карту"}</div>
            <div class="ps-sub">${i?`${this._parseCount} ${this._t("s2_count_label")}`:r?this._lang==="en"?"Processing…":"Обрабатываю файл":this._lang==="en"?"Click the button below":"Нажмите кнопку ниже"}</div>
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
        ${i&&!s?p`
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
            </div>`:C}
        `:C}

        ${s?p`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t("s2_err_title")}</div>
              <div style="font-size:11px;opacity:0.8">${this.log}</div>
            </div>
          </div>`:C}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(1)}>${this._t("s2_back")}</button>

          ${e&&!i?p`
            <button class="btn btn-blue"
              ?disabled=${r}
              @click=${this._runParseHtml}>
              ${r?p`<span class="spinner"></span> ${this._t("s2_creating")}`:this._t("s2_create_btn")}
            </button>`:C}

          ${i?p`
            <a class="btn btn-ghost" style="font-size:12px"
               href="/api/download/${this._uriMapJobId}/uri-map.tsv"
               download="uri-map.tsv">${this._t("s2_dl_tsv")}</a>
            <button class="btn btn-ghost" style="font-size:12px"
              @click=${()=>{this._uriMapJobId="",this._htmlFile=null,this._parseCount=0,this._parseMatch=null,this.status="idle",this.log="",this.shadowRoot?.querySelectorAll("file-drop").forEach(c=>c.reset?.())}}>${this._t("s2_recreate")}</button>`:C}

          <div class="spacer"></div>
          <button class="btn btn-next" ?disabled=${!t}
            @click=${()=>this._goStep(3)}>
            ${this._t("s2_next")}
          </button>
        </div>
      </div>
    `}_step3(){const t=!!this._uriMapJobId||!!this._uriMapDirect,e=!!this._docxFile,i=!!this._injectJobId,r=this.status==="processing",s=this.status==="error",o=this._parseCount,n=p`
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
          <div class="prereq-item ${t?"ok":"missing"}">
            <div class="prereq-ico">${t?"✓":"!"}</div>
            <div>
              <div class="prereq-title">${this._t("s3_map_title")}</div>
              <div class="prereq-sub">
                ${t?this._t("s3_map_ok")(o):this._t("s3_map_miss")}
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
          @file-selected=${a=>{this._docxFile=a.detail,this._injectJobId="",this._injectGroups=0,this._injectReplaced=0,this.status="idle",this.log=""}}>
        </file-drop>

        <!-- Result panel -->
        ${i&&!s?p`
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
          </div>`:C}

        ${s?p`
          <div class="parse-warning" style="margin-top:12px">
            <span style="font-size:16px;flex-shrink:0">✕</span>
            <div>
              <div style="font-weight:700;margin-bottom:4px">${this._t("s3_err_title")}</div>
              <div style="font-size:11px;opacity:0.8;white-space:pre-wrap">${this.log}</div>
            </div>
          </div>`:C}

        <div class="btn-row" style="margin-top:20px">
          <button class="btn btn-ghost" @click=${()=>this._goStep(2)}>${this._t("s3_back")}</button>

          <button class="btn btn-red"
            ?disabled=${!e||!t||r}
            @click=${this._runInject}>
            ${r?p`<span class="spinner"></span> ${this._t("s3_running")}`:i?this._t("s3_rerun"):this._t("s3_run")}
          </button>

          ${i?p`
            <a class="btn btn-green"
               href="/api/download/${this._injectJobId}/output_zotero.docx"
               download="output_zotero.docx">${this._t("s3_dl")}</a>
            <div class="spacer"></div>
            <button class="btn btn-next" @click=${()=>this._goStep(4)}>
              ${this._t("s3_next")}
            </button>`:C}
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
          </div>`:C}
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
        </div>`:C}

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
              ${this._lang==="ru"?p`Понравилось? Ваш донат — <em>топливо</em>.`:p`Found it useful? Your donation <em>fuels</em> this.`}
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
            </div>`:C}
          <div class="donate-addr-row">
            <code class="donate-addr-text">${ct}</code>
            <button class="donate-copy-btn ${this._walletCopied?"copied":""}"
              @click=${this._copyWallet}>
              ${this._walletCopied?"✓ OK":this._lang==="ru"?"Копировать":"Copy"}
            </button>
          </div>
          <div class="donate-hint">
            ${this._lang==="ru"?p`<strong>Отправляйте только USDT (TRC-20) в сети TRON.</strong> Другие активы будут безвозвратно утеряны.`:p`<strong>USDT (TRC-20) on TRON network only.</strong> Sending other assets will result in permanent loss.`}
          </div>
        </div>
      </div>

      <div class="btn-row">
        <button class="btn btn-ghost" @click=${()=>this._goStep(3)}>${this._t("s4_back")}</button>
        <div class="spacer"></div>
        <button class="btn btn-ghost" @click=${this._reset}>${this._t("s4_restart")}</button>
      </div>
    `}render(){const t=[{n:1,name:this._t("step1")},{n:2,name:this._t("step2")},{n:3,name:this._t("step3")},{n:4,name:this._t("step4")}],e=this._validationDone&&this.step===1;return p`
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
        ${t.map((i,r)=>p`
          ${r>0?p`<div class="step-connector ${this._ss(t[r-1].n)==="done"?"done":""}"></div>`:C}
          <div class="step-pill ${this._ss(i.n)}">
            <div class="step-dot ${this._ss(i.n)}">
              ${this._ss(i.n)==="done"?"✓":i.n}
            </div>
            <span class="step-name ${this._ss(i.n)}">${i.name}</span>
          </div>
        `)}
      </div>

      <main style=${e?"max-width:1140px":""}>
        ${this.step===1?this._step1():C}
        ${this.step===2?this._step2():C}
        ${this.step===3?this._step3():C}
        ${this.step===4?this._step4():C}
      </main>
    `}};v.styles=kt`
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
  `;y([w()],v.prototype,"step",2);y([w()],v.prototype,"status",2);y([w()],v.prototype,"log",2);y([w()],v.prototype,"_bibFile",2);y([w()],v.prototype,"_bibJobId",2);y([w()],v.prototype,"_mailto",2);y([w()],v.prototype,"_mailtoError",2);y([w()],v.prototype,"_qrDataUrl",2);y([w()],v.prototype,"_walletCopied",2);y([w()],v.prototype,"_htmlFile",2);y([w()],v.prototype,"_uriMapJobId",2);y([w()],v.prototype,"_uriMapDirect",2);y([w()],v.prototype,"_docxFile",2);y([w()],v.prototype,"_injectJobId",2);y([w()],v.prototype,"_injectGroups",2);y([w()],v.prototype,"_injectReplaced",2);y([w()],v.prototype,"_entries",2);y([w()],v.prototype,"_totalEntries",2);y([w()],v.prototype,"_checkedCount",2);y([w()],v.prototype,"_currentKey",2);y([w()],v.prototype,"_validationStats",2);y([w()],v.prototype,"_validationDone",2);y([w()],v.prototype,"_parseCount",2);y([w()],v.prototype,"_parseMatch",2);y([w()],v.prototype,"_parseWarning",2);y([w()],v.prototype,"_editingCell",2);y([w()],v.prototype,"_editedFields",2);y([w()],v.prototype,"_generatingBib",2);y([w()],v.prototype,"_lang",2);v=y([Et("app-root")],v);
