/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/UI.js":
/*!************************!*\
  !*** ./frontend/UI.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_BookService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/BookService */ "./frontend/services/BookService.js");
/* harmony import */ var timeago_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! timeago.js */ "./node_modules/timeago.js/esm/index.js");

const bookService = new _services_BookService__WEBPACK_IMPORTED_MODULE_0__["default"]();

class UI{

    async renderBooks(){
        const books = await bookService.getBooks();
        console.log(books);
        const booksCardContainer = document.getElementById('books-cards');
        booksCardContainer.innerHTML = ''; //para asegurarnos que el contenedor esté vacío
        books.forEach(book => {
          const div = document.createElement('div');
          div.className = '';
          div.innerHTML = `
          <div class="card m-2">
            <div class="row">
                <div class="col-md-4">
                    <img src="http://localhost:3000${book.imagePath}" class="img-fluid" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-block px-2">
                        <h4 class="card-title">${book.title}</h4>
                        <p class="card-text">${book.author}</p>
                        <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                    </div>
                </div>
            </div>
            <div class="card-footer">
              ${Object(timeago_js__WEBPACK_IMPORTED_MODULE_1__["format"])(book.created_at)}
            </div>
          </div>
          `;
          booksCardContainer.appendChild(div);
        });
      }
	async addANewBook(book){
        await bookService.postBook(book);
        this.clearBookFrom();
        this.renderBooks();
    }
	clearBookFrom(){
        document.getElementById('book-form').reset();
    }
    renderMessage(message, colorMessage, secondsToRemove) {
        // Creating a div
        const div = document.createElement('div');
        // Styling the div
        div.className = `alert alert-${colorMessage} message`;
        // Adding Text to the div
        div.appendChild(document.createTextNode(message));
        // Puting in the documnet
        const container = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');
        container.insertBefore(div, bookForm);
        // Removing the div after some secconds
        setTimeout(() => {
          document.querySelector('.message').remove();
        }, secondsToRemove);
      }
	async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }
       
}
/* harmony default export */ __webpack_exports__["default"] = (UI);

/***/ }),

/***/ "./frontend/app.js":
/*!*************************!*\
  !*** ./frontend/app.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.css */ "./frontend/styles/app.css");
/* harmony import */ var _styles_app_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_app_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ "./frontend/UI.js");



document.addEventListener('DOMContentLoaded', () => {
	const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
	ui.renderBooks();
});

document.getElementById('book-form')
	.addEventListener('submit', e => {
	const title = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const isbn = document.getElementById('isbn').value;
	const image = document.getElementById('image').files;
	
    const formData = new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
	formData.append('isbn', isbn);
	
	const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"];
	ui.addANewBook(formData);
	ui.renderMessage('New Book Added', 'success', 3000);

	e.preventDefault();
	});

	document.getElementById('books-cards')
	.addEventListener('click', e => {
	  const ui = new _UI__WEBPACK_IMPORTED_MODULE_1__["default"]();
	  if (e.target.classList.contains('delete')) {
		ui.deleteBook(e.target.getAttribute('_id'));
	  ui.renderMessage('BookDeleted', 'danger', 2000);
	  }
	  e.preventDefault();
	});
	
	

/***/ }),

/***/ "./frontend/services/BookService.js":
/*!******************************************!*\
  !*** ./frontend/services/BookService.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class BookService {

    constructor() {
        this.URI = `http://localhost:3000/api/books`;
    }

    async getBooks() {
        const response = await fetch(this.URI);    
        const books = await response.json();
        return books;
    }

    async postBook(book) {
        const res = await fetch(this.URI, {
            method: 'POST',
            body: book
        });
        const data = await res.json();
        console.log(data)
    }

    async deleteBook(bookId) {
        const res = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'Delete'
        });
        const data = await res.json();
        console.log(data);
    }

}

/* harmony default export */ __webpack_exports__["default"] = (BookService);

/***/ }),

/***/ "./frontend/styles/app.css":
/*!*********************************!*\
  !*** ./frontend/styles/app.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./app.css */ "./node_modules/css-loader/dist/cjs.js!./frontend/styles/app.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var id = "!!../../node_modules/css-loader/dist/cjs.js!./app.css";
var update = api(id, content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./frontend/styles/app.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./frontend/styles/app.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body{background:#f5f6fa;}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    for (var i = 0; i < modules.length; i++) {
      var item = [].concat(modules[i]);

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stylesInDom = {};

var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

function addModulesToDom(id, list, options) {
  id = options.base ? id + options.base : id;

  if (!stylesInDom[id]) {
    stylesInDom[id] = [];
  }

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var part = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };
    var styleInDomById = stylesInDom[id];

    if (styleInDomById[i]) {
      styleInDomById[i].updater(part);
    } else {
      styleInDomById.push({
        updater: addStyle(part, options)
      });
    }
  }

  for (var j = list.length; j < stylesInDom[id].length; j++) {
    stylesInDom[id][j].updater();
  }

  stylesInDom[id].length = list.length;

  if (stylesInDom[id].length === 0) {
    delete stylesInDom[id];
  }
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (id, list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  addModulesToDom(id, list, options);
  return function update(newList) {
    addModulesToDom(id, newList || [], options);
  };
};

/***/ }),

/***/ "./node_modules/timeago.js/esm/format.js":
/*!***********************************************!*\
  !*** ./node_modules/timeago.js/esm/format.js ***!
  \***********************************************/
/*! exports provided: format */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/date */ "./node_modules/timeago.js/esm/utils/date.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register */ "./node_modules/timeago.js/esm/register.js");


/**
 * format a TDate into string
 * @param date
 * @param locale
 * @param opts
 */
var format = function (date, locale, opts) {
    // diff seconds
    var sec = Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["diffSec"])(date, opts && opts.relativeDate);
    // format it with locale
    return Object(_utils_date__WEBPACK_IMPORTED_MODULE_0__["formatDiff"])(sec, Object(_register__WEBPACK_IMPORTED_MODULE_1__["getLocale"])(locale));
};
//# sourceMappingURL=format.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/index.js":
/*!**********************************************!*\
  !*** ./node_modules/timeago.js/esm/index.js ***!
  \**********************************************/
/*! exports provided: format, render, cancel, register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lang_en_US__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lang/en_US */ "./node_modules/timeago.js/esm/lang/en_US.js");
/* harmony import */ var _lang_zh_CN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lang/zh_CN */ "./node_modules/timeago.js/esm/lang/zh_CN.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register */ "./node_modules/timeago.js/esm/register.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _register__WEBPACK_IMPORTED_MODULE_2__["register"]; });

/* harmony import */ var _format__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./format */ "./node_modules/timeago.js/esm/format.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "format", function() { return _format__WEBPACK_IMPORTED_MODULE_3__["format"]; });

/* harmony import */ var _realtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./realtime */ "./node_modules/timeago.js/esm/realtime.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _realtime__WEBPACK_IMPORTED_MODULE_4__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return _realtime__WEBPACK_IMPORTED_MODULE_4__["cancel"]; });

/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */



Object(_register__WEBPACK_IMPORTED_MODULE_2__["register"])('en_US', _lang_en_US__WEBPACK_IMPORTED_MODULE_0__["default"]);
Object(_register__WEBPACK_IMPORTED_MODULE_2__["register"])('zh_CN', _lang_zh_CN__WEBPACK_IMPORTED_MODULE_1__["default"]);



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/lang/en_US.js":
/*!***************************************************!*\
  !*** ./node_modules/timeago.js/esm/lang/en_US.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var EN_US = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];
/* harmony default export */ __webpack_exports__["default"] = (function (diff, idx) {
    if (idx === 0)
        return ['just now', 'right now'];
    var unit = EN_US[~~(idx / 2)];
    if (diff > 1)
        unit += 's';
    return [diff + " " + unit + " ago", "in " + diff + " " + unit];
});
//# sourceMappingURL=en_US.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/lang/zh_CN.js":
/*!***************************************************!*\
  !*** ./node_modules/timeago.js/esm/lang/zh_CN.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ZH_CN = ['秒', '分钟', '小时', '天', '周', '个月', '年'];
/* harmony default export */ __webpack_exports__["default"] = (function (diff, idx) {
    if (idx === 0)
        return ['刚刚', '片刻后'];
    var unit = ZH_CN[~~(idx / 2)];
    return [diff + " " + unit + "\u524D", diff + " " + unit + "\u540E"];
});
//# sourceMappingURL=zh_CN.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/realtime.js":
/*!*************************************************!*\
  !*** ./node_modules/timeago.js/esm/realtime.js ***!
  \*************************************************/
/*! exports provided: cancel, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancel", function() { return cancel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/dom */ "./node_modules/timeago.js/esm/utils/dom.js");
/* harmony import */ var _utils_date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/date */ "./node_modules/timeago.js/esm/utils/date.js");
/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./register */ "./node_modules/timeago.js/esm/register.js");



// all realtime timer
var TIMER_POOL = {};
/**
 * clear a timer from pool
 * @param tid
 */
var clear = function (tid) {
    clearTimeout(tid);
    delete TIMER_POOL[tid];
};
// run with timer(setTimeout)
function run(node, date, localeFunc, opts) {
    // clear the node's exist timer
    clear(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["getTimerId"])(node));
    var relativeDate = opts.relativeDate, minInterval = opts.minInterval;
    // get diff seconds
    var diff = Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["diffSec"])(date, relativeDate);
    // render
    node.innerText = Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["formatDiff"])(diff, localeFunc);
    var tid = setTimeout(function () {
        run(node, date, localeFunc, opts);
    }, Math.min(Math.max(Object(_utils_date__WEBPACK_IMPORTED_MODULE_1__["nextInterval"])(diff), minInterval || 1) * 1000, 0x7fffffff));
    // there is no need to save node in object. Just save the key
    TIMER_POOL[tid] = 0;
    Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["setTimerId"])(node, tid);
}
// 取消一个 node 的实时渲染
function cancel(node) {
    // cancel one
    if (node)
        clear(Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["getTimerId"])(node));
    // cancel all
    // @ts-ignore
    else
        Object.keys(TIMER_POOL).forEach(clear);
}
/**
 * render a dom realtime
 * @param nodes
 * @param locale
 * @param opts
 */
function render(nodes, locale, opts) {
    // by .length
    // @ts-ignore
    var nodeList = nodes.length ? nodes : [nodes];
    nodeList.forEach(function (node) {
        run(node, Object(_utils_dom__WEBPACK_IMPORTED_MODULE_0__["getDateAttribute"])(node), Object(_register__WEBPACK_IMPORTED_MODULE_2__["getLocale"])(locale), opts || {});
    });
    return nodeList;
}
//# sourceMappingURL=realtime.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/register.js":
/*!*************************************************!*\
  !*** ./node_modules/timeago.js/esm/register.js ***!
  \*************************************************/
/*! exports provided: register, getLocale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLocale", function() { return getLocale; });
/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
/**
 * All supported locales
 */
var Locales = {};
/**
 * register a locale
 * @param locale
 * @param func
 */
var register = function (locale, func) {
    Locales[locale] = func;
};
/**
 * get a locale, default is en_US
 * @param locale
 * @returns {*}
 */
var getLocale = function (locale) {
    return Locales[locale] || Locales['en_US'];
};
//# sourceMappingURL=register.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/utils/date.js":
/*!***************************************************!*\
  !*** ./node_modules/timeago.js/esm/utils/date.js ***!
  \***************************************************/
/*! exports provided: toDate, formatDiff, diffSec, nextInterval */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDiff", function() { return formatDiff; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "diffSec", function() { return diffSec; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nextInterval", function() { return nextInterval; });
/**
 * Created by hustcc on 18/5/20.
 * Contract: i@hust.cc
 */
var SEC_ARRAY = [60, 60, 24, 7, 365 / 7 / 12, 12];
/**
 * format Date / string / timestamp to timestamp
 * @param input
 * @returns {*}
 */
function toDate(input) {
    if (input instanceof Date)
        return input;
    // @ts-ignore
    if (!isNaN(input) || /^\d+$/.test(input))
        return new Date(parseInt(input));
    input = (input || '')
        // @ts-ignore
        .trim()
        .replace(/\.\d+/, '') // remove milliseconds
        .replace(/-/, '/')
        .replace(/-/, '/')
        .replace(/(\d)T(\d)/, '$1 $2')
        .replace(/Z/, ' UTC') // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
        .replace(/([+-]\d\d):?(\d\d)/, ' $1$2'); // -04:00 -> -0400
    return new Date(input);
}
/**
 * format the diff second to *** time ago, with setting locale
 * @param diff
 * @param localeFunc
 * @returns
 */
function formatDiff(diff, localeFunc) {
    // if locale is not exist, use defaultLocale.
    // if defaultLocale is not exist, use build-in `en`.
    // be sure of no error when locale is not exist.
    var agoIn = diff < 0 ? 1 : 0; // time in or time ago
    diff = Math.abs(diff);
    var totalSec = diff;
    var idx = 0;
    for (; diff >= SEC_ARRAY[idx] && idx < SEC_ARRAY.length; idx++) {
        diff /= SEC_ARRAY[idx];
    }
    // Math.floor
    diff = ~~diff;
    idx *= 2;
    if (diff > (idx === 0 ? 9 : 1))
        idx += 1;
    // @ts-ignore
    return localeFunc(diff, idx, totalSec)[agoIn].replace('%s', diff);
}
/**
 * calculate the diff second between date to be formatted an now date.
 * @param date
 * @param relativeDate
 * @returns
 */
function diffSec(date, relativeDate) {
    relativeDate = relativeDate ? toDate(relativeDate) : new Date();
    return (+relativeDate - +toDate(date)) / 1000;
}
/**
 * nextInterval: calculate the next interval time.
 * - diff: the diff sec between now and date to be formatted.
 *
 * What's the meaning?
 * diff = 61 then return 59
 * diff = 3601 (an hour + 1 second), then return 3599
 * make the interval with high performance.
 **/
function nextInterval(diff) {
    var rst = 1, i = 0, d = Math.abs(diff);
    for (; diff >= SEC_ARRAY[i] && i < SEC_ARRAY.length; i++) {
        diff /= SEC_ARRAY[i];
        rst *= SEC_ARRAY[i];
    }
    d = d % rst;
    d = d ? rst - d : rst;
    return Math.ceil(d);
}
//# sourceMappingURL=date.js.map

/***/ }),

/***/ "./node_modules/timeago.js/esm/utils/dom.js":
/*!**************************************************!*\
  !*** ./node_modules/timeago.js/esm/utils/dom.js ***!
  \**************************************************/
/*! exports provided: getDateAttribute, setTimerId, getTimerId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDateAttribute", function() { return getDateAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTimerId", function() { return setTimerId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimerId", function() { return getTimerId; });
var ATTR_TIMEAGO_TID = 'timeago-id';
/**
 * get the datetime attribute, `datetime` are supported.
 * @param node
 * @returns {*}
 */
function getDateAttribute(node) {
    return node.getAttribute('datetime');
}
/**
 * set the node attribute, native DOM
 * @param node
 * @param timerId
 * @returns {*}
 */
function setTimerId(node, timerId) {
    // @ts-ignore
    node.setAttribute(ATTR_TIMEAGO_TID, timerId);
}
/**
 * get the timer id
 * @param node
 */
function getTimerId(node) {
    return parseInt(node.getAttribute(ATTR_TIMEAGO_TID));
}
//# sourceMappingURL=dom.js.map

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map