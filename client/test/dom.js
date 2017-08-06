const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = width || global.window.innerHeight;
  var evt = global.window.document.createEvent('UIEvents'); 
  evt.initUIEvent('resize', true, false, global.window, 0); 
  global.window.dispatchEvent(evt);
};
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);