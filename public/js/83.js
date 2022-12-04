/*! For license information please see 83.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[83],{55083:(t,r,e)=>{e.r(r),e.d(r,{default:()=>w});var n=e(67294),o=e(72446),i=e.n(o),a=e(59354),c={insert:"head",singleton:!1};i()(a.Z,c);a.Z.locals;var u=e(89250),s=e(79655),l=e(9669),f=e.n(l),h=e(85893);function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function p(){p=function(){return t};var t={},r=Object.prototype,e=r.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{c({},"")}catch(t){c=function(t,r,e){return t[r]=e}}function u(t,r,e,n){var o=r&&r.prototype instanceof f?r:f,i=Object.create(o.prototype),a=new E(n||[]);return i._invoke=function(t,r,e){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return N()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=L(a,e);if(c){if(c===l)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var u=s(t,r,e);if("normal"===u.type){if(n=e.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n="completed",e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function s(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var l={};function f(){}function h(){}function v(){}var y={};c(y,o,(function(){return this}));var m=Object.getPrototypeOf,g=m&&m(m(S([])));g&&g!==r&&e.call(g,o)&&(y=g);var w=v.prototype=f.prototype=Object.create(y);function b(t){["next","throw","return"].forEach((function(r){c(t,r,(function(t){return this._invoke(r,t)}))}))}function x(t,r){function n(o,i,a,c){var u=s(t[o],t,i);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"==d(f)&&e.call(f,"__await")?r.resolve(f.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):r.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(u.arg)}var o;this._invoke=function(t,e){function i(){return new r((function(r,o){n(t,e,r,o)}))}return o=o?o.then(i,i):i()}}function L(t,r){var e=t.iterator[r.method];if(void 0===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=void 0,L(t,r),"throw"===r.method))return l;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=s(e,t.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,l;var o=n.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,l):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,l)}function j(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function k(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function S(t){if(t){var r=t[o];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function r(){for(;++n<t.length;)if(e.call(t,n))return r.value=t[n],r.done=!1,r;return r.value=void 0,r.done=!0,r};return i.next=i}}return{next:N}}function N(){return{value:void 0,done:!0}}return h.prototype=v,c(w,"constructor",v),c(v,"constructor",h),h.displayName=c(v,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===h||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,c(t,a,"GeneratorFunction")),t.prototype=Object.create(w),t},t.awrap=function(t){return{__await:t}},b(x.prototype),c(x.prototype,i,(function(){return this})),t.AsyncIterator=x,t.async=function(r,e,n,o,i){void 0===i&&(i=Promise);var a=new x(u(r,e,n,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(w),c(w,a,"Generator"),c(w,o,(function(){return this})),c(w,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=S,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&e.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function n(e,n){return a.type="throw",a.arg=t,r.next=e,n&&(r.method="next",r.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=e.call(i,"catchLoc"),u=e.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,r){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&e.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),l},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),k(e),l}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;k(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,e){return this.delegate={iterator:S(t),resultName:r,nextLoc:e},"next"===this.method&&(this.arg=void 0),l}},t}function v(t,r,e,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void e(t)}c.done?r(u):Promise.resolve(u).then(n,o)}function y(t){return function(){var r=this,e=arguments;return new Promise((function(n,o){var i=t.apply(r,e);function a(t){v(i,n,o,a,c,"next",t)}function c(t){v(i,n,o,a,c,"throw",t)}a(void 0)}))}}function m(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){var e=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null==e)return;var n,o,i=[],a=!0,c=!1;try{for(e=e.call(t);!(a=(n=e.next()).done)&&(i.push(n.value),!r||i.length!==r);a=!0);}catch(t){c=!0,o=t}finally{try{a||null==e.return||e.return()}finally{if(c)throw o}}return i}(t,r)||function(t,r){if(!t)return;if("string"==typeof t)return g(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return g(t,r)}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function g(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}const w=function(){var t=m((0,n.useState)(!1),2),r=t[0],e=t[1],o=(0,u.s0)();(0,n.useEffect)((function(){var t=JSON.parse(localStorage.getItem("trTk"));if(t){var r=function(){var r=y(p().mark((function r(){var n;return p().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,f().get("".concat("http://127.0.0.1:8000","/api/traders/trader"),{headers:{Authorization:"Bearer ".concat(t)}});case 3:n=r.sent,e(!0),console.log(n),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(0),console.log(r.t0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})));return function(){return r.apply(this,arguments)}}();r()}else o("/traderLogin")}),[]);var i=function(){var t=y(p().mark((function t(){var r;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=JSON.parse(localStorage.getItem("trTk")),f().defaults.withCredentials=!0,t.next=4,f().get("".concat("http://127.0.0.1:8000","/")+"sanctum/csrf-cookie").then(function(){var t=y(p().mark((function t(e){var n;return p().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f().post("${process.env.MIX_APP_URL}/api/logout",{},{headers:{Authorization:"Bearer ".concat(r)}});case 3:n=t.sent,console.log(n),localStorage.removeItem("trTk"),o("/"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(r){return t.apply(this,arguments)}}());case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),a=m((0,n.useState)(""),2),c=a[0],l=a[1];return window.onscroll=function(){""==c&&window.scrollY>40?l("fixed-trader-nav"):window.scrollY<10&&l("")},(0,h.jsx)(h.Fragment,{children:r?(0,h.jsxs)("div",{className:"vendor-page-container p-2",dir:"rtl",children:[(0,h.jsx)("div",{className:"trader-pages-navigate-btns ".concat(c," bg-green-400 flex gap-4 rounded-md"),children:(0,h.jsxs)("div",{className:"mx-3 rounded-md p-2 my-3 flex items-start gap-3 text-white flex-wrap",children:[(0,h.jsx)(s.OL,{className:"rounded-md p-1 border-b-2",to:"/trader/dachboard",style:function(t){return t.isActive?{backgroundColor:"#e0e0e0 "}:void 0},children:"صفحتى الرئيسة"}),(0,h.jsx)(s.OL,{className:"rounded-md p-1 border-b-2",to:"/trader/dachboard/myorders",style:function(t){return t.isActive?{backgroundColor:"white"}:void 0},children:"اوردراتى"}),(0,h.jsx)(s.OL,{className:"rounded-md p-1 border-b-2",to:"/trader/dachboard/traderinfo",style:function(t){return t.isActive?{backgroundColor:"white"}:void 0},children:"معلوماتى"}),(0,h.jsx)("button",{onClick:i,className:"rounded-md p-1 border-b-2",children:"خروج"})]})}),(0,h.jsx)(u.j3,{})]}):(0,h.jsxs)("div",{className:"flex justify-center gap-3",children:[(0,h.jsx)(s.rU,{className:"shadow-md p-2 rounded-md",to:"/traderLogin",children:"الدخول كتاجر"}),(0,h.jsx)("span",{children:"هل أنت تاجر؟"})]})})}},59354:(t,r,e)=>{e.d(r,{Z:()=>i});var n=e(1519),o=e.n(n)()((function(t){return t[1]}));o.push([t.id,".color-select-div .product-color-btn{background-color:#707070;border-bottom:1px solid #fff;color:#f0f8ff}.color-select-div .product-color-btn:hover{background-color:#a9a9a9}.fixed-trader-nav{left:1px;position:fixed;top:1px;width:100%;z-index:100}",""]);const i=o}}]);