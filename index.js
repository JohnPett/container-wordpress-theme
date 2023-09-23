var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/text-balancer/text-balancer.js
var require_text_balancer = __commonJS((exports) => {
  var candidates = [];
  var textBalancer = function(selectors) {
    if (!selectors) {
      candidates = document.querySelectorAll(".balance-text");
    } else {
      createSelectors(selectors);
    }
    balanceText();
    var rebalanceText = debounce(function() {
      balanceText();
    }, 100);
    window.addEventListener("resize", rebalanceText);
  };
  var createSelectors = function(selectors) {
    selectorArray = selectors.split(",");
    for (var i = 0;i < selectorArray.length; i += 1) {
      var currentSelectorElements = document.querySelectorAll(selectorArray[i].trim());
      for (var j = 0;j < currentSelectorElements.length; j += 1) {
        var currentSelectorElement = currentSelectorElements[j];
        candidates.push(currentSelectorElement);
      }
    }
  };
  var debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate)
          func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow)
        func.apply(context, args);
    };
  };
  var balanceText = function() {
    var element;
    var i;
    for (i = 0;i < candidates.length; i += 1) {
      element = candidates[i];
      if (textElementIsMultipleLines(element)) {
        element.style.maxWidth = "";
        squeezeContainer(element, element.clientHeight, 0, element.clientWidth);
      }
    }
  };
  var squeezeContainer = function(element, originalHeight, bottomRange, topRange) {
    var mid;
    if (bottomRange >= topRange) {
      element.style.maxWidth = topRange + "px";
      return;
    }
    mid = (bottomRange + topRange) / 2;
    element.style.maxWidth = mid + "px";
    if (element.clientHeight > originalHeight) {
      squeezeContainer(element, originalHeight, mid + 1, topRange);
    } else {
      squeezeContainer(element, originalHeight, bottomRange + 1, mid);
    }
  };
  var textElementIsMultipleLines = function(element) {
    var firstWordHeight;
    var elementHeight;
    var HEIGHT_OFFSET;
    var elementWords;
    var firstWord;
    var ORIGINAL_ELEMENT_TEXT;
    ORIGINAL_ELEMENT_TEXT = element.innerHTML;
    HEIGHT_OFFSET = 10;
    elementWords = element.innerHTML.split(" ");
    firstWord = document.createElement("span");
    firstWord.id = "element-first-word";
    firstWord.innerHTML = elementWords[0];
    elementWords = elementWords.slice(1);
    element.innerHTML = "";
    element.appendChild(firstWord);
    element.innerHTML += " " + elementWords.join(" ");
    firstWord = document.getElementById("element-first-word");
    firstWordHeight = firstWord.offsetHeight;
    elementHeight = element.offsetHeight;
    element.innerHTML = ORIGINAL_ELEMENT_TEXT;
    return elementHeight - HEIGHT_OFFSET > firstWordHeight;
  };
  exports.balanceText = textBalancer;
});

// js/index.js
var import_text_balancer = __toESM(require_text_balancer(), 1);

// js/modules/header.js
function header(el) {
  function init() {
    console.log(el);
  }
  return { init };
}

// js/modules/search.js
function search(el) {
  const button = el.querySelector("button");
  const search2 = el.querySelector('[type="search"]');
  const submit = el.querySelector('[type="submit"]');
  const container = el.querySelector("button + div");
  let open = false;
  function toggle() {
    if (open) {
      container.style.height = 0;
      search2.style.opacity = 0;
      search2.value = "";
      submit.setAttribute("disabled", "disabled");
      submit.style.opacity = 0;
      setTimeout(() => {
        search2.value = "";
      }, 450);
    } else {
      container.style.height = "162px";
      setTimeout(() => {
        submit.style.opacity = 0.5;
        search2.style.opacity = 1;
        search2.focus();
      }, 150);
    }
    open = !open;
  }
  function change() {
    if (search2.value) {
      submit.style.opacity = 1;
      submit.removeAttribute("disabled");
    } else {
      submit.style.opacity = 0.5;
      submit.setAttribute("disabled", "disabled");
    }
  }
  function init() {
    button.addEventListener("click", toggle);
    search2.addEventListener("keyup", change);
    submit.addEventListener("click", toggle);
  }
  return { init };
}

// js/index.js
var setupModules = (className, include) => {
  return [...document.getElementsByClassName(className)].map((el) => {
    const module = include(el);
    module.init();
    return module;
  });
};
var initSite = () => {
  setupModules("header", header);
  setupModules("search", search);
  import_text_balancer.default.balanceText();
};
if (document.addEventListener)
  document.addEventListener("DOMContentLoaded", initSite);
else
  window.attachEvent("onload", initSite);
