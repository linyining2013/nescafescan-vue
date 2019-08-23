/**
 * Promise polyfill
 */
require('es6-promise').polyfill();

/**
 * vw\vh polyfill
 */

// function browserSupportsUnitsNatively() {
//     let body, head, style_block, test_element, test_results;
//     test_element = document.createElement('div');
//     test_element.id = 'vminpolyTests';
//     body = document.getElementsByTagName('body')[0];
//     body.appendChild(test_element);
//     style_block = document.createElement('style');
//     head = document.getElementsByTagName('head')[0];
//     head.appendChild(style_block);
//     test_results = testVWSupport(test_element, style_block);
//     body.removeChild(test_element);
//     head.removeChild(style_block);
//     return test_results;
// }
// let applyStyleTest = function(style_block, style) {
//     let new_style, test_style;
//     new_style = '#vminpolyTests { ' + style + '; }';
//     if (style_block.styleSheet) {
//         return style_block.styleSheet.cssText = new_style;
//     } else {
//         test_style = document.createTextNode(new_style);
//         return style_block.appendChild(test_style);
//     }
// };
// let clearStyleTests = function(style_block) {
//     if (style_block.styleSheet) {
//         return style_block.styleSheet.cssText = '';
//     } else {
//         return style_block.innerHTML = '';
//     }
// };
// let testVWSupport = function(element, style_block) {
//     let comp_style, width;
//     applyStyleTest(style_block, 'width: 50vw');
//     width = window.innerWidth / 2;
//     comp_style = parseInt(testElementStyle(element).width, 10);
//     clearStyleTests(style_block);
//     return comp_style === width;
// };

// let testElementStyle = function(element) {
//     if (window.getComputedStyle) {
//         return getComputedStyle(element);
//     } else {
//         return element.currentStyle;
//     }
// };
// let hacks = require('../node_modules/viewport-units-buggyfill/viewport-units-buggyfill.hacks.js');
// let viewportUnitsBuggyfill = require('viewport-units-buggyfill');
// if (!browserSupportsUnitsNatively()) {
//     viewportUnitsBuggyfill.init({
//         hacks: hacks
//     });
// }