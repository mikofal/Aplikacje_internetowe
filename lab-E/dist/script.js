/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var msg = "Hello!";
alert(msg);
var styles = {
  "default": "style/style1.css",
  dark: "style/style2.css",
  light: "#",
  extra: "#"
};
var currentStyle = "default";
function changeStyle(styleName) {
  var linkElement = document.getElementById("dynamic-style");
  if (!linkElement || !styles[styleName]) {
    console.error("Nie znaleziono elementu <link> lub stylu!");
    return;
  }
  linkElement.href = styles[styleName];
  currentStyle = styleName;
}
function generateStyleLinks() {
  var stylesContainer = document.getElementById("styles-container");
  if (!stylesContainer) {
    console.error("Nie znaleziono elementu do osadzenia linków!");
    return;
  }
  for (var _i = 0, _Object$entries = Object.entries(styles); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      styleName = _Object$entries$_i[0],
      stylePath = _Object$entries$_i[1];
    var link = document.createElement("a");
    link.href = "#";
    link.className = "change-style";
    link.setAttribute("data-style", styleName);
    link.textContent = styleName.charAt(0).toUpperCase() + styleName.slice(1);
    stylesContainer.appendChild(link);
    var separator = document.createTextNode(" | ");
    stylesContainer.appendChild(separator);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  generateStyleLinks();
  var styleLinks = document.querySelectorAll(".change-style");
  styleLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var target = event.target;
      var styleName = target.getAttribute("data-style");
      if (styleName) {
        changeStyle(styleName);
      }
    });
  });
});
/******/ })()
;