/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./src/functions/functions.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "add": function() { return /* binding */ add; },
/* harmony export */   "clock": function() { return /* binding */ clock; },
/* harmony export */   "currentTime": function() { return /* binding */ currentTime; },
/* harmony export */   "increment": function() { return /* binding */ increment; },
/* harmony export */   "logMessage": function() { return /* binding */ logMessage; },
/* harmony export */   "unpivot": function() { return /* binding */ unpivot; }
/* harmony export */ });
/**
 * Adds two numbers.
 * @customfunction
 * @param first First number
 * @param second Second number
 * @returns The sum of the two numbers.
 */
/* global clearInterval, console, setInterval */
function add(first, second) {
  return first + second;
}

/**
 * Displays the current time once a second.
 * @customfunction
 * @param invocation Custom function handler
 */
function clock(invocation) {
  var timer = setInterval(function () {
    var time = currentTime();
    invocation.setResult(time);
  }, 1000);
  invocation.onCanceled = function () {
    clearInterval(timer);
  };
}

/**
 * Returns the current time.
 * @returns String with the current time formatted for the current locale.
 */
function currentTime() {
  return new Date().toLocaleTimeString();
}

/**
 * Increments a value once a second.
 * @customfunction
 * @param incrementBy Amount to increment
 * @param invocation Custom function handler
 */
function increment(incrementBy, invocation) {
  var result = 0;
  var timer = setInterval(function () {
    result += incrementBy;
    invocation.setResult(result);
  }, 1000);
  invocation.onCanceled = function () {
    clearInterval(timer);
  };
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
function logMessage(message) {
  console.log(message);
  return message;
}

/**
 * Unpivots a range of cells.
 * @customfunction UNPIVOT
 * @param headers The range of cells that represent your headers.
 * @param rows The range of cells that represent your row headers.
 * @param values The range of cells that represent your range of values.
 * @returns  The normalized range of cells.
 */
function unpivot(headers, rows, values) {
  var unpivot_data = [];
  for (var row = 1; row <= rows.length; row++) {
    for (var header; header <= headers.length; header++) {
      unpivot_data.push([rows[row], headers[header], values[row][header]]);
    }
  }
  return unpivot_data;
}
CustomFunctions.associate("ADD", add);
CustomFunctions.associate("CLOCK", clock);
CustomFunctions.associate("INCREMENT", increment);
CustomFunctions.associate("LOG", logMessage);
CustomFunctions.associate("UNPIVOT", unpivot);
 void function register() { /* react-hot-loader/webpack */ var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined; if (!reactHotLoader) { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : exports; /* eslint-enable camelcase, no-undef */ if (!webpackExports) { return; } if (typeof webpackExports === 'function') { reactHotLoader.register(webpackExports, 'module.exports', "/Users/eswar/Desktop/eth-boston/Yeager/YeagerAddIn/src/functions/functions.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } reactHotLoader.register(namedExport, key, "/Users/eswar/Desktop/eth-boston/Yeager/YeagerAddIn/src/functions/functions.js"); } }(); 
/******/ })()
;
//# sourceMappingURL=functions.js.map