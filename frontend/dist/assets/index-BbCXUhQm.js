import{j as s,Q as Xs,u as un,a as cr,b as lr,c as Qs}from"./query-Bhsxn2zD.js";import{a as hn,r as f,g as Zs,R as Ee,u as We,b as ei,c as ti,d as fe,N as lt,B as ri}from"./vendor-C4A9cDrs.js";import{t as ni,c as si,L as Wt,Z as mn,A as Gt,S as qt,C as Ge,B as Me,T as dt,a as ii,b as ai,G as oi,d as ci,e as li,M as di,f as ui,g as Kt,h as Jt,i as Yt,j as Ct,k as kr,P as hi,R as Le,X as Te,l as mi,V as Er,m as fi,n as pi,E as gi,o as st,p as ut,q as xi,r as bi,s as yi,U as vi,u as Tr,v as wi,w as _i,x as Ni}from"./ui-DdC3ilay.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();var Xt={},Cr=hn;Xt.createRoot=Cr.createRoot,Xt.hydrateRoot=Cr.hydrateRoot;const ji="modulepreload",Ii=function(r){return"/"+r},Ar={},Fe=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));i=Promise.allSettled(t.map(l=>{if(l=Ii(l),l in Ar)return;Ar[l]=!0;const d=l.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":ji,d||(u.as="script"),u.crossOrigin="",u.href=l,c&&u.setAttribute("nonce",c),document.head.appendChild(u),d)return new Promise((m,p)=>{u.addEventListener("load",m),u.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function a(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return i.then(o=>{for(const c of o||[])c.status==="rejected"&&a(c.reason);return e().catch(a)})};var Rr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Si=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const a=r[t++];e[n++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=r[t++],o=r[t++],c=r[t++],l=((i&7)<<18|(a&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(l>>10)),e[n++]=String.fromCharCode(56320+(l&1023))}else{const a=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return e.join("")},pn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const a=r[i],o=i+1<r.length,c=o?r[i+1]:0,l=i+2<r.length,d=l?r[i+2]:0,h=a>>2,u=(a&3)<<4|c>>4;let m=(c&15)<<2|d>>6,p=d&63;l||(p=64,o||(m=64)),n.push(t[h],t[u],t[m],t[p])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(fn(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Si(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const a=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const d=i<r.length?t[r.charAt(i)]:64;++i;const u=i<r.length?t[r.charAt(i)]:64;if(++i,a==null||c==null||d==null||u==null)throw new ki;const m=a<<2|c>>4;if(n.push(m),d!==64){const p=c<<4&240|d>>2;if(n.push(p),u!==64){const N=d<<6&192|u;n.push(N)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class ki extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Ei=function(r){const e=fn(r);return pn.encodeByteArray(e,!0)},gn=function(r){return Ei(r).replace(/\./g,"")},xn=function(r){try{return pn.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ci=()=>Ti().__FIREBASE_DEFAULTS__,Ai=()=>{if(typeof process>"u"||typeof Rr>"u")return;const r=Rr.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Ri=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&xn(r[1]);return e&&JSON.parse(e)},dr=()=>{try{return Ci()||Ai()||Ri()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Pi=r=>{var e,t;return(t=(e=dr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},bn=()=>{var r;return(r=dr())===null||r===void 0?void 0:r.config},yn=r=>{var e;return(e=dr())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Di(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(G())}function Li(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Mi(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Ui(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Fi(){const r=G();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Bi(){try{return typeof indexedDB=="object"}catch{return!1}}function $i(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var a;e(((a=i.error)===null||a===void 0?void 0:a.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi="FirebaseError";class he extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=zi,Object.setPrototypeOf(this,he.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,qe.prototype.create)}}class qe{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,a=this.errors[e],o=a?Vi(a,n):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new he(i,c,n)}}function Vi(r,e){return r.replace(Hi,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const Hi=/\{\$([^}]+)}/g;function Wi(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function ht(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const a=r[i],o=e[i];if(Pr(a)&&Pr(o)){if(!ht(a,o))return!1}else if(a!==o)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function Pr(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ke(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Gi(r,e){const t=new qi(r,e);return t.subscribe.bind(t)}class qi{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Ki(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=At),i.error===void 0&&(i.error=At),i.complete===void 0&&(i.complete=At);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ki(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function At(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(r){return r&&r._delegate?r._delegate:r}class Ce{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new Oi;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(a){if(i)return null;throw a}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Xi(e))try{this.getOrInitializeService({instanceIdentifier:ge})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:i});n.resolve(a)}catch{}}}}clearInstance(e=ge){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ge){return this.instances.has(e)}getOptions(e=ge){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[a,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(a);n===c&&o.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),a=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;a.add(e),this.onInitCallbacks.set(i,a);const o=this.instances.get(i);return o&&e(o,i),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Yi(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=ge){return this.component?this.component.multipleInstances?e:ge:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Yi(r){return r===ge?void 0:r}function Xi(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ji(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(U||(U={}));const Zi={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},ea=U.INFO,ta={[U.DEBUG]:"log",[U.VERBOSE]:"log",[U.INFO]:"info",[U.WARN]:"warn",[U.ERROR]:"error"},ra=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=ta[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class vn{constructor(e){this.name=e,this._logLevel=ea,this._logHandler=ra,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in U))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Zi[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,U.DEBUG,...e),this._logHandler(this,U.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,U.VERBOSE,...e),this._logHandler(this,U.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,U.INFO,...e),this._logHandler(this,U.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,U.WARN,...e),this._logHandler(this,U.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,U.ERROR,...e),this._logHandler(this,U.ERROR,...e)}}const na=(r,e)=>e.some(t=>r instanceof t);let Or,Dr;function sa(){return Or||(Or=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ia(){return Dr||(Dr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const wn=new WeakMap,Qt=new WeakMap,_n=new WeakMap,Rt=new WeakMap,ur=new WeakMap;function aa(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",a),r.removeEventListener("error",o)},a=()=>{t(de(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",a),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&wn.set(t,r)}).catch(()=>{}),ur.set(e,r),e}function oa(r){if(Qt.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",a),r.removeEventListener("error",o),r.removeEventListener("abort",o)},a=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",a),r.addEventListener("error",o),r.addEventListener("abort",o)});Qt.set(r,e)}let Zt={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Qt.get(r);if(e==="objectStoreNames")return r.objectStoreNames||_n.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return de(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function ca(r){Zt=r(Zt)}function la(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Pt(this),e,...t);return _n.set(n,e.sort?e.sort():[e]),de(n)}:ia().includes(r)?function(...e){return r.apply(Pt(this),e),de(wn.get(this))}:function(...e){return de(r.apply(Pt(this),e))}}function da(r){return typeof r=="function"?la(r):(r instanceof IDBTransaction&&oa(r),na(r,sa())?new Proxy(r,Zt):r)}function de(r){if(r instanceof IDBRequest)return aa(r);if(Rt.has(r))return Rt.get(r);const e=da(r);return e!==r&&(Rt.set(r,e),ur.set(e,r)),e}const Pt=r=>ur.get(r);function ua(r,e,{blocked:t,upgrade:n,blocking:i,terminated:a}={}){const o=indexedDB.open(r,e),c=de(o);return n&&o.addEventListener("upgradeneeded",l=>{n(de(o.result),l.oldVersion,l.newVersion,de(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{a&&l.addEventListener("close",()=>a()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const ha=["get","getKey","getAll","getAllKeys","count"],ma=["put","add","delete","clear"],Ot=new Map;function Lr(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Ot.get(e))return Ot.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=ma.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||ha.includes(t)))return;const a=async function(o,...c){const l=this.transaction(o,i?"readwrite":"readonly");let d=l.store;return n&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return Ot.set(e,a),a}ca(r=>({...r,get:(e,t,n)=>Lr(e,t)||r.get(e,t,n),has:(e,t)=>!!Lr(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(pa(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function pa(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const er="@firebase/app",Mr="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const re=new vn("@firebase/app"),ga="@firebase/app-compat",xa="@firebase/analytics-compat",ba="@firebase/analytics",ya="@firebase/app-check-compat",va="@firebase/app-check",wa="@firebase/auth",_a="@firebase/auth-compat",Na="@firebase/database",ja="@firebase/data-connect",Ia="@firebase/database-compat",Sa="@firebase/functions",ka="@firebase/functions-compat",Ea="@firebase/installations",Ta="@firebase/installations-compat",Ca="@firebase/messaging",Aa="@firebase/messaging-compat",Ra="@firebase/performance",Pa="@firebase/performance-compat",Oa="@firebase/remote-config",Da="@firebase/remote-config-compat",La="@firebase/storage",Ma="@firebase/storage-compat",Ua="@firebase/firestore",Fa="@firebase/vertexai-preview",Ba="@firebase/firestore-compat",$a="firebase",za="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tr="[DEFAULT]",Va={[er]:"fire-core",[ga]:"fire-core-compat",[ba]:"fire-analytics",[xa]:"fire-analytics-compat",[va]:"fire-app-check",[ya]:"fire-app-check-compat",[wa]:"fire-auth",[_a]:"fire-auth-compat",[Na]:"fire-rtdb",[ja]:"fire-data-connect",[Ia]:"fire-rtdb-compat",[Sa]:"fire-fn",[ka]:"fire-fn-compat",[Ea]:"fire-iid",[Ta]:"fire-iid-compat",[Ca]:"fire-fcm",[Aa]:"fire-fcm-compat",[Ra]:"fire-perf",[Pa]:"fire-perf-compat",[Oa]:"fire-rc",[Da]:"fire-rc-compat",[La]:"fire-gcs",[Ma]:"fire-gcs-compat",[Ua]:"fire-fst",[Ba]:"fire-fst-compat",[Fa]:"fire-vertex","fire-js":"fire-js",[$a]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Be=new Map,Ha=new Map,rr=new Map;function Ur(r,e){try{r.container.addComponent(e)}catch(t){re.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function $e(r){const e=r.name;if(rr.has(e))return re.debug(`There were multiple attempts to register component ${e}.`),!1;rr.set(e,r);for(const t of Be.values())Ur(t,r);for(const t of Ha.values())Ur(t,r);return!0}function Nn(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Q(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ue=new qe("app","Firebase",Wa);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ce("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ue.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je=za;function jn(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:tr,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw ue.create("bad-app-name",{appName:String(i)});if(t||(t=bn()),!t)throw ue.create("no-options");const a=Be.get(i);if(a){if(ht(t,a.options)&&ht(n,a.config))return a;throw ue.create("duplicate-app",{appName:i})}const o=new Qi(i);for(const l of rr.values())o.addComponent(l);const c=new Ga(t,n,o);return Be.set(i,c),c}function qa(r=tr){const e=Be.get(r);if(!e&&r===tr&&bn())return jn();if(!e)throw ue.create("no-app",{appName:r});return e}function Fr(){return Array.from(Be.values())}function je(r,e,t){var n;let i=(n=Va[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const a=i.match(/\s|\//),o=e.match(/\s|\//);if(a||o){const c=[`Unable to register library "${i}" with version "${e}":`];a&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),a&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),re.warn(c.join(" "));return}$e(new Ce(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="firebase-heartbeat-database",Ja=1,ze="firebase-heartbeat-store";let Dt=null;function In(){return Dt||(Dt=ua(Ka,Ja,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(ze)}catch(t){console.warn(t)}}}}).catch(r=>{throw ue.create("idb-open",{originalErrorMessage:r.message})})),Dt}async function Ya(r){try{const t=(await In()).transaction(ze),n=await t.objectStore(ze).get(Sn(r));return await t.done,n}catch(e){if(e instanceof he)re.warn(e.message);else{const t=ue.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});re.warn(t.message)}}}async function Br(r,e){try{const n=(await In()).transaction(ze,"readwrite");await n.objectStore(ze).put(e,Sn(r)),await n.done}catch(t){if(t instanceof he)re.warn(t.message);else{const n=ue.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});re.warn(n.message)}}}function Sn(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=1024,Qa=30*24*60*60*1e3;class Za{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new to(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=$r();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a)?void 0:(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const c=new Date(o.date).valueOf();return Date.now()-c<=Qa}),this._storage.overwrite(this._heartbeatsCache))}catch(n){re.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$r(),{heartbeatsToSend:n,unsentEntries:i}=eo(this._heartbeatsCache.heartbeats),a=gn(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(t){return re.warn(t),""}}}function $r(){return new Date().toISOString().substring(0,10)}function eo(r,e=Xa){const t=[];let n=r.slice();for(const i of r){const a=t.find(o=>o.agent===i.agent);if(a){if(a.dates.push(i.date),zr(t)>e){a.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),zr(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class to{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Bi()?$i().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ya(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Br(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Br(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function zr(r){return gn(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(r){$e(new Ce("platform-logger",e=>new fa(e),"PRIVATE")),$e(new Ce("heartbeat",e=>new Za(e),"PRIVATE")),je(er,Mr,r),je(er,Mr,"esm2017"),je("fire-js","")}ro("");var no="firebase",so="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */je(no,so,"app");function hr(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function kn(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const io=kn,En=new qe("auth","Firebase",kn());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new vn("@firebase/auth");function ao(r,...e){mt.logLevel<=U.WARN&&mt.warn(`Auth (${Je}): ${r}`,...e)}function it(r,...e){mt.logLevel<=U.ERROR&&mt.error(`Auth (${Je}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(r,...e){throw fr(r,...e)}function K(r,...e){return fr(r,...e)}function mr(r,e,t){const n=Object.assign(Object.assign({},io()),{[e]:t});return new qe("auth","Firebase",n).create(e,{appName:r.name})}function be(r){return mr(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oo(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&Y(r,"argument-error"),mr(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function fr(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return En.create(r,...e)}function S(r,e,...t){if(!r)throw fr(e,...t)}function Z(r){const e="INTERNAL ASSERTION FAILED: "+r;throw it(e),new Error(e)}function ne(r,e){r||Z(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nr(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function co(){return Vr()==="http:"||Vr()==="https:"}function Vr(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(co()||Mi()||"connection"in navigator)?navigator.onLine:!0}function uo(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e,t){this.shortDelay=e,this.longDelay=t,ne(t>e,"Short delay should be less than long delay!"),this.isMobile=Di()||Ui()}get(){return lo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(r,e){ne(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tn{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Z("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Z("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Z("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ho={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mo=new Ye(3e4,6e4);function gr(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function Pe(r,e,t,n,i={}){return Cn(r,i,async()=>{let a={},o={};n&&(e==="GET"?o=n:a={body:JSON.stringify(n)});const c=Ke(Object.assign({key:r.config.apiKey},o)).slice(1),l=await r._getAdditionalHeaders();l["Content-Type"]="application/json",r.languageCode&&(l["X-Firebase-Locale"]=r.languageCode);const d=Object.assign({method:e,headers:l},a);return Li()||(d.referrerPolicy="no-referrer"),Tn.fetch()(An(r,r.config.apiHost,t,c),d)})}async function Cn(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},ho),e);try{const i=new po(r),a=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const o=await a.json();if("needConfirmation"in o)throw tt(r,"account-exists-with-different-credential",o);if(a.ok&&!("errorMessage"in o))return o;{const c=a.ok?o.errorMessage:o.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw tt(r,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw tt(r,"email-already-in-use",o);if(l==="USER_DISABLED")throw tt(r,"user-disabled",o);const h=n[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw mr(r,h,d);Y(r,h)}}catch(i){if(i instanceof he)throw i;Y(r,"network-request-failed",{message:String(i)})}}async function fo(r,e,t,n,i={}){const a=await Pe(r,e,t,n,i);return"mfaPendingCredential"in a&&Y(r,"multi-factor-auth-required",{_serverResponse:a}),a}function An(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?pr(r.config,i):`${r.config.apiScheme}://${i}`}class po{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(K(this.auth,"network-request-failed")),mo.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function tt(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=K(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function go(r,e){return Pe(r,"POST","/v1/accounts:delete",e)}async function Rn(r,e){return Pe(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ue(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function xo(r,e=!1){const t=me(r),n=await t.getIdToken(e),i=xr(n);S(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const a=typeof i.firebase=="object"?i.firebase:void 0,o=a==null?void 0:a.sign_in_provider;return{claims:i,token:n,authTime:Ue(Lt(i.auth_time)),issuedAtTime:Ue(Lt(i.iat)),expirationTime:Ue(Lt(i.exp)),signInProvider:o||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function Lt(r){return Number(r)*1e3}function xr(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return it("JWT malformed, contained fewer than 3 sections"),null;try{const i=xn(t);return i?JSON.parse(i):(it("Failed to decode base64 JWT payload"),null)}catch(i){return it("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Hr(r){const e=xr(r);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ve(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof he&&bo(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function bo({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ue(this.lastLoginAt),this.creationTime=Ue(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ft(r){var e;const t=r.auth,n=await r.getIdToken(),i=await Ve(r,Rn(t,{idToken:n}));S(i==null?void 0:i.users.length,t,"internal-error");const a=i.users[0];r._notifyReloadListener(a);const o=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?Pn(a.providerUserInfo):[],c=wo(r.providerData,o),l=r.isAnonymous,d=!(r.email&&a.passwordHash)&&!(c!=null&&c.length),h=l?d:!1,u={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:c,metadata:new sr(a.createdAt,a.lastLoginAt),isAnonymous:h};Object.assign(r,u)}async function vo(r){const e=me(r);await ft(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function wo(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Pn(r){return r.map(e=>{var{providerId:t}=e,n=hr(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _o(r,e){const t=await Cn(r,{},async()=>{const n=Ke({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:a}=r.config,o=An(r,i,"/v1/token",`key=${a}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Tn.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function No(r,e){return Pe(r,"POST","/v2/accounts:revokeToken",gr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){S(e.length!==0,"internal-error");const t=Hr(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:a}=await _o(e,t);this.updateTokensAndExpiration(n,i,Number(a))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:a}=t,o=new Ie;return n&&(S(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(S(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),a&&(S(typeof a=="number","internal-error",{appName:e}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ie,this.toJSON())}_performRefresh(){return Z("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(r,e){S(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class ee{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,a=hr(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new yo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new sr(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await Ve(this,this.stsTokenManager.getToken(this.auth,e));return S(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return xo(this,e)}reload(){return vo(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ee(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ft(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Q(this.auth.app))return Promise.reject(be(this.auth));const e=await this.getIdToken();return await Ve(this,go(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,a,o,c,l,d,h;const u=(n=t.displayName)!==null&&n!==void 0?n:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,p=(a=t.phoneNumber)!==null&&a!==void 0?a:void 0,N=(o=t.photoURL)!==null&&o!==void 0?o:void 0,b=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,w=(d=t.createdAt)!==null&&d!==void 0?d:void 0,_=(h=t.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:L,emailVerified:T,isAnonymous:I,providerData:A,stsTokenManager:q}=t;S(L&&q,e,"internal-error");const z=Ie.fromJSON(this.name,q);S(typeof L=="string",e,"internal-error"),ie(u,e.name),ie(m,e.name),S(typeof T=="boolean",e,"internal-error"),S(typeof I=="boolean",e,"internal-error"),ie(p,e.name),ie(N,e.name),ie(b,e.name),ie(x,e.name),ie(w,e.name),ie(_,e.name);const H=new ee({uid:L,auth:e,email:m,emailVerified:T,displayName:u,isAnonymous:I,photoURL:N,phoneNumber:p,tenantId:b,stsTokenManager:z,createdAt:w,lastLoginAt:_});return A&&Array.isArray(A)&&(H.providerData=A.map(R=>Object.assign({},R))),x&&(H._redirectEventId=x),H}static async _fromIdTokenResponse(e,t,n=!1){const i=new Ie;i.updateFromServerResponse(t);const a=new ee({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await ft(a),a}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];S(i.localId!==void 0,"internal-error");const a=i.providerUserInfo!==void 0?Pn(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(a!=null&&a.length),c=new Ie;c.updateFromIdToken(n);const l=new ee({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new sr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(a!=null&&a.length)};return Object.assign(l,d),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=new Map;function te(r){ne(r instanceof Function,"Expected a class definition");let e=Wr.get(r);return e?(ne(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Wr.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}On.type="NONE";const Gr=On;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(r,e,t){return`firebase:${r}:${e}:${t}`}class Se{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:a}=this.auth;this.fullUserKey=at(this.userKey,i.apiKey,a),this.fullPersistenceKey=at("persistence",i.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?ee._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Se(te(Gr),e,n);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let a=i[0]||te(Gr);const o=at(n,e.config.apiKey,e.name);let c=null;for(const d of t)try{const h=await d._get(o);if(h){const u=ee._fromJSON(e,h);d!==a&&(c=u),a=d;break}}catch{}const l=i.filter(d=>d._shouldAllowMigration);return!a._shouldAllowMigration||!l.length?new Se(a,e,n):(a=l[0],c&&await a._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==a)try{await d._remove(o)}catch{}})),new Se(a,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Un(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Dn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bn(e))return"Blackberry";if($n(e))return"Webos";if(Ln(e))return"Safari";if((e.includes("chrome/")||Mn(e))&&!e.includes("edge/"))return"Chrome";if(Fn(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Dn(r=G()){return/firefox\//i.test(r)}function Ln(r=G()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mn(r=G()){return/crios\//i.test(r)}function Un(r=G()){return/iemobile/i.test(r)}function Fn(r=G()){return/android/i.test(r)}function Bn(r=G()){return/blackberry/i.test(r)}function $n(r=G()){return/webos/i.test(r)}function br(r=G()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function jo(r=G()){var e;return br(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Io(){return Fi()&&document.documentMode===10}function zn(r=G()){return br(r)||Fn(r)||$n(r)||Bn(r)||/windows phone/i.test(r)||Un(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(r,e=[]){let t;switch(r){case"Browser":t=qr(G());break;case"Worker":t=`${qr(G())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Je}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=a=>new Promise((o,c)=>{try{const l=e(a);o(l)}catch(l){c(l)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ko(r,e={}){return Pe(r,"GET","/v2/passwordPolicy",gr(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=6;class To{constructor(e){var t,n,i,a;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:Eo,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,a,o,c;const l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(n=l.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(a=l.containsUppercaseLetter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(o=l.containsNumericCharacter)!==null&&o!==void 0?o:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Co{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kr(this),this.idTokenSubscription=new Kr(this),this.beforeStateQueue=new So(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=En,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=te(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await Se.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Rn(this,{idToken:e}),n=await ee._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Q(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===c)&&(l!=null&&l.user)&&(i=l.user,a=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ft(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=uo()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Q(this.app))return Promise.reject(be(this));const t=e?me(e):null;return t&&S(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Q(this.app)?Promise.reject(be(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Q(this.app)?Promise.reject(be(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(te(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ko(this),t=new To(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new qe("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await No(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&te(e)||this._popupRedirectResolver;S(t,this,"argument-error"),this.redirectPersistenceManager=await Se.create(this,[te(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(c,this,"internal-error"),c.then(()=>{o||a(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,n,i);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Vn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&ao(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function yt(r){return me(r)}class Kr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Gi(t=>this.observer=t)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ao(r){yr=r}function Ro(r){return yr.loadJS(r)}function Po(){return yr.gapiScript}function Oo(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(r,e){const t=Nn(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),a=t.getOptions();if(ht(a,e??{}))return i;Y(i,"already-initialized")}return t.initialize({options:e})}function Lo(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(te);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function Mo(r,e,t){const n=yt(r);S(n._canInitEmulator,n,"emulator-config-failed"),S(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,a=Hn(e),{host:o,port:c}=Uo(e),l=c===null?"":`:${c}`;n.config.emulator={url:`${a}//${o}${l}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:o,port:c,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:i})}),Fo()}function Hn(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function Uo(r){const e=Hn(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const a=i[1];return{host:a,port:Jr(n.substr(a.length+1))}}else{const[a,o]=n.split(":");return{host:a,port:Jr(o)}}}function Jr(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function Fo(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wn{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Z("not implemented")}_getIdTokenResponse(e){return Z("not implemented")}_linkToIdToken(e,t){return Z("not implemented")}_getReauthenticationResolver(e){return Z("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ke(r,e){return fo(r,"POST","/v1/accounts:signInWithIdp",gr(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bo="http://localhost";class ye extends Wn{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ye(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Y("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,a=hr(t,["providerId","signInMethod"]);if(!n||!i)return null;const o=new ye(n,i);return o.idToken=a.idToken||void 0,o.accessToken=a.accessToken||void 0,o.secret=a.secret,o.nonce=a.nonce,o.pendingToken=a.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return ke(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,ke(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,ke(e,t)}buildRequest(){const e={requestUri:Bo,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ke(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe extends vr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe extends Xe{constructor(){super("facebook.com")}static credential(e){return ye._fromParams({providerId:oe.PROVIDER_ID,signInMethod:oe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return oe.credentialFromTaggedObject(e)}static credentialFromError(e){return oe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return oe.credential(e.oauthAccessToken)}catch{return null}}}oe.FACEBOOK_SIGN_IN_METHOD="facebook.com";oe.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X extends Xe{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ye._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return X.credential(t,n)}catch{return null}}}X.GOOGLE_SIGN_IN_METHOD="google.com";X.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce extends Xe{constructor(){super("github.com")}static credential(e){return ye._fromParams({providerId:ce.PROVIDER_ID,signInMethod:ce.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ce.credentialFromTaggedObject(e)}static credentialFromError(e){return ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ce.credential(e.oauthAccessToken)}catch{return null}}}ce.GITHUB_SIGN_IN_METHOD="github.com";ce.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le extends Xe{constructor(){super("twitter.com")}static credential(e,t){return ye._fromParams({providerId:le.PROVIDER_ID,signInMethod:le.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return le.credentialFromTaggedObject(e)}static credentialFromError(e){return le.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return le.credential(t,n)}catch{return null}}}le.TWITTER_SIGN_IN_METHOD="twitter.com";le.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const a=await ee._fromIdTokenResponse(e,n,i),o=Yr(n);return new Ae({user:a,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Yr(n);return new Ae({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Yr(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends he{constructor(e,t,n,i){var a;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,pt.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new pt(e,t,n,i)}}function Gn(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?pt._fromErrorAndOperation(r,a,e,n):a})}async function $o(r,e,t=!1){const n=await Ve(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Ae._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zo(r,e,t=!1){const{auth:n}=r;if(Q(n.app))return Promise.reject(be(n));const i="reauthenticate";try{const a=await Ve(r,Gn(n,i,e,r),t);S(a.idToken,n,"internal-error");const o=xr(a.idToken);S(o,n,"internal-error");const{sub:c}=o;return S(r.uid===c,n,"user-mismatch"),Ae._forOperation(r,i,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&Y(n,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vo(r,e,t=!1){if(Q(r.app))return Promise.reject(be(r));const n="signIn",i=await Gn(r,n,e),a=await Ae._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(a.user),a}function Ho(r,e,t,n){return me(r).onIdTokenChanged(e,t,n)}function Wo(r,e,t){return me(r).beforeAuthStateChanged(e,t)}function Go(r,e,t,n){return me(r).onAuthStateChanged(e,t,n)}function qo(r){return me(r).signOut()}const gt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(gt,"1"),this.storage.removeItem(gt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=1e3,Jo=10;class Kn extends qn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=zn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},a=this.storage.getItem(n);Io()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Jo):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Ko)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kn.type="LOCAL";const Yo=Kn;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn extends qn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Jn.type="SESSION";const Yn=Jn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new vt(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:a}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(o).map(async d=>d(t.origin,a)),l=await Xo(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}vt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wr(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let a,o;return new Promise((c,l)=>{const d=wr("",20);i.port1.start();const h=setTimeout(()=>{l(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(u){const m=u;if(m.data.eventId===d)switch(m.data.status){case"ack":clearTimeout(h),a=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),c(m.data.response);break;default:clearTimeout(h),clearTimeout(a),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(){return window}function Zo(r){J().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xn(){return typeof J().WorkerGlobalScope<"u"&&typeof J().importScripts=="function"}async function ec(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function tc(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function rc(){return Xn()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn="firebaseLocalStorageDb",nc=1,xt="firebaseLocalStorage",Zn="fbase_key";class Qe{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function wt(r,e){return r.transaction([xt],e?"readwrite":"readonly").objectStore(xt)}function sc(){const r=indexedDB.deleteDatabase(Qn);return new Qe(r).toPromise()}function ir(){const r=indexedDB.open(Qn,nc);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(xt,{keyPath:Zn})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(xt)?e(n):(n.close(),await sc(),e(await ir()))})})}async function Xr(r,e,t){const n=wt(r,!0).put({[Zn]:e,value:t});return new Qe(n).toPromise()}async function ic(r,e){const t=wt(r,!1).get(e),n=await new Qe(t).toPromise();return n===void 0?null:n.value}function Qr(r,e){const t=wt(r,!0).delete(e);return new Qe(t).toPromise()}const ac=800,oc=3;class es{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ir(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>oc)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Xn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vt._getInstance(rc()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await ec(),!this.activeServiceWorker)return;this.sender=new Qo(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||tc()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ir();return await Xr(e,gt,"1"),await Qr(e,gt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Xr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>ic(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Qr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const a=wt(i,!1).getAll();return new Qe(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:a}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(a)&&(this.notifyListeners(i,a),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ac)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}es.type="LOCAL";const cc=es;new Ye(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ts(r,e){return e?te(e):(S(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Wn{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ke(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ke(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ke(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function lc(r){return Vo(r.auth,new _r(r),r.bypassAuthState)}function dc(r){const{auth:e,user:t}=r;return S(t,e,"internal-error"),zo(t,new _r(r),r.bypassAuthState)}async function uc(r){const{auth:e,user:t}=r;return S(t,e,"internal-error"),$o(t,new _r(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{constructor(e,t,n,i,a=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:a,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:n,tenantId:a||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return lc;case"linkViaPopup":case"linkViaRedirect":return uc;case"reauthViaPopup":case"reauthViaRedirect":return dc;default:Y(this.auth,"internal-error")}}resolve(e){ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=new Ye(2e3,1e4);async function mc(r,e,t){if(Q(r.app))return Promise.reject(K(r,"operation-not-supported-in-this-environment"));const n=yt(r);oo(r,e,vr);const i=ts(n,t);return new xe(n,"signInViaPopup",e,i).executeNotNull()}class xe extends rs{constructor(e,t,n,i,a){super(e,t,i,a),this.provider=n,this.authWindow=null,this.pollId=null,xe.currentPopupAction&&xe.currentPopupAction.cancel(),xe.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){ne(this.filter.length===1,"Popup operations only handle one event");const e=wr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(K(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(K(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,xe.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(K(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hc.get())};e()}}xe.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fc="pendingRedirect",ot=new Map;class pc extends rs{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=ot.get(this.auth._key());if(!e){try{const n=await gc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}ot.set(this.auth._key(),e)}return this.bypassAuthState||ot.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function gc(r,e){const t=yc(e),n=bc(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}function xc(r,e){ot.set(r._key(),e)}function bc(r){return te(r._redirectPersistence)}function yc(r){return at(fc,r.config.apiKey,r.name)}async function vc(r,e,t=!1){if(Q(r.app))return Promise.reject(be(r));const n=yt(r),i=ts(n,e),o=await new pc(n,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wc=10*60*1e3;class _c{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Nc(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!ns(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(K(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=wc&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zr(e))}saveEventToCache(e){this.cachedEventUids.add(Zr(e)),this.lastProcessedEventTime=Date.now()}}function Zr(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function ns({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Nc(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ns(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jc(r,e={}){return Pe(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ic=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Sc=/^https?/;async function kc(r){if(r.config.emulator)return;const{authorizedDomains:e}=await jc(r);for(const t of e)try{if(Ec(t))return}catch{}Y(r,"unauthorized-domain")}function Ec(r){const e=nr(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Sc.test(t))return!1;if(Ic.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc=new Ye(3e4,6e4);function en(){const r=J().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Cc(r){return new Promise((e,t)=>{var n,i,a;function o(){en(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{en(),t(K(r,"network-request-failed"))},timeout:Tc.get()})}if(!((i=(n=J().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((a=J().gapi)===null||a===void 0)&&a.load)o();else{const c=Oo("iframefcb");return J()[c]=()=>{gapi.load?o():t(K(r,"network-request-failed"))},Ro(`${Po()}?onload=${c}`).catch(l=>t(l))}}).catch(e=>{throw ct=null,e})}let ct=null;function Ac(r){return ct=ct||Cc(r),ct}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc=new Ye(5e3,15e3),Pc="__/auth/iframe",Oc="emulator/auth/iframe",Dc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Lc=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Mc(r){const e=r.config;S(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?pr(e,Oc):`https://${r.config.authDomain}/${Pc}`,n={apiKey:e.apiKey,appName:r.name,v:Je},i=Lc.get(r.config.apiHost);i&&(n.eid=i);const a=r._getFrameworks();return a.length&&(n.fw=a.join(",")),`${t}?${Ke(n).slice(1)}`}async function Uc(r){const e=await Ac(r),t=J().gapi;return S(t,r,"internal-error"),e.open({where:document.body,url:Mc(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Dc,dontclear:!0},n=>new Promise(async(i,a)=>{await n.restyle({setHideOnLeave:!1});const o=K(r,"network-request-failed"),c=J().setTimeout(()=>{a(o)},Rc.get());function l(){J().clearTimeout(c),i(n)}n.ping(l).then(l,()=>{a(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Bc=500,$c=600,zc="_blank",Vc="http://localhost";class tn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Hc(r,e,t,n=Bc,i=$c){const a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const l=Object.assign(Object.assign({},Fc),{width:n.toString(),height:i.toString(),top:a,left:o}),d=G().toLowerCase();t&&(c=Mn(d)?zc:t),Dn(d)&&(e=e||Vc,l.scrollbars="yes");const h=Object.entries(l).reduce((m,[p,N])=>`${m}${p}=${N},`,"");if(jo(d)&&c!=="_self")return Wc(e||"",c),new tn(null);const u=window.open(e||"",c,h);S(u,r,"popup-blocked");try{u.focus()}catch{}return new tn(u)}function Wc(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="__/auth/handler",qc="emulator/auth/handler",Kc=encodeURIComponent("fac");async function rn(r,e,t,n,i,a){S(r.config.authDomain,r,"auth-domain-config-required"),S(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Je,eventId:i};if(e instanceof vr){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Wi(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,u]of Object.entries({}))o[h]=u}if(e instanceof Xe){const h=e.getScopes().filter(u=>u!=="");h.length>0&&(o.scopes=h.join(","))}r.tenantId&&(o.tid=r.tenantId);const c=o;for(const h of Object.keys(c))c[h]===void 0&&delete c[h];const l=await r._getAppCheckToken(),d=l?`#${Kc}=${encodeURIComponent(l)}`:"";return`${Jc(r)}?${Ke(c).slice(1)}${d}`}function Jc({config:r}){return r.emulator?pr(r,qc):`https://${r.authDomain}/${Gc}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt="webStorageSupport";class Yc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yn,this._completeRedirectFn=vc,this._overrideRedirectResult=xc}async _openPopup(e,t,n,i){var a;ne((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await rn(e,t,n,nr(),i);return Hc(e,o,wr())}async _openRedirect(e,t,n,i){await this._originValidation(e);const a=await rn(e,t,n,nr(),i);return Zo(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:a}=this.eventManagers[t];return i?Promise.resolve(i):(ne(a,"If manager is not set, promise should be"),a)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Uc(e),n=new _c(e);return t.register("authEvent",i=>(S(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Mt,{type:Mt},i=>{var a;const o=(a=i==null?void 0:i[0])===null||a===void 0?void 0:a[Mt];o!==void 0&&t(!!o),Y(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=kc(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return zn()||Ln()||br()}}const Xc=Yc;var nn="@firebase/auth",sn="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zc(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function el(r){$e(new Ce("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;S(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const l={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Vn(r)},d=new Co(n,i,a,l);return Lo(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),$e(new Ce("auth-internal",e=>{const t=yt(e.getProvider("auth").getImmediate());return(n=>new Qc(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),je(nn,sn,Zc(r)),je(nn,sn,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl=5*60,rl=yn("authIdTokenMaxAge")||tl;let an=null;const nl=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>rl)return;const i=t==null?void 0:t.token;an!==i&&(an=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function sl(r=qa()){const e=Nn(r,"auth");if(e.isInitialized())return e.getImmediate();const t=Do(r,{popupRedirectResolver:Xc,persistence:[cc,Yo,Yn]}),n=yn("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(n,location.origin);if(location.origin===a.origin){const o=nl(a.toString());Wo(t,o,()=>o(t.currentUser)),Ho(t,c=>o(c))}}const i=Pi("auth");return i&&Mo(t,`http://${i}`),t}function il(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Ao({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const a=K("internal-error");a.customData=i,t(a)},n.type="text/javascript",n.charset="UTF-8",il().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});el("Browser");const ss=!0,is={apiKey:"AIzaSyADg9uh69WKZsNhgcFlqnKjcbcNyv7ItWk",authDomain:"chronos-500900.firebaseapp.com",projectId:"chronos-500900",storageBucket:"chronos-500900.firebasestorage.app",messagingSenderId:"1064578557055",appId:"1:1064578557055:web:8636d10732e4bad0688b4a"};let Ut,Ft;function as(){return Ut||(Ut=Fr().length?Fr()[0]:jn(is)),Ut}function al(){return Ft||(Ft=sl(as())),Ft}const ol=as(),ve=al(),Nr=new X;Nr.setCustomParameters({prompt:"select_account"});new Date().toISOString(),new Date().toISOString();async function cl(){return(await mc(ve,Nr)).user}async function ar(){await qo(ve)}function os(r){return Go(ve,r)}async function ll(r=!1){{const e=ve.currentUser;return e?e.getIdToken(r):null}}async function dl(r=!1){{const e=ve.currentUser;return e?e.getIdTokenResult(r):null}}function cs(){return ve.currentUser}const bt=Object.freeze(Object.defineProperty({__proto__:null,firebaseApp:ol,firebaseAuth:ve,firebaseConfig:is,getCurrentUser:cs,getIdToken:ll,getIdTokenResult:dl,googleProvider:Nr,hasFirebaseConfig:ss,onAuthChange:os,signInWithGoogle:cl,signOutUser:ar},Symbol.toStringTag,{value:"Module"})),ls=f.createContext(void 0);function ul({children:r}){const[e,t]=f.useState(null),[n,i]=f.useState(!0);f.useEffect(()=>{const l=localStorage.getItem("chronos-incognito-user");if(l){t(JSON.parse(l)),i(!1);const u=m=>{m.key==="chronos-incognito-user"&&!m.newValue&&t(null)};return window.addEventListener("storage",u),()=>window.removeEventListener("storage",u)}const d=cs();return d&&t({uid:d.uid,email:d.email,displayName:d.displayName,photoURL:d.photoURL,emailVerified:d.emailVerified,createdAt:d.metadata.creationTime??"",lastLoginAt:d.metadata.lastSignInTime??""}),i(!1),os(u=>{localStorage.getItem("chronos-incognito-user")||(t(u?{uid:u.uid,email:u.email,displayName:u.displayName,photoURL:u.photoURL,emailVerified:u.emailVerified,createdAt:u.metadata.creationTime??"",lastLoginAt:u.metadata.lastSignInTime??""}:null),i(!1))})},[]);const a=async()=>{localStorage.removeItem("chronos-incognito-user");const{signInWithGoogle:l}=await Fe(async()=>{const{signInWithGoogle:d}=await Promise.resolve().then(()=>bt);return{signInWithGoogle:d}},void 0);await l()},o=async()=>{const l={uid:"guest-"+Math.random().toString(36).substring(2,9),email:"guest@chronos.incognito",displayName:"Incognito Guest",photoURL:null,emailVerified:!0,createdAt:new Date().toISOString(),lastLoginAt:new Date().toISOString()};localStorage.setItem("chronos-incognito-user",JSON.stringify(l)),t(l)},c=async()=>{localStorage.removeItem("chronos-incognito-user");const{signOutUser:l}=await Fe(async()=>{const{signOutUser:d}=await Promise.resolve().then(()=>bt);return{signOutUser:d}},void 0);await l(),t(null)};return s.jsx(ls.Provider,{value:{user:e,loading:n,signIn:a,signInIncognito:o,signOut:c},children:r})}function we(){const r=f.useContext(ls);if(!r)throw new Error("useAuth must be used within an AuthProvider");return r}const hl=new Xs({defaultOptions:{queries:{staleTime:3e4,gcTime:5*6e4,retry:(r,e)=>{if(r>=3)return!1;if(e&&typeof e=="object"&&"status"in e){const t=e.status;if(t===401||t===403||t===404)return!1}return!0},refetchOnWindowFocus:!1,refetchOnReconnect:"always"},mutations:{retry:!1}}}),ml={},on=r=>{let e;const t=new Set,n=(h,u)=>{const m=typeof h=="function"?h(e):h;if(!Object.is(m,e)){const p=e;e=u??(typeof m!="object"||m===null)?m:Object.assign({},e,m),t.forEach(N=>N(e,p))}},i=()=>e,l={setState:n,getState:i,getInitialState:()=>d,subscribe:h=>(t.add(h),()=>t.delete(h)),destroy:()=>{(ml?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),t.clear()}},d=e=r(n,i,l);return l},fl=r=>r?on(r):on;var ds={exports:{}},us={},hs={exports:{}},ms={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Re=f;function pl(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var gl=typeof Object.is=="function"?Object.is:pl,xl=Re.useState,bl=Re.useEffect,yl=Re.useLayoutEffect,vl=Re.useDebugValue;function wl(r,e){var t=e(),n=xl({inst:{value:t,getSnapshot:e}}),i=n[0].inst,a=n[1];return yl(function(){i.value=t,i.getSnapshot=e,Bt(i)&&a({inst:i})},[r,t,e]),bl(function(){return Bt(i)&&a({inst:i}),r(function(){Bt(i)&&a({inst:i})})},[r]),vl(t),t}function Bt(r){var e=r.getSnapshot;r=r.value;try{var t=e();return!gl(r,t)}catch{return!0}}function _l(r,e){return e()}var Nl=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?_l:wl;ms.useSyncExternalStore=Re.useSyncExternalStore!==void 0?Re.useSyncExternalStore:Nl;hs.exports=ms;var jl=hs.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _t=f,Il=jl;function Sl(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var kl=typeof Object.is=="function"?Object.is:Sl,El=Il.useSyncExternalStore,Tl=_t.useRef,Cl=_t.useEffect,Al=_t.useMemo,Rl=_t.useDebugValue;us.useSyncExternalStoreWithSelector=function(r,e,t,n,i){var a=Tl(null);if(a.current===null){var o={hasValue:!1,value:null};a.current=o}else o=a.current;a=Al(function(){function l(p){if(!d){if(d=!0,h=p,p=n(p),i!==void 0&&o.hasValue){var N=o.value;if(i(N,p))return u=N}return u=p}if(N=u,kl(h,p))return N;var b=n(p);return i!==void 0&&i(N,b)?(h=p,N):(h=p,u=b)}var d=!1,h,u,m=t===void 0?null:t;return[function(){return l(e())},m===null?void 0:function(){return l(m())}]},[e,t,n,i]);var c=El(r,a[0],a[1]);return Cl(function(){o.hasValue=!0,o.value=c},[c]),Rl(c),c};ds.exports=us;var Pl=ds.exports;const Ol=Zs(Pl),fs={},{useDebugValue:Dl}=Ee,{useSyncExternalStoreWithSelector:Ll}=Ol;let cn=!1;const Ml=r=>r;function Ul(r,e=Ml,t){(fs?"production":void 0)!=="production"&&t&&!cn&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),cn=!0);const n=Ll(r.subscribe,r.getState,r.getServerState||r.getInitialState,e,t);return Dl(n),n}const Fl=r=>{(fs?"production":void 0)!=="production"&&typeof r!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof r=="function"?fl(r):r,t=(n,i)=>Ul(e,n,i);return Object.assign(t,e),t},Bl=r=>Fl,$l={};function ps(r,e){let t;try{t=r()}catch{return}return{getItem:i=>{var a;const o=l=>l===null?null:JSON.parse(l,void 0),c=(a=t.getItem(i))!=null?a:null;return c instanceof Promise?c.then(o):o(c)},setItem:(i,a)=>t.setItem(i,JSON.stringify(a,void 0)),removeItem:i=>t.removeItem(i)}}const He=r=>e=>{try{const t=r(e);return t instanceof Promise?t:{then(n){return He(n)(t)},catch(n){return this}}}catch(t){return{then(n){return this},catch(n){return He(n)(t)}}}},zl=(r,e)=>(t,n,i)=>{let a={getStorage:()=>localStorage,serialize:JSON.stringify,deserialize:JSON.parse,partialize:x=>x,version:0,merge:(x,w)=>({...w,...x}),...e},o=!1;const c=new Set,l=new Set;let d;try{d=a.getStorage()}catch{}if(!d)return r((...x)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),t(...x)},n,i);const h=He(a.serialize),u=()=>{const x=a.partialize({...n()});let w;const _=h({state:x,version:a.version}).then(L=>d.setItem(a.name,L)).catch(L=>{w=L});if(w)throw w;return _},m=i.setState;i.setState=(x,w)=>{m(x,w),u()};const p=r((...x)=>{t(...x),u()},n,i);let N;const b=()=>{var x;if(!d)return;o=!1,c.forEach(_=>_(n()));const w=((x=a.onRehydrateStorage)==null?void 0:x.call(a,n()))||void 0;return He(d.getItem.bind(d))(a.name).then(_=>{if(_)return a.deserialize(_)}).then(_=>{if(_)if(typeof _.version=="number"&&_.version!==a.version){if(a.migrate)return a.migrate(_.state,_.version);console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return _.state}).then(_=>{var L;return N=a.merge(_,(L=n())!=null?L:p),t(N,!0),u()}).then(()=>{w==null||w(N,void 0),o=!0,l.forEach(_=>_(N))}).catch(_=>{w==null||w(void 0,_)})};return i.persist={setOptions:x=>{a={...a,...x},x.getStorage&&(d=x.getStorage())},clearStorage:()=>{d==null||d.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>b(),hasHydrated:()=>o,onHydrate:x=>(c.add(x),()=>{c.delete(x)}),onFinishHydration:x=>(l.add(x),()=>{l.delete(x)})},b(),N||p},Vl=(r,e)=>(t,n,i)=>{let a={storage:ps(()=>localStorage),partialize:b=>b,version:0,merge:(b,x)=>({...x,...b}),...e},o=!1;const c=new Set,l=new Set;let d=a.storage;if(!d)return r((...b)=>{console.warn(`[zustand persist middleware] Unable to update item '${a.name}', the given storage is currently unavailable.`),t(...b)},n,i);const h=()=>{const b=a.partialize({...n()});return d.setItem(a.name,{state:b,version:a.version})},u=i.setState;i.setState=(b,x)=>{u(b,x),h()};const m=r((...b)=>{t(...b),h()},n,i);i.getInitialState=()=>m;let p;const N=()=>{var b,x;if(!d)return;o=!1,c.forEach(_=>{var L;return _((L=n())!=null?L:m)});const w=((x=a.onRehydrateStorage)==null?void 0:x.call(a,(b=n())!=null?b:m))||void 0;return He(d.getItem.bind(d))(a.name).then(_=>{if(_)if(typeof _.version=="number"&&_.version!==a.version){if(a.migrate)return[!0,a.migrate(_.state,_.version)];console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,_.state];return[!1,void 0]}).then(_=>{var L;const[T,I]=_;if(p=a.merge(I,(L=n())!=null?L:m),t(p,!0),T)return h()}).then(()=>{w==null||w(p,void 0),p=n(),o=!0,l.forEach(_=>_(p))}).catch(_=>{w==null||w(void 0,_)})};return i.persist={setOptions:b=>{a={...a,...b},b.storage&&(d=b.storage)},clearStorage:()=>{d==null||d.removeItem(a.name)},getOptions:()=>a,rehydrate:()=>N(),hasHydrated:()=>o,onHydrate:b=>(c.add(b),()=>{c.delete(b)}),onFinishHydration:b=>(l.add(b),()=>{l.delete(b)})},a.skipHydration||N(),p||m},Hl=(r,e)=>"getStorage"in e||"serialize"in e||"deserialize"in e?(($l?"production":void 0)!=="production"&&console.warn("[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead."),zl(r,e)):Vl(r,e),Wl=Hl,ln={activeStepId:null,focusMode:!1,sidebarOpen:!1,theme:"system",lastPlanDate:null,workPreferences:{workStart:"09:00",workEnd:"17:00",breakDuration:15,maxDeepWorkBlock:90}},Nt=Bl()(Wl(r=>({...ln,setActiveStepId:e=>r({activeStepId:e}),setFocusMode:e=>r({focusMode:e}),toggleSidebar:()=>r(e=>({sidebarOpen:!e.sidebarOpen})),setSidebarOpen:e=>r({sidebarOpen:e}),setTheme:e=>r({theme:e}),setLastPlanDate:e=>r({lastPlanDate:e}),setWorkPreferences:e=>r(t=>({workPreferences:{...t.workPreferences,...e}})),reset:()=>r(ln)}),{name:"chronos-ui-store",storage:ps(()=>localStorage),partialize:r=>({theme:r.theme,lastPlanDate:r.lastPlanDate,sidebarOpen:r.sidebarOpen,workPreferences:r.workPreferences})}));function v(...r){return ni(si(r))}function Gl(r){return(typeof r=="string"?new Date(r):r).toLocaleDateString([],{weekday:"short",month:"short",day:"numeric"})}function ql(r){return r.toISOString().split("T")[0]}function Kl(){return ql(new Date)}const k=f.forwardRef(({children:r,variant:e="primary",size:t="md",loading:n=!1,leftIcon:i,rightIcon:a,fullWidth:o=!1,className:c,disabled:l,...d},h)=>{const u="inline-flex items-center justify-center gap-2 font-body font-medium rounded-xl transition-all duration-smooth ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",m={primary:"bg-accent-primary text-bg-deep hover:bg-accent-primary-dim hover:shadow-glow",secondary:"bg-bg-card text-text-primary border border-border-subtle hover:bg-border-subtle hover:border-border-glow",ghost:"bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-card",danger:"bg-accent-danger/10 text-accent-danger border border-accent-danger/20 hover:bg-accent-danger/20 hover:border-accent-danger/40",success:"bg-accent-primary/10 text-accent-primary border border-accent-primary/20 hover:bg-accent-primary/20 hover:border-accent-primary/40",glass:"bg-bg-glass backdrop-blur-xl text-text-primary border border-border-subtle hover:border-border-glow"},p={sm:"px-3 py-1.5 text-xs gap-1.5",md:"px-4 py-2.5 text-sm gap-2",lg:"px-6 py-3 text-base gap-2",icon:"p-2"};return s.jsx("button",{ref:h,className:v(u,m[e],p[t],o&&"w-full",c),disabled:l||n,"aria-busy":n,...d,children:n?s.jsx(Wt,{className:"h-4 w-4 animate-spin","aria-hidden":"true"}):s.jsxs(s.Fragment,{children:[i&&s.jsx("span",{className:"flex-shrink-0","aria-hidden":"true",children:i}),r,a&&s.jsx("span",{className:"flex-shrink-0","aria-hidden":"true",children:a})]})})});k.displayName="Button";const gs=f.forwardRef(({onSignIn:r,onSignInIncognito:e,className:t,...n},i)=>s.jsxs("section",{ref:i,className:v("relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden",t),...n,children:[s.jsx("div",{className:"absolute inset-0 bg-grid grid opacity-5","aria-hidden":"true"}),s.jsx("div",{className:"absolute inset-0 bg-gradient-radial from-accent-primary/5 via-transparent to-transparent","aria-hidden":"true"}),s.jsx("div",{className:"absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-primary/10 blur-3xl animate-pulse-slow","aria-hidden":"true"}),s.jsx("div",{className:"absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-info/10 blur-3xl animate-pulse-slow",style:{animationDelay:"1s"},"aria-hidden":"true"}),s.jsxs("div",{className:"relative z-10 max-w-4xl mx-auto text-center",children:[s.jsx("div",{className:"mb-8 animate-fade-in",children:s.jsxs("span",{className:"badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-4 py-1.5 text-sm",children:[s.jsx(mn,{className:"h-3 w-3 mr-1.5","aria-hidden":"true"}),"AI-Powered Adversarial Planning"]})}),s.jsxs("h1",{className:"font-display text-display-xl sm:text-display-lg font-semibold text-text-primary mb-6 animate-slide-in",children:["Stop Planning.",s.jsx("br",{}),s.jsx("span",{className:"text-gradient",children:"Start Executing."})]}),s.jsx("p",{className:"text-body-lg text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-in",style:{animationDelay:"100ms"},children:"Chronos breaks your tasks into micro-commitments you can't ignore. Time-blocked to your energy. Focus mode built-in. No more procrastination."}),s.jsxs("div",{className:"flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in",style:{animationDelay:"200ms"},children:[s.jsx(k,{variant:"primary",size:"lg",onClick:r,leftIcon:s.jsx(Gt,{className:"h-5 w-5","aria-hidden":"true"}),className:"w-full sm:w-auto",children:"Sign in with Google"}),s.jsx(k,{variant:"glass",size:"lg",onClick:e,leftIcon:s.jsx(qt,{className:"h-5 w-5","aria-hidden":"true"}),className:"w-full sm:w-auto text-accent-primary border-accent-primary/20 hover:border-accent-primary",children:"Go Incognito (Guest)"})]}),s.jsx("div",{className:"mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in",style:{animationDelay:"300ms"},children:[{icon:Ge,title:"Energy-Aware Scheduling",desc:"Tasks aligned to your natural energy rhythms — deep work when you're sharp, admin when you're not."},{icon:Me,title:"Adversarial Micro-Steps",desc:"Every task broken into 5-15 min steps with reasons. Your brain can't argue with a 7-minute commitment."},{icon:qt,title:"Built-in Focus Mode",desc:"Fullscreen + Wake Lock + Timer. One click launches your sprint. Distractions locked out."}].map((a,o)=>s.jsxs("div",{className:"glass p-6 rounded-2xl text-left transition-all hover:border-border-glow",children:[s.jsx("div",{className:"w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center mb-4",children:s.jsx(a.icon,{className:"h-6 w-6 text-accent-primary","aria-hidden":"true"})}),s.jsx("h3",{className:"font-display font-semibold text-text-primary mb-2",children:a.title}),s.jsx("p",{className:"text-text-secondary",children:a.desc})]},o))})]}),s.jsx("div",{className:"absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce","aria-hidden":"true",children:s.jsx(Gt,{className:"h-6 w-6 text-text-muted rotate-90"})})]}));gs.displayName="Hero";const Jl=[{icon:dt,title:"Adversarial Planning",desc:"AI argues with your task list. Only the essential survives. Rejected tasks shown with reasons.",highlight:"Rejection Log"},{icon:Ge,title:"Energy-Aware Time Blocking",desc:"Morning deep work. Afternoon admin. Evening light tasks. Your calendar matches your biology.",highlight:"Chronotype Sync"},{icon:Me,title:"Micro-Commitment Engine",desc:'Every step 5-15 minutes. Reason included. Deep link ready. Your brain says "I can do 7 minutes".',highlight:"5-15 min steps"},{icon:qt,title:"Focus Mode Lock-In",desc:"One click: fullscreen, wake lock, timer, notification. Distractions physically impossible.",highlight:"Zero Distractions"},{icon:ii,title:"Museum of Done",desc:"Every completed step logged forever. Searchable. Filterable. Proof you ship.",highlight:"Infinite Log"},{icon:ai,title:"Multi-Source Ingestion",desc:"Calendar, Email, Slack, Notion, Manual. One inbox. One plan. Zero context switching.",highlight:"Unified Input"}],xs=f.forwardRef(({className:r,...e},t)=>s.jsx("section",{ref:t,className:v("py-20 px-4 sm:px-6 lg:px-8 bg-bg-card/50",r),...e,children:s.jsxs("div",{className:"mx-auto max-w-7xl",children:[s.jsxs("div",{className:"text-center mb-16",children:[s.jsxs("h2",{className:"font-display text-display-sm font-semibold text-text-primary mb-4",children:["Engineered for ",s.jsx("span",{className:"text-gradient",children:"Execution"})]}),s.jsx("p",{className:"text-text-secondary max-w-2xl mx-auto",children:"Six pillars that transform intention into action. No fluff. No gamification. Just results."})]}),s.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:Jl.map((n,i)=>s.jsx("article",{className:"group glass p-6 rounded-2xl hover:border-border-glow hover:shadow-glow-lg transition-all duration-smooth",children:s.jsxs("div",{className:"flex items-start gap-4",children:[s.jsx("div",{className:"flex-shrink-0 w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors",children:s.jsx(n.icon,{className:"h-6 w-6 text-accent-primary","aria-hidden":"true"})}),s.jsxs("div",{className:"flex-1",children:[s.jsx("h3",{className:"font-display font-semibold text-text-primary mb-2",children:n.title}),s.jsx("p",{className:"text-text-secondary text-sm mb-3",children:n.desc}),s.jsx("span",{className:"badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 text-xs",children:n.highlight})]})]})},i))})]})}));xs.displayName="FeatureStrip";const bs=f.forwardRef(({className:r,...e},t)=>s.jsx("footer",{ref:t,className:v("border-t border-border-subtle py-8 px-4 sm:px-6 lg:px-8",r),...e,children:s.jsxs("div",{className:"mx-auto max-w-7xl",children:[s.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-6",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:"w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center",children:s.jsx("span",{className:"font-display font-bold text-accent-primary",children:"CR"})}),s.jsx("span",{className:"font-display font-semibold text-xl text-text-primary",children:"Chronos"})]}),s.jsx("p",{className:"text-sm text-text-muted",children:"Built for humans who ship. Adversarial planning for the win."}),s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"text-text-muted hover:text-accent-primary transition-colors","aria-label":"GitHub",children:s.jsx(oi,{className:"h-5 w-5"})}),s.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",className:"text-text-muted hover:text-accent-primary transition-colors","aria-label":"Twitter",children:s.jsx(ci,{className:"h-5 w-5"})}),s.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",className:"text-text-muted hover:text-accent-primary transition-colors","aria-label":"LinkedIn",children:s.jsx(li,{className:"h-5 w-5"})}),s.jsx("a",{href:"mailto:hello@chronos.app",className:"text-text-muted hover:text-accent-primary transition-colors","aria-label":"Email",children:s.jsx(di,{className:"h-5 w-5"})})]})]}),s.jsx("div",{className:"mt-6 pt-6 border-t border-border-subtle text-center text-sm text-text-muted",children:s.jsx("p",{children:"© 2024 Chronos. All rights reserved."})})]})}));bs.displayName="Footer";function Yl(){const{loading:r,signIn:e,signInIncognito:t}=we(),n=We(),i=async()=>{try{await e(),n("/plan")}catch(o){console.error("Sign in failed:",o)}},a=async()=>{try{await t(),n("/plan")}catch(o){console.error("Guest mode failed:",o)}};return s.jsxs("div",{className:"min-h-screen flex flex-col",children:[s.jsx("header",{className:"fixed top-0 left-0 right-0 z-40 glass-border backdrop-blur-xl border-b px-4 sm:px-6 lg:px-8",children:s.jsxs("div",{className:"mx-auto max-w-7xl flex items-center justify-between h-16",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:"w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center",children:s.jsx(mn,{className:"h-5 w-5 text-accent-primary","aria-hidden":"true"})}),s.jsx("span",{className:"font-display font-semibold text-xl text-text-primary",children:"Chronos"})]}),s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx(k,{variant:"ghost",size:"sm",className:"text-text-secondary hover:text-text-primary",onClick:a,disabled:r,children:"Incognito (Guest)"}),s.jsx(k,{variant:"primary",size:"sm",onClick:i,disabled:r,children:"Sign in with Google"})]})]})}),s.jsxs("main",{className:"flex-1",children:[s.jsx(gs,{onSignIn:i,onSignInIncognito:a}),s.jsx(xs,{})]}),s.jsx(bs,{})]})}function Xl(r){return r.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2)}function Ql(r){const e=["bg-accent-primary/20 text-accent-primary","bg-accent-info/20 text-accent-info","bg-accent-warn/20 text-accent-warn","bg-accent-danger/20 text-accent-danger","bg-purple-500/20 text-purple-400","bg-pink-500/20 text-pink-400","bg-orange-500/20 text-orange-400","bg-cyan-500/20 text-cyan-400"];let t=0;for(let n=0;n<r.length;n++)t=r.charCodeAt(n)+((t<<5)-t);return e[Math.abs(t)%e.length]}const or=f.forwardRef(({src:r,alt:e,name:t,size:n="md",shape:i="circle",status:a,className:o,...c},l)=>{const d={xs:"h-6 w-6 text-xs",sm:"h-8 w-8 text-sm",md:"h-10 w-10 text-base",lg:"h-12 w-12 text-lg",xl:"h-16 w-16 text-xl"},h={circle:"rounded-full",square:"rounded-xl"},u={xs:"h-1.5 w-1.5",sm:"h-2 w-2",md:"h-2.5 w-2.5",lg:"h-3 w-3",xl:"h-4 w-4"},m={online:"bg-accent-primary",offline:"bg-text-muted",busy:"bg-accent-danger",away:"bg-accent-warn"},p=!!r;return s.jsxs("div",{ref:l,className:v("relative inline-flex shrink-0",o),...c,children:[s.jsx("div",{className:v("overflow-hidden bg-border-subtle flex items-center justify-center font-medium",d[n],h[i]),role:"img","aria-label":t||e||"User avatar",children:p?s.jsx("img",{src:r,alt:e||t||"User avatar",className:"h-full w-full object-cover",loading:"lazy"}):t?s.jsx("span",{className:Ql(t),children:Xl(t)}):s.jsx("svg",{className:"h-full w-full text-text-muted opacity-50",fill:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{d:"M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"})})}),a&&s.jsx("span",{className:v("absolute bottom-0 right-0 border-2 border-bg-deep rounded-full",u[n],m[a]),"aria-label":`Status: ${a}`})]})});or.displayName="Avatar";const Zl=f.forwardRef(({children:r,max:e=5,size:t="md",className:n,...i},a)=>{const o=Ee.Children.toArray(r),c=o.slice(0,e),l=o.length-e;return s.jsxs("div",{ref:a,className:v("flex -space-x-2",n),...i,children:[c.map((d,h)=>Ee.cloneElement(d,{key:h,size:t,className:v("ring-2 ring-bg-deep",d.props.className)})),l>0&&s.jsxs("div",{className:v("flex items-center justify-center bg-border-subtle text-text-secondary font-medium border-2 border-bg-deep",{"h-6 w-6 text-xs":t==="xs","h-8 w-8 text-sm":t==="sm","h-10 w-10 text-base":t==="md","h-12 w-12 text-lg":t==="lg","h-16 w-16 text-xl":t==="xl"}),"aria-label":`${l} more users`,children:["+",l]})]})});Zl.displayName="AvatarGroup";function jt({totalPlannedMinutes:r=0,rejectedCount:e=0,onNewPlan:t,onViewRejected:n,onOpenSettings:i}){const a=We(),o=ei(),{theme:c,setTheme:l,sidebarOpen:d,toggleSidebar:h}=Nt(),{user:u,signOut:m}=we(),[p,N]=f.useState(!1),[b,x]=f.useState(!1),w=f.useRef(null),_=f.useRef(null);f.useEffect(()=>{function T(I){w.current&&!w.current.contains(I.target)&&N(!1),_.current&&!_.current.contains(I.target)&&x(!1)}return document.addEventListener("mousedown",T),()=>document.removeEventListener("mousedown",T)},[]);const L=T=>{if(T<60)return`${T}m`;const I=Math.floor(T/60),A=T%60;return A>0?`${I}h ${A}m`:`${I}h`};return s.jsxs("header",{className:v("sticky top-0 z-40 glass-border backdrop-blur-xl border-b","px-4 sm:px-6 lg:px-8"),children:[s.jsxs("div",{className:"flex items-center justify-between h-16 gap-4",children:[s.jsxs("div",{className:"flex items-center gap-4 flex-1 min-w-0",children:[s.jsx(k,{variant:"ghost",size:"icon",onClick:h,"aria-label":d?"Close menu":"Open menu",children:s.jsx(ui,{className:"h-5 w-5","aria-hidden":"true"})}),s.jsxs("button",{onClick:()=>a("/plan"),className:"flex items-center gap-3 hover:opacity-80 transition-opacity","aria-label":"Chronos home",children:[s.jsx("span",{className:"font-display font-semibold text-xl text-text-primary hidden sm:block",children:"Chronos"}),s.jsx("span",{className:"font-display font-semibold text-lg text-text-primary sm:hidden",children:"CR"})]}),s.jsxs("div",{className:"hidden md:flex items-center gap-4 px-3 py-1.5 glass rounded-xl",children:[s.jsx("span",{className:"text-sm font-mono text-text-primary",children:L(r)}),e>0&&s.jsx(k,{variant:"ghost",size:"sm",onClick:n,className:"text-accent-danger hover:text-accent-danger","aria-label":`${e} rejected tasks`,children:s.jsxs("span",{className:"flex items-center gap-1",children:["Rejected",s.jsx("span",{className:"badge bg-accent-danger/10 text-accent-danger border-accent-danger/20 px-1.5 py-0",children:e})]})})]})]}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsxs(k,{variant:"ghost",size:"sm",onClick:()=>a("/tetris"),"aria-label":"Play Calendar Tetris",className:"hidden sm:flex border border-border-glow text-accent-primary hover:bg-accent-primary/5 gap-2",children:[s.jsx("span",{children:"🎮"}),s.jsx("span",{children:"Calendar Tetris"})]}),s.jsxs("div",{className:"relative",ref:_,children:[s.jsx(k,{variant:"ghost",size:"icon",onClick:()=>x(!b),"aria-label":"Change theme","aria-expanded":b,"aria-haspopup":"menu",children:c==="dark"?s.jsx(Kt,{className:"h-5 w-5"}):c==="light"?s.jsx(Jt,{className:"h-5 w-5"}):s.jsx(Yt,{className:"h-5 w-5"})}),b&&s.jsxs("div",{className:"absolute right-0 top-full mt-2 glass rounded-xl shadow-glow-lg py-1 w-40 z-50 animate-scale-in",children:[s.jsxs("button",{onClick:()=>{l("system"),x(!1)},className:v("w-full px-3 py-2 text-left text-sm flex items-center gap-2",c==="system"&&"bg-accent-primary/10 text-accent-primary"),children:[s.jsx(Yt,{className:"h-4 w-4"}),"System"]}),s.jsxs("button",{onClick:()=>{l("light"),x(!1)},className:v("w-full px-3 py-2 text-left text-sm flex items-center gap-2",c==="light"&&"bg-accent-primary/10 text-accent-primary"),children:[s.jsx(Jt,{className:"h-4 w-4"}),"Light"]}),s.jsxs("button",{onClick:()=>{l("dark"),x(!1)},className:v("w-full px-3 py-2 text-left text-sm flex items-center gap-2",c==="dark"&&"bg-accent-primary/10 text-accent-primary"),children:[s.jsx(Kt,{className:"h-4 w-4"}),"Dark"]})]})]}),s.jsx(k,{variant:"ghost",size:"icon",onClick:i,"aria-label":"Settings",children:s.jsx(Ct,{className:"h-5 w-5","aria-hidden":"true"})}),s.jsxs("div",{className:"relative",ref:w,children:[s.jsx("button",{onClick:()=>N(!p),className:"flex items-center gap-2 p-1 rounded-xl hover:bg-bg-card transition-colors","aria-label":"User menu","aria-expanded":p,"aria-haspopup":"menu",children:s.jsx(or,{size:"sm",name:(u==null?void 0:u.displayName)??"User",src:(u==null?void 0:u.photoURL)??void 0})}),p&&s.jsxs("div",{className:"absolute right-0 top-full mt-2 glass rounded-xl shadow-glow-lg py-1 w-44 z-50 animate-scale-in",children:[s.jsxs("div",{className:"px-3 py-2 border-b border-border-subtle",children:[s.jsx("p",{className:"text-sm font-medium text-text-primary",children:(u==null?void 0:u.displayName)??"User"}),s.jsx("p",{className:"text-xs text-text-muted truncate",children:u==null?void 0:u.email})]}),s.jsxs("button",{onClick:i,className:"w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-bg-card rounded-none",children:[s.jsx(Ct,{className:"h-4 w-4"}),"Settings"]}),s.jsxs("button",{onClick:async()=>{await m()},className:"w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-bg-card rounded-none text-accent-danger",children:[s.jsx(kr,{className:"h-4 w-4"}),"Sign Out"]})]})]})]})]}),s.jsxs("div",{className:v("fixed inset-0 z-50 transition-all duration-300",d?"visible opacity-100":"invisible opacity-0"),children:[s.jsx("div",{className:"absolute inset-0 bg-bg-deep/60 backdrop-blur-sm",onClick:h}),s.jsxs("div",{className:v("absolute inset-y-0 left-0 w-72 bg-bg-card/90 backdrop-blur-2xl border-r border-border-subtle p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out",d?"translate-x-0":"-translate-x-full"),children:[s.jsxs("div",{className:"space-y-8",children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:"w-8 h-8 rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center",children:s.jsx("span",{className:"font-display font-bold text-accent-primary",children:"CR"})}),s.jsx("span",{className:"font-display font-semibold text-xl text-text-primary",children:"Chronos"})]}),s.jsx(k,{variant:"ghost",size:"icon",onClick:h,className:"text-text-muted hover:text-text-primary",children:s.jsx("span",{className:"text-xl",children:"×"})})]}),s.jsxs("nav",{className:"space-y-2",children:[s.jsxs("button",{onClick:()=>{a("/plan"),h()},className:v("w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",o.pathname==="/plan"?"bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20":"text-text-secondary hover:text-text-primary hover:bg-bg-card"),children:[s.jsx(dt,{className:"h-5 w-5"}),"Plan Dashboard"]}),s.jsxs("button",{onClick:()=>{a("/museum"),h()},className:v("w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",o.pathname==="/museum"?"bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20":"text-text-secondary hover:text-text-primary hover:bg-bg-card"),children:[s.jsx(Ge,{className:"h-5 w-5"}),"Museum of Done"]}),s.jsxs("button",{onClick:()=>{a("/settings"),h()},className:v("w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",o.pathname==="/settings"?"bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20":"text-text-secondary hover:text-text-primary hover:bg-bg-card"),children:[s.jsx(Ct,{className:"h-5 w-5"}),"Settings"]}),s.jsxs("button",{onClick:()=>{a("/tetris"),h()},className:v("w-full px-4 py-3 rounded-xl flex items-center gap-3 text-left transition-all",o.pathname==="/tetris"?"bg-accent-primary/10 text-accent-primary font-medium border border-accent-primary/20":"text-text-secondary hover:text-text-primary hover:bg-bg-card"),children:[s.jsx("span",{className:"text-xl",children:"🎮"}),"Calendar Tetris"]})]})]}),s.jsxs("div",{className:"pt-4 border-t border-border-subtle space-y-4",children:[s.jsxs("div",{className:"flex items-center gap-3 px-2",children:[s.jsx(or,{size:"sm",name:(u==null?void 0:u.displayName)??"User",src:(u==null?void 0:u.photoURL)??void 0}),s.jsxs("div",{className:"min-w-0 flex-1",children:[s.jsx("p",{className:"text-sm font-medium text-text-primary truncate",children:(u==null?void 0:u.displayName)??"User"}),s.jsx("p",{className:"text-xs text-text-muted truncate",children:u==null?void 0:u.email})]})]}),s.jsx(k,{variant:"ghost",className:"w-full justify-start text-accent-danger hover:text-accent-danger hover:bg-accent-danger/5 gap-3",leftIcon:s.jsx(kr,{className:"h-5 w-5"}),onClick:async()=>{await m(),h()},children:"Sign Out"})]})]})]})]})}const ys=f.forwardRef(({onClick:r,label:e="New Plan",className:t,icon:n,...i},a)=>s.jsx("div",{className:"fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-30",role:"region","aria-label":"Primary actions",children:s.jsx(k,{ref:a,variant:"primary",size:"lg",onClick:r,leftIcon:n||s.jsx(hi,{className:"h-5 w-5","aria-hidden":"true"}),className:v("shadow-glow-lg animate-scale-in hover:shadow-[0_0_30px_rgba(0,229,160,0.3)]",t),...i,children:e})}));ys.displayName="FooterFAB";function vs({totalSeconds:r,size:e="lg",showLabel:t=!0,pulseThreshold:n=30,onComplete:i,className:a}){const o={sm:{ringSize:4,fontSize:"text-xl",radius:32,strokeWidth:4},md:{ringSize:6,fontSize:"text-2xl",radius:48,strokeWidth:5},lg:{ringSize:8,fontSize:"text-4xl",radius:64,strokeWidth:6},xl:{ringSize:12,fontSize:"text-6xl",radius:80,strokeWidth:8}},{ringSize:c,fontSize:l,radius:d,strokeWidth:h}=o[e],u=2*Math.PI*d,m=u*(1-Math.max(0,r)/Math.max(1,r));f.useEffect(()=>{r<=0&&i&&i()},[r,i]);const p=Math.floor(Math.max(0,r)/60),N=Math.max(0,r)%60,b=`${p.toString().padStart(2,"0")}:${N.toString().padStart(2,"0")}`,x=r>0&&r<=n;return s.jsxs("div",{className:v("flex flex-col items-center gap-2",a),children:[s.jsxs("div",{className:"relative","aria-hidden":"true",children:[s.jsxs("svg",{className:v("transform -rotate-90",x&&"animate-pulse text-accent-danger"),width:c*16,height:c*16,children:[s.jsx("circle",{className:"text-border-subtle",cx:c*8,cy:c*8,r:d,strokeWidth:h,fill:"none"}),s.jsx("circle",{className:v("transition-all duration-300 ease-out","text-accent-primary",x&&"text-accent-danger"),cx:c*8,cy:c*8,r:d,strokeWidth:h,strokeDasharray:u,strokeDashoffset:m,strokeLinecap:"round",fill:"none",style:{strokeDasharray:u,strokeDashoffset:m}})]}),s.jsx("div",{className:v("absolute inset-0 flex items-center justify-center",l,"font-mono font-medium text-text-primary"),"aria-hidden":"true",children:b})]}),t&&s.jsx("span",{className:"text-xs text-text-muted font-medium uppercase tracking-wider",children:"Remaining"})]})}const ws=f.forwardRef(({variant:r="primary",energy:e,size:t="md",dot:n=!1,className:i,children:a,...o},c)=>{const l={primary:"bg-accent-primary/10 text-accent-primary border border-accent-primary/20",warn:"bg-accent-warn/10 text-accent-warn border border-accent-warn/20",info:"bg-accent-info/10 text-accent-info border border-accent-info/20",danger:"bg-accent-danger/10 text-accent-danger border border-accent-danger/20",neutral:"bg-border-subtle text-text-secondary border border-border-glow",energy:e?{high:"bg-accent-primary/10 text-accent-primary border border-accent-primary/20",medium:"bg-accent-warn/10 text-accent-warn border border-accent-warn/20",low:"bg-accent-info/10 text-accent-info border border-accent-info/20"}[e]:"bg-accent-primary/10 text-accent-primary border border-accent-primary/20"},d={sm:"px-2 py-0.5 text-xs",md:"px-2.5 py-1 text-xs",lg:"px-3 py-1.5 text-sm"},h=r==="energy"&&e?l.energy:l[r];return s.jsxs("span",{ref:c,className:v("inline-flex items-center gap-1.5 font-medium rounded-full border",h,d[t],i),...o,children:[n&&s.jsx("span",{className:v("rounded-full",t==="sm"&&"h-1.5 w-1.5",t==="md"&&"h-2 w-2",t==="lg"&&"h-2.5 w-2.5",e?{high:"bg-accent-primary",medium:"bg-accent-warn",low:"bg-accent-info"}[e]:"bg-accent-primary"),"aria-hidden":"true"}),a]})});ws.displayName="Badge";const jr=f.forwardRef(({energy:r,showLabel:e=!0,size:t="md",className:n,...i},a)=>{const o={high:"High",medium:"Med",low:"Low"};return s.jsx(ws,{ref:a,variant:"energy",energy:r,size:t,dot:!0,className:n,...i,children:e&&o[r]})});jr.displayName="EnergyBadge";function ed({isOpen:r,onClose:e,onFinishEarly:t,onAbort:n,currentStep:i,secondsRemaining:a,isFullscreen:o=!1,onToggleFullscreen:c}){const l=f.useRef(null),d=f.useRef(null),[h,u]=f.useState("none"),[m,p]=f.useState(.4),N=f.useRef(null),b=f.useRef(null),x=f.useRef(null),w=f.useRef(null),_=()=>{if(b.current){try{b.current.disconnect()}catch{}b.current=null}w.current&&(w.current.pause(),w.current=null)},L=T=>{_();try{N.current||(N.current=new(window.AudioContext||window.webkitAudioContext));const I=N.current;if(I.state==="suspended"&&I.resume(),x.current||(x.current=I.createGain(),x.current.connect(I.destination)),x.current.gain.value=m,T==="lofi"){const R=I.createOscillator(),F=I.createOscillator(),B=I.createGain();R.type="triangle",R.frequency.value=110,F.type="sine",F.frequency.value=165,B.gain.value=.15,R.connect(B),F.connect(B),B.connect(x.current),R.start(),F.start();const y=I.createOscillator();y.frequency.value=.08;const j=I.createGain();j.gain.value=.05,y.connect(j),j.connect(B.gain),y.start();const D=setInterval(()=>{if(!(!N.current||N.current.state==="suspended"))try{const C=I.currentTime,P=I.createOscillator(),E=I.createGain();P.type="sine";const V=[523.25,587.33,659.25,783.99,880],$=V[Math.floor(Math.random()*V.length)];P.frequency.value=$,E.gain.setValueAtTime(0,C),E.gain.linearRampToValueAtTime(.05,C+.1),E.gain.exponentialRampToValueAtTime(1e-4,C+4),P.connect(E),E.connect(x.current),P.start(C),P.stop(C+4.1)}catch(C){console.error(C)}},4e3);b.current={disconnect:()=>{clearInterval(D);try{R.stop(),F.stop(),y.stop()}catch{}R.disconnect(),F.disconnect(),y.disconnect(),B.disconnect(),j.disconnect()}};return}const A=2*I.sampleRate,q=I.createBuffer(1,A,I.sampleRate),z=q.getChannelData(0);if(T==="rain"){let R=0,F=0,B=0,y=0,j=0,D=0,C=0;for(let P=0;P<A;P++){const E=Math.random()*2-1;R=.99886*R+E*.0555179,F=.99332*F+E*.0750759,B=.969*B+E*.153852,y=.8665*y+E*.3104856,j=.55*j+E*.5329522,D=-.7616*D-E*.016898,z[P]=R+F+B+y+j+D+C+E*.5362,z[P]*=.11,C=E*.115926}}else if(T==="ocean"){let R=0;for(let F=0;F<A;F++){const B=Math.random()*2-1;z[F]=(R+.02*B)/1.02,R=z[F],z[F]*=3.5}}else if(T==="wind")for(let R=0;R<A;R++)z[R]=Math.random()*2-1;const H=I.createBufferSource();if(H.buffer=q,H.loop=!0,T==="wind"){const R=I.createBiquadFilter();R.type="lowpass",R.frequency.value=400,R.Q.value=1;const F=I.createOscillator();F.frequency.value=.15;const B=I.createGain();B.gain.value=180,F.connect(B),B.connect(R.frequency),H.connect(R),R.connect(x.current),F.start()}else H.connect(x.current);H.start(),b.current=H}catch(I){console.error("Failed to initialize audio node synthesis:",I)}};return f.useEffect(()=>{x.current&&(x.current.gain.value=m),w.current&&(w.current.volume=m)},[m]),f.useEffect(()=>{r||(_(),u("none"))},[r]),f.useEffect(()=>()=>{_()},[]),f.useEffect(()=>{var T;if(r){d.current=document.activeElement,document.body.style.overflow="hidden",document.body.classList.add("overscroll-none"),(T=l.current)==null||T.focus();const I=A=>{A.key==="Escape"?n():A.key===" "||A.key==="Enter"?(A.preventDefault(),t()):(A.key==="f"||A.key==="F")&&(c==null||c())};return document.addEventListener("keydown",I),()=>{var A;document.body.style.overflow="",document.body.classList.remove("overscroll-none"),document.removeEventListener("keydown",I),(A=d.current)==null||A.focus()}}},[r,n,t,c]),r?s.jsxs("div",{ref:l,tabIndex:-1,className:v("fixed inset-0 z-[200] flex flex-col items-center justify-center","bg-bg-deep/95 backdrop-blur-2xl animate-fade-in"),role:"dialog","aria-modal":"true","aria-label":"Focus Mode",children:[s.jsxs("div",{className:"absolute top-4 right-4 flex items-center gap-2",children:[c&&s.jsx(k,{variant:"ghost",size:"icon",onClick:c,"aria-label":o?"Exit fullscreen":"Enter fullscreen",className:"text-text-secondary hover:text-text-primary",children:s.jsx(Le,{className:"h-5 w-5"})}),s.jsx(k,{variant:"ghost",size:"icon",onClick:n,"aria-label":"Abort focus session",className:"text-text-secondary hover:text-accent-danger",children:s.jsx(Te,{className:"h-5 w-5"})})]}),s.jsxs("div",{className:"relative z-10 w-full max-w-2xl px-6 py-12 text-center",children:[s.jsx("div",{className:"mb-8",children:s.jsx("span",{className:"badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm",children:"FOCUS MODE"})}),i&&s.jsxs("div",{className:"mb-10 animate-fade-in",children:[s.jsx("p",{className:"text-sm text-text-muted uppercase tracking-wider mb-2",children:"Current Sprint"}),s.jsx("h1",{className:"font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-text-primary leading-tight max-w-xl mx-auto",children:i.text}),s.jsxs("div",{className:"flex items-center justify-center gap-4 mt-4",children:[s.jsx(jr,{energy:i.energy_cost,size:"md"}),s.jsxs("span",{className:"text-sm text-text-secondary font-mono",children:[i.duration_min," min"]})]})]}),s.jsx(vs,{totalSeconds:a,size:"xl",showLabel:!0,pulseThreshold:30}),s.jsxs("div",{className:"mt-10 flex items-center justify-center gap-4",children:[s.jsx(k,{variant:"danger",size:"lg",onClick:n,leftIcon:s.jsx(Te,{className:"h-5 w-5","aria-hidden":"true"}),className:"min-w-[140px]",children:"Abort"}),s.jsx(k,{variant:"success",size:"lg",onClick:t,leftIcon:s.jsx(mi,{className:"h-5 w-5","aria-hidden":"true"}),className:"min-w-[160px]",children:"Finish Early"})]}),s.jsxs("div",{className:"mt-8 p-5 glass rounded-2xl border border-border-subtle max-w-sm mx-auto shadow-glow-sm",children:[s.jsxs("div",{className:"flex items-center justify-between mb-3",children:[s.jsxs("div",{className:"flex items-center gap-2 text-text-primary text-xs font-semibold uppercase tracking-wider",children:[s.jsx(Er,{className:"h-4 w-4 text-accent-primary"}),s.jsx("span",{children:"Ambient Soundscape"})]}),h!=="none"&&s.jsx("span",{className:"text-[10px] text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded-full border border-accent-primary/20 animate-pulse font-medium",children:"Playing"})]}),s.jsx("div",{className:"grid grid-cols-5 gap-1.5 mb-3",children:[{id:"none",label:"Mute"},{id:"rain",label:"Rain"},{id:"ocean",label:"Ocean"},{id:"wind",label:"Wind"},{id:"lofi",label:"Lofi"}].map(T=>s.jsx("button",{type:"button",onClick:()=>{u(T.id),T.id==="none"?_():L(T.id)},className:v("py-1.5 rounded-lg text-xs font-medium border transition-all",h===T.id?"bg-accent-primary/10 border-accent-primary text-accent-primary font-semibold shadow-glow-sm":"border-border-subtle hover:border-border-glow text-text-secondary"),children:T.label},T.id))}),h!=="none"&&s.jsxs("div",{className:"flex items-center gap-3 animate-fade-in",children:[s.jsx(fi,{className:"h-3.5 w-3.5 text-text-muted"}),s.jsx("input",{type:"range",min:"0",max:"1",step:"0.05",className:"w-full h-1 bg-bg-deep rounded-lg appearance-none cursor-pointer accent-accent-primary",value:m,onChange:T=>p(parseFloat(T.target.value)),"aria-label":"Soundscape Volume"}),s.jsx(Er,{className:"h-3.5 w-3.5 text-text-muted"})]})]}),s.jsxs("p",{className:"mt-6 text-sm text-text-muted max-w-md mx-auto",children:["Press ",s.jsx("kbd",{className:"px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono",children:"Space"})," or ",s.jsx("kbd",{className:"px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono",children:"Enter"})," to finish early · ",s.jsx("kbd",{className:"px-2 py-0.5 bg-bg-card rounded text-text-primary border border-border-subtle font-mono",children:"Esc"})," to abort"]})]})]}):null}function It({children:r,className:e}){return s.jsx("main",{className:v("flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8",e),children:s.jsx("div",{className:"mx-auto max-w-4xl",children:r})})}const W=f.forwardRef(({variant:r="glass",hover:e=!1,padding:t="md",className:n,children:i,...a},o)=>{const c={default:"bg-bg-card border border-border-subtle shadow-glass",glass:"glass",strong:"glass-strong",bordered:"bg-bg-card border border-border-glow"},l={none:"",sm:"p-3",md:"p-5",lg:"p-6"};return s.jsx("div",{ref:o,className:v("rounded-2xl transition-all duration-smooth ease-smooth",c[r],l[t],e&&"hover:border-border-glow hover:shadow-glow-lg",n),...a,children:i})});W.displayName="Card";const _s=f.forwardRef(({className:r,children:e,...t},n)=>s.jsx("div",{ref:n,className:v("mb-4",r),...t,children:e}));_s.displayName="CardHeader";const Ns=f.forwardRef(({className:r,children:e,...t},n)=>s.jsx("div",{ref:n,className:v(r),...t,children:e}));Ns.displayName="CardContent";const td=f.forwardRef(({className:r,children:e,...t},n)=>s.jsx("div",{ref:n,className:v("mt-4 pt-4 border-t border-border-subtle",r),...t,children:e}));td.displayName="CardFooter";const rd={top:"bottom-full left-1/2 -translate-x-1/2 mb-2",bottom:"top-full left-1/2 -translate-x-1/2 mt-2",left:"right-full top-1/2 -translate-y-1/2 mr-2",right:"left-full top-1/2 -translate-y-1/2 ml-2"},nd={top:"top-full left-1/2 -translate-x-1/2 border-t-accent-primary",bottom:"bottom-full left-1/2 -translate-x-1/2 border-b-accent-primary",left:"left-full top-1/2 -translate-y-1/2 border-l-accent-primary",right:"right-full top-1/2 -translate-y-1/2 border-r-accent-primary"},js=f.forwardRef(({content:r,children:e,position:t="top",delay:n=200,className:i,...a},o)=>{const[c,l]=f.useState(!1),d=f.useRef(),h=f.useId(),u=()=>{d.current=setTimeout(()=>l(!0),n)},m=()=>{d.current&&clearTimeout(d.current),l(!1)};if(f.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]),!Ee.isValidElement(e))throw new Error("Tooltip children must be a single React element");const p=e.props;return s.jsxs("div",{ref:o,className:v("relative inline-flex",i),onMouseEnter:u,onMouseLeave:m,onFocus:u,onBlur:m,...a,children:[Ee.cloneElement(e,{...p,"aria-describedby":c?h:void 0}),c&&s.jsxs("div",{id:h,role:"tooltip",className:v("absolute z-50 glass px-3 py-2 text-sm text-text-primary whitespace-nowrap rounded-lg shadow-glow animate-fade-in","pointer-events-none",rd[t]),"aria-hidden":"true",children:[r,s.jsx("div",{className:v("absolute w-0 h-0 border-4 border-transparent",nd[t]),"aria-hidden":"true"})]})]})});js.displayName="Tooltip";const Is=f.forwardRef(({step:r,index:e,isActive:t=!1,isCompleted:n=!1,onLaunch:i,onComplete:a,onReopen:o,showDragHandle:c=!1,className:l,...d},h)=>{const u=f.useId(),p={high:"accent-primary",medium:"accent-warn",low:"accent-info"}[r.energy_cost],N=()=>{n||i(r)},b=()=>{a&&!n&&a(r.id)},x=()=>{o&&n&&o(r.id)},w=n?"Done":t?"Active":"Launch",_=n?"success":"primary";return s.jsxs("div",{ref:h,id:u,className:v("group relative flex items-center gap-3 p-4 glass rounded-xl transition-all duration-smooth","border border-border-subtle",t&&"border-accent-primary/50 bg-accent-primary/5 shadow-glow",n&&"opacity-60 border-border-subtle",c&&"pl-12",l),...d,children:[c&&s.jsx("button",{className:"absolute left-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors","aria-label":"Drag to reorder","aria-grabbed":"false",children:s.jsx(pi,{className:"h-5 w-5","aria-hidden":"true"})}),s.jsxs("span",{className:v("flex-shrink-0 w-8 text-center font-mono text-text-muted",n&&"text-accent-primary"),children:[e+1,"."]}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsx("p",{className:v("font-body text-text-primary break-words transition-colors",n&&"line-through text-text-muted"),children:r.text}),s.jsxs("div",{className:"flex items-center gap-3 mt-2 flex-wrap",children:[s.jsxs("span",{className:v("badge px-2 py-0.5 text-xs font-mono",`bg-${p}/10 text-${p} border-${p}/20`),children:[r.duration_min,"m"]}),r.reason&&s.jsx(js,{content:r.reason,position:"top",children:s.jsxs("span",{className:"flex items-center gap-1 text-xs text-text-muted cursor-help","aria-label":r.reason,children:[s.jsx(Ge,{className:"h-3 w-3","aria-hidden":"true"}),s.jsx("span",{children:"Why"})]})}),r.target_url&&s.jsxs("a",{href:r.target_url,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1 text-xs text-accent-primary hover:text-accent-primary-dim transition-colors","aria-label":`Open link: ${r.target_url}`,children:[s.jsx(gi,{className:"h-3 w-3","aria-hidden":"true"}),s.jsx("span",{children:"Link"})]})]})]}),s.jsx("div",{className:"flex items-center gap-2 flex-shrink-0",children:n?s.jsx(s.Fragment,{children:s.jsx(k,{variant:"ghost",size:"icon",onClick:x,"aria-label":"Mark as incomplete",className:"text-accent-primary hover:text-accent-primary-dim",children:s.jsx(Te,{className:"h-4 w-4","aria-hidden":"true"})})}):t?s.jsxs(s.Fragment,{children:[s.jsx(vs,{totalSeconds:r.duration_min*60,size:"sm",showLabel:!1}),s.jsx(k,{variant:"danger",size:"sm",onClick:b,"aria-label":"Finish early",className:"whitespace-nowrap",children:"Finish"})]}):s.jsx(k,{variant:_,size:"lg",onClick:N,disabled:n,leftIcon:s.jsx(st,{className:"h-4 w-4","aria-hidden":"true"}),className:"whitespace-nowrap","aria-label":w,children:w})})]})});Is.displayName="MicroStepRow";const Ss=f.forwardRef(({block:r,activeStepId:e,completedStepIds:t=new Set,onLaunchStep:n,onCompleteStep:i,onReopenStep:a,className:o,...c},l)=>{const h={high:"accent-primary",medium:"accent-warn",low:"accent-info"}[r.energy_level],u=(m,p)=>{const N=new Date(`2000-01-01T${m}`).toLocaleTimeString([],{hour:"numeric",minute:"2-digit",hour12:!0}),b=new Date(`2000-01-01T${p}`).toLocaleTimeString([],{hour:"numeric",minute:"2-digit",hour12:!0});return`${N} – ${b}`};return s.jsxs(W,{ref:l,variant:"glass",className:v("border-l-4 transition-all duration-smooth",`border-l-${h}`,o),...c,children:[s.jsxs(_s,{className:"pb-3",children:[s.jsxs("div",{className:"flex items-center justify-between gap-4 flex-wrap",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("span",{className:"font-mono text-lg text-text-primary whitespace-nowrap",children:u(r.start_time,r.end_time)}),s.jsx(jr,{energy:r.energy_level,size:"sm"})]}),s.jsx("h3",{className:"font-display font-semibold text-text-primary",children:r.task_title})]}),r.task_summary&&s.jsx("p",{className:"text-sm text-text-secondary mt-2",children:r.task_summary})]}),s.jsx(Ns,{className:"pt-0",children:s.jsx("ol",{className:"space-y-3",role:"list","aria-label":`${r.task_title} steps`,children:r.steps.map((m,p)=>s.jsx(Is,{step:m,index:p,isActive:e===m.id,isCompleted:t.has(m.id),onLaunch:n,onComplete:i,onReopen:a,showDragHandle:!1},m.id))})})]})});Ss.displayName="TimeBlock";function ks({isOpen:r,onClose:e,title:t,description:n,children:i,size:a="md",showCloseButton:o=!0,closeOnOverlayClick:c=!0,closeOnEscape:l=!0,className:d}){const h=f.useRef(null),u=f.useRef(null),m=f.useCallback(x=>{l&&x.key==="Escape"&&e()},[l,e]),p=f.useCallback(x=>{c&&x.target===x.currentTarget&&e()},[c,e]);if(f.useEffect(()=>{var x;if(r)return u.current=document.activeElement,document.body.style.overflow="hidden",document.addEventListener("keydown",m),(x=h.current)==null||x.focus(),()=>{var w;document.body.style.overflow="",document.removeEventListener("keydown",m),(w=u.current)==null||w.focus()}},[r,m]),!r)return null;const N={sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-xl",full:"max-w-4xl"},b=s.jsx("div",{className:v("fixed inset-0 z-[100] flex items-center justify-center p-4","bg-black/50 backdrop-blur-sm animate-fade-in"),onClick:p,role:"dialog","aria-modal":"true","aria-labelledby":t?"modal-title":void 0,"aria-describedby":n?"modal-description":void 0,children:s.jsxs("div",{ref:h,tabIndex:-1,className:v("glass-strong rounded-2xl shadow-glow-lg w-full animate-scale-in","overflow-hidden flex flex-col max-h-[90vh]",N[a],d),children:[(t||o)&&s.jsxs("div",{className:"flex items-start justify-between p-5 border-b border-border-subtle",children:[s.jsxs("div",{children:[t&&s.jsx("h2",{id:"modal-title",className:"text-lg font-display font-semibold text-text-primary",children:t}),n&&s.jsx("p",{id:"modal-description",className:"text-sm text-text-secondary mt-1",children:n})]}),o&&s.jsx(k,{variant:"ghost",size:"icon",onClick:e,"aria-label":"Close modal",className:"text-text-muted hover:text-text-primary",children:s.jsx(Te,{className:"h-5 w-5","aria-hidden":"true"})})]}),s.jsx("div",{className:"flex-1 overflow-y-auto p-5",children:i})]})});return typeof window>"u"?null:hn.createPortal(b,document.body)}const Es=f.forwardRef(({isOpen:r,onClose:e,rejectedTasks:t,onDismiss:n,className:i,...a},o)=>{const[c,l]=f.useState(null),d={high:"accent-primary",medium:"accent-warn",low:"accent-info"},h=u=>{if(u<60)return`${u}m`;const m=Math.floor(u/60),p=u%60;return p>0?`${m}h ${p}m`:`${m}h`};return s.jsx(ks,{isOpen:r,onClose:e,title:"Rejected Tasks",description:`${t.length} tasks were not included in your plan`,size:"lg",className:i,children:s.jsx("div",{className:"space-y-4 max-h-[60vh] overflow-y-auto",children:t.length===0?s.jsxs("div",{className:"text-center py-12",children:[s.jsx(Te,{className:"h-12 w-12 text-text-muted mx-auto mb-4","aria-hidden":"true"}),s.jsx("p",{className:"text-text-secondary",children:"No rejected tasks"})]}):t.map(u=>{const m=d[u.energy_level];return s.jsxs("div",{className:v("glass rounded-xl p-4 flex items-start gap-4 transition-opacity",c===u.id&&"opacity-50 animate-fade-out"),children:[s.jsx("div",{className:v("flex-shrink-0 w-2 h-2 rounded-full mt-2",`bg-${m}`),"aria-hidden":"true"}),s.jsxs("div",{className:"flex-1 min-w-0",children:[s.jsxs("div",{className:"flex items-center justify-between gap-2",children:[s.jsx("h4",{className:"font-medium text-text-primary truncate",children:u.title}),s.jsx("span",{className:v("badge px-2 py-0.5 text-xs",`bg-${m}/10 text-${m} border-${m}/20`),children:u.energy_level})]}),s.jsx("p",{className:"text-sm text-text-secondary mt-1",children:u.reason}),s.jsx("div",{className:"flex items-center gap-3 mt-2 text-xs text-text-muted",children:s.jsxs("span",{className:"flex items-center gap-1",children:[s.jsx("span",{className:"w-1.5 h-1.5 rounded-full",style:{backgroundColor:`var(--accent-${m.replace("accent-","")})`},"aria-hidden":"true"}),h(u.estimated_minutes)]})})]}),s.jsx(k,{variant:"ghost",size:"icon",onClick:()=>{l(u.id),n(u.id)},disabled:c===u.id,"aria-label":`Dismiss ${u.title}`,className:"text-text-muted hover:text-accent-danger",children:s.jsx(ut,{className:"h-4 w-4","aria-hidden":"true"})})]},u.id)})})})});Es.displayName="RejectedTasksModal";const Ts="https://chronos-api-ydazznh7eq-uc.a.run.app";async function Cs(){const{getIdToken:r}=await Fe(async()=>{const{getIdToken:a}=await Promise.resolve().then(()=>bt);return{getIdToken:a}},void 0);let e=await r(),t=await Fe(()=>Promise.resolve().then(()=>bt),void 0).then(a=>a.getCurrentUser());const n=localStorage.getItem("chronos-incognito-user");if(n){e="mock-token-abc";try{const a=JSON.parse(n);t={uid:a.uid,email:a.email}}catch{t={uid:"mock-uid-123",email:"dev@example.com"}}}const i={"Content-Type":"application/json"};return e&&(i.Authorization=`Bearer ${e}`),t&&(i["X-User-ID"]=t.uid,t.email&&(i["X-User-Email"]=t.email)),i}async function As(r){if(!r.ok){let e={code:"UNKNOWN_ERROR",message:"An unknown error occurred",status:r.status};try{const n=await r.json();e={...e,...n}}catch{}const t=new Error(e.message);throw t.code=e.code,t.status=e.status,t.details=e.details,t}if(r.status!==204)return r.json()}async function $t(r){const e=await Cs(),t=await fetch(`${Ts}${r}`,{method:"GET",headers:e,credentials:"omit"});return As(t)}async function zt(r,e){const t=await Cs(),n=await fetch(`${Ts}${r}`,{method:"POST",headers:t,body:JSON.stringify(e),credentials:"omit"});return As(n)}function Vt(r){return r?{id:r.planId||r.plan_id||r.id,date:r.date,total_planned_minutes:r.totalPlannedMin||r.total_planned_min||r.total_planned_minutes||0,created_at:r.createdAt||r.created_at||new Date().toISOString(),updated_at:r.updatedAt||r.updated_at||r.created_at||new Date().toISOString(),advice:r.advice,rejected_tasks:(r.rejectedTasks||r.rejected_tasks||[]).map((e,t)=>typeof e=="string"?{id:`rej-${t}`,title:e,reason:"Rejected by AI",energy_level:"medium",estimated_minutes:0}:{id:e.id||`rej-${t}`,title:e.title,reason:e.reason||"Rejected by AI",energy_level:e.energyLevel||e.energy_level||"medium",estimated_minutes:e.estimatedMinutes||e.estimated_minutes||0}),blocks:(r.blocks||[]).map(e=>({id:e.blockId||e.block_id||e.id,start_time:e.start||e.start_time,end_time:e.end||e.end_time,energy_level:(e.energyRequired||e.energy_required||e.energy_level||"Med").toLowerCase()==="med"?"medium":(e.energyRequired||e.energy_required||e.energy_level||"medium").toLowerCase(),task_title:e.taskTitle||e.task_title,task_summary:e.taskSummary||e.task_summary||"Task details",steps:(e.microSteps||e.micro_steps||e.steps||[]).map((t,n)=>({id:t.id||`step-${e.blockId||e.id}-${n}`,order:t.order||n+1,text:t.step||t.text,duration_min:t.durationMin||t.duration_min,energy_cost:(e.energyRequired||e.energy_required||"Med").toLowerCase()==="med"?"medium":(e.energyRequired||e.energy_required||"medium").toLowerCase(),reason:t.reason||"",target_url:t.targetUrl||t.target_url||null,completed_at:t.completedAt||t.completed_at||null,started_at:t.startedAt||t.started_at||null}))}))}:null}const sd={generate:async r=>{var c,l,d,h;const e=r.tasks.map(u=>{let m="Med";return u.energy_level==="high"&&(m="High"),u.energy_level==="low"&&(m="Low"),{title:u.title,estMinutes:u.estimated_minutes,energy:m,url:u.source_id||void 0}});let t="09:00",n="18:00";try{const u=localStorage.getItem("chronos-ui-store");if(u){const m=JSON.parse(u);(l=(c=m.state)==null?void 0:c.workPreferences)!=null&&l.workStart&&(t=m.state.workPreferences.workStart),(h=(d=m.state)==null?void 0:d.workPreferences)!=null&&h.workEnd&&(n=m.state.workPreferences.workEnd)}}catch{}const a=await zt("/api/plan",{tasks:e,workStart:t,workEnd:n,energyPeak:"High"}),o=Vt(a);if(!o)throw new Error("Failed to map DayPlan");return{plan:o,metadata:{total_tasks:r.tasks.length,rejected_count:o.rejected_tasks.length,generation_time_ms:0}}},get:async r=>{const e=await $t(`/api/plan/${r}`);return Vt(e)},getCurrent:async()=>{try{const r=await $t("/api/plan/today");return Vt(r)}catch{return null}},completeStep:async r=>{const e=r.step_id.split("-"),t=e[1]||"unknown",n=parseInt(e[2],10)||0;return await zt("/api/step/complete",{blockId:t,stepIdx:n}),{success:!0,next_step_id:null,plan:{date:r.plan_id.replace("plan-","")||new Date().toISOString().split("T")[0]}}},getRejected:r=>$t(`/api/plan/${r}/rejected`),dismissRejected:(r,e)=>zt(`/api/plan/${r}/rejected/${e}/dismiss`,{})},Ze=sd;function id(r){return un({queryKey:["plan",r],queryFn:()=>Ze.get(r)})}function ad(){const r=cr();return lr({mutationFn:e=>Ze.generate(e),onSuccess:(e,t)=>{r.invalidateQueries({queryKey:["plan",t.date]})}})}function od(){const r=cr();return lr({mutationFn:e=>Ze.completeStep(e),onSuccess:e=>{var t;(t=e==null?void 0:e.plan)!=null&&t.date?r.invalidateQueries({queryKey:["plan",e.plan.date]}):r.invalidateQueries({queryKey:["plan"]})}})}function cd(r){return un({queryKey:["rejectedTasks",r],queryFn:()=>Ze.getRejected(r)})}function ld(){const r=cr();return lr({mutationFn:({planId:e,taskId:t})=>Ze.dismissRejected(e,t),onSuccess:()=>{r.invalidateQueries({queryKey:["rejectedTasks"]})}})}const Rs=f.forwardRef(({title:r,description:e,variant:t="default",action:n,duration:i=5e3,onClose:a,className:o,...c},l)=>{const[d,h]=f.useState(!0),u=f.useId();if(f.useEffect(()=>{if(i>0){const b=setTimeout(()=>{h(!1),a==null||a()},i);return()=>clearTimeout(b)}},[i,a]),!d)return null;const m={default:"bg-bg-card border-border-subtle",success:"bg-accent-primary/10 border-accent-primary/20",danger:"bg-accent-danger/10 border-accent-danger/20",warning:"bg-accent-warn/10 border-accent-warn/20",info:"bg-accent-info/10 border-accent-info/20"},p={default:"text-text-secondary",success:"text-accent-primary",danger:"text-accent-danger",warning:"text-accent-warn",info:"text-accent-info"},N={default:s.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})}),success:s.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),danger:s.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),warning:s.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"})}),info:s.jsx("svg",{className:"h-5 w-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24","aria-hidden":"true",children:s.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"})})};return s.jsxs("div",{ref:l,id:u,role:"alert","aria-live":"polite",className:v("glass rounded-xl p-4 gap-3 animate-slide-in max-w-sm w-full",m[t],o),...c,children:[s.jsx("div",{className:v("flex-shrink-0",p[t]),"aria-hidden":"true",children:N[t]}),s.jsxs("div",{className:"flex-1 min-w-0",children:[r&&s.jsx("p",{className:"font-medium text-text-primary",children:r}),e&&s.jsx("p",{className:"text-sm text-text-secondary mt-0.5",children:e})]}),n&&s.jsx("div",{className:"flex-shrink-0 mt-0.5",children:n}),s.jsx("button",{onClick:()=>{h(!1),a==null||a()},className:"flex-shrink-0 p-1 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-card","aria-label":"Dismiss notification",children:s.jsx(Te,{className:"h-4 w-4","aria-hidden":"true"})})]})});Rs.displayName="Toast";const dd={"top-right":"top-4 right-4","top-left":"top-4 left-4","bottom-right":"bottom-4 right-4","bottom-left":"bottom-4 left-4","top-center":"top-4 left-1/2 -translate-x-1/2","bottom-center":"bottom-4 left-1/2 -translate-x-1/2"};function ud({toasts:r,position:e="top-right"}){return s.jsx("div",{className:v("fixed z-[100] flex flex-col gap-2 pointer-events-none",dd[e]),"aria-live":"polite","aria-atomic":"true",children:r.map(t=>s.jsx("div",{className:"pointer-events-auto w-full max-w-sm",children:s.jsx(Rs,{...t})},t.id))})}function Ps(){const[r,e]=f.useState([]);return{toast:({id:i=Math.random().toString(36).slice(2),onClose:a,...o})=>(e(c=>[...c,{...o,id:i,onClose:()=>{e(l=>l.filter(d=>d.id!==i)),a==null||a()}}]),i),dismiss:i=>{e(a=>a.filter(o=>o.id!==i))},toasts:r,Toaster:ud}}function hd(){const{user:r}=we(),e=We(),{activeStepId:t,focusMode:n,setActiveStepId:i,setFocusMode:a,setLastPlanDate:o}=Nt(),[c,l]=f.useState(Kl()),[d,h]=f.useState(!1),[u,m]=f.useState(null),[p,N]=f.useState(0),[b,x]=f.useState(!1),{toast:w,toasts:_,Toaster:L}=Ps(),[T,I]=f.useState("goal"),[A,q]=f.useState([]),[z,H]=f.useState(""),[R,F]=f.useState(30),[B,y]=f.useState("medium"),[j,D]=f.useState(""),[C,P]=f.useState(""),[E,V]=f.useState(120),[$,St]=f.useState("medium"),{data:M,isLoading:Os,refetch:kt}=id(c),et=ad(),Ir=od(),{data:_e}=cd(c),Ds=ld(),Ls=new Set((M==null?void 0:M.blocks.flatMap(g=>g.steps.filter(O=>O.completed_at).map(O=>O.id)))??[]);M==null||M.blocks.flatMap(g=>g.steps).find(g=>g.id===t);const Ms=(M==null?void 0:M.total_planned_minutes)??0,Us=(_e==null?void 0:_e.rejected_tasks.length)??0,Fs=g=>{if(g.preventDefault(),!z.trim())return;const O={id:"task-"+Math.random().toString(36).substring(2,9),title:z.trim(),description:"",estimated_minutes:R,energy_level:B,deadline:null,tags:[],source:"manual",source_id:j.trim()||null,created_at:new Date().toISOString()};q(se=>[...se,O]),H(""),D("")},Bs=g=>{q(O=>O.filter(se=>se.id!==g))},Oe=A.reduce((g,O)=>g+O.estimated_minutes,0),$s=async()=>{try{await et.mutateAsync({date:c,tasks:A}),w({title:"Plan Generated",description:"Your battle plan is ready",variant:"success"})}catch{w({title:"Failed to Generate",description:"Could not create plan",variant:"danger"})}},zs=async g=>{if(g.preventDefault(),!C.trim())return;const O={id:"task-goal",title:C.trim(),description:"Single Goal Mode Plan",estimated_minutes:E,energy_level:$,deadline:null,tags:["goal"],source:"manual",source_id:null,created_at:new Date().toISOString()};try{await et.mutateAsync({date:c,tasks:[O]}),w({title:"Plan Generated",description:"AI has assembled your micro steps",variant:"success"})}catch{w({title:"Failed to Generate",description:"Could not generate plan",variant:"danger"})}},Vs=async()=>{window.confirm("Are you sure you want to delete today's plan? This will clear all logged completions.")&&(localStorage.removeItem("chronos-plan-"+c),localStorage.removeItem("chronos-rejected-"+c),w({title:"Plan Reset",description:"Your schedule has been cleared",variant:"success"}),kt())},Hs=async g=>{i(g.id),m(g),N(g.duration_min*60),a(!0),g.target_url&&window.open(g.target_url,"_blank","noopener,noreferrer");try{await document.documentElement.requestFullscreen({navigationUI:"hide"});const O=await navigator.wakeLock.request("screen");x(!0),O.addEventListener("release",()=>x(!1))}catch(O){console.warn("Fullscreen/WakeLock failed:",O)}"Notification"in window&&Notification.permission==="granted"&&new Notification("Sprint Started",{body:g.text,icon:"/icons/icon-192.png"})},De=()=>{t&&Ir.mutate({plan_id:(M==null?void 0:M.id)??"",step_id:t,completed_at:new Date().toISOString(),duration_actual_seconds:p,was_interrupted:!1}),Tt()},Et=()=>{Tt()},Tt=()=>{i(null),m(null),N(0),a(!1),document.fullscreenElement&&document.exitFullscreen().catch(()=>{})},Ws=g=>{const O=M==null?void 0:M.blocks.flatMap(se=>se.steps).find(se=>se.id===g);O&&Ir.mutate({plan_id:(M==null?void 0:M.id)??"",step_id:g,completed_at:new Date().toISOString(),duration_actual_seconds:O.duration_min*60,was_interrupted:!1})},Gs=g=>{},qs=g=>{Ds.mutate({planId:(M==null?void 0:M.id)??"",taskId:g})},Ks=()=>{window.confirm("Start a new plan? This will clear today's current plan and let you compile a new one.")&&(localStorage.removeItem("chronos-plan-"+c),localStorage.removeItem("chronos-rejected-"+c),w({title:"Plan Reset",description:"Enter your sprint tasks for today",variant:"success"}),kt())},Js=()=>h(!0),Ys=()=>{e("/settings")},Sr=()=>s.jsxs("div",{className:"space-y-6 animate-fade-in",children:[s.jsxs("div",{className:"flex gap-3 border-b border-border-subtle pb-4 flex-wrap",children:[s.jsxs("button",{onClick:()=>I("goal"),className:v("px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2",T==="goal"?"bg-accent-primary/10 border-accent-primary text-accent-primary shadow-glow-sm":"border-border-subtle hover:border-border-glow text-text-secondary"),children:[s.jsx(Me,{className:"h-4 w-4"}),"AI Goal Planner (Recommended)"]}),s.jsxs("button",{onClick:()=>I("sprints"),className:v("px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-2",T==="sprints"?"bg-accent-primary/10 border-accent-primary text-accent-primary shadow-glow-sm":"border-border-subtle hover:border-border-glow text-text-secondary"),children:[s.jsx(dt,{className:"h-4 w-4"}),"Guided Task List"]})]}),T==="goal"?s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8",children:[s.jsxs("div",{className:"lg:col-span-7 space-y-6",children:[s.jsxs("div",{children:[s.jsx("h2",{className:"font-display text-2xl font-semibold text-text-primary mb-1",children:"State Your Goal"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"Type today's main objective. AI will build your schedule roadmap and steps."})]}),s.jsx(W,{variant:"glass",className:"p-6",children:s.jsxs("form",{onSubmit:zs,className:"space-y-5",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"What do you want to achieve today?"}),s.jsx("textarea",{rows:3,placeholder:"e.g. Build a Python web scraper using BeautifulSoup and save results to a CSV file...",className:"input resize-none py-3",value:C,onChange:g=>P(g.target.value),required:!0})]}),s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Estimated Total Duration (minutes)"}),s.jsx("input",{type:"number",min:"15",max:"360",step:"15",className:"input",value:E,onChange:g=>V(parseInt(g.target.value)||120),required:!0})]}),s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Cognitive Demand / Energy Level"}),s.jsx("div",{className:"grid grid-cols-3 gap-2",children:["low","medium","high"].map(g=>s.jsx("button",{type:"button",onClick:()=>St(g),className:v("px-3 py-2 rounded-xl text-xs font-medium border capitalize transition-all",$===g?g==="high"?"bg-accent-danger/10 border-accent-danger text-accent-danger":g==="medium"?"bg-accent-warn/10 border-accent-warn text-accent-warn":"bg-accent-info/10 border-accent-info text-accent-info":"border-border-subtle hover:border-border-glow text-text-secondary"),children:g},g))})]})]}),s.jsx(k,{type:"submit",variant:"primary",size:"lg",className:"w-full",disabled:!C.trim()||et.isPending,leftIcon:s.jsx(Me,{className:"h-5 w-5"}),children:et.isPending?"Decomposing Goal...":"Compile AI Battle Plan"})]})})]}),s.jsxs("div",{className:"lg:col-span-5 space-y-6",children:[s.jsxs("div",{children:[s.jsx("h2",{className:"font-display text-2xl font-semibold text-text-primary mb-1",children:"AI Coaching Parameters"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"How our productivity coach transforms goals."})]}),s.jsxs(W,{variant:"glass",className:"p-6 space-y-4",children:[s.jsxs("div",{className:"flex gap-3 text-sm",children:[s.jsx("div",{className:"w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono",children:"1"}),s.jsxs("p",{className:"text-text-secondary leading-relaxed",children:[s.jsx("strong",{className:"text-text-primary",children:"Granular Action Decomposition:"})," Translates your high-level objective into precise micro-steps under 60 minutes to eliminate setup inertia."]})]}),s.jsxs("div",{className:"flex gap-3 text-sm",children:[s.jsx("div",{className:"w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono",children:"2"}),s.jsxs("p",{className:"text-text-secondary leading-relaxed",children:[s.jsx("strong",{className:"text-text-primary",children:"Integrated Breaks:"})," Intersperses structured 15-minute breaks after deep-work intervals to guard against visual and mental fatigue."]})]}),s.jsxs("div",{className:"flex gap-3 text-sm",children:[s.jsx("div",{className:"w-6 h-6 rounded-lg bg-accent-primary/10 text-accent-primary flex items-center justify-center shrink-0 font-bold font-mono",children:"3"}),s.jsxs("p",{className:"text-text-secondary leading-relaxed",children:[s.jsx("strong",{className:"text-text-primary",children:"Coaching Advisory:"})," Generates tailored coaching advice blocks guiding your mindset on the exact order of sprints."]})]})]})]})]}):s.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-12 gap-8",children:[s.jsxs("div",{className:"lg:col-span-7 space-y-6",children:[s.jsxs("div",{children:[s.jsx("h2",{className:"font-display text-2xl font-semibold text-text-primary mb-1",children:"Assemble Sprints"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"List your objectives for today. We'll decompose them into micro-steps."})]}),s.jsx(W,{variant:"glass",className:"p-6",children:s.jsxs("form",{onSubmit:Fs,className:"space-y-4",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Task Title"}),s.jsx("input",{type:"text",placeholder:"e.g. Code auth gate middleware",className:"input",value:z,onChange:g=>H(g.target.value),required:!0})]}),s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Estimated Duration (minutes)"}),s.jsx("input",{type:"number",min:"5",max:"480",step:"5",className:"input",value:R,onChange:g=>F(parseInt(g.target.value)||30),required:!0})]}),s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Cognitive Demand / Energy Level"}),s.jsx("div",{className:"grid grid-cols-3 gap-2",children:["low","medium","high"].map(g=>s.jsx("button",{type:"button",onClick:()=>y(g),className:v("px-3 py-2 rounded-xl text-xs font-medium border capitalize transition-all",B===g?g==="high"?"bg-accent-danger/10 border-accent-danger text-accent-danger":g==="medium"?"bg-accent-warn/10 border-accent-warn text-accent-warn":"bg-accent-info/10 border-accent-info text-accent-info":"border-border-subtle hover:border-border-glow text-text-secondary"),children:g},g))})]})]}),s.jsxs("div",{children:[s.jsxs("label",{className:"label flex items-center justify-between",children:[s.jsx("span",{children:"Target / Workspace URL (Optional)"}),s.jsx("span",{className:"text-xs text-text-muted",children:"Will auto-launch with task"})]}),s.jsx("input",{type:"url",placeholder:"e.g. https://github.com/my-project",className:"input",value:j,onChange:g=>D(g.target.value)})]}),s.jsx(k,{type:"submit",variant:"ghost",className:"w-full border border-dashed border-border-glow hover:border-accent-primary",children:"+ Add Sprint Task"})]})})]}),s.jsxs("div",{className:"lg:col-span-5 space-y-6",children:[s.jsxs("div",{children:[s.jsx("h2",{className:"font-display text-2xl font-semibold text-text-primary mb-1",children:"Blueprint Preview"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"Your schedule outline and parameters."})]}),s.jsxs(W,{variant:"glass",className:"p-6 flex flex-col justify-between min-h-[320px]",children:[s.jsxs("div",{className:"space-y-4 flex-1",children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx("span",{className:"text-sm font-medium text-text-secondary",children:"Daily Load Tracker"}),A.length>0&&s.jsx("button",{type:"button",onClick:()=>q([]),className:"text-xs text-accent-danger hover:underline font-medium","aria-label":"Clear all tasks",children:"(Clear All)"})]}),s.jsxs("span",{className:v("text-sm font-mono font-bold",Oe>360?"text-accent-danger":"text-accent-primary"),children:[Oe," / 360 mins"]})]}),s.jsx("div",{className:"w-full h-2 bg-bg-deep rounded-full overflow-hidden",children:s.jsx("div",{className:v("h-full transition-all duration-300",Oe>360?"bg-accent-danger":"bg-accent-primary"),style:{width:`${Math.min(100,Oe/360*100)}%`}})}),Oe>360&&s.jsxs("div",{className:"p-3 bg-accent-danger/5 border border-accent-danger/20 rounded-xl flex gap-2 text-xs text-accent-danger",children:[s.jsx(bi,{className:"h-4 w-4 shrink-0"}),s.jsx("span",{children:"Cognitive Load Cap exceeded. Sprints exceeding 360 mins will be auto-rejected."})]}),s.jsx("div",{className:"space-y-2 max-h-[220px] overflow-y-auto pr-1",children:A.length===0?s.jsx("div",{className:"text-center py-8 border border-dashed border-border-subtle rounded-xl text-text-muted text-xs",children:"No tasks drafted yet. Use the form to assemble your sprints."}):A.map(g=>s.jsxs("div",{className:"flex items-center justify-between p-3 glass rounded-xl border border-border-subtle",children:[s.jsxs("div",{className:"min-w-0 flex-1",children:[s.jsx("p",{className:"text-xs font-semibold text-text-primary truncate",children:g.title}),s.jsxs("div",{className:"flex items-center gap-2 mt-1",children:[s.jsxs("span",{className:"text-[10px] font-mono text-text-muted",children:[g.estimated_minutes," min"]}),s.jsx("span",{className:v("text-[9px] px-1.5 py-0.2 rounded border uppercase font-mono",g.energy_level==="high"?"border-accent-danger/20 text-accent-danger":g.energy_level==="medium"?"border-accent-warn/20 text-accent-warn":"border-accent-info/20 text-accent-info"),children:g.energy_level})]})]}),s.jsx("button",{onClick:()=>Bs(g.id),className:"text-text-muted hover:text-accent-danger p-1 rounded transition-colors","aria-label":`Remove ${g.title}`,children:s.jsx(ut,{className:"h-4 w-4"})})]},g.id))})]}),s.jsx(k,{variant:"primary",size:"lg",className:"w-full mt-6",disabled:A.length===0,onClick:$s,leftIcon:s.jsx(dt,{className:"h-5 w-5"}),children:"Compile Daily Battle Plan"})]})]})]})]});return f.useEffect(()=>{if(n&&p>0){const g=setInterval(()=>{N(O=>O<=1?(De(),0):O-1)},1e3);return()=>clearInterval(g)}},[n,p]),f.useEffect(()=>{const g=O=>{O.target instanceof HTMLInputElement||O.target instanceof HTMLTextAreaElement||(O.key===" "||O.key==="Enter"?(n||t)&&(O.preventDefault(),De()):O.key==="Escape"&&(n?Et():i(null)))};return window.addEventListener("keydown",g),()=>window.removeEventListener("keydown",g)},[n,t,De,Et]),r?s.jsxs("div",{className:"min-h-screen flex flex-col",children:[s.jsx(jt,{totalPlannedMinutes:Ms,rejectedCount:Us,onNewPlan:Ks,onViewRejected:Js,onOpenSettings:Ys}),s.jsx(It,{children:Os?s.jsx("div",{className:"flex items-center justify-center min-h-[40vh]",children:s.jsxs("div",{className:"text-center",children:[s.jsx(Wt,{className:"h-10 w-10 text-accent-primary animate-spin mx-auto mb-4","aria-hidden":"true"}),s.jsx("p",{className:"text-text-secondary",children:"Loading your plan..."})]})}):M?s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"mb-6 flex items-center justify-between gap-4 flex-wrap",children:[s.jsxs("div",{className:"flex items-center gap-3",children:[s.jsx("div",{className:"glass px-4 py-2 rounded-xl",children:s.jsx("span",{className:"font-mono text-text-primary",children:Gl(c)})}),M.blocks.length>0&&s.jsxs("span",{className:"badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm",children:[M.blocks.reduce((g,O)=>g+O.steps.length,0)," steps"]})]}),s.jsxs("div",{className:"flex items-center gap-2",children:[s.jsx(k,{variant:"ghost",size:"sm",onClick:()=>kt(),"aria-label":"Refresh plan",children:s.jsx(Wt,{className:"h-4 w-4","aria-hidden":"true"})}),s.jsx(k,{variant:"ghost",size:"sm",className:"text-accent-danger hover:text-accent-danger hover:bg-accent-danger/5",onClick:Vs,"aria-label":"Delete plan",children:s.jsx(ut,{className:"h-4 w-4","aria-hidden":"true"})})]})]}),M.advice&&s.jsxs("div",{className:"mb-6 p-4 bg-accent-primary/5 border border-accent-primary/20 rounded-xl flex gap-3 text-sm animate-fade-in",children:[s.jsx(Me,{className:"h-5 w-5 text-accent-primary shrink-0 mt-0.5","aria-hidden":"true"}),s.jsxs("div",{children:[s.jsx("p",{className:"font-semibold text-text-primary mb-0.5",children:"AI Coaching Advice"}),s.jsx("p",{className:"text-text-secondary leading-relaxed",children:M.advice})]})]}),M.blocks.length===0?Sr():s.jsx("div",{className:"space-y-5",role:"list","aria-label":"Time blocks",children:M.blocks.map(g=>s.jsx(Ss,{block:g,activeStepId:t,completedStepIds:Ls,onLaunchStep:Hs,onCompleteStep:Ws,onReopenStep:Gs},g.id))})]}):Sr()}),s.jsx(ys,{onClick:()=>e("/tetris"),label:"Calendar Tetris",icon:s.jsx(xi,{className:"h-5 w-5","aria-hidden":"true"})}),s.jsx(ed,{isOpen:n,onClose:Tt,onFinishEarly:De,onAbort:Et,currentStep:u,secondsRemaining:p,onToggleFullscreen:()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen({navigationUI:"hide"})}}),s.jsx(Es,{isOpen:d,onClose:()=>h(!1),rejectedTasks:((_e==null?void 0:_e.rejected_tasks)??[]).map(g=>({id:g.id,title:g.title,reason:g.description||"Excluded from daily plan due to schedule constraints",energy_level:g.energy_level,estimated_minutes:g.estimated_minutes})),onDismiss:qs}),s.jsx(L,{toasts:_})]}):null}function md(){const{user:r,loading:e}=we(),t=We();return e?s.jsx("div",{className:"min-h-screen flex items-center justify-center bg-bg-deep",children:s.jsx("div",{className:"h-8 w-8 text-accent-primary animate-spin","aria-hidden":"true",children:s.jsxs("svg",{className:"h-full w-full",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,children:[s.jsx("circle",{cx:"12",cy:"12",r:"10",strokeOpacity:"0.25"}),s.jsx("path",{d:"M12 2a10 10 0 0 1 10 10",strokeLinecap:"round",strokeLinejoin:"round",children:s.jsx("animateTransform",{attributeName:"transform",type:"rotate",dur:"1s",from:"0 12 12",to:"360 12 12",repeatCount:"indefinite"})})]})})}):r?s.jsxs("div",{className:"min-h-screen flex flex-col",children:[s.jsx(jt,{totalPlannedMinutes:0,rejectedCount:0,onNewPlan:()=>t("/plan"),onViewRejected:()=>{},onOpenSettings:()=>t("/settings")}),s.jsx(It,{children:s.jsxs("div",{className:"text-center py-16",children:[s.jsx("div",{className:"mx-auto mb-6 w-20 h-20 rounded-2xl bg-accent-info/10 border border-accent-info/20 flex items-center justify-center",children:s.jsx(Ge,{className:"h-10 w-10 text-accent-info","aria-hidden":"true"})}),s.jsx("h2",{className:"font-display text-2xl font-semibold text-text-primary mb-2",children:"Museum of Done"}),s.jsx("p",{className:"text-text-secondary max-w-md mx-auto mb-8",children:"Your completed sprints, archived forever. Every micro-step logged. Search, filter, and relive your victories."}),s.jsx(W,{variant:"glass",className:"max-w-md mx-auto",children:s.jsxs("div",{className:"p-6 text-center",children:[s.jsx(yi,{className:"h-12 w-12 text-accent-primary mx-auto mb-4","aria-hidden":"true"}),s.jsx("h3",{className:"font-display font-semibold text-text-primary mb-2",children:"Coming Soon"}),s.jsx("p",{className:"text-text-secondary mb-4",children:"Infinite scroll log of every completed step with timestamps, durations, and energy levels."}),s.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-display text-2xl font-bold text-accent-primary",children:"0"}),s.jsx("p",{className:"text-xs text-text-muted",children:"Total Steps"})]}),s.jsxs("div",{children:[s.jsx("p",{className:"font-display text-2xl font-bold text-accent-warn",children:"0h"}),s.jsx("p",{className:"text-xs text-text-muted",children:"Focus Time"})]}),s.jsxs("div",{children:[s.jsx("p",{className:"font-display text-2xl font-bold text-accent-info",children:"0"}),s.jsx("p",{className:"text-xs text-text-muted",children:"Streaks"})]})]})]})})]})})]}):null}function fd(){const{user:r}=we(),{theme:e,setTheme:t,workPreferences:n,setWorkPreferences:i}=Nt(),{toast:a,toasts:o,Toaster:c}=Ps(),[l,d]=f.useState(!1),[h,u]=f.useState(!1);if(!r)return null;const m=async()=>{try{ss&&await fetch("/api/user/delete",{method:"DELETE"}),await ar(),a({title:"Account Deleted",description:"Your account has been permanently deleted",variant:"success"})}catch{a({title:"Delete Failed",description:"Could not delete account",variant:"danger"})}d(!1)};return s.jsxs("div",{className:"min-h-screen flex flex-col",children:[s.jsx(jt,{totalPlannedMinutes:0,rejectedCount:0,onNewPlan:()=>{},onViewRejected:()=>{},onOpenSettings:()=>{}}),s.jsx(It,{children:s.jsxs("div",{className:"space-y-6 max-w-2xl",children:[s.jsxs("div",{children:[s.jsx("h1",{className:"font-display text-2xl font-semibold text-text-primary mb-2",children:"Settings"}),s.jsx("p",{className:"text-text-secondary",children:"Manage your Chronos preferences"})]}),s.jsxs(W,{variant:"glass",children:[s.jsx("div",{className:"p-5 border-b border-border-subtle",children:s.jsx("h2",{className:"font-display font-medium text-text-primary",children:"Appearance"})}),s.jsx("div",{className:"p-5 space-y-4",children:s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Theme"}),s.jsx("div",{className:"grid grid-cols-3 gap-3",children:[{value:"system",label:"System",icon:Yt},{value:"light",label:"Light",icon:Jt},{value:"dark",label:"Dark",icon:Kt}].map(p=>s.jsxs("button",{onClick:()=>t(p.value),className:v("glass p-4 rounded-xl text-left transition-all",e===p.value?"border-accent-primary/50 bg-accent-primary/5":"border-border-subtle hover:border-border-glow"),children:[s.jsx(p.icon,{className:"h-5 w-5 text-text-secondary mb-2","aria-hidden":"true"}),s.jsx("span",{className:"font-medium text-text-primary",children:p.label})]},p.value))})]})})]}),s.jsxs(W,{variant:"glass",children:[s.jsx("div",{className:"p-5 border-b border-border-subtle",children:s.jsx("h2",{className:"font-display font-medium text-text-primary",children:"Work Preferences"})}),s.jsxs("div",{className:"p-5 space-y-4",children:[s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Work Start Time"}),s.jsx("input",{type:"time",className:"input font-mono",value:n.workStart,onChange:p=>i({workStart:p.target.value})})]}),s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Work End Time"}),s.jsx("input",{type:"time",className:"input font-mono",value:n.workEnd,onChange:p=>i({workEnd:p.target.value})})]})]}),s.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Default Break Duration (minutes)"}),s.jsx("input",{type:"number",min:"5",max:"60",step:"5",className:"input",value:n.breakDuration,onChange:p=>i({breakDuration:parseInt(p.target.value)||15})})]}),s.jsxs("div",{children:[s.jsx("label",{className:"label",children:"Max Deep Work Block (minutes)"}),s.jsx("input",{type:"number",min:"30",max:"240",step:"15",className:"input",value:n.maxDeepWorkBlock,onChange:p=>i({maxDeepWorkBlock:parseInt(p.target.value)||90})})]})]})]})]}),s.jsxs(W,{variant:"glass",children:[s.jsx("div",{className:"p-5 border-b border-border-subtle",children:s.jsx("h2",{className:"font-display font-medium text-text-primary",children:"Notifications"})}),s.jsx("div",{className:"p-5 space-y-4",children:s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-text-primary",children:"Push Notifications"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"Receive sprint start/end notifications"})]}),s.jsx(k,{variant:h?"success":"ghost",size:"sm",onClick:async()=>{const p=await Notification.requestPermission();u(p==="granted"),a({title:p==="granted"?"Enabled":"Permission Denied",description:p==="granted"?"You will receive notifications":"Enable in browser settings",variant:p==="granted"?"success":"warning"})},children:h?"Enabled":"Enable"})]})})]}),s.jsxs(W,{variant:"glass",children:[s.jsx("div",{className:"p-5 border-b border-border-subtle",children:s.jsx("h2",{className:"font-display font-medium text-text-primary",children:"Account"})}),s.jsxs("div",{className:"p-5 space-y-4",children:[s.jsxs("div",{className:"flex items-center gap-4",children:[s.jsx("div",{className:"w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center",children:s.jsx(vi,{className:"h-6 w-6 text-accent-primary"})}),s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-text-primary",children:r.displayName??"User"}),s.jsx("p",{className:"text-sm text-text-secondary",children:r.email})]})]}),s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-text-primary",children:"Sign Out"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"Sign out of your Chronos account"})]}),s.jsx(k,{variant:"ghost",size:"sm",onClick:async()=>{await ar()},children:"Sign Out"})]}),s.jsxs("div",{className:"flex items-center justify-between pt-4 border-t border-border-subtle",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-medium text-accent-danger",children:"Delete Account"}),s.jsx("p",{className:"text-sm text-text-secondary",children:"Permanently delete your account and all data"})]}),s.jsx(k,{variant:"danger",size:"sm",onClick:()=>d(!0),children:"Delete"})]})]})]})]})}),s.jsx(ks,{isOpen:l,onClose:()=>d(!1),title:"Delete Account",description:"This action is irreversible. All your plans, history, and data will be permanently deleted.",size:"sm",children:s.jsxs("div",{className:"flex justify-end gap-3",children:[s.jsx(k,{variant:"ghost",onClick:()=>d(!1),children:"Cancel"}),s.jsx(k,{variant:"danger",onClick:m,leftIcon:s.jsx(ut,{className:"h-4 w-4"}),children:"Delete Account"})]})}),s.jsx(c,{toasts:o})]})}const pe=10,Ne=20,Ht={I:[[1,1,1,1]],O:[[1,1],[1,1]],T:[[0,1,0],[1,1,1]],S:[[0,1,1],[1,1,0]],Z:[[1,1,0],[0,1,1]],J:[[1,0,0],[1,1,1]],L:[[0,0,1],[1,1,1]]},dn={I:"bg-accent-info border-accent-info/50 shadow-glow-sm",O:"bg-accent-warn border-accent-warn/50 shadow-glow-sm",T:"bg-accent-primary border-accent-primary/50 shadow-glow-sm",S:"bg-accent-success border-accent-success/50 shadow-glow-sm",Z:"bg-accent-danger border-accent-danger/50 shadow-glow-sm",J:"bg-blue-500 border-blue-400/50 shadow-glow-sm",L:"bg-indigo-500 border-indigo-400/50 shadow-glow-sm"},ae=["I","O","T","S","Z","J","L"],rt=r=>{try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination);const i=e.currentTime;r==="rotate"?(t.type="triangle",t.frequency.setValueAtTime(320,i),t.frequency.exponentialRampToValueAtTime(640,i+.08),n.gain.setValueAtTime(.12,i),n.gain.exponentialRampToValueAtTime(1e-4,i+.08),t.start(i),t.stop(i+.1)):r==="clear"?(t.type="sine",t.frequency.setValueAtTime(523.25,i),t.frequency.setValueAtTime(659.25,i+.06),t.frequency.setValueAtTime(783.99,i+.12),n.gain.setValueAtTime(.15,i),n.gain.exponentialRampToValueAtTime(1e-4,i+.3),t.start(i),t.stop(i+.35)):r==="gameover"&&(t.type="sawtooth",t.frequency.setValueAtTime(180,i),t.frequency.linearRampToValueAtTime(45,i+.5),n.gain.setValueAtTime(.2,i),n.gain.exponentialRampToValueAtTime(1e-4,i+.5),t.start(i),t.stop(i+.5))}catch{}};function pd(){const r=We(),[e,t]=f.useState(Array(Ne).fill(null).map(()=>Array(pe).fill(null))),[n,i]=f.useState(null),[a,o]=f.useState("I"),[c,l]=f.useState(0),[d,h]=f.useState(()=>parseInt(localStorage.getItem("chronos-tetris-highscore")||"0")),[u,m]=f.useState(0),[p,N]=f.useState(!1),[b,x]=f.useState(!1),[w,_]=f.useState(!1),L=f.useRef(null),T=f.useCallback(y=>{const j=Ht[y],D={shape:j,type:y,x:Math.floor((pe-j[0].length)/2),y:0},C=ae[Math.floor(Math.random()*ae.length)];return o(C),D},[]),I=f.useCallback((y,j,D,C)=>{for(let P=0;P<y.shape.length;P++)for(let E=0;E<y.shape[P].length;E++)if(y.shape[P][E]){const V=j+E,$=D+P;if(V<0||V>=pe||$>=Ne||$>=0&&C[$][V])return!0}return!1},[]),A=()=>{t(Array(Ne).fill(null).map(()=>Array(pe).fill(null)));const y=ae[Math.floor(Math.random()*ae.length)],j=ae[Math.floor(Math.random()*ae.length)];i(T(y)),o(j),l(0),m(0),_(!1),x(!1),N(!0)},q=f.useCallback(y=>{t(j=>{const D=j.map(E=>[...E]);for(let E=0;E<y.shape.length;E++)for(let V=0;V<y.shape[E].length;V++)if(y.shape[E][V]){const $=y.y+E,St=y.x+V;$>=0&&$<Ne&&(D[$][St]=y.type)}let C=0;const P=D.filter(E=>{const V=E.every($=>$!==null);return V&&C++,!V});for(;P.length<Ne;)P.unshift(Array(pe).fill(null));return C>0&&(rt("clear"),m(E=>E+C),l(E=>{const $=E+[0,100,300,500,800][C];return $>d&&(h($),localStorage.setItem("chronos-tetris-highscore",$.toString())),$})),P})},[d]),z=f.useCallback(()=>{!n||b||w||i(y=>{if(!y)return null;const j=y.y+1;if(I(y,y.x,j,e)){q(y);const D=a,C=Ht[D],P={shape:C,type:D,x:Math.floor((pe-C[0].length)/2),y:0};return I(P,P.x,P.y,e)?(_(!0),N(!1),rt("gameover"),null):T(a)}return{...y,y:j}})},[n,e,b,w,a,q,T,I]),H=()=>{if(!n||b||w)return;const y=n.x-1;I(n,y,n.y,e)||i(j=>j&&{...j,x:y})},R=()=>{if(!n||b||w)return;const y=n.x+1;I(n,y,n.y,e)||i(j=>j&&{...j,x:y})},F=()=>{if(!n||b||w)return;const y=n.shape.length,j=n.shape[0].length,D=Array(j).fill(0).map(()=>Array(y).fill(0));for(let P=0;P<y;P++)for(let E=0;E<j;E++)D[E][y-1-P]=n.shape[P][E];const C={...n,shape:D};I(C,C.x,C.y,e)||(rt("rotate"),i(C))};f.useEffect(()=>{const y=j=>{!p||b||w||(j.key==="ArrowLeft"?(j.preventDefault(),H()):j.key==="ArrowRight"?(j.preventDefault(),R()):j.key==="ArrowDown"?(j.preventDefault(),z()):j.key==="ArrowUp"&&(j.preventDefault(),F()))};return window.addEventListener("keydown",y),()=>window.removeEventListener("keydown",y)},[p,b,w,n,e,z,I]),f.useEffect(()=>(p&&!b&&!w?L.current=setInterval(()=>{z()},700):L.current&&clearInterval(L.current),()=>{L.current&&clearInterval(L.current)}),[p,b,w,z]),f.useEffect(()=>{const y=ae[Math.floor(Math.random()*ae.length)];i(T(y))},[T]);const B=e.map(y=>[...y]);if(n){for(let y=0;y<n.shape.length;y++)for(let j=0;j<n.shape[y].length;j++)if(n.shape[y][j]){const D=n.y+y,C=n.x+j;D>=0&&D<Ne&&C>=0&&C<pe&&(B[D][C]=n.type)}}return s.jsxs("div",{className:"min-h-screen flex flex-col",children:[s.jsx(jt,{}),s.jsxs(It,{children:[s.jsxs("div",{className:"mb-6 flex items-center justify-between",children:[s.jsxs("button",{onClick:()=>r("/plan"),className:"flex items-center gap-2 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors",children:[s.jsx(Tr,{className:"h-4 w-4"}),"Back to Planner"]}),s.jsx("span",{className:"badge bg-accent-primary/10 text-accent-primary border-accent-primary/20 px-3 py-1 text-sm",children:"CALENDAR TETRIS"})]}),s.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-12 gap-8 items-start",children:[s.jsxs("div",{className:"md:col-span-4 space-y-6",children:[s.jsxs(W,{variant:"glass",className:"p-6 text-center space-y-4",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-xs text-text-muted uppercase tracking-wider mb-1",children:"Score"}),s.jsx("p",{className:"font-mono text-3xl font-bold text-accent-primary",children:c})]}),s.jsxs("div",{className:"flex justify-around border-t border-border-subtle pt-4",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-[10px] text-text-muted uppercase mb-0.5",children:"Lines"}),s.jsx("p",{className:"font-mono text-lg font-semibold text-text-primary",children:u})]}),s.jsxs("div",{children:[s.jsx("p",{className:"text-[10px] text-text-muted uppercase mb-0.5",children:"High Score"}),s.jsxs("p",{className:"font-mono text-lg font-semibold text-text-primary flex items-center justify-center gap-1",children:[s.jsx(wi,{className:"h-4 w-4 text-accent-warn shrink-0"}),d]})]})]})]}),s.jsxs(W,{variant:"glass",className:"p-6 text-center space-y-4",children:[s.jsx("p",{className:"text-xs text-text-muted uppercase tracking-wider",children:"Next Piece"}),s.jsx("div",{className:"flex justify-center items-center py-2 h-16",children:s.jsx("div",{className:"grid grid-cols-4 gap-0.5",children:Ht[a].map((y,j)=>s.jsx("div",{className:"flex gap-0.5",children:y.map((D,C)=>s.jsx("div",{className:v("w-4 h-4 rounded border border-border-subtle transition-all",D?dn[a]:"bg-transparent border-transparent")},C))},j))})})]}),s.jsx("div",{className:"flex flex-col gap-2",children:!p&&!w?s.jsx(k,{variant:"primary",size:"lg",className:"w-full",onClick:A,leftIcon:s.jsx(st,{className:"h-5 w-5"}),children:"Start Break Game"}):w?s.jsx(k,{variant:"primary",size:"lg",className:"w-full",onClick:A,leftIcon:s.jsx(Le,{className:"h-5 w-5"}),children:"Play Again"}):s.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[s.jsx(k,{variant:"ghost",className:"border border-border-glow",onClick:()=>x(y=>!y),leftIcon:b?s.jsx(st,{className:"h-4 w-4"}):s.jsx(_i,{className:"h-4 w-4"}),children:b?"Resume":"Pause"}),s.jsx(k,{variant:"danger",onClick:()=>{N(!1),_(!0),rt("gameover")},leftIcon:s.jsx(Le,{className:"h-4 w-4"}),children:"Quit"})]})})]}),s.jsx("div",{className:"md:col-span-5 flex justify-center",children:s.jsxs("div",{className:"relative p-2 bg-bg-card/75 border border-border-glow shadow-glow-lg rounded-3xl backdrop-blur-md overflow-hidden",children:[s.jsx("div",{className:"grid grid-cols-10 gap-0.5 bg-bg-deep rounded-2xl p-1.5 border border-border-subtle",children:B.map((y,j)=>y.map((D,C)=>s.jsx("div",{className:v("w-6 h-6 sm:w-8 sm:h-8 rounded-lg border transition-all",D?`${dn[D]} border-t-white/20`:"bg-bg-deep border-border-subtle/5")},`${j}-${C}`)))}),b&&s.jsx("div",{className:"absolute inset-0 bg-bg-deep/80 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in",children:s.jsxs("div",{className:"text-center",children:[s.jsx("p",{className:"font-display text-2xl font-bold text-text-primary mb-2",children:"Game Paused"}),s.jsx("p",{className:"text-xs text-text-muted",children:"Click Resume to continue stacking your blocks"})]})}),w&&s.jsx("div",{className:"absolute inset-0 bg-bg-deep/80 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in",children:s.jsxs("div",{className:"text-center space-y-4",children:[s.jsxs("div",{children:[s.jsx("p",{className:"font-display text-3xl font-black text-accent-danger mb-1",children:"Game Over"}),s.jsxs("p",{className:"text-xs text-text-muted",children:["Final Score: ",s.jsx("span",{className:"font-mono text-accent-primary font-bold",children:c})]})]}),s.jsx(k,{variant:"primary",size:"sm",onClick:A,leftIcon:s.jsx(Le,{className:"h-4 w-4"}),children:"Restart Game"})]})}),!p&&!w&&!b&&s.jsx("div",{className:"absolute inset-0 bg-bg-deep/85 backdrop-blur-md flex items-center justify-center rounded-3xl animate-fade-in",children:s.jsxs("div",{className:"text-center space-y-4 p-6",children:[s.jsx("div",{className:"w-12 h-12 rounded-2xl bg-accent-primary/10 border border-accent-primary/20 flex items-center justify-center mx-auto text-2xl",children:"🎮"}),s.jsxs("div",{children:[s.jsx("p",{className:"font-display text-xl font-bold text-text-primary",children:"Calendar Tetris"}),s.jsx("p",{className:"text-xs text-text-muted mt-1 leading-relaxed max-w-[200px] mx-auto",children:"Stack energy blocks, clear calendar rows, and recharge your focus during break sprints."})]}),s.jsx(k,{variant:"primary",size:"sm",onClick:A,leftIcon:s.jsx(st,{className:"h-4 w-4"}),children:"Start Game"})]})})]})}),s.jsxs("div",{className:"md:col-span-3 space-y-6",children:[s.jsxs(W,{variant:"glass",className:"p-5 space-y-4 text-sm",children:[s.jsx("p",{className:"font-display font-semibold text-text-primary text-xs uppercase tracking-wider border-b border-border-subtle pb-2",children:"Controls"}),s.jsxs("div",{className:"space-y-2 text-xs text-text-secondary",children:[s.jsxs("div",{className:"flex justify-between",children:[s.jsx("kbd",{className:"font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle",children:"Arrow Up"})," Rotate Piece"]}),s.jsxs("div",{className:"flex justify-between",children:[s.jsx("kbd",{className:"font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle",children:"Arrow Left"})," Move Left"]}),s.jsxs("div",{className:"flex justify-between",children:[s.jsx("kbd",{className:"font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle",children:"Arrow Right"})," Move Right"]}),s.jsxs("div",{className:"flex justify-between",children:[s.jsx("kbd",{className:"font-mono text-text-primary bg-bg-card px-1.5 py-0.5 rounded border border-border-subtle",children:"Arrow Down"})," Drop Faster"]})]})]}),s.jsxs(W,{variant:"glass",className:"p-5 space-y-4 text-center md:hidden block",children:[s.jsx("p",{className:"font-display font-semibold text-text-primary text-xs uppercase tracking-wider",children:"Screen Pad"}),s.jsxs("div",{className:"flex flex-col items-center gap-2",children:[s.jsx(k,{size:"icon",variant:"ghost",className:"border border-border-subtle",onClick:F,"aria-label":"Rotate",children:s.jsx(Le,{className:"h-4 w-4"})}),s.jsxs("div",{className:"flex gap-4",children:[s.jsx(k,{size:"icon",variant:"ghost",className:"border border-border-subtle",onClick:H,"aria-label":"Move left",children:s.jsx(Tr,{className:"h-4 w-4"})}),s.jsx(k,{size:"icon",variant:"ghost",className:"border border-border-subtle",onClick:z,"aria-label":"Move down",children:s.jsx(Ni,{className:"h-4 w-4"})}),s.jsx(k,{size:"icon",variant:"ghost",className:"border border-border-subtle",onClick:R,"aria-label":"Move right",children:s.jsx(Gt,{className:"h-4 w-4"})})]})]})]})]})]})]})]})}function nt({children:r}){const{user:e,loading:t}=we();return t?s.jsx("div",{className:"min-h-screen flex items-center justify-center bg-bg-deep",children:s.jsxs("div",{className:"text-center",children:[s.jsx("div",{className:"w-10 h-10 border-3 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4","aria-hidden":"true"}),s.jsx("p",{className:"text-text-secondary",children:"Loading..."})]})}):e?s.jsx(s.Fragment,{children:r}):s.jsx(lt,{to:"/landing",replace:!0})}function gd({children:r}){const{user:e,loading:t}=we();return t?s.jsx("div",{className:"min-h-screen flex items-center justify-center bg-bg-deep",children:s.jsxs("div",{className:"text-center",children:[s.jsx("div",{className:"w-10 h-10 border-3 border-accent-primary border-t-transparent rounded-full animate-spin mx-auto mb-4","aria-hidden":"true"}),s.jsx("p",{className:"text-text-secondary",children:"Loading..."})]})}):e?s.jsx(lt,{to:"/plan",replace:!0}):s.jsx(s.Fragment,{children:r})}function xd(){return s.jsxs(ti,{children:[s.jsx(fe,{path:"/landing",element:s.jsx(gd,{children:s.jsx(Yl,{})})}),s.jsx(fe,{path:"/plan",element:s.jsx(nt,{children:s.jsx(hd,{})})}),s.jsx(fe,{path:"/museum",element:s.jsx(nt,{children:s.jsx(md,{})})}),s.jsx(fe,{path:"/settings",element:s.jsx(nt,{children:s.jsx(fd,{})})}),s.jsx(fe,{path:"/tetris",element:s.jsx(nt,{children:s.jsx(pd,{})})}),s.jsx(fe,{path:"/",element:s.jsx(lt,{to:"/plan",replace:!0})}),s.jsx(fe,{path:"*",element:s.jsx(lt,{to:"/plan",replace:!0})})]})}function bd(){const{theme:r}=Nt();return f.useEffect(()=>{const e=window.document.documentElement,t=()=>{r==="dark"||r==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches?e.classList.add("dark"):e.classList.remove("dark")};if(t(),r==="system"){const n=window.matchMedia("(prefers-color-scheme: dark)"),i=()=>t();return n.addEventListener("change",i),()=>n.removeEventListener("change",i)}},[r]),s.jsx(xd,{})}function yd(r={}){const{immediate:e=!1,onNeedRefresh:t,onOfflineReady:n,onRegistered:i,onRegisteredSW:a,onRegisterError:o}=r;let c,l;const d=async(u=!0)=>{await l};async function h(){if("serviceWorker"in navigator){if(c=await Fe(async()=>{const{Workbox:u}=await import("./workbox-window.prod.es5-BqEJf4Xk.js");return{Workbox:u}},[]).then(({Workbox:u})=>new u("/sw.js",{scope:"/",type:"classic"})).catch(u=>{o==null||o(u)}),!c)return;c.addEventListener("activated",u=>{(u.isUpdate||u.isExternal)&&window.location.reload()}),c.addEventListener("installed",u=>{u.isUpdate||n==null||n()}),c.register({immediate:e}).then(u=>{a?a("/sw.js",u):i==null||i(u)}).catch(u=>{o==null||o(u)})}}return l=h(),d}yd({onNeedRefresh(){confirm("New version available. Reload?")&&window.location.reload()},onOfflineReady(){console.log("App ready to work offline")}});Xt.createRoot(document.getElementById("root")).render(s.jsx(Ee.StrictMode,{children:s.jsx(Qs,{client:hl,children:s.jsx(ri,{children:s.jsx(ul,{children:s.jsx(bd,{})})})})}));
//# sourceMappingURL=index-BbCXUhQm.js.map
