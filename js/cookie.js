(self["webpackChunk"] = self["webpackChunk"] || []).push([["cookie"],{

/***/ "./assets/js/cookie_consent.js":
/*!*************************************!*\
  !*** ./assets/js/cookie_consent.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(/*! core-js/modules/es.array.index-of.js */ "./node_modules/core-js/modules/es.array.index-of.js");
__webpack_require__(/*! core-js/modules/es.date.to-string.js */ "./node_modules/core-js/modules/es.date.to-string.js");
__webpack_require__(/*! core-js/modules/web.timers.js */ "./node_modules/core-js/modules/web.timers.js");
document.addEventListener("DOMContentLoaded", function () {
  // Fonctions de base pour gérer les cookies
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Afficher la bannière si le consentement n'a pas été donné
  if (!getCookie("cookie_consent_shown")) {
    setTimeout(function () {
      document.getElementById("cookie-consent-popup").style.transform = "translateY(0)";
      document.getElementById("cookie-consent-popup").style.opacity = "1";
    }, 800);
  }

  // Gérer le clic sur "Tout accepter"
  document.getElementById("accept-all-cookies").addEventListener("click", function () {
    setCookie("cookie_consent_shown", "true", 365);
    setCookie("cookie_essential", "true", 365);
    setCookie("cookie_functional", "true", 365);
    setCookie("cookie_analytics", "true", 365);
    setCookie("cookie_marketing", "true", 365);
    document.getElementById("cookie-consent-popup").style.transform = "translateY(100%)";
    document.getElementById("cookie-consent-popup").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("cookie-consent-popup").style.display = "none";
    }, 500);

    // Recharger la page pour activer les cookies
    setTimeout(function () {
      window.location.reload();
    }, 600);
  });

  // Gérer le clic sur "Personnaliser"
  document.getElementById("customize-cookies").addEventListener("click", function () {
    document.getElementById("cookie-consent-simple").style.display = "none";
    document.getElementById("cookie-consent-detailed").style.display = "block";
  });

  // Gérer le clic sur "Enregistrer mes choix"
  document.getElementById("save-preferences").addEventListener("click", function () {
    setCookie("cookie_consent_shown", "true", 365);
    setCookie("cookie_essential", "true", 365); // Toujours obligatoire
    setCookie("cookie_functional", document.getElementById("functional-checkbox").checked ? "true" : "false", 365);
    setCookie("cookie_analytics", document.getElementById("analytics-checkbox").checked ? "true" : "false", 365);
    setCookie("cookie_marketing", document.getElementById("marketing-checkbox").checked ? "true" : "false", 365);
    document.getElementById("cookie-consent-popup").style.transform = "translateY(100%)";
    document.getElementById("cookie-consent-popup").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("cookie-consent-popup").style.display = "none";
    }, 500);

    // Recharger la page pour appliquer les préférences
    setTimeout(function () {
      window.location.reload();
    }, 600);
  });

  // Ouvrir les paramètres depuis le pied de page
  if (document.getElementById("open-cookie-settings-footer")) {
    document.getElementById("open-cookie-settings-footer").addEventListener("click", function () {
      document.getElementById("cookie-consent-popup").style.display = "block";
      document.getElementById("cookie-consent-simple").style.display = "none";
      document.getElementById("cookie-consent-detailed").style.display = "block";
      setTimeout(function () {
        document.getElementById("cookie-consent-popup").style.transform = "translateY(0)";
        document.getElementById("cookie-consent-popup").style.opacity = "1";
      }, 10);
    });
  }
});

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-is-strict.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-is-strict.js ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this-clause.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this-clause.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ "./node_modules/core-js/internals/schedulers-fix.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/schedulers-fix.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");
var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");
var ENVIRONMENT = __webpack_require__(/*! ../internals/environment */ "./node_modules/core-js/internals/environment.js");
var USER_AGENT = __webpack_require__(/*! ../internals/environment-user-agent */ "./node_modules/core-js/internals/environment-user-agent.js");
var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");
var validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ "./node_modules/core-js/internals/validate-arguments-length.js");

var Function = globalThis.Function;
// dirty IE9- and Bun 0.3.0- checks
var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && (function () {
  var version = globalThis.Bun.version.split('.');
  return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0');
})();

// IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
// https://github.com/oven-sh/bun/issues/1633
module.exports = function (scheduler, hasTimeArg) {
  var firstParamIndex = hasTimeArg ? 2 : 1;
  return WRAP ? function (handler, timeout /* , ...arguments */) {
    var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex;
    var fn = isCallable(handler) ? handler : Function(handler);
    var params = boundArgs ? arraySlice(arguments, firstParamIndex) : [];
    var callback = boundArgs ? function () {
      apply(fn, this, params);
    } : fn;
    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
  } : scheduler;
};


/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/* eslint-disable es/no-array-prototype-indexof -- required for testing */
var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this-clause */ "./node_modules/core-js/internals/function-uncurry-this-clause.js");
var $indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);
var arrayMethodIsStrict = __webpack_require__(/*! ../internals/array-method-is-strict */ "./node_modules/core-js/internals/array-method-is-strict.js");

var nativeIndexOf = uncurryThis([].indexOf);

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
$({ target: 'Array', proto: true, forced: FORCED }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf(this, searchElement, fromIndex) || 0
      : $indexOf(this, searchElement, fromIndex);
  }
});


/***/ }),

/***/ "./node_modules/core-js/modules/es.date.to-string.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.date.to-string.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove from `core-js@4`
var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");
var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js");

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = uncurryThis(DatePrototype[TO_STRING]);
var thisTimeValue = uncurryThis(DatePrototype.getTime);

// `Date.prototype.toString` method
// https://tc39.es/ecma262/#sec-date.prototype.tostring
if (String(new Date(NaN)) !== INVALID_DATE) {
  defineBuiltIn(DatePrototype, TO_STRING, function toString() {
    var value = thisTimeValue(this);
    // eslint-disable-next-line no-self-compare -- NaN check
    return value === value ? nativeDateToString(this) : INVALID_DATE;
  });
}


/***/ }),

/***/ "./node_modules/core-js/modules/web.set-interval.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/web.set-interval.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var schedulersFix = __webpack_require__(/*! ../internals/schedulers-fix */ "./node_modules/core-js/internals/schedulers-fix.js");

var setInterval = schedulersFix(globalThis.setInterval, true);

// Bun / IE9- setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
$({ global: true, bind: true, forced: globalThis.setInterval !== setInterval }, {
  setInterval: setInterval
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.set-timeout.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/web.set-timeout.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");
var globalThis = __webpack_require__(/*! ../internals/global-this */ "./node_modules/core-js/internals/global-this.js");
var schedulersFix = __webpack_require__(/*! ../internals/schedulers-fix */ "./node_modules/core-js/internals/schedulers-fix.js");

var setTimeout = schedulersFix(globalThis.setTimeout, true);

// Bun / IE9- setTimeout additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
$({ global: true, bind: true, forced: globalThis.setTimeout !== setTimeout }, {
  setTimeout: setTimeout
});


/***/ }),

/***/ "./node_modules/core-js/modules/web.timers.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/web.timers.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(/*! ../modules/web.set-interval */ "./node_modules/core-js/modules/web.set-interval.js");
__webpack_require__(/*! ../modules/web.set-timeout */ "./node_modules/core-js/modules/web.set-timeout.js");


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_core-js_internals_array-slice_js-node_modules_core-js_internals_environm-6766de"], () => (__webpack_exec__("./assets/js/cookie_consent.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE4QztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3RCWTtBQUNiO0FBQ0Esa0JBQWtCLG1CQUFPLENBQUMscUdBQW9DO0FBQzlELG9CQUFvQixtQkFBTyxDQUFDLHlGQUE4Qjs7QUFFMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7O0FDbkJhO0FBQ2IsUUFBUSxtQkFBTyxDQUFDLHVFQUFxQjtBQUNyQyxpQkFBaUIsbUJBQU8sQ0FBQyxpRkFBMEI7QUFDbkQsb0JBQW9CLG1CQUFPLENBQUMsdUZBQTZCOztBQUV6RDs7QUFFQTtBQUNBO0FBQ0EsSUFBSSwwRUFBMEU7QUFDOUU7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7QUNYWTtBQUNiLFFBQVEsbUJBQU8sQ0FBQyx1RUFBcUI7QUFDckMsaUJBQWlCLG1CQUFPLENBQUMsaUZBQTBCO0FBQ25ELG9CQUFvQixtQkFBTyxDQUFDLHVGQUE2Qjs7QUFFekQ7O0FBRUE7QUFDQTtBQUNBLElBQUksd0VBQXdFO0FBQzVFO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7O0FDWFk7QUFDYjtBQUNBLG1CQUFPLENBQUMsdUZBQTZCO0FBQ3JDLG1CQUFPLENBQUMscUZBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2Nvb2tpZV9jb25zZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1tZXRob2QtaXMtc3RyaWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMtY2xhdXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zY2hlZHVsZXJzLWZpeC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuZGF0ZS50by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuc2V0LWludGVydmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnNldC10aW1lb3V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnRpbWVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XG4gIC8vIEZvbmN0aW9ucyBkZSBiYXNlIHBvdXIgZ8OpcmVyIGxlcyBjb29raWVzXG4gIGZ1bmN0aW9uIHNldENvb2tpZShuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gXCJcIjtcbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b1VUQ1N0cmluZygpO1xuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyAodmFsdWUgfHwgXCJcIikgKyBleHBpcmVzICsgXCI7IHBhdGg9L1wiO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArIFwiPVwiO1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXTtcbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSBcIiBcIikgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKTtcbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PSAwKSByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIEFmZmljaGVyIGxhIGJhbm5pw6hyZSBzaSBsZSBjb25zZW50ZW1lbnQgbidhIHBhcyDDqXTDqSBkb25uw6lcbiAgaWYgKCFnZXRDb29raWUoXCJjb29raWVfY29uc2VudF9zaG93blwiKSkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb29raWUtY29uc2VudC1wb3B1cFwiKS5zdHlsZS50cmFuc2Zvcm0gPVxuICAgICAgICBcInRyYW5zbGF0ZVkoMClcIjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgIH0sIDgwMCk7XG4gIH1cblxuICAvLyBHw6lyZXIgbGUgY2xpYyBzdXIgXCJUb3V0IGFjY2VwdGVyXCJcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJhY2NlcHQtYWxsLWNvb2tpZXNcIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldENvb2tpZShcImNvb2tpZV9jb25zZW50X3Nob3duXCIsIFwidHJ1ZVwiLCAzNjUpO1xuICAgICAgc2V0Q29va2llKFwiY29va2llX2Vzc2VudGlhbFwiLCBcInRydWVcIiwgMzY1KTtcbiAgICAgIHNldENvb2tpZShcImNvb2tpZV9mdW5jdGlvbmFsXCIsIFwidHJ1ZVwiLCAzNjUpO1xuICAgICAgc2V0Q29va2llKFwiY29va2llX2FuYWx5dGljc1wiLCBcInRydWVcIiwgMzY1KTtcbiAgICAgIHNldENvb2tpZShcImNvb2tpZV9tYXJrZXRpbmdcIiwgXCJ0cnVlXCIsIDM2NSk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgXCJ0cmFuc2xhdGVZKDEwMCUpXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvb2tpZS1jb25zZW50LXBvcHVwXCIpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSwgNTAwKTtcblxuICAgICAgLy8gUmVjaGFyZ2VyIGxhIHBhZ2UgcG91ciBhY3RpdmVyIGxlcyBjb29raWVzXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgfSwgNjAwKTtcbiAgICB9KTtcblxuICAvLyBHw6lyZXIgbGUgY2xpYyBzdXIgXCJQZXJzb25uYWxpc2VyXCJcbiAgZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJjdXN0b21pemUtY29va2llc1wiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb29raWUtY29uc2VudC1zaW1wbGVcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb29raWUtY29uc2VudC1kZXRhaWxlZFwiKS5zdHlsZS5kaXNwbGF5ID1cbiAgICAgICAgXCJibG9ja1wiO1xuICAgIH0pO1xuXG4gIC8vIEfDqXJlciBsZSBjbGljIHN1ciBcIkVucmVnaXN0cmVyIG1lcyBjaG9peFwiXG4gIGRvY3VtZW50XG4gICAgLmdldEVsZW1lbnRCeUlkKFwic2F2ZS1wcmVmZXJlbmNlc1wiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgc2V0Q29va2llKFwiY29va2llX2NvbnNlbnRfc2hvd25cIiwgXCJ0cnVlXCIsIDM2NSk7XG4gICAgICBzZXRDb29raWUoXCJjb29raWVfZXNzZW50aWFsXCIsIFwidHJ1ZVwiLCAzNjUpOyAvLyBUb3Vqb3VycyBvYmxpZ2F0b2lyZVxuICAgICAgc2V0Q29va2llKFxuICAgICAgICBcImNvb2tpZV9mdW5jdGlvbmFsXCIsXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZnVuY3Rpb25hbC1jaGVja2JveFwiKS5jaGVja2VkXG4gICAgICAgICAgPyBcInRydWVcIlxuICAgICAgICAgIDogXCJmYWxzZVwiLFxuICAgICAgICAzNjVcbiAgICAgICk7XG4gICAgICBzZXRDb29raWUoXG4gICAgICAgIFwiY29va2llX2FuYWx5dGljc1wiLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFuYWx5dGljcy1jaGVja2JveFwiKS5jaGVja2VkXG4gICAgICAgICAgPyBcInRydWVcIlxuICAgICAgICAgIDogXCJmYWxzZVwiLFxuICAgICAgICAzNjVcbiAgICAgICk7XG4gICAgICBzZXRDb29raWUoXG4gICAgICAgIFwiY29va2llX21hcmtldGluZ1wiLFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcmtldGluZy1jaGVja2JveFwiKS5jaGVja2VkXG4gICAgICAgICAgPyBcInRydWVcIlxuICAgICAgICAgIDogXCJmYWxzZVwiLFxuICAgICAgICAzNjVcbiAgICAgICk7XG5cbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgXCJ0cmFuc2xhdGVZKDEwMCUpXCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvb2tpZS1jb25zZW50LXBvcHVwXCIpLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgfSwgNTAwKTtcblxuICAgICAgLy8gUmVjaGFyZ2VyIGxhIHBhZ2UgcG91ciBhcHBsaXF1ZXIgbGVzIHByw6lmw6lyZW5jZXNcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICB9LCA2MDApO1xuICAgIH0pO1xuXG4gIC8vIE91dnJpciBsZXMgcGFyYW3DqHRyZXMgZGVwdWlzIGxlIHBpZWQgZGUgcGFnZVxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLWNvb2tpZS1zZXR0aW5ncy1mb290ZXJcIikpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLmdldEVsZW1lbnRCeUlkKFwib3Blbi1jb29raWUtc2V0dGluZ3MtZm9vdGVyXCIpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb29raWUtY29uc2VudC1wb3B1cFwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvb2tpZS1jb25zZW50LXNpbXBsZVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtZGV0YWlsZWRcIikuc3R5bGUuZGlzcGxheSA9XG4gICAgICAgICAgXCJibG9ja1wiO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUudHJhbnNmb3JtID1cbiAgICAgICAgICAgIFwidHJhbnNsYXRlWSgwKVwiO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29va2llLWNvbnNlbnQtcG9wdXBcIikuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9KTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTUVUSE9EX05BTUUsIGFyZ3VtZW50KSB7XG4gIHZhciBtZXRob2QgPSBbXVtNRVRIT0RfTkFNRV07XG4gIHJldHVybiAhIW1ldGhvZCAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtY2FsbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICAgIG1ldGhvZC5jYWxsKG51bGwsIGFyZ3VtZW50IHx8IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgY2xhc3NvZlJhdyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbikge1xuICAvLyBOYXNob3JuIGJ1ZzpcbiAgLy8gICBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTEyOFxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xMTMwXG4gIGlmIChjbGFzc29mUmF3KGZuKSA9PT0gJ0Z1bmN0aW9uJykgcmV0dXJuIHVuY3VycnlUaGlzKGZuKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsVGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwtdGhpcycpO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIEVOVklST05NRU5UID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Vudmlyb25tZW50Jyk7XG52YXIgVVNFUl9BR0VOVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnZpcm9ubWVudC11c2VyLWFnZW50Jyk7XG52YXIgYXJyYXlTbGljZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zbGljZScpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcblxudmFyIEZ1bmN0aW9uID0gZ2xvYmFsVGhpcy5GdW5jdGlvbjtcbi8vIGRpcnR5IElFOS0gYW5kIEJ1biAwLjMuMC0gY2hlY2tzXG52YXIgV1JBUCA9IC9NU0lFIC5cXC4vLnRlc3QoVVNFUl9BR0VOVCkgfHwgRU5WSVJPTk1FTlQgPT09ICdCVU4nICYmIChmdW5jdGlvbiAoKSB7XG4gIHZhciB2ZXJzaW9uID0gZ2xvYmFsVGhpcy5CdW4udmVyc2lvbi5zcGxpdCgnLicpO1xuICByZXR1cm4gdmVyc2lvbi5sZW5ndGggPCAzIHx8IHZlcnNpb25bMF0gPT09ICcwJyAmJiAodmVyc2lvblsxXSA8IDMgfHwgdmVyc2lvblsxXSA9PT0gJzMnICYmIHZlcnNpb25bMl0gPT09ICcwJyk7XG59KSgpO1xuXG4vLyBJRTktIC8gQnVuIDAuMy4wLSBzZXRUaW1lb3V0IC8gc2V0SW50ZXJ2YWwgLyBzZXRJbW1lZGlhdGUgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCN0aW1lcnNcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9vdmVuLXNoL2J1bi9pc3N1ZXMvMTYzM1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc2NoZWR1bGVyLCBoYXNUaW1lQXJnKSB7XG4gIHZhciBmaXJzdFBhcmFtSW5kZXggPSBoYXNUaW1lQXJnID8gMiA6IDE7XG4gIHJldHVybiBXUkFQID8gZnVuY3Rpb24gKGhhbmRsZXIsIHRpbWVvdXQgLyogLCAuLi5hcmd1bWVudHMgKi8pIHtcbiAgICB2YXIgYm91bmRBcmdzID0gdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSkgPiBmaXJzdFBhcmFtSW5kZXg7XG4gICAgdmFyIGZuID0gaXNDYWxsYWJsZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKTtcbiAgICB2YXIgcGFyYW1zID0gYm91bmRBcmdzID8gYXJyYXlTbGljZShhcmd1bWVudHMsIGZpcnN0UGFyYW1JbmRleCkgOiBbXTtcbiAgICB2YXIgY2FsbGJhY2sgPSBib3VuZEFyZ3MgPyBmdW5jdGlvbiAoKSB7XG4gICAgICBhcHBseShmbiwgdGhpcywgcGFyYW1zKTtcbiAgICB9IDogZm47XG4gICAgcmV0dXJuIGhhc1RpbWVBcmcgPyBzY2hlZHVsZXIoY2FsbGJhY2ssIHRpbWVvdXQpIDogc2NoZWR1bGVyKGNhbGxiYWNrKTtcbiAgfSA6IHNjaGVkdWxlcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBlcy9uby1hcnJheS1wcm90b3R5cGUtaW5kZXhvZiAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLWNsYXVzZScpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBhcnJheU1ldGhvZElzU3RyaWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1pcy1zdHJpY3QnKTtcblxudmFyIG5hdGl2ZUluZGV4T2YgPSB1bmN1cnJ5VGhpcyhbXS5pbmRleE9mKTtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIG5hdGl2ZUluZGV4T2YoWzFdLCAxLCAtMCkgPCAwO1xudmFyIEZPUkNFRCA9IE5FR0FUSVZFX1pFUk8gfHwgIWFycmF5TWV0aG9kSXNTdHJpY3QoJ2luZGV4T2YnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGluZGV4T2Y6IGZ1bmN0aW9uIGluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICB2YXIgZnJvbUluZGV4ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIE5FR0FUSVZFX1pFUk9cbiAgICAgIC8vIGNvbnZlcnQgLTAgdG8gKzBcbiAgICAgID8gbmF0aXZlSW5kZXhPZih0aGlzLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHx8IDBcbiAgICAgIDogJGluZGV4T2YodGhpcywgc2VhcmNoRWxlbWVudCwgZnJvbUluZGV4KTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG5cbnZhciBEYXRlUHJvdG90eXBlID0gRGF0ZS5wcm90b3R5cGU7XG52YXIgSU5WQUxJRF9EQVRFID0gJ0ludmFsaWQgRGF0ZSc7XG52YXIgVE9fU1RSSU5HID0gJ3RvU3RyaW5nJztcbnZhciBuYXRpdmVEYXRlVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhEYXRlUHJvdG90eXBlW1RPX1NUUklOR10pO1xudmFyIHRoaXNUaW1lVmFsdWUgPSB1bmN1cnJ5VGhpcyhEYXRlUHJvdG90eXBlLmdldFRpbWUpO1xuXG4vLyBgRGF0ZS5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1kYXRlLnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKFN0cmluZyhuZXcgRGF0ZShOYU4pKSAhPT0gSU5WQUxJRF9EQVRFKSB7XG4gIGRlZmluZUJ1aWx0SW4oRGF0ZVByb3RvdHlwZSwgVE9fU1RSSU5HLCBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzVGltZVZhbHVlKHRoaXMpO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IG5hdGl2ZURhdGVUb1N0cmluZyh0aGlzKSA6IElOVkFMSURfREFURTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWxUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbC10aGlzJyk7XG52YXIgc2NoZWR1bGVyc0ZpeCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zY2hlZHVsZXJzLWZpeCcpO1xuXG52YXIgc2V0SW50ZXJ2YWwgPSBzY2hlZHVsZXJzRml4KGdsb2JhbFRoaXMuc2V0SW50ZXJ2YWwsIHRydWUpO1xuXG4vLyBCdW4gLyBJRTktIHNldEludGVydmFsIGFkZGl0aW9uYWwgcGFyYW1ldGVycyBmaXhcbi8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3RpbWVycy1hbmQtdXNlci1wcm9tcHRzLmh0bWwjZG9tLXNldGludGVydmFsXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBmb3JjZWQ6IGdsb2JhbFRoaXMuc2V0SW50ZXJ2YWwgIT09IHNldEludGVydmFsIH0sIHtcbiAgc2V0SW50ZXJ2YWw6IHNldEludGVydmFsXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbFRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsLXRoaXMnKTtcbnZhciBzY2hlZHVsZXJzRml4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NjaGVkdWxlcnMtZml4Jyk7XG5cbnZhciBzZXRUaW1lb3V0ID0gc2NoZWR1bGVyc0ZpeChnbG9iYWxUaGlzLnNldFRpbWVvdXQsIHRydWUpO1xuXG4vLyBCdW4gLyBJRTktIHNldFRpbWVvdXQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZpeFxuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvdGltZXJzLWFuZC11c2VyLXByb21wdHMuaHRtbCNkb20tc2V0dGltZW91dFxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZm9yY2VkOiBnbG9iYWxUaGlzLnNldFRpbWVvdXQgIT09IHNldFRpbWVvdXQgfSwge1xuICBzZXRUaW1lb3V0OiBzZXRUaW1lb3V0XG59KTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3Mgc3BsaXQgdG8gbW9kdWxlcyBsaXN0ZWQgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnNldC1pbnRlcnZhbCcpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuc2V0LXRpbWVvdXQnKTtcbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRDb29raWUiLCJuYW1lIiwidmFsdWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsImdldENvb2tpZSIsIm5hbWVFUSIsImNhIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJzZXRUaW1lb3V0IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsInRyYW5zZm9ybSIsIm9wYWNpdHkiLCJkaXNwbGF5Iiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJjaGVja2VkIl0sInNvdXJjZVJvb3QiOiIifQ==