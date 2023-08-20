// Copyright (c) 2023 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-property@esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-only-accessor@esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-define-nonenumerable-read-write-accessor@esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-has-own-property@esm/index.mjs";import{isPrimitive as n}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-number@esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-plain-object@esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-uint32array@esm/index.mjs";import{isPrimitive as p}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-boolean@esm/index.mjs";import d from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-assert-is-nan@esm/index.mjs";import m from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-function@esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-constant-function@esm/index.mjs";import l from"https://cdn.jsdelivr.net/gh/stdlib-js/utils-noop@v0.0.14-esm/index.mjs";import{factory as h}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-chisquare@esm/index.mjs";import{factory as j}from"https://cdn.jsdelivr.net/gh/stdlib-js/random-base-improved-ziggurat@esm/index.mjs";import c from"https://cdn.jsdelivr.net/gh/stdlib-js/blas-base-gcopy@v0.0.8-esm/index.mjs";import g from"https://cdn.jsdelivr.net/gh/stdlib-js/array-uint32@esm/index.mjs";import f from"https://cdn.jsdelivr.net/gh/stdlib-js/object-assign@esm/index.mjs";import u from"https://cdn.jsdelivr.net/gh/stdlib-js/array-to-json@esm/index.mjs";import y from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.0.2-esm/index.mjs";import b from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-sqrt@esm/index.mjs";function v(){var v,w,x,E,N,T,L,J;if(L=!0,0===arguments.length)x=j(N={copy:!1});else if(1===arguments.length)if(i(arguments[0])){if(r(N=arguments[0],"copy")&&!p(N.copy))throw new TypeError(y("0p72o,GE","copy",N.copy));if(r(N,"prng")){if(!m(N.prng))throw new TypeError(y("0p76u,JI","prng",N.prng));x=j({prng:N.prng})}else{if(r(N,"state")&&!o(N.state))throw new TypeError(y("0p76z,JJ","state",N.state));!1===(N=f({},N)).copy?L=!1:N.state&&(N.state=c(N.state.length,N.state,1,new g(N.state.length),1)),N.copy=!1,x=j(N)}}else{if(!n(J=arguments[0]))throw new TypeError(y("0p77a,NV",J));x=j(N={copy:!1})}else{if(!n(J=arguments[0]))throw new TypeError(y("0p771,NQ",J));if(!i(N=arguments[1]))throw new TypeError(y("0p72V,FD",N));if(r(N,"copy")&&!p(N.copy))throw new TypeError(y("0p72o,GE","copy",N.copy));if(r(N,"prng")){if(!m(N.prng))throw new TypeError(y("0p76u,JI","prng",N.prng));x=j({prng:N.prng})}else{if(r(N,"state")&&!o(N.state))throw new TypeError(y("0p76z,JJ","state",N.state));!1===(N=f({},N)).copy?L=!1:N.state&&(N.state=c(N.state.length,N.state,1,new g(N.state.length),1)),N.copy=!1,x=j(N)}}return N&&N.prng?v=void 0===J?h({prng:N.prng}):h(J,{prng:N.prng}):(N.state?w=N.state:(w=x.state,x.state=w),v=void 0===J?h({state:w,copy:!1}):h(J,{state:w,copy:!1})),T=void 0===J?O:M,E=x.PRNG,t(T,"NAME","t"),N&&N.prng?(t(T,"seed",null),t(T,"seedLength",null),s(T,"state",a(null),l),t(T,"stateLength",null),t(T,"byteLength",null),t(T,"toJSON",a(null))):(e(T,"seed",G),e(T,"seedLength",P),s(T,"state",q,A),e(T,"stateLength",z),e(T,"byteLength",R),t(T,"toJSON",I)),t(T,"PRNG",E),T;function G(){return E.seed}function P(){return E.seedLength}function z(){return E.stateLength}function R(){return E.byteLength}function q(){return E.state}function A(t){if(!o(t))throw new TypeError(y("0p770,NW",t));L&&(t=c(t.length,t,1,new g(t.length),1)),E.state=t}function I(){var t={type:"PRNG"};return t.name=T.NAME,t.state=u(E.state),t.params=void 0===J?[]:[J],t}function M(){return x()/b(v()/J)}function O(t){return d(t)||t<=0?NaN:x()/b(v(t)/t)}}var w=v();t(w,"factory",v);export{w as default,v as factory};
//# sourceMappingURL=index.mjs.map
