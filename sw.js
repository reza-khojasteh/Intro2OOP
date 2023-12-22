(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.3"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.3"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.3"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.3"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,s),i.exports}(()=>{s(913);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||n(a.precache),r=e=>e||n(a.runtime);function c(e,t){const s=t();return e.waitUntil(s),s}s(977);function o(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),i=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:i.href}}class h{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class l{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let u;async function f(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),i={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=s?s(i):i,c=function(){if(void 0===u){const e=new Response("");if("body"in e)try{new Response(e.body),u=!0}catch(e){u=!1}u=!1}return u}()?n.body:await n.blob();return new Response(c,r)}function d(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class p{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const g=new Set;s(873);function y(e){return"string"==typeof e?new Request(e):e}class w{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new p,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:s}=this;let a=y(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){if(e instanceof Error)throw new t("plugin-error-request-will-fetch",{thrownErrorMessage:e.message})}const i=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:i,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:i.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),r=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(i,r);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,s){const a=y(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const i=await this.getCacheKey(a,"write");if(!s)throw new t("cache-put-with-no-response",{url:(r=i.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const c=await this._ensureResponseSafeToCache(s);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),f=u?await async function(e,t,s,a){const n=d(t.url,s);if(t.url===n)return e.match(t,a);const i=Object.assign(Object.assign({},a),{ignoreSearch:!0}),r=await e.keys(t,i);for(const t of r)if(n===d(t.url,s))return e.match(t,a)}(l,i.clone(),["__WB_REVISION__"],h):null;try{await l.put(i,u?c.clone():c)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of g)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:o,oldResponse:f,newResponse:c.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=y(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class _{constructor(e={}){this.cacheName=r(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new w(this,{event:t,request:s,params:a}),i=this._getResponse(n,s,t);return[i,this._awaitComplete(i,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){if(t instanceof Error)for(const i of e.iterateCallbacks("handlerDidError"))if(n=await i({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,i;try{n=await e}catch(i){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(i=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:i}),t.destroy(),i)throw i}}class v extends _{constructor(e={}){e.cacheName=i(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(v.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const t=n.integrity,i=e.integrity,r=!i||i===t;if(a=await s.fetch(new Request(e,{integrity:"no-cors"!==e.mode?i||t:void 0})),t&&r&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await s.cachePut(e,a.clone());0}}return a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==v.copyRedirectedCacheableResponsesPlugin&&(a===v.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(v.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}v.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},v.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await f(e):e};class m{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new v({cacheName:i(e),plugins:[...t,new l({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=o(a),i="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return c(e,(async()=>{const t=new h;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),i=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return c(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params=Object.assign({cacheKey:s},t.params),this.strategy.handle(t))}}s(80);(async()=>{const e=function(){const e=JSON.parse(new URLSearchParams(self.location.search).get("params"));return e.debug&&console.log("[Docusaurus-PWA][SW]: Service Worker params:",e),e}(),t=[{"revision":"6ab8eade3be8bc89158ef0aadb165cb7","url":"404.html"},{"revision":"fa258261514e60ad7b3b25f15f900424","url":"A-Introduction/modular-programming.html"},{"revision":"100c45c143c04eb726f932e44558bded","url":"A-Introduction/object-terminology.html"},{"revision":"9025c91dfb56162b2e8a91b00aabc106","url":"A-Introduction/welcome-to-oo.html"},{"revision":"6b2ff7ce24957617609de8b0d1a66351","url":"assets/css/styles.0e8941de.css"},{"revision":"1daaf43ddc32ad26d4852297847556b8","url":"assets/js/073df8d0.9e311a0e.js"},{"revision":"9c89dd0a0816b21d9894b5b07b2db9b7","url":"assets/js/0e384e19.7a4db972.js"},{"revision":"eced767ae70f60fb215ac38ad3c1d5e4","url":"assets/js/105b0d11.0f7a5ab5.js"},{"revision":"4363a0d648c761182aa30524937dddb0","url":"assets/js/131.6f6104b9.js"},{"revision":"441a76b5427da3b7e5f01866082f0a57","url":"assets/js/16ad4c72.4e659705.js"},{"revision":"b27396fc5fed680e1930db9809eb0431","url":"assets/js/16b16888.98f4133e.js"},{"revision":"1cd68a7fd2fa08fa3b18ac0e81255f65","url":"assets/js/17896441.df36c814.js"},{"revision":"e89e58efd7e73e571afd36372cd0b00d","url":"assets/js/1be78505.7f7ca71e.js"},{"revision":"78d5b26a05f54434a7f9c6e4ea17c48d","url":"assets/js/283.593cc081.js"},{"revision":"029fec1dd7a2f32296e649b59cfb8b1c","url":"assets/js/2b433f9f.7c8e5492.js"},{"revision":"f6cf7ef93765c818bc7ecd5993c8f834","url":"assets/js/3a5226d6.a6231402.js"},{"revision":"c1928f446a44222624102d01abc1fc88","url":"assets/js/3be16344.0e440560.js"},{"revision":"d4f380d756f48aed8c21262ea70930a9","url":"assets/js/4108805e.4ab87090.js"},{"revision":"004e1ea614bd3f4ba205c6bc8a6e17d0","url":"assets/js/45fe9c28.0ea20200.js"},{"revision":"ef8e117dd05665d1d9878fb0acde8433","url":"assets/js/539.53b348ba.js"},{"revision":"39749d6959223b99b3aea9f22a3625b4","url":"assets/js/56951ef3.36272d08.js"},{"revision":"a92e88e74f80762bd61d28128beb7b50","url":"assets/js/5d188b24.637aae6f.js"},{"revision":"e35031a98767909140389033c9140307","url":"assets/js/63d2a5e4.dd65a588.js"},{"revision":"e32e03fe0f80bae84173259082c37384","url":"assets/js/6f663f89.3085a877.js"},{"revision":"cdb5f7c9f36a3787750056e4e265875d","url":"assets/js/72c9ea03.5fcdfb2e.js"},{"revision":"9304de0430840347ea04de96953bade0","url":"assets/js/7585ae8c.d7ff9f71.js"},{"revision":"3808447d02988479bdf7f40bc7e140dd","url":"assets/js/8ca93b4c.4ab682d1.js"},{"revision":"9207edfa540dc81be380cc7c2220f5a7","url":"assets/js/935f2afb.9ec08544.js"},{"revision":"02ee56d480f5e499cfcff627cc358636","url":"assets/js/972.2e2088b1.js"},{"revision":"7756fd5506befea44d3c457e0e348eb0","url":"assets/js/9a94552e.c9a3dc6e.js"},{"revision":"acfb897f64237653a32092115ad81a3d","url":"assets/js/a53d596d.fb22ac5e.js"},{"revision":"e1cec68b77277055d7429d47174e1e27","url":"assets/js/adb1b249.4cd50119.js"},{"revision":"97b0301db8b885626d968205c23b775b","url":"assets/js/b837d9d8.ccc44b0d.js"},{"revision":"85916ad8ddfe9ddabd0914267472fd00","url":"assets/js/dc5ffb51.e41634ee.js"},{"revision":"a88785470b2f5fcf9547df4ad04baeb9","url":"assets/js/ddb53d48.281a1e94.js"},{"revision":"5b4564e6334e3dc46d16811c970f605e","url":"assets/js/e5a16459.f08a0c5e.js"},{"revision":"f21ba22499c0a7a9fc1cdd614493d39b","url":"assets/js/fb3e6ee1.1a152f97.js"},{"revision":"b4e37386336042dd4c40a72d79e25eb6","url":"assets/js/fd0fb51b.fdc5c2bc.js"},{"revision":"3449e4d99c1ead3cdafc0ce07db7df67","url":"assets/js/fe32e8a2.5094cee0.js"},{"revision":"4f65db2cb39a1239ddfb19de4919d0fb","url":"assets/js/main.6d017a4c.js"},{"revision":"b4eb4285404c599b255aef0c66e5afc7","url":"assets/js/runtime~main.a37dee74.js"},{"revision":"aa102bd219740c730a0a5ca2e06dc7b1","url":"B-Foundations/dynamic-memory.html"},{"revision":"2f355ae11ddd8a7bf8b0ee0b680f2838","url":"B-Foundations/member-functions-and-privacy.html"},{"revision":"ef968a92fd56220f5869c8e236b9e325","url":"B-Foundations/types-overloading-and-references.html"},{"revision":"7ab48692a9900f6e54a763622838b6d3","url":"C-Encapsulation/classes-and-resources.html"},{"revision":"e2e1811250dba472cf1994bb799635c6","url":"C-Encapsulation/construction-and-destruction.html"},{"revision":"588488b38be588f6031f5308cd48feab","url":"C-Encapsulation/helper-functions.html"},{"revision":"effffa2d35b35fc46632267f0247c920","url":"C-Encapsulation/input-and-output-operators.html"},{"revision":"e880d09b2f683ec3451390d7ee2c3d8a","url":"C-Encapsulation/member-operators.html"},{"revision":"67fa6445e570881c4e678695cd0332a6","url":"C-Encapsulation/the-current-object.html"},{"revision":"7ea6ff673625358ec85052762223dab1","url":"D-Inheritance/derived-classes.html"},{"revision":"6f7edd99720bc846714dbbef6e163f2d","url":"D-Inheritance/functions-in-a-hierarchy.html"},{"revision":"33898584496984ad1eab45201c5fcc44","url":"E-Polymorphism/abstract-base-classes.html"},{"revision":"ec3b4acc5600b735a836f527d19a23b9","url":"E-Polymorphism/overview-of-polymorphism.html"},{"revision":"14330f3a349e1a46bd13f90a4be1b8e6","url":"E-Polymorphism/templates.html"},{"revision":"76ef7dfac33675242bd46693b37809c3","url":"E-Polymorphism/virtual-functions.html"},{"revision":"d532228ed6f6313504463a20af953e08","url":"F-Refinements/derived-classes-and-resources.html"},{"revision":"94e36a6821c7ccdbb26e5c622c7ba1aa","url":"F-Refinements/input-and-output-refinements.html"},{"revision":"579b9b21a5266d52602c59eb7d17c714","url":"F-Refinements/language-standards.html"},{"revision":"49040048ea5594c66cc9f8a0c3a51965","url":"index.html"},{"revision":"29889586444746d6687de18aacdfa438","url":"manifest.json"},{"revision":"5741dbda0391f5b63516cce0baefbe48","url":"Resources-Appendices/ascii-collating-sequence.html"},{"revision":"be363cd80a1000dced15b7768e606479","url":"Resources-Appendices/operator-precedence.html"},{"revision":"2e109e81fdbe2dc43473f54ae44a3aac","url":"Resources-Appendices/relation-between-cpp-and-c.html"},{"revision":"4fa9f7fc113f54fd24fc714d072f9dd0","url":"Resources-Appendices/standard-library-functions.html"},{"revision":"72d561b797a1bfa93beed0f352ff1a1c","url":"assets/images/01-CourseParticipation-d6ae943dcb8fbef64dc1a9a81b27315c.png"},{"revision":"f3bd29e625a0ca6dd1f5c6fc665a777c","url":"assets/images/03-C-CPP-93112446c26e3cf12ee5bc733f529db0.png"},{"revision":"b0af6c8006da57f7be6f0529f3d7c163","url":"assets/images/04-OO-BookShelf-3f7165b33a52cc9533816098bc9fdeda.png"},{"revision":"f6d0ce62d0a4760cf2a8746824056e12","url":"assets/images/05-Classes-f23f43b1882b7f3bdce8f26d1ea81067.png"},{"revision":"ee9b699467e0b9e663c6cbc4ae695616","url":"assets/images/06-UML-f40eec3b4de2ecc1b3d04e8fad987237.png"},{"revision":"c72f7554be0e6cc8034ca6d1b8c9c20c","url":"assets/images/07-ClassDiagram-a9fe82890a68eb567ebefa039e4889b9.png"},{"revision":"60129c0526fb1fbdd9dac8e0eb15f3a9","url":"assets/images/08-Encapsulation-b23a52343c72df8eb52785fb08812871.png"},{"revision":"eef9a99de139657feaea9634d51adf18","url":"assets/images/10-Polymorphism-51460b5a1ccd13992fa3462e458a804b.png"},{"revision":"e930b28b735c7c7d7842e52e62734d8e","url":"assets/images/11-Transaction-28cbeb74ebafe2b61d83f030101e157c.png"},{"revision":"9f0737deddef79c7cea3e416a120703a","url":"assets/images/12-TransactionModule-72a03147282542aa0401c09965703782.png"},{"revision":"8527b6190726e453088ba92858e7b820","url":"assets/images/14-compiler-72dbcd2e9f0474dac6ec1a0901e05993.png"},{"revision":"5eb7d6132abbcd87e355ddaba13e92dd","url":"assets/images/15-main_trans_iostr-8e50b3d78d4704c650c827be48470c05.png"},{"revision":"1f0368b3174abbc852d30d7b66b99df0","url":"assets/images/16-causeOfConflict-cd593091e5017529004cd4368e5c07ad.png"},{"revision":"d17795aa506d351dc8ccf35edb2ff3e0","url":"assets/images/cardelli_wegner-c16c546cca7fd019809efa6ba31f1603.png"},{"revision":"a7bae95cf0e754e44d94a2ab643cd144","url":"assets/images/communication-4a1152ecc06dbb9293d9fba43b6ab631.png"},{"revision":"4e4e7a258bd08add4d4d75c56114acde","url":"assets/images/current_object-dcfa9e5345aa313c4d91e55d4c688719.png"},{"revision":"61147a97e632b968fdf6cddc3c295f63","url":"assets/images/deepCopy-be350d0a07232667ec5f54997602b8fd.png"},{"revision":"8e4fae89949f2e797e7c7df4a13273c9","url":"assets/images/differentBehavior-687d4d65047d03829c666fbdf9576a68.png"},{"revision":"0aab2e4e3010bb66a8a08f853f212764","url":"assets/images/dtor-24d19126ff786847acb17aecc9e0904b.png"},{"revision":"d2c349c4179c4cde86bf94b9fcb4aa7b","url":"assets/images/dynamic_memory-cc72d07a209d272fb7ff81e8b6b4f2bb.png"},{"revision":"5a0cc3e3646c8c3434ed6c7fc76479ff","url":"assets/images/evolution-71c30aa4e4e7514c9d4655543656203e.png"},{"revision":"86b3c87881784b6b8652b8785e0c220c","url":"assets/images/full_ios_hierarchy-96fbcec3426501ebbc8ce43c3f4aab90.png"},{"revision":"f567df392679b3b860cd619769d707d6","url":"assets/images/identicalBehavior-305a10ff9460a123a2aa55dbdc374c78.png"},{"revision":"e2c84f6a0123e3294af3d4c4e6a4f2a5","url":"assets/images/implicit-f1816e1f60d971c502ef885a95cb68ed.png"},{"revision":"db8b1c242cd8381ab2bd13f8d2ad097d","url":"assets/images/inherit_arrow-dfa0ac3b2635db2ec4f73476b4c80de0.png"},{"revision":"4fdcea88ecefa77e263edb91992beb64","url":"assets/images/inherit_ctor-1b1dddfb94113575ef21d965a330999f.png"},{"revision":"9e0b8f14dcc42ddb1eaeb0b206091550","url":"assets/images/inherit_dtor-a5e47cce8118037b6bc65af710b13632.png"},{"revision":"da1d52587af65af26cd7a25deb6ddba6","url":"assets/images/inherit_object-8b1c994171c87dd161e0c0aa7491f87c.png"},{"revision":"fa5c5c3aa9ead274d22ceac67cfd5007","url":"assets/images/linnaeus-de0e0a5cc486c7befc72e728181cf157.png"},{"revision":"6eeb9cb2a3bf2470db3c1d8a70986a43","url":"assets/images/memory_io-8ad76340e799a726988f28d79ff08d64.png"},{"revision":"dd6073ddbd6cc89849d800c479c1550b","url":"assets/images/methods-67e7bb294597759ba5bfe6b6bb6fc185.png"},{"revision":"fe33e12f3f2e2b1386755f30ae571d79","url":"assets/images/pure_virtual_function-0dccf8f1ebec7dd4f88108ca312f64f2.png"},{"revision":"53f5703b62f568f0bbfb2096a5190ce1","url":"assets/images/single_instance-dad8fca61f65a5cc8f20761808b6069f.png"},{"revision":"8f89760556895309ec1fed2d677aaf08","url":"assets/images/static_and_dynamic_types-6bb8b4206319d3c4fb00bb2823520142.png"},{"revision":"db5e111e73b47b403a35538a38d91df1","url":"assets/images/this-e40ed0e2969e2c29ac58536721db4725.png"},{"revision":"72d561b797a1bfa93beed0f352ff1a1c","url":"img/01-CourseParticipation.png"},{"revision":"fef0212310aaf5e1523bdd0b1d83a3c4","url":"img/02-relationship.png"},{"revision":"f3bd29e625a0ca6dd1f5c6fc665a777c","url":"img/03-C-CPP.png"},{"revision":"b0af6c8006da57f7be6f0529f3d7c163","url":"img/04-OO-BookShelf.png"},{"revision":"f6d0ce62d0a4760cf2a8746824056e12","url":"img/05-Classes.png"},{"revision":"ee9b699467e0b9e663c6cbc4ae695616","url":"img/06-UML.png"},{"revision":"c72f7554be0e6cc8034ca6d1b8c9c20c","url":"img/07-ClassDiagram.png"},{"revision":"60129c0526fb1fbdd9dac8e0eb15f3a9","url":"img/08-Encapsulation.png"},{"revision":"27da88a12d2b742d6d7b3199b403da64","url":"img/09-Inheritance.png"},{"revision":"eef9a99de139657feaea9634d51adf18","url":"img/10-Polymorphism.png"},{"revision":"e930b28b735c7c7d7842e52e62734d8e","url":"img/11-Transaction.png"},{"revision":"9f0737deddef79c7cea3e416a120703a","url":"img/12-TransactionModule.png"},{"revision":"62a05e61333f5e99ccb617de06043b33","url":"img/13-cppfiles.png"},{"revision":"8527b6190726e453088ba92858e7b820","url":"img/14-compiler.png"},{"revision":"5eb7d6132abbcd87e355ddaba13e92dd","url":"img/15-main_trans_iostr.png"},{"revision":"1f0368b3174abbc852d30d7b66b99df0","url":"img/16-causeOfConflict.png"},{"revision":"e78b8e3230a41ed827f5f85ac3465968","url":"img/abstraction.png"},{"revision":"99bc74b8b2f9cbb2d06c4ac820ede5b6","url":"img/algorithmic.png"},{"revision":"7cb7c42863801e28ad2ca69d93f94efe","url":"img/bit_string.png"},{"revision":"d17795aa506d351dc8ccf35edb2ff3e0","url":"img/cardelli_wegner.png"},{"revision":"1d684685c1faa950c87b57b3ad047f9c","url":"img/class_memory.png"},{"revision":"c0545f3ca62155bf9eee96967e0ee16b","url":"img/class_relationships.png"},{"revision":"aaaf310d147a9512d3cd8d9ee9ba4a82","url":"img/classes.png"},{"revision":"e74fccf74795df7bc7c38003ed1b2f36","url":"img/click-to-select-region.png"},{"revision":"a7bae95cf0e754e44d94a2ab643cd144","url":"img/communication.png"},{"revision":"9382413653ad37be96046890946ab30c","url":"img/compile_link.png"},{"revision":"7b2e40ce3eb597236f4c1dfd06ddd690","url":"img/compile_modules.png"},{"revision":"80ba73a8564c85181725af0741bd8738","url":"img/ctor.png"},{"revision":"4e4e7a258bd08add4d4d75c56114acde","url":"img/current_object.png"},{"revision":"61147a97e632b968fdf6cddc3c295f63","url":"img/deepCopy.png"},{"revision":"bd871e3890675e05e3fc32e56eb0b433","url":"img/definition.png"},{"revision":"8e4fae89949f2e797e7c7df4a13273c9","url":"img/differentBehavior.png"},{"revision":"7fa1a026116afe175cae818030d4ffc4","url":"img/docusaurus.png"},{"revision":"0aab2e4e3010bb66a8a08f853f212764","url":"img/dtor.png"},{"revision":"d2c349c4179c4cde86bf94b9fcb4aa7b","url":"img/dynamic_memory.png"},{"revision":"56611d5befdffe4a66a8aeaa0821bbc5","url":"img/encapsulation.png"},{"revision":"5a0cc3e3646c8c3434ed6c7fc76479ff","url":"img/evolution.png"},{"revision":"ef2266bfb84465c731756b58cde0afb8","url":"img/favicon.ico"},{"revision":"86b3c87881784b6b8652b8785e0c220c","url":"img/full_ios_hierarchy.png"},{"revision":"7f439233827f08f907a1c8be45e82ea5","url":"img/header.png"},{"revision":"f567df392679b3b860cd619769d707d6","url":"img/identicalBehavior.png"},{"revision":"e2c84f6a0123e3294af3d4c4e6a4f2a5","url":"img/implicit.png"},{"revision":"db8b1c242cd8381ab2bd13f8d2ad097d","url":"img/inherit_arrow.png"},{"revision":"4fdcea88ecefa77e263edb91992beb64","url":"img/inherit_ctor.png"},{"revision":"9e0b8f14dcc42ddb1eaeb0b206091550","url":"img/inherit_dtor.png"},{"revision":"da1d52587af65af26cd7a25deb6ddba6","url":"img/inherit_object.png"},{"revision":"09c79d3c9c553ac293b3fb586a5b2770","url":"img/instance.png"},{"revision":"afc5d5b5a8261de1eb424dfc2ce141ce","url":"img/iPerson.png"},{"revision":"48aa64b2511e21d05847480b7b117092","url":"img/isahierarchy.png"},{"revision":"fa5c5c3aa9ead274d22ceac67cfd5007","url":"img/linnaeus.png"},{"revision":"22c6eb8088b86099d5a78b5a13f7b24d","url":"img/logo-dark.svg"},{"revision":"8817e00103e8837d17c2758b0ce25c41","url":"img/logo.svg"},{"revision":"6eeb9cb2a3bf2470db3c1d8a70986a43","url":"img/memory_io.png"},{"revision":"dd6073ddbd6cc89849d800c479c1550b","url":"img/methods.png"},{"revision":"9fb2413f4ae2b80d417eb70e77974e26","url":"img/modularity.png"},{"revision":"2045ca933f2d914d1ea853ac6e6cfc4c","url":"img/polymorphism.png"},{"revision":"fe33e12f3f2e2b1386755f30ae571d79","url":"img/pure_virtual_function.png"},{"revision":"2e1cb1ba37fc5ae886ea57248bdb60bd","url":"img/pwa/icon-192x192.png"},{"revision":"a0f8ed72d3d3489353a57a03aeac9b0d","url":"img/pwa/icon-256x256.png"},{"revision":"ab9ed19e2716b5c233d6132d66204d53","url":"img/pwa/icon-384x384.png"},{"revision":"b71acc5b894ccfac0c22eb39a590f2a0","url":"img/pwa/icon-512x512.png"},{"revision":"53f5703b62f568f0bbfb2096a5190ce1","url":"img/single_instance.png"},{"revision":"8f89760556895309ec1fed2d677aaf08","url":"img/static_and_dynamic_types.png"},{"revision":"a1c5a77c4fae02e599b5f389558e59c2","url":"img/static_memory.png"},{"revision":"e7a027c42dffaf468702a12b12ee6ecd","url":"img/streams.png"},{"revision":"80a5b1413f97ad6764d0b7cc85f58b26","url":"img/superset.png"},{"revision":"db5e111e73b47b403a35538a38d91df1","url":"img/this.png"},{"revision":"b9d9189ed8f8dd58e70d9f8b3f693b3e","url":"img/tutorial/docsVersionDropdown.png"},{"revision":"c14bff79aafafca0957ccc34ee026e2c","url":"img/tutorial/localeDropdown.png"},{"revision":"defecbb7bded0971706b40ef9a759701","url":"img/twodefinition.png"},{"revision":"8d04d316f4d1777793ee773fcbf16cea","url":"img/undraw_docusaurus_mountain.svg"},{"revision":"3d3d63efa464a74e2befd1569465ed21","url":"img/undraw_docusaurus_react.svg"},{"revision":"932b535fc71feb29877bc4b9d708b1d0","url":"img/undraw_docusaurus_tree.svg"}],s=new m({fallbackToNetwork:!0});e.offlineMode&&(s.addToCacheList(t),e.debug&&console.log("[Docusaurus-PWA][SW]: addToCacheList",{precacheManifest:t})),await async function(e){}(),self.addEventListener("install",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: install event",{event:t}),t.waitUntil(s.install(t))})),self.addEventListener("activate",(t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: activate event",{event:t}),t.waitUntil(s.activate(t))})),self.addEventListener("fetch",(async t=>{if(e.offlineMode){const a=t.request.url,n=function(e){const t=new URL(e,self.location.href);return t.origin!==self.location.origin?[]:(t.search="",t.hash="",[t.href,`${t.href}${t.pathname.endsWith("/")?"":"/"}index.html`])}(a);for(const i of n){const r=s.getCacheKeyForURL(i);if(r){const s=caches.match(r);e.debug&&console.log("[Docusaurus-PWA][SW]: serving cached asset",{requestURL:a,possibleURL:i,possibleURLs:n,cacheKey:r,cachedResponse:s}),t.respondWith(s);break}}}})),self.addEventListener("message",(async t=>{e.debug&&console.log("[Docusaurus-PWA][SW]: message event",{event:t});const s=t.data?.type;"SKIP_WAITING"===s&&self.skipWaiting()}))})()})()})();