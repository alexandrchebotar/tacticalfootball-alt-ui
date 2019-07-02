// ==UserScript==
// @name Alternate UI loader
// @namespace Violentmonkey Scripts
// @match https://tacticalfootball.com/*
// @grant none
// ==/UserScript==

// redefining setInterval & setTimeout
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
// redefining addEventListener
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
// redefining console
let _console = [];
window._console = _console;
window.console.logBase = window.console.log;
window.console.log = function() {
  _console.push(arguments);
  window.console.logBase.apply(window.console, arguments);
};
const getMenus = () => {
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
    // get competitions and forums menus
    getMenus();
    // remove old data
    removeAllEventListeners();
    removeAllTimers();
    const html = document.querySelector('html');
    const {head, body} = document;
    html.removeAttribute('ng-app');
    html.removeAttribute('class');
    body.removeAttribute('ng-controller');
    body.removeAttribute('class');
    // build new DOM structure
    const headContent = `
      <meta charset="utf-8"/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <meta name="theme-color" content="#000000"/>
      <link rel="manifest" href="/manifest.json"/>
      <title>TF Alt UI</title>`;
    head.innerHTML = headContent;
    const bodyContent = '<div id="root"></div>';
    body.innerHTML = bodyContent;
    history.pushState(null, "TF Alt UI", "/");
    // load CSS
    const css1 = document.createElement('link');
    css1.rel = 'stylesheet';
    css1.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui/static/css/1.css';
    head.appendChild(css1);
    const css2 = document.createElement('link');
    css2.rel = 'stylesheet';
    css2.href = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui/static/css/2.css';
    head.appendChild(css2);
    // load JS
    const js1 = document.createElement('script');
    js1.src = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui/static/js/1.js';
    body.appendChild(js1);
    const js2 = document.createElement('script');
    js2.src = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui/static/js/2.js';
    body.appendChild(js2);
    const js3 = document.createElement('script');
    js3.src = 'https://cdn.jsdelivr.net/gh/AlexandrChebotar/tacticalfootball-alt-ui/static/js/3.js';
    body.appendChild(js3);
  }
};
