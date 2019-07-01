// ==UserScript==
// @name Alternate UI loader
// @namespace Violentmonkey Scripts
// @match https://tacticalfootball.com/*
// @grant none
// ==/UserScript==

let _timers = [];
window.setIntervalBase = window.setInterval;
window.setInterval = function(callback, interval) {
  const timerID = window.setIntervalBase(callback, interval);
  _timers.push({timerID, callback, interval});
  return timerID;
};
window.setTimeoutBase = window.setTimeout;
window.setTimeout = function(callback, interval) {
  const timerID = window.setTimeoutBase(callback, interval);
  _timers.push({timerID, callback, interval});
  return timerID;
};
const removeAllTimers = () => {
  _timers.forEach(({timerID}) => clearInterval(timerID));
};
let _listeners = [];
window.addEventListenerBase = window.addEventListener;
document.addEventListenerBase = document.addEventListener;
const addEventListener = function(type, listener) {
  _listeners.push({target: this, type: type, listener: listener});
  this.addEventListenerBase(type, listener);
};
window.addEventListener = addEventListener;
document.addEventListener = addEventListener;
const removeAllEventListeners = function() {
  _listeners.forEach(({target, type, listener}) => target.removeEventListener(type, listener));
};
let _console = [];
window._console = _console;
window.console.logBase = window.console.log;
window.console.log = function() {
  _console.push(arguments);
  window.console.logBase.apply(window.console, arguments);
};
const getSubmenu = () => {
  document.querySelector('.rb-nav_arrow').parentNode.click();
  navbarMenu = _console.find(item => item[0].sub_menu && item[0].sub_menu.find(item => item.sub_menu && item.sub_menu[0].text==='Current'))[0].sub_menu;
  window._competitionsMenu = navbarMenu[5].sub_menu;
  window._forumsMenu = navbarMenu[6].sub_menu;
};

window.onload = () => {
  const menuItem = document.createElement('li');
  menuItem.className = 'ng-scope';
  menuItem.innerHTML = `
    <div class="any ng-scope">
      <div class="rb-nav-menu-item ng-scope" >
        <span class="ng-scope ng-binding menuSectionHdr">
          Alternate UI
        </span>
      </div>
    </div>
    <div class="rb-nav_sub-menu ng-scope dropdown-animate-left" >
      <ul class="ng-scope">
       <li class="ng-scope">
        <div class="any ng-scope">
          <a class="rb-nav-menu-item ng-scope load-alt-ui" href="#" >
            <span class="ng-scope ng-binding">
              Load
            </span>
          </a>
        </div>
       </li>
      </ul>
    </div>`;
  const loadAnchor = menuItem.querySelector('.load-alt-ui');
  loadAnchor.addEventListener('click', loadAltUI);
  const menu = document.querySelector(`.rb-nav_menu ul[ng-include="'rbMenu/rbMenuLine.html'"]`);
  menu.appendChild(menuItem);
  
  function loadAltUI() {
    removeAllEventListeners();
    removeAllTimers();
    getSubmenu();
    const html = document.querySelector('html');
    const {head, body} = document;
    html.removeAttribute('ng-app');
    html.removeAttribute('class');
    body.removeAttribute('ng-controller');
    body.removeAttribute('class');
    const parser = new DOMParser();
    // index.html
    const indexHTML = '<!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="shortcut icon" href="/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="/manifest.json"/><title>React App</title><link href="/static/css/2.f5d5d3a0.chunk.css" rel="stylesheet"><link href="/static/css/main.63f034f0.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script><script src="/static/js/2.d99691d1.chunk.js"></script><script src="/static/js/main.4acbb867.chunk.js"></script></body></html>'
    const altDocument = parser.parseFromString(indexHTML, "text/html");
    window.altDocument = altDocument;
    history.pushState({}, "TF Alt UI", "/");
    // CSS
    const linkElements = [...altDocument.head.getElementsByTagName('link')];
    linkElements.forEach(link => altDocument.head.removeChild(link));
    head.innerHTML = altDocument.head.innerHTML;
    const css1 = document.createElement('link');
    css1.rel = 'stylesheet';
    css1.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui@gh-pages/static/css/2.f5d5d3a0.chunk.css';
    head.appendChild(css1);
    const css2 = document.createElement('link');
    css2.rel = 'stylesheet';
    css2.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui@gh-pages/static/css/main.63f034f0.chunk.css';
    head.appendChild(css2);
    // JS
    const scriptElements = [...altDocument.body.getElementsByTagName('script')];
    scriptElements.forEach((script, index) => altDocument.body.removeChild(script));
    body.innerHTML = altDocument.body.innerHTML;
    const js1 = document.createElement('script');
    js1.src = 'http://localhost:5000/static/js/_1.js';
    body.appendChild(js1);
    const js2 = document.createElement('script');
    js2.src = 'http://localhost:5000/static/js/2.js';
    body.appendChild(js2);
    const js3 = document.createElement('script');
    js3.src = 'http://localhost:5000/static/js/3.js';
    body.appendChild(js3);
  }
};
