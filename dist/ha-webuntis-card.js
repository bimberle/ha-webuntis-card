!function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */function t(t,e,i,s){var o,r=arguments.length,n=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(o=t[l])&&(n=(r<3?o(n):r>3?o(e,i,n):o(e,i))||n);return r>3&&n&&Object.defineProperty(e,i,n),n
/**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}const e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;class o{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new o("string"==typeof t?t:t+"",i))(e)})(t):t
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */;var n;const l=window.trustedTypes,a=l?l.emptyScript:"",h=window.reactiveElementPolyfillSupport,d={toAttribute(t,e){switch(e){case Boolean:t=t?a:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},c=(t,e)=>e!==t&&(e==e||t==t),u={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:c};class p extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=u){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||u}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const i=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),s=window.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=u){var s,o;const r=this.constructor._$Eh(t,i);if(void 0!==r&&!0===i.reflect){const n=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:d.toAttribute)(e,i.type);this._$Ei=t,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Ei=null}}_$AK(t,e){var i,s,o;const r=this.constructor,n=r._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=r.getPropertyOptions(n),l=t.converter,a=null!==(o=null!==(s=null===(i=l)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof l?l:null)&&void 0!==o?o:d.fromAttribute;this._$Ei=n,this[n]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||c)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var v;p.finalized=!0,p.elementProperties=new Map,p.elementStyles=[],p.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:p}),(null!==(n=globalThis.reactiveElementVersions)&&void 0!==n?n:globalThis.reactiveElementVersions=[]).push("1.2.0");const m=globalThis.trustedTypes,g=m?m.createPolicy("lit-html",{createHTML:t=>t}):void 0,b=`lit$${(Math.random()+"").slice(9)}$`,$="?"+b,f=`<${$}>`,_=document,y=(t="")=>_.createComment(t),w=t=>null===t||"object"!=typeof t&&"function"!=typeof t,x=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,S=/-->/g,E=/>/g,C=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,k=/'/g,T=/"/g,D=/^(?:script|style|textarea)$/i,U=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),H=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),N=new WeakMap,I=_.createTreeWalker(_,129,null,!1),R=(t,e)=>{const i=t.length-1,s=[];let o,r=2===e?"<svg>":"",n=A;for(let e=0;e<i;e++){const i=t[e];let l,a,h=-1,d=0;for(;d<i.length&&(n.lastIndex=d,a=n.exec(i),null!==a);)d=n.lastIndex,n===A?"!--"===a[1]?n=S:void 0!==a[1]?n=E:void 0!==a[2]?(D.test(a[2])&&(o=RegExp("</"+a[2],"g")),n=C):void 0!==a[3]&&(n=C):n===C?">"===a[0]?(n=null!=o?o:A,h=-1):void 0===a[1]?h=-2:(h=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?C:'"'===a[3]?T:k):n===T||n===k?n=C:n===S||n===E?n=A:(n=C,o=void 0);const c=n===C&&t[e+1].startsWith("/>")?" ":"";r+=n===A?i+f:h>=0?(s.push(l),i.slice(0,h)+"$lit$"+i.slice(h)+b+c):i+b+(-2===h?(s.push(void 0),e):c)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==g?g.createHTML(l):l,s]};class M{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const n=t.length-1,l=this.parts,[a,h]=R(t,e);if(this.el=M.createElement(a,i),I.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=I.nextNode())&&l.length<n;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(b)){const i=h[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(b),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?B:"?"===e[1]?W:"@"===e[1]?q:V})}else l.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(D.test(s.tagName)){const t=s.textContent.split(b),e=t.length-1;if(e>0){s.textContent=m?m.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],y()),I.nextNode(),l.push({type:2,index:++o});s.append(t[e],y())}}}else if(8===s.nodeType)if(s.data===$)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(b,t+1));)l.push({type:7,index:o}),t+=b.length-1}o++}}static createElement(t,e){const i=_.createElement("template");return i.innerHTML=t,i}}function O(t,e,i=t,s){var o,r,n,l;if(e===H)return e;let a=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const h=w(e)?void 0:e._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===h?a=void 0:(a=new h(t),a._$AT(t,i,s)),void 0!==s?(null!==(n=(l=i)._$Cl)&&void 0!==n?n:l._$Cl=[])[s]=a:i._$Cu=a),void 0!==a&&(e=O(t,a._$AS(t,e.values),a,s)),e}class L{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:_).importNode(i,!0);I.currentNode=o;let r=I.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new z(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new K(r,this,t)),this.v.push(e),a=s[++l]}n!==(null==a?void 0:a.index)&&(r=I.nextNode(),n++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class z{constructor(t,e,i,s){var o;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),w(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==H&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return x(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==P&&w(this._$AH)?this._$AA.nextSibling.data=t:this.S(_.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=M.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new L(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=N.get(t.strings);return void 0===e&&N.set(t.strings,e=new M(t)),e}A(t){x(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new z(this.M(y()),this.M(y()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class V{constructor(t,e,i,s,o){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(void 0===o)t=O(this,t,e,0),r=!w(t)||t!==this._$AH&&t!==H,r&&(this._$AH=t);else{const s=t;let n,l;for(t=o[0],n=0;n<o.length-1;n++)l=O(this,s[i+n],e,n),l===H&&(l=this._$AH[n]),r||(r=!w(l)||l!==this._$AH[n]),l===P?t=P:t!==P&&(t+=(null!=l?l:"")+o[n+1]),this._$AH[n]=l}r&&!s&&this.k(t)}k(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class B extends V{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===P?void 0:t}}const j=m?m.emptyScript:"";class W extends V{constructor(){super(...arguments),this.type=4}k(t){t&&t!==P?this.element.setAttribute(this.name,j):this.element.removeAttribute(this.name)}}class q extends V{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=O(this,t,e,0))&&void 0!==i?i:P)===H)return;const s=this._$AH,o=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==P&&(s===P||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}}const F=window.litHtmlPolyfillSupport;
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
var J,Q;null==F||F(M,z),(null!==(v=globalThis.litHtmlVersions)&&void 0!==v?v:globalThis.litHtmlVersions=[]).push("2.1.1");class Z extends p{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let n=r._$litPart$;if(void 0===n){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;r._$litPart$=n=new z(e.insertBefore(y(),t),t,void 0,null!=i?i:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return H}}Z.finalized=!0,Z._$litElement$=!0,null===(J=globalThis.litElementHydrateSupport)||void 0===J||J.call(globalThis,{LitElement:Z});const G=globalThis.litElementPolyfillSupport;null==G||G({LitElement:Z}),(null!==(Q=globalThis.litElementVersions)&&void 0!==Q?Q:globalThis.litElementVersions=[]).push("3.1.1");
/**
     * @license
     * Copyright 2017 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
const X=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Y(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):X(t,e)
/**
     * @license
     * Copyright 2021 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */}var tt;null===(tt=window.HTMLSlotElement)||void 0===tt||tt.prototype.assignedElements;class et extends Z{constructor(){super(...arguments),this.klausuren=[],this.homework=[],this.startIndex=0,this.dayCount=0,this.initialized=!1,this.actualDate="",this.lastVisibleDate=new Date,this.lastCall=new Date(2022,1,1),this.simStoreItemName="webuntiscallrunning"}render(){var t,e,i;return null!=this.timetable?(this.initialized||(this.initialized=!0),U`<ha-card class="webuntiscard">${this.cardTitle?U`<div class="card-header"><div class="truncate"><div class="cardTitle">${this.cardTitle}</div>${this.renderNotification()}<div class="last" @click="${()=>this._showLastWeek()}">${this.startIndex-5>=0?U`<ha-icon icon="mdi:chevron-left"></ha-icon>`:U``}</div><div class="next" @click="${()=>this._showNextWeek()}">${this.startIndex+5<this.dayCount?U`<ha-icon icon="mdi:chevron-right"></ha-icon>`:U``}</div></div></div>`:U``}<div class="card-content"><div class="days"><div class="day"><div class="hourheader"> </div><div class="daydate"> </div><div class="hours">${null===(e=null===(t=this.timetable)||void 0===t?void 0:t.data)||void 0===e?void 0:e.startTimetimes.map(((t,e)=>{if(null==this.lastHour||this.lastHour>=Number(t.key.substring(0,2)))return U`<div class="lesson"><div class="${this._getHourActiveStyle(t.key,"hourheader")}">${t.key}</div><div class="${this._getHourActiveStyle(t.key,"hourend")}">${t.value}</div></div>`}))}</div></div>${null===(i=this.visibleTimetable)||void 0===i?void 0:i.map(((t,e)=>U`<div class="${this.actualDate==t.value[0].date.substring(0,6)?"currentDay":"day"}"><div class="dayheader">${t.value[0].tagname}</div><div class="daydate">${t.value[0].date.substring(0,6)}</div><div class="lessons">${t.value.map((t=>{if(null==this.lastHour||this.lastHour>=Number(t.startTime.substring(0,2)))return U`<div class="lesson"><div class="${this._getHourActiveStyle(t.startTime,"lessonheader")}">${""!=t.fach?t.fach.substring(0,6):"-"}</div><div class="${this._getHourActiveStyle(t.startTime,"teacher")}">${""!=t.lehrer?t.lehrer.substring(0,12):"-"}</div></div>`}))}</div></div>`))}</div></div><div>Hausaufgaben</div><div class="homework">${this.homework.map(((t,e)=>U`<div class="homeworkRow"><div class="homeworkDateCol"><div class="homeworkLesson">${t.fach}</div><div class="homeworkDueDate">${t.faelligkeitsdatum}</div></div><div class="homeworkTextCol"><div>${t.text} ${t.remark}</div></div></div>`))}</div></ha-card>`):U`<div>Loading...</div>`}shouldUpdate(t){if(this.initialized){var e=!1;return t.has("visibleTimetable")&&(e=!0),t.has("actualDate")&&(e=!0),this.actualDate!=this.getCurrentDateString()&&(this.actualDate=this.getCurrentDateString()),e}return!0}updated(t){super.updated(t),t.has("hass")&&t.get("hass")}renderNotification(){var t,e;if((null===(t=this.timetable)||void 0===t?void 0:t.notifications)&&this.timetable.notifications>0){var i=!1;return(null===(e=this.timetable)||void 0===e?void 0:e.timetableurl)&&""!=this.timetable.timetableurl&&(i=!0),U`${i?U`<a target="_blank" href="${this.timetable.timetableurl}"></a>`:""}<div class="notificationbadge"><ha-icon icon="mdi:bell"></ha-icon><div class="badge">${this.timetable.notifications}</div></div>${i?U``:""}`}return U``}_parseDate(t){var e=t.match(/(\d+)/g);return null!=e?new Date(parseInt(e[2]),parseInt(e[1])-1,parseInt(e[0])):new Date}_showNextWeek(){var t,e,i;this.startIndex+=5;var s=this.startIndex+5>this.dayCount?this.dayCount:this.startIndex+5;this.visibleTimetable=null!==(i=null===(e=null===(t=this.timetable)||void 0===t?void 0:t.data)||void 0===e?void 0:e.timetable.slice(this.startIndex,s))&&void 0!==i?i:[],this.setLastVisibleDate()}_showLastWeek(){var t,e,i;this.startIndex-=5,this.startIndex<0&&(this.startIndex=0),this.visibleTimetable=null!==(i=null===(e=null===(t=this.timetable)||void 0===t?void 0:t.data)||void 0===e?void 0:e.timetable.slice(this.startIndex,this.startIndex+5))&&void 0!==i?i:[],this.setLastVisibleDate()}setLastVisibleDate(){var t=this.visibleTimetable?this.visibleTimetable[this.visibleTimetable.length-1].value[0].date:"";this.lastVisibleDate=this._parseDate(t)}getCurrentDateString(){var t=new Date;return this.actualDate="",this.actualDate+=t.getUTCDate()<10?"0"+t.getUTCDate().toString():t.getUTCDate().toString(),this.actualDate+=t.getUTCMonth()<10?".0"+t.getUTCMonth().toString():"."+t.getUTCMonth().toString(),this.actualDate+="."}isComingDateVisible(){var t=new Date;let e=this.lastVisibleDate.getTime()-t.getTime();return Math.ceil(e/864e5)>=0}getDateDiffInSeconds(t,e){return t||(t=new Date),e||(e=new Date),(e.getTime()-t.getTime())/1e3}setLock(){localStorage.setItem(this.simStoreItemName,(new Date).toDateString())}removeLock(){localStorage.removeItem(this.simStoreItemName),this.lastCall=new Date}canRunQuery(){let t=!1;if(this.getDateDiffInSeconds(this.lastCall)/60>15&&this.getDateDiffInSeconds(this.lastCall)>900){let e=localStorage.getItem(this.simStoreItemName);null==e&&(t=!0),null!=e&&this.getDateDiffInSeconds(new Date(e))>5&&(t=!0)}return t}_getHourActiveStyle(t,e){return this.lastHour&&Number(t.substring(0,2))>this.lastHour?e+"inactive":e}static get styles(){return((t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new o(s,i)})([".webuntiscard{max-width:390px;display:flex;flex-direction:column;justify-content:space-between;}.truncate{white-space:nowrap;text-overflow:ellipsis;overflow:hidden;display:inline-flex;flex-direction:row;}.card-content > div{margin-bottom:8px;}.card-content > div:last-child{margin-bottom:0;}.entity-spacing:first-child{margin-top:0;}.entity-spacing:last-child{margin-bottom:0;}.entity-row{display:flex;align-items:center;}.entity-row .name{flex:1;margin:0 6px;}.entity-row .secondary{color:var(--primary-color);}.entity-row .icon{flex:0 0 40px;border-radius:50%;text-align:center;line-height:40px;margin-right:10px;}.days{display:flex;}.day{display:flex;flex-direction:column;}.currentDay{display:flex;flex-direction:column;background-color:rgba(255,255,255,0.2);}.dayheader{font-weight:bold;text-align:center;min-width:60px;color:var(--sidebar-selected-icon-color);height:15px;}.hourheader{width:40px;color:var(--sidebar-selected-icon-color);}.hours{color:var(--sidebar-selected-icon-color);padding-left:5px;padding-right:5px;}.daydate{font-size:x-small;opacity:0.5;text-align:center;color:var(--sidebar-selected-icon-color);}.lessons{display:flex;flex-direction:column;}.lessonheader{text-align:center;height:15px;}.lessonheaderinactive{text-align:center;height:15px;opacity:0.1;}.hourheader{text-align:center;height:15px;color:var(--sidebar-selected-icon-color);width:35px;}.hourheaderinactive{text-align:center;height:15px;color:var(--sidebar-selected-icon-color);opacity:0.1;}.teacher{font-size:x-small;text-align:center;opacity:0.5;padding-bottom:10px;}.teacherinactive{font-size:x-small;text-align:center;opacity:0.1;padding-bottom:10px;}.hourend{font-size:x-small;text-align:center;opacity:0.5;padding-bottom:10px;color:var(--sidebar-selected-icon-color);}.hourendinactive{font-size:x-small;text-align:center;opacity:0.1;padding-bottom:10px;color:var(--sidebar-selected-icon-color);}.next{align-items:flex-end;color:var(--sidebar-selected-icon-color);cursor:pointer;flex-grow:1;}.last{align-items:flex-end;color:var(--sidebar-selected-icon-color);cursor:pointer;flex-grow:1;}.cardTitle{flex-grow:2;}.notificationbadge{flex-grow:1;display:flex;}.badge{padding:3px 6px;color:white;font-size:smaller;}.homework{display:table;}.homeworkRow{padding:5px;border:1px solid #00aaf4;margin:5px;border-radius:8px;display:flex;}.homeworkDate{color:var(--sidebar-selected-icon-color);display:flex;flex-direction:row;}.homeworkLesson{color:var(--sidebar-selected-icon-color);font-size:large;text-align:center;}.homeworkDueDate{color:var(--sidebar-selected-icon-color);text-align:center;}.homeworkDateCol{color:var(--sidebar-selected-icon-color);width:20%;flex-direction:column;}.homeworkTextCol{display:flex;width:80%;flex-direction:column;}.homeworkTextContent{flex-direction:column;}"])}set hass(t){this._hass=t,this.actualDate=this.getCurrentDateString(),this.canRunQuery()&&(this.setLock(),this.getTimetableFromUrl().then((t=>{var e,i,s,o,r,n;this.removeLock(),null!=t&&(this.timetable=t,null!=this.timetable.data&&(this.visibleTimetable=null!==(e=this.timetable.data.timetable.slice(this.startIndex,5))&&void 0!==e?e:[],this.dayCount=null!==(i=this.timetable.data.timetable.length)&&void 0!==i?i:0,this.setLastVisibleDate()),null!=(null===(o=null===(s=this.timetable)||void 0===s?void 0:s.data)||void 0===o?void 0:o.klausuren)&&(this.klausuren=this.timetable.data.klausuren),null!=(null===(n=null===(r=this.timetable)||void 0===r?void 0:r.data)||void 0===n?void 0:n.homework)&&(this.homework=this.timetable.data.homework))})))}setConfig(t){t.title&&(this.cardTitle=t.title),t.lastHour&&(this.lastHour=t.lastHour),t.api_url&&(this.api_url=t.api_url),t.webuntis_url&&(this.webuntis_url=t.webuntis_url),t.webuntis_user&&(this.webuntis_user=t.webuntis_user),t.webuntis_key&&(this.webuntis_key=t.webuntis_key),t.webuntis_schoolnumber&&(this.webuntis_schoolnumber=t.webuntis_schoolnumber),t.webuntis_school&&(this.webuntis_school=t.webuntis_school),t.debug?this.debug=t.debug:this.debug=!1,this.startIndex=0}getTimetableFromUrl(){let t=this.api_url+"/x/x/"+this.webuntis_url+"/"+this.webuntis_school+"/"+this.webuntis_user+"/"+this.webuntis_key+"/"+this.webuntis_schoolnumber;return this.debug?t+="/true":t+="/false",fetch(t).then((t=>t.json())).then((t=>(null!=t.data.klausuren&&1!=t.data.klausuren||(t.data.klausuren=[]),this.debug&&console.debug(t),t)))}}t([Y({attribute:!1})],et.prototype,"cardTitle",void 0),t([Y({attribute:!1})],et.prototype,"debug",void 0),t([Y({attribute:!1})],et.prototype,"api_url",void 0),t([Y({attribute:!1})],et.prototype,"webuntis_url",void 0),t([Y({attribute:!1})],et.prototype,"webuntis_school",void 0),t([Y({attribute:!1})],et.prototype,"webuntis_user",void 0),t([Y({attribute:!1})],et.prototype,"webuntis_key",void 0),t([Y({attribute:!1})],et.prototype,"webuntis_schoolnumber",void 0),t([Y({attribute:!1})],et.prototype,"timetable",void 0),t([Y({attribute:!1})],et.prototype,"lastHour",void 0),t([Y({attribute:!1})],et.prototype,"visibleTimetable",void 0),t([Y()],et.prototype,"_config",void 0),t([Y({attribute:!1})],et.prototype,"actualDate",void 0);customElements.define("ha-webuntis-card",et),console.info("%c HA WEBUNTIS CARD %c 2.0.0","color: white; background: gray; font-weight: 700;","color: gray; background: white; font-weight: 700;")}();
//# sourceMappingURL=ha-webuntis-card.js.map
