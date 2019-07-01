// ==UserScript==
// @name Alternate UI loader
// @namespace Violentmonkey Scripts
// @match https://tacticalfootball.com/*
// @grant none
// ==/UserScript==

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
    const parser = new DOMParser();
    // index.html
    const indexHTML = '<!doctype html><html lang="en"><head><meta charset="utf-8"/><link rel="shortcut icon" href="/favicon.ico"/><meta name="viewport" content="width=device-width,initial-scale=1"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="/manifest.json"/><title>React App</title><link href="/static/css/2.f5d5d3a0.chunk.css" rel="stylesheet"><link href="/static/css/main.63f034f0.chunk.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div><script>!function(l){function e(e){for(var r,t,n=e[0],o=e[1],u=e[2],f=0,i=[];f<n.length;f++)t=n[f],p[t]&&i.push(p[t][0]),p[t]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(l[r]=o[r]);for(s&&s(e);i.length;)i.shift()();return c.push.apply(c,u||[]),a()}function a(){for(var e,r=0;r<c.length;r++){for(var t=c[r],n=!0,o=1;o<t.length;o++){var u=t[o];0!==p[u]&&(n=!1)}n&&(c.splice(r--,1),e=f(f.s=t[0]))}return e}var t={},p={1:0},c=[];function f(e){if(t[e])return t[e].exports;var r=t[e]={i:e,l:!1,exports:{}};return l[e].call(r.exports,r,r.exports,f),r.l=!0,r.exports}f.m=l,f.c=t,f.d=function(e,r,t){f.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},f.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.t=function(r,e){if(1&e&&(r=f(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var t=Object.create(null);if(f.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var n in r)f.d(t,n,function(e){return r[e]}.bind(null,n));return t},f.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return f.d(r,"a",r),r},f.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},f.p="/";var r=window.webpackJsonp=window.webpackJsonp||[],n=r.push.bind(r);r.push=e,r=r.slice();for(var o=0;o<r.length;o++)e(r[o]);var s=n;a()}([])</script><script src="/static/js/2.d99691d1.chunk.js"></script><script src="/static/js/main.4acbb867.chunk.js"></script></body></html>'
    const altDocument = parser.parseFromString(indexHTML, "text/html");
    window.altDocument = altDocument;
    debugger;
    history.pushState({}, "TF Alt UI", "/");
    // CSS
    const linkElements = [...altDocument.head.getElementsByTagName('link')];
    linkElements.forEach(link => altDocument.head.removeChild(link));
    document.head.innerHTML = altDocument.head.innerHTML;
    const cssCDN = document.createElement('link');
    cssCDN.rel = 'stylesheet';
    cssCDN.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui@gh-pages/static/css/2.f5d5d3a0.chunk.css';
    document.head.appendChild(cssCDN);
    const cssMainCDN = document.createElement('link');
    cssMainCDN.rel = 'stylesheet';
    cssMainCDN.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui@gh-pages/static/css/main.63f034f0.chunk.css';
    document.head.appendChild(cssMainCDN);
    // JS
    const scriptElements = [...altDocument.body.getElementsByTagName('script')];
    scriptElements.forEach((script, index) => altDocument.body.removeChild(script));
    document.body.innerHTML = altDocument.body.innerHTML;
    const jsCDN = document.createElement('script');
    jsCDN.src = 'https://raw.githubusercontent.com/AlexandrChebotar/tacticalfootball-alt-ui/gh-pages/static/js/2.d99691d1.chunk.js';
    document.body.appendChild(jsCDN);
    const jsMainCDN = document.createElement('script');
    jsMainCDN.src = 'https://raw.githubusercontent.com/AlexandrChebotar/tacticalfootball-alt-ui/gh-pages/static/js/main.4acbb867.chunk.js';
    document.body.appendChild(jsMainCDN);
  }
};
