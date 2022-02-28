(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.4.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.4.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.4.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.4.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _ extends class{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(_.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:i||t})),t&&r){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==_.copyRedirectedCacheableResponsesPlugin&&(a===_.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(_.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}_.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},_.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class v{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new _({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"e3b8b17988c280dbe670d3965e817444","url":"404.html"},{"revision":"236b817dde210f0b87df44fbc60c6b54","url":"A-Introduction/modular-programming.html"},{"revision":"245df0c0ac6c706ba3969d13305fe269","url":"A-Introduction/object-terminology.html"},{"revision":"55ea04bc5ed2d96d996890acb71d0afd","url":"A-Introduction/welcome-to-oo.html"},{"revision":"23b4d50eff62167156f358efde6c7ab8","url":"assets/css/styles.5ebce48d.css"},{"revision":"d268898116d3bf40bf136fd1ea354c96","url":"assets/js/073df8d0.ddf52b06.js"},{"revision":"dc70eb2fbe97169e750ac4008ec00ace","url":"assets/js/0e384e19.9461e604.js"},{"revision":"08d091c14f02ebc123d82afab24fd43c","url":"assets/js/105b0d11.6253eac5.js"},{"revision":"d9ba9688085dfadbb92d6be64d89f2fc","url":"assets/js/131.70d52116.js"},{"revision":"6db92ff0b2d6afc9bfbacebb70851c2f","url":"assets/js/16ad4c72.2e093fda.js"},{"revision":"e78eed3cc23e67a2bc6d060cf966b579","url":"assets/js/16b16888.e055310b.js"},{"revision":"ade3e3a1db34cffefb1351b6bebc3a29","url":"assets/js/17896441.a3b5fd08.js"},{"revision":"135e32191951b15125f67b9ed08ccdb0","url":"assets/js/1be78505.f2130a5c.js"},{"revision":"42a4062efe335c230812dab96c624cf3","url":"assets/js/230.a9b3fe21.js"},{"revision":"83a4dd3de49205c3da0224d7b3647161","url":"assets/js/283.4cf9e352.js"},{"revision":"01ca3fff2d910e992ac6da960680498e","url":"assets/js/2b433f9f.a20bb099.js"},{"revision":"03573b7f0e6c9f9bede8e754040aee7f","url":"assets/js/3a5226d6.ce791c6c.js"},{"revision":"edcedbec33beb10f60635746554b0a61","url":"assets/js/3be16344.a8925a01.js"},{"revision":"f90a0aaa2c7d20528aa7e97bda4aad64","url":"assets/js/4108805e.07bae64b.js"},{"revision":"848d59a46e7c9c0f9950234ab87c0a1f","url":"assets/js/45fe9c28.0dbf71d1.js"},{"revision":"26da1f3b97ca3887cf2a54034b27fa08","url":"assets/js/56951ef3.a55bcf00.js"},{"revision":"020c01a67efa2aa600cbf1e3291a725a","url":"assets/js/5d188b24.28b96ed1.js"},{"revision":"00b24c4681eb2c3fc96de0f4f3bc14eb","url":"assets/js/63d2a5e4.54b000fc.js"},{"revision":"e23c992181c7b42041161a65a546d7d2","url":"assets/js/667.35b86768.js"},{"revision":"291f3e8f761196f5c49b373072636284","url":"assets/js/6f663f89.e13947c0.js"},{"revision":"765b22ae58e9bf8ace2388e2e8982c14","url":"assets/js/72c9ea03.0591fcca.js"},{"revision":"00ad060a144348a921f41041cc26e070","url":"assets/js/75.d516af00.js"},{"revision":"42596d81eaf4a5f33e2f837749aaf2c8","url":"assets/js/7585ae8c.5f270b79.js"},{"revision":"c3a8ac4e217bd42cd8d4608882317970","url":"assets/js/814.dbb6256e.js"},{"revision":"b7878f4ef9243be049258c527cfe51b9","url":"assets/js/8ca93b4c.ef152832.js"},{"revision":"142191bc20366f565bcbbb2bd54b1d04","url":"assets/js/935f2afb.41f5120d.js"},{"revision":"84dfb42764ddf360418c4c2427f63d42","url":"assets/js/9a94552e.770e3a71.js"},{"revision":"fb6ec9a1a45ea5bcdc545bff260f46f3","url":"assets/js/9e4087bc.3768f9cd.js"},{"revision":"99fc962231291b289c2c7c83ee291582","url":"assets/js/a53d596d.2dbe2f01.js"},{"revision":"47fc9d2fbdb7e9e0348e103a28a05c85","url":"assets/js/adb1b249.bb9a715c.js"},{"revision":"3ef70ebcd2e70a5f938e37bd50445ff9","url":"assets/js/b2f554cd.86816a94.js"},{"revision":"1a77e555a52b064977b2e40c5894e1e0","url":"assets/js/b837d9d8.2f227d8e.js"},{"revision":"969bdba15301f65dad42d3e774849362","url":"assets/js/dc5ffb51.f19e5502.js"},{"revision":"4e80c73d7f88c7e6c3566f5ff7e7257f","url":"assets/js/e5a16459.7bbddb3f.js"},{"revision":"7d0040e017f18981595a5321ac07b36c","url":"assets/js/fb3e6ee1.188c0743.js"},{"revision":"9cfe072e03d073c28594defc48fe19ed","url":"assets/js/fd0fb51b.a7d2d01b.js"},{"revision":"be374d87b16c580fd8311adbdf9863c4","url":"assets/js/fe32e8a2.5912244c.js"},{"revision":"55d7b6748287b19183163a900c349631","url":"assets/js/main.43ed89d1.js"},{"revision":"6c565db0e62a38dce04f13f90aa54879","url":"assets/js/runtime~main.5e290438.js"},{"revision":"f3d5409df7caa76ed963addff1745bc1","url":"B-Foundations/dynamic-memory.html"},{"revision":"4fca23dbdbd9bf06f0caf37cb6508f64","url":"B-Foundations/member-functions-and-privacy.html"},{"revision":"323ebd3cf6cd3fc2dd569ff336dbb474","url":"B-Foundations/types-overloading-and-references.html"},{"revision":"a34f21aaeb7040b1c18b6446609cd399","url":"blog/archive.html"},{"revision":"714323823949650f3d13f15846128736","url":"C-Encapsulation/classes-and-resources.html"},{"revision":"a72cf60966b7f29fbf90878463142fd9","url":"C-Encapsulation/construction-and-destruction.html"},{"revision":"4fbf62c472df55c0e57c74185c7ca12b","url":"C-Encapsulation/helper-functions.html"},{"revision":"cc8b70c6b70a8294b467748254c5f634","url":"C-Encapsulation/input-and-output-operators.html"},{"revision":"133f4eee04ea3d761446921d0a01b9b2","url":"C-Encapsulation/member-operators.html"},{"revision":"fefc6afaee95593a1b3a050f002a5973","url":"C-Encapsulation/the-current-object.html"},{"revision":"6233b72f382a7bd3e73e70be794d4132","url":"D-Inheritance/derived-classes.html"},{"revision":"46b4914d3e4d86639e05ee94baa8d04d","url":"D-Inheritance/functions-in-a-hierarchy.html"},{"revision":"842a789ffce4b685b8d98a1aa4dd7760","url":"E-Polymorphism/abstract-base-classes.html"},{"revision":"d23d9de9c67ba1c7e3ccdecb3e554f55","url":"E-Polymorphism/overview-of-polymorphism.html"},{"revision":"8461386d14350fe8287d0e727dfa8f38","url":"E-Polymorphism/templates.html"},{"revision":"3ad90c839aee60b7ccb7d63ac496ddd0","url":"E-Polymorphism/virtual-functions.html"},{"revision":"92ac489ef8b52bf1cfa8f4dc7956ffc9","url":"F-Refinements/derived-classes-and-resources.html"},{"revision":"677220ff043d850fe0eeb0f35322aa9a","url":"F-Refinements/input-and-output-refinements.html"},{"revision":"fd8d58ba730659ef31fdb1d4f879ff08","url":"F-Refinements/language-standards.html"},{"revision":"4e6accce1e25b6c89bac30309c1a0602","url":"index.html"},{"revision":"29889586444746d6687de18aacdfa438","url":"manifest.json"},{"revision":"e1eb8c649fa91a60f6bd8c75e942c061","url":"Resources-Appendices/ascii-collating-sequence.html"},{"revision":"83a6132cbc19163cd53545cb5704807b","url":"Resources-Appendices/operator-precedence.html"},{"revision":"6e6939894963727ccadbc92d75c577c0","url":"Resources-Appendices/relation-between-cpp-and-c.html"},{"revision":"f1dfabf7a2132f2faacdbb724afd8df8","url":"Resources-Appendices/standard-library-functions.html"},{"revision":"e74fccf74795df7bc7c38003ed1b2f36","url":"img/click-to-select-region.png"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"ef2266bfb84465c731756b58cde0afb8","url":"img/favicon.ico"},{"revision":"22c6eb8088b86099d5a78b5a13f7b24d","url":"img/logo-dark.svg"},{"revision":"8817e00103e8837d17c2758b0ce25c41","url":"img/logo.svg"},{"revision":"2e1cb1ba37fc5ae886ea57248bdb60bd","url":"img/pwa/icon-192x192.png"},{"revision":"a0f8ed72d3d3489353a57a03aeac9b0d","url":"img/pwa/icon-256x256.png"},{"revision":"ab9ed19e2716b5c233d6132d66204d53","url":"img/pwa/icon-384x384.png"},{"revision":"b71acc5b894ccfac0c22eb39a590f2a0","url":"img/pwa/icon-512x512.png"},{"revision":"b9d9189ed8f8dd58e70d9f8b3f693b3e","url":"img/tutorial/docsVersionDropdown.png"},{"revision":"c14bff79aafafca0957ccc34ee026e2c","url":"img/tutorial/localeDropdown.png"},{"revision":"8d04d316f4d1777793ee773fcbf16cea","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"3d3d63efa464a74e2befd1569465ed21","url":"img/undraw_docusaurus_react.svg"},{"revision":"932b535fc71feb29877bc4b9d708b1d0","url":"img/undraw_docusaurus_tree.svg"}],s=new v({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=[],s=new URL(e,self.location.href);return s.origin!==self.location.origin||(s.search="",s.hash="",t.push(s.href),s.pathname.endsWith("/")?t.push(`${s.href}index.html`):t.push(`${s.href}/index.html`)),t}(a);for(let i=0;i<n.length;i+=1){const r=n[i],c=s.getCacheKeyForURL(r);if(c){const s=caches.match(c);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:r,possibleURLs:n,cacheKey:c,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});"SKIP_WAITING"===(t.data&&t.data.type)&&self.skipWaiting()}))})()})()})();